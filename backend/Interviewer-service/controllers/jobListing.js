const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const customId = require('custom-id');
const { json } = require('body-parser');
const sequelize = require('../utils/db');
const Op = require('sequelize').Op;

const User = require('../models/user');
const Question = require('../models/question');
const JobListing = require('../models/jobListing');
const Keyword = require('../models/keyword');
const Interview = require('../models/interview');
const Video = require('../models/video');
const Notification = require('../models/notification');

module.exports.postCreateListing = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(`Validation failed.`);
    error.statusCode = 422; // Validation error
    error.data = errors.array();
    return next(error);
  }

  try {
    const creatorId = req.userId;
    const { positionName, expiryDate, questions } = req.body;
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
  try {
    const userId = req.userId;

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
      include: [
        {
          model: Interview,
        },
      ],
    });

    const returnedListings = jobListings.map((listing) => {
      const { Interviews, ...jobListing } = listing.dataValues;
      if (Interviews.length === 0) {
        jobListing.invitationsNumber = 0;
        jobListing.interviewsNumber = 0;
      } else {
        let finishedInterviews = 0;
        for (let interview of Interviews) {
          if (interview.dataValues.submitedAt) {
            finishedInterviews++;
          }
        }

        jobListing.invitationsNumber = Interviews.length;
        jobListing.interviewsNumber = finishedInterviews;
      }
      return jobListing;
    });

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
  try {
    const userId = req.userId;
    const listingId = req.params.listing_id;

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
      include: [
        {
          model: Interview,
          where: {
            submitedAt: {
              [Op.not]: null,
            },
          },
        },
        {
          model: Question,
        },
      ],
    });

    // check if the listing exists
    if (!jobListing) {
      const err = new Error('Listing is not found.');
      err.statusCode = 404;
      throw err;
    }

    // check if the user own the listing
    if (jobListing.dataValues.userId != userId) {
      const err = new Error('You cannot access a listing you do not own.');
      err.statusCode = 403;
      throw err;
    }

    // construct the object
    const { Interviews, Questions, ...returnedObject } = jobListing.dataValues;

    // attach questions with its keywords
    returnedObject.questions = [];
    for (let question of Questions) {
      const keywords = await Keyword.findAll({
        where: {
          questionId: question.dataValues.questionId,
        },
      });
      returnedObject.questions.push({
        ...question.dataValues,
        keywords: keywords.map((keyword) => {
          return keyword.dataValues.value;
        }),
      });
    }

    // attach interviews
    if (Interviews.length === 0) {
      returnedObject.invitationsNumber = 0;
      returnedObject.interviewsNumber = 0;
    } else {
      let finishedInterviews = 0;
      for (let interview of Interviews) {
        if (interview.dataValues.submitedAt) {
          finishedInterviews++;
          if (returnedObject.interviews) {
            returnedObject.interviews.push({ ...interview.dataValues });
          } else {
            returnedObject.interviews = [];
            returnedObject.interviews.push({ ...interview.dataValues });
          }
        }
      }
      returnedObject.invitationsNumber = Interviews.length;
      returnedObject.interviewsNumber = finishedInterviews;
    }

    // send the response
    res.status(200).json({
      ...returnedObject,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // serverSide error
    }
    next(err);
  }
};

module.exports.postInvite = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(`Validation failed.`);
    error.statusCode = 422; // Validation error
    error.data = errors.array();
    return next(error);
  }

  try {
    const userId = req.userId;
    const { listingId, candidates } = req.body;

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

    // get the listing
    const listing = await JobListing.findOne({
      where: {
        jobListingId: listingId,
      },
    });
    if (!listing) {
      // check if the listing does not exist.
      const error = new Error('Listing not found');
      error.statusCode = 404;
      throw error;
    }

    // create interview, and send invitation to each candidate
    for (let candidate of candidates) {
      // create the invitation code.
      let fetchedCode, generatedCode;

      // check if the candidate has a prev invitation.
      const prevInterview = await Interview.findOne({
        where: {
          email: candidate.email,
          jobListingId: listingId,
        },
      });
      if (prevInterview) {
        continue;
      }

      do {
        generatedCode = customId({
          name: candidate.name,
          email: candidate.email,
        });
        fetchedCode = await Interview.findOne({
          // fetch this generated id
          attributes: ['interviewId'],
          where: {
            invitationCode: generatedCode,
          },
        });
      } while (fetchedCode !== null);

      // create an interview
      const interview = await listing.createInterview({
        name: candidate.name,
        email: candidate.email,
        phoneCode: candidate.phoneCode,
        phoneNumber: candidate.phoneNumber,
        invitationCode: generatedCode,
      });

      // send the invitation code
      // create a transporter with the mailing service.
      const transporter = nodemailer.createTransport(
        sendgridTransport({
          auth: {
            api_key: process.env.sendgridTransportApiKey,
          },
        })
      );
      // sending email with invitation code.
      const mail = await transporter.sendMail({
        to: candidate.email,
        from: 'vividlyinterviewing@gmail.com',
        subject: 'Interview invitaion.',
        html: `<h1>You have been invited for an interview about ${listing.dataValues.positionName}</h1>
             <p>Your invitation code is <b>${generatedCode}</b>, please submit you interview befor ${listing.dataValues.expiryDate}.</p>`,
      });
    }

    res.status(200).json({
      message: 'Invitaions have been sent successfully',
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // serverSide error
    }
    next(err);
  }
};

module.exports.getInterviewAnswers = async (req, res, next) => {
  try {
    const interviewId = req.params.interview_id;
    const userId = req.userId;

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

    const interview = await Interview.findOne({
      where: {
        interviewId: interviewId,
      },
    });

    // check if the interview exists
    if (!interview) {
      const err = new Error('interview is not found.');
      err.statusCode = 404;
      throw err;
    }

    const notification = await Notification.findOne({
      where: {
        userId,
        interviewId,
      },
    });

    if (notification && !notification.dataValues.read) {
      notification.read = true;
      await notification.save();
    }

    const jobListing = await JobListing.findOne({
      where: {
        jobListingId: interview.dataValues.jobListingId,
      },
    });

    // check if the user own the listing
    if (jobListing.dataValues.userId != userId) {
      const err = new Error('You cannot access a listing you do not own.');
      err.statusCode = 403;
      throw err;
    }

    // get the answers
    let returnedObject = {
      name: interview.dataValues.name,
      email: interview.dataValues.email,
      phoneCode: interview.dataValues.phoneCode,
      phoneNumber: interview.dataValues.phoneNumber,
      submitedAt: interview.dataValues.submitedAt,
      questions: [],
    };

    const questionObjects = await Question.findAll({
      where: {
        jobListingId: interview.dataValues.jobListingId,
      },
    });
    console.log(questionObjects);

    let questions = questionObjects.map((questionObject) => ({
      ...questionObject.dataValues,
    }));

    for (let question of questions) {
      const video = await Video.findOne({
        where: {
          questionId: question.questionId,
        },
      });

      returnedObject.questions.push({
        statement: question.statement,
        link: video.dataValues.link,
      });
    }

    res.status(200).json({
      ...returnedObject,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // serverSide error
    }
    next(err);
  }
};
