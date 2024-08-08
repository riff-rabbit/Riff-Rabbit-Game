const Challenge = require('../db/models/Challenge');
const { getAllChallenges, getChallenge, updateChallengeStatus } = require('../adapters/challenge-adapter');

exports.listChallenges = async (req, res) => {
    try {
        const challenges = await getAllChallenges();
        res.json(challenges);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createChallenge = async (req, res) => {
    const { challenger, responder, preset, rounds, status } = req.body;
    try {
        const challenge = await createChallenge({ challenger, responder, preset, rounds, status });
        res.json(challenge);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getChallengeById = async (req, res) => {
    const { id } = req.params;
    try {
        const challenge = await getChallenge(id);
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
        const challenge = await updateChallengeStatus({ id, status });
        res.json(challenge);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
