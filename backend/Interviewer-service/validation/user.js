const { body } = require('express-validator');
const User = require('../models/user');

const putEditProfile = [
  body('phoneCode', 'Phone code should be between 2 and 5 characters length.')
    .optional()
    .trim()
    .isLength({
      min: 2,
      max: 5,
    }),
  body('phoneNumber', 'Phone number should be between 7 and 15 numbers length.')
    .optional()
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

const putChangePassword = [
  body('oldPassword', 'Password length should between 9 and 225 characters.')
    .exists()
    .trim()
    .isLength({
      min: 9,
      max: 255,
    }),
  body('newPassword', 'Password length should between 9 and 225 characters.')
    .exists()
    .trim()
    .isLength({
      min: 9,
      max: 255,
    })
    .custom((value, { req }) => {
      if (value === req.body.oldPassword) {
        return Promise.reject(`New password must be different.`);
      }
      return true;
    }),
  body('newConfirmPassword')
    .exists()
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        return Promise.reject(`New passwords don't match.`);
      }
      return true;
    }),
];

module.exports = {
  putEditProfile,
  putChangePassword,
};
