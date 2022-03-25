const { body } = require('express-validator');

const postCreateListing = [
  body('positionName', 'Invalid positionName.').trim().isLength({
    min: 1,
    max: 255,
  }),
  body('expiryDate', 'Please enter an upcoming date.')
    .trim()
    .isLength({
      min: 10,
      max: 255,
    })
    .custom((value) => {
      const currentDate = new Date();
      const expiryDate = new Date(value);
      if (currentDate >= expiryDate) {
        return false;
      } else {
        return true;
      }
    }),
  body('questions').custom((value) => {
    if (!Array.isArray(value)) {
      const err = new Error('Questions must be an array');
      throw err;
    }
    if (value.length === 0) {
      const err = new Error('Questions array can not be empty');
      throw err;
    }
    for (let question of value) {
      if (question.statement.length === 0) {
        const err = new Error("Question's statement length must be > 0.");
        throw err;
      }
      if (question.timeToThink <= 0) {
        const err = new Error('Time to think must be > 0.');
        throw err;
      }
      if (question.timeToAnswer <= 0) {
        const err = new Error('Time to answer must be > 0.');
        throw err;
      }
      if (typeof question.keywords === 'string') {
        question.keywords = [question.keywords];
      }
      for (const keyword of question.keywords) {
        if (keyword.length === 0) {
          const err = new Error('Keywords length must be > 0.');
          throw err;
        }
      }
    }
    return true;
  }),
];

const postInvite = [
  body('listingId', 'Listing id is not correct.').custom((value) => {
    if (value.length !== 36) {
      return false;
    }
    return true;
  }),
  body('candidates').custom((value) => {
    if (!Array.isArray(value)) {
      const err = new Error('Candidates must be an array');
      throw err;
    }
    if (value.length === 0) {
      const err = new Error('Candidates array can not be empty');
      throw err;
    }
    for (let candidate of value) {
      if (candidate.name.length === 0) {
        const err = new Error("Candidate's name length must be > 0.");
        throw err;
      }
      if (candidate.email.length === 0) {
        const err = new Error("Candidate's email length must be > 0.");
        throw err;
      }
      if (candidate.phoneCode.length < 2 || candidate.phoneCode.length > 5) {
        const err = new Error(
          "Candidate's phoneCode should be between 2 and 5 characters length."
        );
        throw err;
      }
      const phoneNumber = candidate.phoneNumber.toString();
      if (phoneNumber.length < 7 || phoneNumber.length > 15) {
        const err = new Error(
          "Candidate's phoneNumber should be between 7 and 15 characters length."
        );
        throw err;
      }
      for (let num of phoneNumber) {
        if (num < '0' || num > '9') {
          const err = new Error(
            "Candidate's phoneNumber should contain numbers only."
          );
          throw err;
        }
      }
    }
    return true;
  }),
];

const postEvaluate = [
  body('evaluations').custom((value) => {
    for (const e of value) {
      // check for valid Id
      if (e.questionId.length !== 36) {
        const err = new Error('Incorrect questionId');
        throw err;
      }
      // Check for a repetition of quetionId
      for (const eSecond of value) {
        if (e !== eSecond && e.questionId === eSecond.questionId) {
          const err = new Error('Repeated questionId');
          throw err;
        }
      }
    }
    return true;
  }),
];

module.exports = {
  postCreateListing,
  postInvite,
  postEvaluate,
};
