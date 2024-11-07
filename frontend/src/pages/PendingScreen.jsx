import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChallenge } from '../adapters/challenge-adapter';
import { getUser } from '../adapters/user-adapter';
import SunspotLoaderComponent from '../components/Loader';

const PendingScreen = () => {
  const { challenge_id } = useParams();
  const [otherUserName, setOtherUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallengeData = async () => {
      const challenge = await getChallenge(challenge_id);
      if (challenge) {
        const responderId = challenge.responder;
        const responderDetails = await getUser(responderId);
        if (responderDetails) {
          setOtherUserName(responderDetails.display_name);
        } else {
          setOtherUserName('Unknown User');
        }
      }
    };

    fetchChallengeData();
  }, [challenge_id]);

  return (
    <div className="flex flex-col items-center min-w-fit justify-center p-6 bg-ct-light-grey text-white rounded-xl m-5 shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Waiting for {otherUserName}</h1>
      <p className="text-lg mb-4">
        Waiting for {otherUserName} to join the game.
      </p>
      <SunspotLoaderComponent />
      <button
        className="bg-ct-dark-grey hover:bg-ct-hover-purple text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default PendingScreen;
