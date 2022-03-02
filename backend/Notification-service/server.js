// import packages
const sequelize = require('./utils/db');

// import models
const Interview = require('./models/interview');
const JobListing = require('./models/jobListing');
const Question = require('./models/question');
const User = require('./models/user');
const Video = require('./models/video');
const Keyword = require('./models/keyword');
const RegistartionToken = require('./models/registrationToken');
const Notification = require('./models/notification');

// import rabbitMQ function
const rabbitMQ = require('./utils/rabbitMQ');

// connect to database, then listen for Results queue
sequelize
  .sync({
    // force: true,
  })
  .then((result) => {
    console.log('Notification service is running........');
    rabbitMQ.consume(); // listen for Results queue
  })
  .catch((err) => console.log(err));
