if (process.env.MODE === 'production') {
  require('dotenv').config();
}

// import packages
const express = require('express');
const bodyParser = require('body-parser');

// import models
const Interview = require('./models/interview');
const JobListing = require('./models/jobListing');
const Question = require('./models/question');
const User = require('./models/user');
const Video = require('./models/video');
const Keyword = require('./models/keyword');
const RegistrationToken = require('./models/registrationToken');

// import routes
const userRoutes = require('./routes/user');

const app = express();

// middlewres
app.use(bodyParser.json());

// CORS => allow others to request our apis
app.use((req, res, next) => {
  // Allow all domains to accept response from this server.
  res.setHeader('Access-Control-allow-Origin', '*');

  // allow domains to use these HTTP methods.
  res.setHeader(
    'Access-Control-allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );

  // alloW incoming requests to have these headers set.
  res.setHeader('Access-Control-allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.use('/user', userRoutes);

// Error handling
app.use((error, req, res, next) => {
  const { statusCode, message, data } = error;
  console.log(error);
  res.status(statusCode || 500).json({
    // if the statusCode is undefined, set it to 500.
    message: message,
    details: data ? data : 'No details provided',
  });
});

module.exports.app = app;
