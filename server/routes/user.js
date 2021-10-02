const express = require('express');
const { body } = require('express-validator/check');

const userControllers = require('../controllers/user');

const router = express.Router();

router.post('/signup', userControllers.postSignup);

module.exports = router;