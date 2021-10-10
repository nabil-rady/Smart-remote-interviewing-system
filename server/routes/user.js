const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const isAuth = require('../util/is-authenticated');

const userControllers = require('../controllers/user');

const router = express.Router();

/* 
                ALLOW ONLY AUTH USERS TO REACH THIS ROUTE
    router.get('/dashboard', isAuth, userControllers.theMethod);
*/

router.post(
  '/signup',
  [
    body('email', 'Please enter a valid email.')
      .trim()
      .isLength({
        max: 225,
      })
      .isEmail()
      .normalizeEmail()
      .custom((value) => {
        return User.findAll({
          attributes: ['email'],
          where: {
            email: value,
          },
        }).then((user) => {
          if (user.length > 0) {
            return Promise.reject('This email is already exists');
          }
        });
      }),
    body('password', 'Password length should between 9 and 225 characters.')
      .trim()
      .isLength({
        min: 9,
        max: 225,
      }),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(`Passwords don't match.`);
        }
        return true;
      }),
    body(
      'firstName',
      'First name length should be between 3 and 225 characters.'
    )
      .trim()
      .isLength({
        min: 3,
        max: 225,
      }),
    body('lastName', 'Last name length should be between 3 and 225 characters.')
      .trim()
      .isLength({
        min: 3,
        max: 225,
      }),
    body(
      'companyName',
      'Company name length should be less than 225 characters.'
    )
      .trim()
      .isLength({
        max: 225,
      }),
  ],
  userControllers.postSignup
);

router.post('/login', userControllers.postLogin);

router.get('/:user_id', userControllers.getInfo);

module.exports = router;
