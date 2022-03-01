const { body } = require('express-validator');
const User = require('../models/user');

const postSignupValidation = [
  body('email', 'Please enter a valid email.')
    .exists()
    .trim()
    .isLength({
      max: 255,
    })
    .isEmail()
    .custom((value) => {
      return User.findOne({
        attributes: ['email'],
        where: {
          email: value,
        },
      }).then((email) => {
        if (email) {
          return Promise.reject('This email is already exists');
        }
      });
    }),
  body('password', 'Password length should between 9 and 225 characters.')
    .exists()
    .trim()
    .isLength({
      min: 9,
      max: 255,
    }),
  body('confirmPassword')
    .exists()
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject(`Passwords don't match.`);
      }
      return true;
    }),
  body('firstName', 'First name length should be less than 225 characters.')
    .exists()
    .trim()
    .isLength({
      min: 1,
      max: 255,
    }),
  body('lastName', 'Last name length should less than 225 characters.')
    .exists()
    .trim()
    .isLength({
      min: 1,
      max: 255,
    }),
  body('companyName', 'Company name length should be less than 225 characters.')
    .exists()
    .trim()
    .isLength({
      min: 2,
      max: 255,
    }),
  body('phoneCode', 'Phone code should be between 2 and 5 characters length.')
    .exists()
    .trim()
    .isLength({
      min: 2,
      max: 5,
    }),
  body('phoneNumber', 'Phone number should be between 7 and 15 numbers length.')
    .exists()
    .trim()
    .isLength({
      min: 7,
      max: 15,
    })
    .custom((value) => {
      for (let num of value) {
        if (num < '0' || num > '9') {
          return Promise.reject('Phone number should contain numbers only');
        }
      }
      return true;
    }),
];

const postConfirmEmail = [
  body('userId', 'User id is not correct.')
    .exists()
    .custom((value) => {
      if (value.length !== 36) {
        return false;
      }
      return true;
    }),
];

const postVerifyEmail = [
  body(
    'verificationCode',
    'Verification code should be 8 characters length.'
  ).custom((value) => {
    if (value.length !== 8) {
      return false;
    }
    return true;
  }),
  body('userId', 'User id is not correct.').custom((value) => {
    if (value.length !== 36) {
      return false;
    }
    return true;
  }),
];

const postRegistrationToken = [
  body('registrationToken', 'registrationToken should not be empty').custom(
    (value) => {
      if (value.length === 0) {
        return false;
      }
      return true;
    }
  ),
  body('web', 'The token should be sent from one device').custom(
    (value, { req }) => {
      if (value === req.body.mobile) {
        return false;
      }
      return true;
    }
  ),
];

module.exports = {
  postSignupValidation,
  postConfirmEmail,
  postVerifyEmail,
  postRegistrationToken,
};
