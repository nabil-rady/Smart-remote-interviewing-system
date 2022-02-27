// import packages
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/db');

// import models
const Interview = require('./models/interview');
const JobListing = require('./models/jobListing');
const Question = require('./models/question');
const User = require('./models/user');
const Video = require('./models/video');
const Keyword = require('./models/keyword');

// import routes
const userRoutes = require('./routes/user');
const jobListingRoutes = require('./routes/jobListing');

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
app.use('/job-listing', jobListingRoutes);

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

/* 
    connect to db, and creat tables for our models IF NOT EXSISTS,
    but when we set force: true, it over wites the existing tables,
    we do this on development only when we want to write the new editing to the DataBase.
*/
sequelize
  .sync({
    // force: true,
  })
  .then((result) => {
    // Setup the server.
    const port = process.env.PORT || 8080;
    app.listen(port, () => console.log(`Server is runing on port ${port}`));
  })
  .catch((err) => console.log(err));