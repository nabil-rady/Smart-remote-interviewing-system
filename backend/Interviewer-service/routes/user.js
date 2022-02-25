const express = require('express');
const userValidations = require('../validation/user');

const isAuth = require('../utils/is-authenticated');

const userControllers = require('../controllers/user');

const router = express.Router();

/* 
    ALLOW ONLY AUTH USERS TO REACH THIS ROUTE
    router.get('/dashboard', isAuth, userControllers.theMethod);
*/

// router.get('/:user_id', isAuth, userControllers.getInfo);
router.get('/:user_id', userControllers.getInfo); // just for testing

router.put(
  '/edit',
  isAuth,
  userValidations.putEditProfile,
  userControllers.putEditProfile
);

router.put(
  '/changepassword',
  isAuth,
  userValidations.putChangePassword,
  userControllers.putChangePassword
);

module.exports = router;
