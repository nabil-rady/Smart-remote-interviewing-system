const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const customId = require('custom-id');
const jwt = require('jsonwebtoken');
const createToken = require('../util/create-token');
const verifyEmailToken = require('../util/verify-email-token');
const sendConfirmMail = require('../util/send-confirm-mail');

const User = require('../models/user');

module.exports.postSignup = async (req, res, next) => {
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
  let userId, newId;
  do {
    newId = customId({
      name: firstName + lastName + companyName,
      email: email,
    });
    userId = await User.findOne({
      // fetch this generated id
      attributes: ['userId'],
      where: {
        userId: newId,
      },
    });
  } while (userId !== null);
  bcrypt
    .hash(password, 12) // hash the password
    .then((hashedPassword) => {
      return User.create({
        // Store the user in the dataBase
        userId: newId,
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
      const { password, ...user } = createdUser.dataValues;
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

// if the user did not confirm his/her email during signup.
module.exports.getConfirmEmail = (req, res, next) => {
  const { userId } = req;
  User.findOne({
    // fetch this generated id
    attributes: ['email'],
    where: {
      userId: userId,
    },
  })
    .then((user) => {
      if (!user) {
        // check if the email does not exist.
        const error = new Error('Email not found');
        error.statusCode = 404;
        throw error;
      }
      return sendConfirmMail(userId, user.dataValues.email);
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

module.exports.getVerifyEmail = (req, res, next) => {
  const { verifyToken } = req.params;
  if (!verifyToken) {
    // if we cannot extract the token.
    const error = new Error('No token is provided.');
    error.statusCode = 401;
    throw error;
  }
  const userId = verifyEmailToken(verifyToken);
  if (!userId) {
    // if the user id is null.
    const error = new Error('No user id.');
    error.statusCode = 404;
    throw error;
  }

  // emailConfirmed => true
  User.update(
    {
      emailConfirmed: true,
    },
    {
      where: {
        userId: userId,
      },
    }
  )
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
      const { password, loggedIn, ...user } = fetchedUser.dataValues;
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
      const { password, ...user } = returnedUser.dataValues;
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
