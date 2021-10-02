const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const customId = require('custom-id');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports.postSignup = (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422; // Validation error
    error.data = errors.array();
    throw error;
  }

  const { firstName, lastName, companyName, email, password } = req.body;

  let newId, exist;
  User.findAll({
    // fetch all users ids
    attributes: ['userID'],
  })
    .then((users) => {
      const oldIds = users.map((user) => user.userID);
      do {
        // create a unique id user id
        exist = false;
        newId = customId({
          name: firstName + lastName + companyName,
          email: email,
        });

        for (let id of oldIds) {
          if (id === newId) {
            exist = true;
            break;
          }
        }
      } while (exist);
      return bcrypt.hash(password, 12); // hash the password
    })
    .then((hashedPassword) => {
      return User.create({
        // Store the user in the dataBase
        userId: newId,
        firstName: firstName,
        lastName: lastName,
        companyName: companyName,
        email: email,
        password: hashedPassword,
      });
    })
    .then((user) => {
      res.status(201).json({
        user: user,
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
  let fetchedUser;
  User.findAll({
    // fetch the user
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (user.length < 1) {
        // check if the user exists
        const error = new Error('Email not found');
        error.statusCode = 404;
        throw error;
      }
      fetchedUser = user;
      return bcrypt.compare(password.toString(), user[0].password); // compare the enterd password with the hashed one.
    })
    .then((isEqual) => {
      if (!isEqual) {
        // if the password is wrong
        const error = new Error('Incorrect password');
        error.statusCode = 401; // Authentication faild
        throw error;
      }
      const token = jwt.sign(
        // create the token
        {
          email: fetchedUser.email,
          userId: fetchedUser.userId,
        },
        'ThisIsTheTokenSecretKey',
        {
          expiresIn: '10h',
        }
      );
      res.status(200).json({
        token: token,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500; // serverSide error
      }
      next(err);
    });
};
