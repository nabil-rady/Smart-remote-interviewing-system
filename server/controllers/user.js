const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createToken = require('../util/create-token');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const customId = require('custom-id');
const uuid = require('uuid');

const User = require('../models/user');

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
    .then((createdUser) => {
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

  const { userId } = req.body;
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

      // sending email with verification link.
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

  const { verificationCode, userId } = req.body;

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

module.exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  let fetchedUser, token, tokenExpireDate;
  User.findOne({
    // fetch the user
    where: {
      email,
    },
  })
    .then((user) => {
      if (!user) {
        // check if the user does not exist.
        const error = new Error('Email not found');
        error.statusCode = 404;
        throw error;
      }
      fetchedUser = user;
      return bcrypt.compare(password.toString(), user.password); // compare the enterd password with the hashed one.
    })
    .then((isEqual) => {
      if (!isEqual) {
        // if the password is wrong
        const error = new Error('Incorrect password');
        error.statusCode = 401; // Authentication faild
        throw error;
      }
      token = createToken(
        fetchedUser.dataValues.userId,
        process.env.TOKEN_SECRET,
        '10h'
      );
      tokenExpireDate = new Date(0);
      tokenExpireDate.setUTCSeconds(jwt.decode(token).exp);

      // loggedIn => true
      return User.update(
        {
          loggedIn: true,
        },
        {
          where: {
            userId: fetchedUser.dataValues.userId,
          },
        }
      );
    })
    .then((updatedsUser) => {
      const { password, loggedIn, verificationCode, ...user } =
        fetchedUser.dataValues;
      user.loggedIn = true;
      res.status(200).json({
        user,
        token,
        tokenExpireDate,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500; // serverSide error
      }
      next(err);
    });
};

module.exports.postLogOut = (req, res, next) => {
  const { userId } = req;

  // loggedIn => falsse, and return invalid token
  User.update(
    {
      loggedIn: false,
    },
    {
      where: {
        userId: userId,
      },
    }
  )
    .then((updatesUser) => {
      res.status(200).json({
        token: createToken(userId, process.env.TOKEN_SECRET, '-10s'),
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500; // serverSide error
      }
      next(err);
    });
};

module.exports.getInfo = (req, res, next) => {
  const id = req.params.user_id;
  User.findOne({
    // fetch the user
    where: {
      userId: id.toString(),
    },
  })
    .then((returnedUser) => {
      if (!returnedUser) {
        // check if the user exists
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      const { password, verificationCode, ...user } = returnedUser.dataValues;
      res.status(200).json({
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

module.exports.putEditProfile = (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(`Validation failed.`);
    error.statusCode = 422; // Validation error
    error.data = errors.array();
    return next(error);
  }

  const userId = req.userId;
  User.findOne({
    // fetch the user
    where: {
      userId: userId.toString(),
    },
  }).then((returnedUser) => {
    if (!returnedUser) {
      // check if the user exists
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    // check if the user is logged in
    if (!returnedUser.dataValues.loggedIn) {
      const err = new Error('Please log in');
      err.statusCode = 401;
      throw err;
    }
    // check if the user's email is confirmed
    if (!returnedUser.dataValues.emailConfirmed) {
      const err = new Error('Please confirm your email');
      err.statusCode = 401;
      throw err;
    }
    const { phoneCode, phoneNumber } = req.body;

    const [newPhoneCode, newPhoneNumber] = [
      phoneCode ? phoneCode : returnedUser.dataValues.phoneCode,
      phoneNumber ? phoneNumber : returnedUser.dataValues.phoneNumber,
    ];

    User.update(
      {
        phoneCode: newPhoneCode,
        phoneNumber: newPhoneNumber,
      },
      {
        where: {
          userId,
        },
      }
    )
      .then((editedUser) => {
        const { password, verificationCode, ...user } = returnedUser.dataValues;
        user.phoneCode = newPhoneCode;
        user.phoneNumber = newPhoneNumber;
        res.status(200).json({
          user,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500; // serverSide error
        }
        next(err);
      });
  });
};

module.exports.putChangePassword = (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(`Validation failed.`);
    error.statusCode = 422; // Validation error
    error.data = errors.array();
    return next(error);
  }

  const userId = req.userId;
  const { oldPassword, newPassword, confirmNewPassowrd } = req.body;
  User.findOne({
    // fetch the user
    where: {
      userId: userId.toString(),
    },
  })
    .then((returnedUser) => {
      if (!returnedUser) {
        // check if the user exists
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      // check if the user is logged in
      if (!returnedUser.dataValues.loggedIn) {
        const err = new Error('Please log in');
        err.statusCode = 401;
        throw err;
      }
      // check if the user's email is confirmed
      if (!returnedUser.dataValues.emailConfirmed) {
        const err = new Error('Please confirm your email');
        err.statusCode = 401;
        throw err;
      }
      return bcrypt.compare(
        oldPassword.toString(),
        returnedUser.dataValues.password
      );
    })
    .then(async (isEqual) => {
      if (!isEqual) {
        const error = new Error('Incorrect password');
        error.statusCode = 401; // Authentication faild
        throw error;
      }
      return User.update(
        {
          password: await bcrypt.hash(newPassword, 12),
        },
        {
          where: {
            userId,
          },
        }
      );
    })
    .then(() => {
      res.status(200).json({
        message: 'Password has been changed.',
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500; // serverSide error
      }
      next(err);
    });
};
