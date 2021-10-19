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
router.get('/confirm-email', isAuth, userControllers.getConfirmEmail);
router.get('/verify/:verifyToken', userControllers.getVerifyEmail);
router.post('/login', userControllers.postLogin);
router.post('/logout', isAuth, userControllers.postLogOut);

// router.get('/:user_id', isAuth, userControllers.getInfo);
router.get('/:user_id', userControllers.getInfo); // just for testing

module.exports = router;
