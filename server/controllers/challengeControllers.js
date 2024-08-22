const Challenge = require('../db/models/Challenge');

exports.listChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.list();
        res.json(challenges);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createChallenge = async (req, res) => {
    const { challenger, responder, preset, rounds, status } = req.body;
    try {
        const challenge = await Challenge.create(challenger, responder, preset, rounds, status);
        res.json(challenge);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getChallengeById = async (req, res) => {
    const { id } = req.params;
    try {
        const challenge = await Challenge.find(id);
        if (challenge) {
            res.json(challenge);
        } else {
            res.status(404).json({ error: 'Challenge not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateChallengeStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedChallenge = await Challenge.updateChallengeStatus(id, status);
        if (updatedChallenge) {
            res.json(updatedChallenge);
        } else {
            res.status(404).json({ error: 'Challenge not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getIncomingChallenges = async (req, res) => {
    try {
        const incomingChallenges = await Challenge.findByResponder(req.session.userId);
        res.json(incomingChallenges);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};