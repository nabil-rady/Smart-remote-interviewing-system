const Interview = require('../models/interview');
const JobListing = require('../models/jobListing');
const Question = require('../models/question');

const fs = require('fs');
const writeFile = require('util').promisify(fs.writeFile);

const publish = require('../utils/publish-upload-queue').publish;

module.exports.getJoinInterview = async (req, res, next) => {
  try {
    const code = req.params.invitation_code;

    // get the interview
    const interview = await Interview.findOne({
      where: {
        invitationCode: code,
      },
    });
    // check if the interview exists
    if (!interview) {
      const err = new Error(
        'The interview is not found, please enter the invitation code correctly.'
      );
      err.statusCode = 404;
      throw err;
    }

    // check if this interview has been started before
    // if (interview.dataValues.started) {
    //   const err = new Error('This interview has been started before');
    //   err.statusCode = 403;
    //   throw err;
    // }

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

module.exports.postSubmitVideo = async (req, res, next) => {
  try {
    const { interviewId, questionId, video, videoExtension, lastVideo } =
      req.body;

    // get the interview
    const interview = await Interview.findOne({
      where: {
        interviewId,
      },
    });
    // if the interview does not exist
    if (!interview) {
      const err = new Error('Interview not found');
      err.statusCode = 404;
      throw err;
    }

    // check if this interview has been submited before
    // if (interview.dataValues.submitedAt) {
    //   const err = new Error('This interview has been submited before');
    //   err.statusCode = 403;
    //   throw err;
    // }

    // ********** Save video ************* //
    if (videoExtension !== 'webm' && videoExtension !== 'mp4') {
      const err = new Error('Video extension must be either mp4 or webm');
      throw err;
    }

    const fileBuffer = new Buffer.from(video, 'base64');
    const name = `${interviewId}-${new Date().getTime()}`;
    await writeFile('./' + name + '.' + videoExtension, fileBuffer);
    console.log(fileBuffer);

    // publish to upload queue
    const videoToUpload = {
      interviewId,
      questionId,
      lastVideo,
      name,
      videoExtension,
    };
    await publish(videoToUpload);

    res.status(200).json({
      message: 'Video received.',
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // serverSide error
    }
    next(err);
  }
};
