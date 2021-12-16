const { validationResult } = require('express-validator');

const User = require('../models/user');
const Question = require('../models/question');
const JobListing = require('../models/jobListing');
const Keyword = require('../models/keyword');

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
      jobListingId: createdJob.dataValues.jobListingId,
      questions: returnedQuestions,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // serverSide error
    }
    next(err);
  }
};
