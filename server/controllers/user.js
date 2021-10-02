const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const customId = require('custom-id');

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
    attributes: ['userID'],
  })
    .then((users) => {
      const oldIds = users.map((user) => user.userID);
      do {
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
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      // Hash the password
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
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (user.length < 1) {
        const error = new Error('Email not found');
        error.statusCode = 404;
        throw error;
      }
      fetchedUser = user;
      return bcrypt.compare(password.toString(), user[0].password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Incorrect password');
        error.statusCode = 401; // Authentication faild
        throw error;
      }
      res.json({ message: 'Password matched' });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500; // serverSide error
      }
      next(err);
    });
};
