const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createToken = require('../utils/create-token');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const customId = require('custom-id-new');
const uuid = require('uuid');

const User = require('../models/user');
const RegistrationToken = require('../models/registrationToken');

module.exports.postSignup = (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(`Validation failed.`);
    error.statusCode = 422; // Validation error
    error.data = errors.array();
    return next(error);
  }

  const {
    firstName,
    lastName,
    companyName,
    email,
    password,
    phoneCode,
    phoneNumber,
  } = req.body;
  bcrypt
    .hash(password, 12) // hash the password
    .then((hashedPassword) => {
      return User.create({
        // Store the user in the dataBase
        firstName,
        lastName,
        companyName,
        email,
        password: hashedPassword,
        phoneCode: phoneCode.toString(),
        phoneNumber: phoneNumber.toString(),
      });
    })
    .then(async (createdUser) => {
      const { password, verificationCode, ...user } = createdUser.dataValues;

      res.status(201).json({
        user,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500; // serverSide error
      }
      next(err);
    });
};

module.exports.postConfirmEmail = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(`User id is not encluded.`);
    error.statusCode = 422; // Validation error
    error.data = errors.array();
    return next(error);
  }

  const { userId } = req;
  const user = await User.findOne({
    // fetch the user's data
    where: {
      userId: userId,
    },
  });
  if (!user) {
    // check if the email does not exist.
    const error = new Error('User is not found');
    error.statusCode = 404;
    return next(error);
  }
  // check if the email has been verified
  if (user.dataValues.emailConfirmed) {
    const error = new Error('This email is already verified.');
    error.statusCode = 422;
    return next(error);
  }

  // create a confirmation code.
  let fetchedCode, generatedCode;
  do {
    generatedCode = customId({
      name:
        user.dataValues.firstName +
        user.dataValues.lastName +
        user.dataValues.companyName,
      email: user.dataValues.email,
    });
    fetchedCode = await User.findOne({
      // fetch this generated id
      attributes: ['userId'],
      where: {
        verificationCode: generatedCode,
      },
    });
  } while (fetchedCode !== null);

  // store the generated id into the database
  User.update(
    {
      verificationCode: generatedCode,
      verificationCodeGenerationDate: new Date(),
    },
    {
      where: {
        userId: userId,
      },
    }
  )
    .then((updatedsUser) => {
      // create a transporter with the mailing service.
      const transporter = nodemailer.createTransport(
        sendgridTransport({
          auth: {
            api_key: process.env.sendgridTransportApiKey,
          },
        })
      );

      // sending email with verification code.
      return transporter.sendMail({
        to: user.dataValues.email,
        from: 'vividlyinterviewing@gmail.com',
        subject: 'Email confirmation.',
        html: `<h1>Please, confirm your email</h1>
             <p>Your verificatin code is <b>${generatedCode}</b> .</p>`,
      });
    })
    .then((mail) => {
      console.log(mail);
      res.status(200).json({
        message: `Email confirmation has been send to the user`,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500; // serverSide error
      }
      next(err);
    });
};

module.exports.postVerifyEmail = (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(`Verification faild.`);
    error.statusCode = 422; // Validation error
    error.data = errors.array();
    throw error;
  }

  const { verificationCode } = req.body;
  const { userId } = req;

  User.findOne({
    // fetch the user.
    where: {
      userId: userId,
    },
  })
    .then((fetchedUser) => {
      if (!fetchedUser) {
        // check if the email does not exist.
        const error = new Error('User is not found');
        error.statusCode = 404;
        throw error;
      }
      if (fetchedUser.dataValues.emailConfirmed) {
        const error = new Error(`User's email already verified.`);
        error.statusCode = 422;
        throw error;
      } else if (verificationCode !== fetchedUser.dataValues.verificationCode) {
        const error = new Error('Wrong verification code.');
        error.statusCode = 422;
        throw error;
      }
      // get the date difference in hours
      let dateDifference =
        (new Date() -
          new Date(fetchedUser.dataValues.verificationCodeGenerationDate)) /
        36e5;
      console.log(`############# ${dateDifference} #################`);
      // check if the code in generated in less than one hour
      if (dateDifference >= 1) {
        const error = new Error('Verification code has been expired.');
        error.statusCode = 422;
        throw error;
      }

      // emailConfirmed => true
      return User.update(
        {
          emailConfirmed: true,
        },
        {
          where: {
            userId: userId,
          },
        }
      );
    })
    .then((updatesUser) => {
      res.status(200).json({
        message: `User's email has been successfully verified.`,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500; // serverSide error
      }
      next(err);
    });
};

module.exports.postLogin = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(`Validation failed.`);
    error.statusCode = 422; // Validation error
    error.data = errors.array();
    return next(error);
  }

  try {
    const { email, registrationToken } = req.body;
    const enteredPassword = req.body.password;

    const user = await User.findOne({
      // fetch the user
      where: {
        email,
      },
    });

    if (!user) {
      // check if the user does not exist.
      const error = new Error('Email not found');
      error.statusCode = 404;
      throw error;
    }

    // compare the enterd password with the hashed one.
    const isEqual = await bcrypt.compare(
      enteredPassword.toString(),
      user.password
    );
    if (!isEqual) {
      // if the password is wrong
      const error = new Error('Incorrect password');
      error.statusCode = 401; // Authentication faild
      throw error;
    }

    const token = createToken(
      user.dataValues.userId,
      process.env.TOKEN_SECRET,
      '10h'
    );
    let tokenExpireDate = new Date(0);
    tokenExpireDate.setUTCSeconds(jwt.decode(token).exp);

    user.loggedIn = true;
    await user.save();

    if (registrationToken) {
      const registratinToken = await RegistrationToken.findOne({
        where: {
          token: registrationToken,
          userId: user.dataValues.userId,
        },
      });

      if (!registratinToken) {
        await RegistrationToken.create({
          token: registrationToken,
          userId: user.dataValues.userId,
        });
      }
    }

    const { password, verificationCode, ...returnedUser } = user.dataValues;
    res.status(200).json({
      user: returnedUser,
      token,
      tokenExpireDate,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // serverSide error
    }
    next(err);
  }
};

module.exports.postLogOut = async (req, res, next) => {
  try {
    const { userId } = req;
    const { registrationToken } = req.body;

    if (registrationToken) {
      await RegistrationToken.destroy({
        where: {
          userId,
          token: registrationToken,
        },
      });
    }

    const registratinTokens = await RegistrationToken.findAll({
      where: {
        userId,
      },
    });

    if (!registratinTokens) {
      // loggedIn => falsse, and return invalid token, remove the registration token
      const user = await User.findOne({
        where: {
          userId,
        },
      });
      user.loggedIn = false;
      await user.save();
    }

    res.status(200).json({
      token: createToken(userId, process.env.TOKEN_SECRET, '-10s'),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // serverSide error
    }
    next(err);
  }
};
