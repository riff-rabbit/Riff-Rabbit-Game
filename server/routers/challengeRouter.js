const express = require('express');
const challengeControllers = require('../controllers/challengeControllers');
const checkAuthentication = require('../middleware/checkAuthentication');

const challengeRouter = express.Router();

// 2. update the getIncoming challenges adapater URL

challengeRouter.post('/', challengeControllers.createChallenge);
challengeRouter.get('/incoming', checkAuthentication, challengeControllers.getIncomingChallenges);

challengeRouter.get('/:id', checkAuthentication, challengeControllers.getChallengeById);
challengeRouter.get('/', checkAuthentication, challengeControllers.listChallenges);
challengeRouter.patch('/:id', challengeControllers.updateChallengeStatus);
module.exports = challengeRouter;