const express = require('express');
const jobListingValidations = require('../validation/jobListingValidations');

const isAuth = require('../util/is-authenticated');

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

module.exports = router;
