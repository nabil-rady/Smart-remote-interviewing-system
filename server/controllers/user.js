const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const customId = require('custom-id');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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',
    },
  })
);

module.exports.postSignup = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(`Validation failed.`);
    error.statusCode = 422; // Validation error
    error.data = errors.array();
    return next(error);
  }

  const { firstName, lastName, companyName, email, password } = req.body;
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
      });
    })
    .then((createdUser) => {
      const { password, ...user } = createdUser.dataValues;
      res.status(201).json({
        user,
      });
      // sending email
      return transporter.sendMail({
        to: user.email,
        from: 'mohamed.medhat2199@gmail.com',
        subject: 'Signup succeeded!',
        html: '<h1>You successfully signed up!</h1>',
      });
    })
    .then((mail) => console.log(mail))
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
  User.findOne({
    // fetch the user
    where: {
      email,
    },
  })
    .then((user) => {
      if (!user) {
        // check if the user exists
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
      const token = jwt.sign(
        // create the token
        {
          // user's info stored in the token
          userId: fetchedUser.dataValues.userId,
          email: fetchedUser.dataValues.email,
          firstName: fetchedUser.dataValues.firstName,
          lastName: fetchedUser.dataValues.lastName,
          companyName: fetchedUser.dataValues.companyName,
        },
        process.env.TOKEN_SECRET, // SECRET KEY
        {
          expiresIn: '10h',
        }
      );
      const tokenExpireDate = new Date(0);
      tokenExpireDate.setUTCSeconds(jwt.decode(token).exp);

      const { password, ...user } = fetchedUser.dataValues;
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
  // for logout we return an expired token just for now.
  res.status(200).json({
    token: jwt.sign(
      {
        userId: req.userId,
        email: req.email,
        firstName: req.firstName,
        lastName: req.lastName,
        companyName: req.companyName,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '-10s',
      }
    ),
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
