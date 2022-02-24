const Interview = require('../models/interview');
const JobListing = require('../models/jobListing');
const Question = require('../models/question');
const Video = require('../models/video');
const Keywords = require('../models/keyword');
const rabbitMQ = require('../utils/rabbitMQ');

module.exports.getJoinInterview = async (req, res, next) => {
  const code = req.params.invitation_code;

  try {
    // get the interview
    const interview = await Interview.findOne({
      where: {
        invitationCode: code,
      },
    });
    // check if the interview exists
    if (!interview){
      const err = new Error('The interview is not found, please enter the invitation code correctly.');
      err.statusCode = 404;
      throw err;
    }

    // check if this interview has been started before
    if (interview.dataValues.started) {
      const err = new Error('This interview has been started before');
      err.statusCode = 403;
      throw err;
    }

    interview.started = true; // start the interview
    await interview.save();

    // get the listing
    const jobListing = await JobListing.findOne({
      where: {
        jobListingId: interview.dataValues.jobListingId,
      },
    });

    // get the listing's questions
    const questionObjects = await Question.findAll({
      where: {
        jobListingId: interview.dataValues.jobListingId,
      },
    });

    let questions = questionObjects.map((questionObject) => ({
      ...questionObject.dataValues,
    }));

    // construct the object
    const returnedObject = {
      ...interview.dataValues,
      ...jobListing.dataValues,
      questions,
    };

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

module.exports.postFinishInterview = async (req, res, next) => {
  const { interviewId, videos } = req.body;

  try {
    const interview = await Interview.findOne({
      where: {
        interviewId,
      },
    });

    // check if this interview has been submited before
    if (interview.dataValues.submitedAt) {
      const err = new Error('This interview has been submited before');
      err.statusCode = 403;
      throw err;
    }
    
    let interviewToPublish = {
      interviewId: interviewId,
      questions: []
    };
    const answers = [];
    
    // save the video answers
    for (const video of videos) {
      const createdVideo = await Video.create({
        link: video.videoLink,
        questionId: video.questionId,
        interviewId: interviewId,
      });
      const keywords = await Keywords.findAll({
        where: {
          questionId: video.questionId
        }
      });
      answers.push(createdVideo.dataValues);
      interviewToPublish.questions.push({
        questionId: video.questionId,
        videoLink: video.videoLink,
        keywords: keywords.map(k =>{
          return k.value;
        })
      });
    }
    
    console.log(interviewToPublish);

    // set the submission date
    interview.submitedAt = Date.now();
    await interview.save();

    // publish the interview to the message queue
    await rabbitMQ.publish(interviewToPublish);

    res.status(200).json({
      interview,
      answers,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // serverSide error
    }
    next(err);
  }
};
