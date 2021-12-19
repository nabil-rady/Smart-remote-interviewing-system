const { validationResult } = require('express-validator');

const User = require('../models/user');
const Question = require('../models/question');
const JobListing = require('../models/jobListing');
const Keyword = require('../models/keyword');
const { json } = require('body-parser');

module.exports.postCreateListing = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(`Validation failed.`);
    error.statusCode = 422; // Validation error
    error.data = errors.array();
    return next(error);
  }

  const creatorId = req.userId;
  const { positionName, expiryDate, questions } = req.body;
  try {
    const creator = await User.findOne({
      where: {
        userId: creatorId,
      },
    });
    // check if the creator is logged in
    if (!creator.dataValues.loggedIn) {
      const err = new Error('Please log in');
      err.statusCode = 401;
      throw err;
    }
    // check if the creator's email is confirmed
    if (!creator.dataValues.emailConfirmed) {
      const err = new Error('Please confirm your email');
      err.statusCode = 401;
      throw err;
    }
    // create the job-listing
    const createdJob = await creator.createJobListing({
      positionName,
      expiryDate,
    });
    // if (!Array.isArray(questions)) {
    //   questions = [questions];
    // }

    // craete the questions of the listing
    const questionObjects = await Promise.all(
      questions.map(async (question) => {
        try {
          const createdQuestion = await createdJob.createQuestion({
            ...question,
          });
          if (question.keywords) {
            // create keywords for each question
            await Promise.all(
              question.keywords.map((keyword) => {
                try {
                  return createdQuestion.createKeyword({
                    value: keyword,
                  });
                } catch (err) {
                  next(err);
                }
              })
            );
          }
          return createdQuestion;
        } catch (err) {
          next(err);
        }
      })
    );

    // generate the question object to return
    let returnedQuestions = questionObjects.map((questionObject) => ({
      ...questionObject.dataValues,
    }));

    // attach the keywords to each question
    for (let i = 0; i < returnedQuestions.length; i++) {
      const keywords = await Keyword.findAll({
        where: {
          questionId: returnedQuestions[i].questionId,
        },
      });
      returnedQuestions[i].keywords = keywords.map(
        (keyword) => keyword.dataValues.value
      );
    }

    // send the response
    res.status(201).json({
      ...createdJob.dataValues,
      questions: returnedQuestions,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // serverSide error
    }
    next(err);
  }
};

module.exports.getUserListings = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findOne({
      where: {
        userId,
      },
    });
    // check if the user is logged in
    if (!user.dataValues.loggedIn) {
      const err = new Error('Please log in');
      err.statusCode = 401;
      throw err;
    }
    // check if the user's email is confirmed
    if (!user.dataValues.emailConfirmed) {
      const err = new Error('Please confirm your email');
      err.statusCode = 401;
      throw err;
    }

    // get the listings
    const jobListings = await JobListing.findAll({
      where: {
        userId,
      },
    });
    const returnedListings = jobListings.map((listing) => ({
      ...listing.dataValues,
    }));

    res.status(200).json({
      jobListings: returnedListings,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // serverSide error
    }
    next(err);
  }
};

module.exports.getListing = async (req, res, next) => {
  const userId = req.userId;
  const listingId = req.params.listing_id;

  try {
    const user = await User.findOne({
      where: {
        userId,
      },
    });
    // check if the creator is logged in
    if (!user.dataValues.loggedIn) {
      const err = new Error('Please log in');
      err.statusCode = 401;
      throw err;
    }
    // check if the creator's email is confirmed
    if (!user.dataValues.emailConfirmed) {
      const err = new Error('Please confirm your email');
      err.statusCode = 401;
      throw err;
    }

    // get the listing
    const jobListing = await JobListing.findOne({
      where: {
        jobListingId: listingId,
      },
    });

    // get the listing's questions
    const questionObjects = await Question.findAll({
      where: {
        jobListingId: listingId,
      },
    });
    let questions = questionObjects.map((questionObject) => ({
      ...questionObject.dataValues,
    }));

    // attach the keywords to each question
    for (let i = 0; i < questions.length; i++) {
      const keywords = await Keyword.findAll({
        where: {
          questionId: questions[i].questionId,
        },
      });
      questions[i].keywords = keywords.map(
        (keyword) => keyword.dataValues.value
      );
    }

    // construct the object
    const returnedObject = {
      ...jobListing.dataValues,
      questions,
    };

    // send the response
    res.status(201).json({
      ...returnedObject,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // serverSide error
    }
    next(err);
  }
};
