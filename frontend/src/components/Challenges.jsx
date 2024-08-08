import React, { useEffect, useState } from 'react';
import { fetchHandler } from '../utils';

const Challenges = () => {
    const [incomingChallenges, setIncomingChallenges] = useState([]);
    const [challengesMade, setChallengesMade] = useState([]);

    useEffect(() => {
        const fetchIncomingChallenges = async () => {
            const [responseData, error] = await fetchHandler('/api/challenges');

            if (error) {
                console.error('Error fetching incoming challenges:', error);
            } else {
                console.log('Incoming challenges:', responseData);
                setIncomingChallenges(responseData);
            }
        };

        const fetchChallengesMade = async () => {
            const [responseData, error] = await fetchHandler('/api/challenges');
            if (error) {
                console.error('Error fetching challenges made:', error);
            } else {
                console.log('Challenges made:', responseData);
                setChallengesMade(responseData);
            }
        };

        fetchIncomingChallenges();
        fetchChallengesMade();
    }, []);

    return (
        <div>
            <h1>Challenges</h1>
            <div>
                <h1>Incoming Challenges</h1>
                <ul>
                    {incomingChallenges.map((challenge) => (
                        <li key={challenge.id}>{challenge.status}{challenge.challenger}</li>
                    ))}
                </ul>
                <h1>You Challenged</h1>
                <ul>
                    {challengesMade.map((challenge) => (
                        <li key={challenge.id}>{challenge.status}{challenge.responder}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Challenges;