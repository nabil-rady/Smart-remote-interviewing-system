// packages
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/db');

// models
const Interview = require('./models/interview');
const JobListing = require('./models/job-listing');
const Question = require('./models/question');
const User = require('./models/user');
const Video = require('./models/video');

const app = express();

// middlewres
app.use(bodyParser.json());

/* 
    connect to db, and creat tables for our models IF NOT EXSISTS,
    but when we set force: true, it over wites the existing tables,
    we do this on development only when we want to write the new editing to the DataBase.
*/
sequelize
  .sync
  // { force: true }
  ()
  .then((result) => {
    // Setup the server.

    // console.log('result:', result);
    const port = 8000;
    app.listen(port, () => console.log(`Server is runing on port ${port}`));
  })
  .catch((err) => console.log(err));
