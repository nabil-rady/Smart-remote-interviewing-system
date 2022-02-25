const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createToken = require('../utils/create-token');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const customId = require('custom-id');
const uuid = require('uuid');

const User = require('../models/user');

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
