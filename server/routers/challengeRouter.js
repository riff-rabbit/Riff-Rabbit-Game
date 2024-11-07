const express = require('express');
const challengeControllers = require('../controllers/challengeControllers');
const checkAuthentication = require('../middleware/checkAuthentication');

const challengeRouter = express.Router();

// Existing routes
challengeRouter.post('/', challengeControllers.createChallenge);
challengeRouter.get('/incoming', checkAuthentication, challengeControllers.getIncomingChallenges);
challengeRouter.get('/:id', checkAuthentication, challengeControllers.getChallengeById);
challengeRouter.get('/', checkAuthentication, challengeControllers.listChallenges);
challengeRouter.patch('/:id', challengeControllers.updateChallengeStatus);

// New route for updating the challenge result
challengeRouter.patch('/:id/result', challengeControllers.updateChallengeResult);

module.exports = challengeRouter;
