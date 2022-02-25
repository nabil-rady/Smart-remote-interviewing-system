const express = require('express');
const jobListingValidations = require('../validation/jobListingValidations');

const isAuth = require('../utils/is-authenticated');

const jobListingControllers = require('../controllers/jobListing');

const router = express.Router();

/* 
    ALLOW ONLY AUTH USERS TO REACH THIS ROUTE
    router.get('/dashboard', isAuth, userControllers.theMethod);
*/

router.post(
  '/create',
  isAuth,
  jobListingValidations.postCreateListing,
  jobListingControllers.postCreateListing
);

router.get('/get-listings', isAuth, jobListingControllers.getUserListings);

router.get('/:listing_id', isAuth, jobListingControllers.getListing);

router.post(
  '/invite',
  isAuth,
  jobListingValidations.postInvite,
  jobListingControllers.postInvite
);

router.get(
  '/answers/:interview_id',
  isAuth,
  jobListingControllers.getInterviewAnswers
);

module.exports = router;
