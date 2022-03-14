const Interview = require('../models/interview');
const JobListing = require('../models/jobListing');
const Question = require('../models/question');
const Video = require('../models/video');
const Keywords = require('../models/keyword');

const { PutObjectCommand } = require('@aws-sdk/client-s3');
const S3Client = require('../utils/s3');

const fs = require('fs');
const writeFile = require('util').promisify(fs.writeFile);

const publish = require('../utils/publish').publish;

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
    const { interviewId, questionId, video, lastVideo } = req.body;
    console.log(interviewId, video);
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

    // ********** UPLOAD TO AWS ************* //

    // const fileBuffer = new Buffer.from(video, 'base64');
    // const name = `${interviewId}-${new Date().getTime()}`;
    // await writeFile('./' + name + '.mp4', fileBuffer);

    // const params = {
    //   Bucket: 'sris',
    //   Key: name + '.mp4',
    //   Body: fileBuffer,
    // };

    // const results = await S3Client.send(new PutObjectCommand(params));
    // console.log(
    //   'Successfully created ' +
    //     params.Key +
    //     ' and uploaded it to ' +
    //     params.Bucket +
    //     '/' +
    //     params.Key
    // );
    //
    // ********************* //

    res.status(200).json({
      interviewId,
      questionId,
      lastVideo,
    });
    // return results;

    // UPLOAD TO AWS AND GET THE LINK

    // save the video
    // await Video.create({
    //   link: video,
    //   questionId,
    //   interviewId,
    // });
    // // get the question's keywords
    // const keywords = await Keywords.findAll({
    //   where:{
    //     questionId
    //   }
    // });

    // // but the video on the queue for AI
    // const videoToSend = {
    //   interviewId,
    //   questionId,
    //   link: video,
    //   keywords: keywords.map(keyword => keyword.dataValues.value),
    //   lastVideo
    // }

    // // publish the video to the message queue
    // await publish(videoToSend);
    // if (lastVideo) {
    //   // set the submission date
    //   interview.submitedAt = Date.now();
    //   await interview.save();
    // }
    return;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500; // serverSide error
    }
    next(err);
  }
};
