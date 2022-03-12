const Interview = require('../models/interview');
const JobListing = require('../models/jobListing');
const Question = require('../models/question');

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
