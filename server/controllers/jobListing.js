const { validationResult } = require('express-validator');
const customId = require('custom-id');

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
  User.findOne({
    where: {
      userId: creatorId,
    },
  })
    .then((creator) => {
      // check if the creator is logged in
      if (!creator.dataValues.loggedIn) {
        const err = new Error('Please log in');
        err.statusCode = 401;
        throw err;
      }
      if (!creator.dataValues.emailConfirmed) {
        const err = new Error('Please confirm your email');
        err.statusCode = 401;
        throw err;
      }
      // return JobListing.create({
      //   jobListingId: newId,
      //   creator: creator.dataValues.userId,
      //   positionName,
      //   expiryDate,
      // });
      return creator.createJobListing({
        positionName,
        expiryDate,
      });
    })
    .then((createdJob) => {
      console.log(questions);
      if (!Array.isArray(questions)) {
        questions = [questions];
      }
      return Promise.all(
        questions.map(async (question) => {
          try {
            // const createdQuestion = await Question.create({
            //   questionId: customId({
            //     name: question.statement,
            //   }),
            //   ...question,
            //   jobListing: createdJob.dataValues.jobListingId,
            // });
            const createdQuestion = await createdJob.createQuestion({
              ...question,
            });
            if (question.keywords) {
              await Promise.all(
                question.keywords.map((keyword) => {
                  try {
                    // return Keyword.create({
                    //   keywordId: customId({
                    //     name: keyword,
                    //   }),
                    //   value: keyword,
                    //   question: createdQuestion.dataValues.questionId,
                    // });
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
    })
    .then((questionObjects) => {
      res.status(201).json(
        questionObjects.map((questionObject) => ({
          ...questionObject.dataValues,
        }))
      );
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500; // serverSide error
      }
      next(err);
    });
};
