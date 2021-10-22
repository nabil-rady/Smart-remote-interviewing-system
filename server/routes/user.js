const express = require('express');
const userValidations = require('../validation/user');

const isAuth = require('../util/is-authenticated');

const userControllers = require('../controllers/user');

const router = express.Router();

/* 
    ALLOW ONLY AUTH USERS TO REACH THIS ROUTE
    router.get('/dashboard', isAuth, userControllers.theMethod);
*/

router.post(
  '/signup',
  userValidations.postSignupValidation,
  userControllers.postSignup
);
router.post(
  '/confirm-email',
  userValidations.postConfirmEmail,
  userControllers.postConfirmEmail
);
router.post(
  '/verify/',
  userValidations.postVerifyEmail,
  userControllers.postVerifyEmail
);
router.post('/login', userControllers.postLogin);
router.post('/logout', isAuth, userControllers.postLogOut);

// router.get('/:user_id', isAuth, userControllers.getInfo);
router.get('/:user_id', userControllers.getInfo); // just for testing

module.exports = router;
