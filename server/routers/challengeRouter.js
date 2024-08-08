const express = require('express');
const challengeControllers = require('../controllers/challengeControllers');
const checkAuthentication = require('../middleware/checkAuthentication');

const challengeRouter = express.Router();

challengeRouter.get('/', checkAuthentication, challengeControllers.listChallenges);
challengeRouter.post('/', challengeControllers.createChallenge);
challengeRouter.get('/:id', checkAuthentication, challengeControllers.getChallengeById);
challengeRouter.patch('/:id', challengeControllers.updateChallengeStatus);
challengeRouter.get('/challenges', checkAuthentication, challengeControllers.getIncomingChallenges);
module.exports = challengeRouter;