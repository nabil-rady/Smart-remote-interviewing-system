const express = require('express');
const userValidations = require('../validation/user');

const isAuth = require('../utils/is-authenticated');

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

router.post('/login', userValidations.postLogin, userControllers.postLogin);

router.post(
  '/logout',
  isAuth,
  userValidations.postLogout,
  userControllers.postLogOut
);

module.exports = router;
