if (process.env.MODE === 'production') {
  require('dotenv').config();
}

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
const RegistrationToken = require('./models/registrationToken');

// import rabbitMQ
const consumeUploadQueue = require('./utils/consume-upload-queue').consume;
// import routes
const candidateRoutes = require('./routes/candidate');

const app = express();

// middlewres
app.use(bodyParser.json({ limit: '1024mb' }));

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
app.use('/candidate', candidateRoutes);

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
    consumeUploadQueue();
    console.log('Listen for Upload queue....');
  })
  .catch((err) => console.log(err));
