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
    console.log(Array.isArray(value));
    if (!Array.isArray(value)) {
      const obj = value;
      value = [];
      value.push(obj);
      const err = new Error('Questions must be an array');
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
        console.log(keyword.length);
        if (keyword.length === 0) {
          const err = new Error('Keywords length must be > 0.');
          throw err;
        }
      }
    }
    console.log(value);
    return true;
  }),
];

module.exports = {
  postCreateListing,
};
