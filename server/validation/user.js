const { body } = require('express-validator');
const User = require('../models/user');

const postSignupValidation = [
  body('email', 'Please enter a valid email.')
    .trim()
    .isLength({
      max: 255,
    })
    .isEmail()
    .normalizeEmail()
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
    .trim()
    .isLength({
      min: 9,
      max: 255,
    }),
  body('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject(`Passwords don't match.`);
      }
      return true;
    }),
  body('firstName', 'First name length should be less than 225 characters.')
    .trim()
    .isLength({
      min: 1,
      max: 255,
    }),
  body('lastName', 'Last name length should less than 225 characters.')
    .trim()
    .isLength({
      min: 1,
      max: 255,
    }),
  body('companyName', 'Company name length should be less than 225 characters.')
    .trim()
    .isLength({
      min: 1,
      max: 255,
    }),
];

module.exports = { postSignupValidation };
