const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const customId = require('custom-id-new');

const User = require('../models/user');
const Question = require('../models/question');
const JobListing = require('../models/jobListing');
const Keyword = require('../models/keyword');
const Interview = require('../models/interview');
const Video = require('../models/video');
const Notification = require('../models/notification');
const Result = require('../models/result');

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
      err.statusCode = 402;
      throw err;
    }
    // create the job-listing
    const createdJob = await creator.createJobListing({
      positionName,
      expiryDate,
    });

    // craete the questions of the listing
    const questionObjects = await Promise.all(
      questions.map(async (question, index) => {
        try {
          const { statement, timeToThink, timeToAnswer } = question;
          const createdQuestion = await createdJob.createQuestion({
            order: index,
            statement,
            timeToThink,
            timeToAnswer,
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

module.exports.deleteListing = async (req, res, next) => {
  try {
    const userId = req.userId;
    const listingId = req.params.listing_id;

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
      err.statusCode = 402;
      throw err;
    }

    const jobListing = await JobListing.findOne({
      where: {
        jobListingId: listingId,
      },
    });

    // check if the listing exists
    if (!jobListing) {
      const err = new Error('Listing does not exist.');
      err.statusCode = 404;
      throw err;
    }
    // check if the user own the listing
    if (jobListing.dataValues.userId != userId) {
      const err = new Error('You cannot access a listing you do not own.');
      err.statusCode = 403;
      throw err;
    }

    await JobListing.destroy({
      where: {
        jobListingId: listingId,
      },
    });

    res.status(200).json({
      message: 'Joblisting deleted.',
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
      err.statusCode = 402;
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
      order: [['expiryDate', 'DESC']],
    });

    const returnedListings = jobListings.map((listing) => {
      const { Interviews, ...jobListing } = listing.dataValues;
      if (Interviews.length === 0) {
        jobListing.invitationsNumber = 0;
        jobListing.interviewsNumber = 0;
      } else {
        let finishedInterviews = 0;
        for (let interview of Interviews) {
          if (interview.dataValues.processed) {
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
      err.statusCode = 402;
      throw err;
    }

    // get the listing
    const jobListing = await JobListing.findOne({
      where: {
        jobListingId: listingId,
      },
    });

    // get the interviews
    const interviews = await Interview.findAll({
      where: {
        jobListingId: listingId,
      },
      order: [['avgRecommendation', 'DESC']],
    });

    // get the questions
    const questions = await Question.findAll({
      where: {
        jobListingId: listingId,
      },
      order: [['order', 'ASC']],
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
    const { ...returnedObject } = jobListing.dataValues;

    // attach questions with its keywords
    returnedObject.questions = [];
    for (let question of questions) {
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
    returnedObject.interviews = [];
    if (interviews.length === 0) {
      returnedObject.invitationsNumber = 0;
      returnedObject.interviewsNumber = 0;
    } else {
      let finishedInterviews = 0;
      for (let interview of interviews) {
        if (interview.dataValues.processed) {
          finishedInterviews++;
          returnedObject.interviews.push({ ...interview.dataValues });
        }
      }
      returnedObject.invitationsNumber = interviews.length;
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
      err.statusCode = 402;
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
      const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
          user: 'apikey',
          pass: process.env.sendgridTransportApiKey,
        },
      });

      // sending email with invitation code.
      const mail = await transporter.sendMail({
        to: candidate.email,
        from: process.env.vividlyGmail,
        subject: 'Interview invitaion.',
        html: `<h1>You have been invited for an interview about ${listing.dataValues.positionName}</h1>
             <p>Your invitation code is <b>${generatedCode}</b>, please submit you interview befor ${listing.dataValues.expiryDate}.</p>`,
      });
      console.log(mail);
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
      err.statusCode = 402;
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

    // check if the interview has been processed
    if (!interview.dataValues.processed) {
      const err = new Error(
        'interview has not submitted before, or answers has not processed yet'
      );
      err.statusCode = 403;
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
      avgScore: interview.dataValues.avgRecommendation,
      avgManualEvaluation: interview.dataValues.avgManualEvaluation,
      submitedAt: interview.dataValues.submitedAt,
      questions: [],
    };

    const questionObjects = await Question.findAll({
      where: {
        jobListingId: interview.dataValues.jobListingId,
      },
      order: [['order', 'ASC']],
      include: [
        {
          model: Result,
          where: {
            interviewId: interview.dataValues.interviewId,
          },
        },
        {
          model: Video,
          where: {
            interviewId: interview.dataValues.interviewId,
          },
        },
      ],
    });

    let questions = questionObjects.map((questionObject) => ({
      ...questionObject.dataValues,
    }));

    for (let question of questions) {
      console.log(question.Results[0].dataValues);
      returnedObject.questions.push({
        questionId: question.questionId,
        statement: question.statement,
        link: question.Video.dataValues.link,
        score: question.Results[0].dataValues.recommendation,
        manualEvaluation: question.Results[0].dataValues.manualEvaluation,
        openPose: question.Results[0].dataValues.openPose,
        emotions: {
          happy: question.Results[0].dataValues.happy,
          sad: question.Results[0].dataValues.sad,
          angry: question.Results[0].dataValues.angry,
          surprise: question.Results[0].dataValues.surprise,
          neutral: question.Results[0].dataValues.neutral,
        },
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

module.exports.postEvaluate = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(`Validation failed.`);
    error.statusCode = 422; // Validation error
    error.data = errors.array();
    return next(error);
  }
  try {
    const { interviewId } = req.params;
    const { evaluations } = req.body;
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
      err.statusCode = 402;
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

    // check if the user own the listing
    const jobListing = await JobListing.findOne({
      where: {
        jobListingId: interview.dataValues.jobListingId,
      },
    });
    if (jobListing.dataValues.userId != userId) {
      const err = new Error('You cannot access a listing you do not own.');
      err.statusCode = 403;
      throw err;
    }

    // Make sure that the results is created in DB
    const results = [];
    for (const e of evaluations) {
      const result = await Result.findOne({
        where: {
          interviewId,
          questionId: e.questionId,
        },
      });
      if (!result) {
        const error = new Error('A result is not found');
        error.statusCode = 404;
        throw error;
      }
      console.log(
        `Manual evaluation = ${e.evaluation} of type ${typeof e.evaluation}`
      );
      results.push({
        result,
        evaluation: e.evaluation.toFixed(2),
      });
    }

    // Save the reults
    let scores = 0;
    for (const r of results) {
      scores += Number(r.evaluation);
      r.result.manualEvaluation = r.evaluation;
      await r.result.save();
    }
    const avgManualEvaluation = (scores / results.length).toFixed(2);
    interview.avgManualEvaluation = avgManualEvaluation;
    console.log(
      `total score = ${scores}, num of questions = ${results.length}, avg evaluations = ${avgManualEvaluation}`
    );
    await interview.save();

    res.status(200).json({
      interviewId,
      avgManualEvaluation: interview.avgManualEvaluation,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // serverSide error
    }
    next(err);
  }
};

module.exports.getCandidates = async (req, res, next) => {
  try {
    const listingId = req.params.listing_id;
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
      err.statusCode = 402;
      throw err;
    }

    const jobListing = await JobListing.findOne({
      where: {
        jobListingId: listingId,
      },
    });

    // check if the listing exists
    if (!jobListing) {
      const err = new Error('JobListing is not found.');
      err.statusCode = 404;
      throw err;
    }

    // check if the user own the listing
    if (jobListing.dataValues.userId != userId) {
      const err = new Error('You cannot access a listing you do not own.');
      err.statusCode = 403;
      throw err;
    }

    const candidates = await Interview.findAll({
      where: {
        jobListingId: listingId,
      },
      attributes: [
        'interviewId',
        'name',
        'email',
        'phoneCode',
        'phoneNumber',
        'submitedAt',
        'processed',
      ],
      order: [['processed', 'DESC']],
    });

    const returnedCandidates = [];
    for (const candidate of candidates) {
      const { processed, submitedAt, ...candidateDetails } =
        candidate.dataValues;
      if (processed) {
        returnedCandidates.push({
          ...candidateDetails,
          finished: true,
          submitedAt,
        });
      } else {
        returnedCandidates.push({
          ...candidateDetails,
          finished: false,
          submitedAt: '',
        });
      }
    }

    res.status(200).json({
      candidates: returnedCandidates,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // serverSide error
    }
    next(err);
  }
};
