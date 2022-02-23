const express = require('express');

const candidateControllers = require('../controllers/candidate');

const router = express.Router();

router.get('/join/:invitation_code', candidateControllers.getJoinInterview);

router.post('/finish-interview', candidateControllers.postFinishInterview);

module.exports = router;
