const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const createUserId = require('../util/create-user-id');

const User = require('../models/user');

module.exports.postSignup = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422; // Validation error
    error.data = errors.array();
    throw error;
  }

  const { firstName, lastName, companyName, email, password } = req.body;
  const id = await createUserId(firstName + lastName, email); // Create user id

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      // Hash the password
      return User.create({
        // Store the user in the dataBase
        userId: id,
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
