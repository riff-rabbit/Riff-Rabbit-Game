import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createChallenge } from '../adapters/challenge-adapter';
import GameSelectPanel from './GameSelectPanel';
import { generateGameRounds, presets } from '../utils/gameLogic';
import CurrentUserContext from '../contexts/current-user-context';
import { useSelectedPreset } from '../contexts/SelectedPresetContext';

export default function ChallengeButton() {
  const [showPresetSelection, setShowPresetSelection] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext); 
  const { id: responderId } = useParams();
  const {setSelectedPreset} = useSelectedPreset();

  const handleChallengeCreation = async (preset) => {
    if (!currentUser) {
      console.error('User not logged in');
      return;
    }

    const rounds = generateGameRounds(preset);

    // Stringify the rounds array for storage
    const roundsStringified = JSON.stringify(rounds);

    const challengerId = currentUser.id;

    const [challenge, error] = await createChallenge({
      challenger: challengerId,
      responder: Number(responderId),
      preset: presets.indexOf(preset),
      rounds: roundsStringified,
      status: 'pending',
    });

    if (error) {
      console.error('Error creating challenge:', error);
    } else {
      console.log('Challenge created:', JSON.parse(challenge.rounds));
      // Navigate to the gameplay page
      setSelectedPreset(preset);
      navigate('/Gameplay', {state: {rounds, status: "pending"}});
    }
  };

  return (
    <div className='font-semibold flex items-center align-middle justify-center text-center flex-col p-4'>
      <button className='font-semibold m-3 p-4 flex items-center align-middle justify-center text-center' onClick={() => setShowPresetSelection(true)}
        style={{
          border: "4px solid transparent",
          borderRadius: "12px",
          backgroundImage:
            "linear-gradient(to right, #13111D, #13111D), linear-gradient(to right, #FFA500, #FFD700)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}>Challenge</button>
      {showPresetSelection && (
        <GameSelectPanel onSelectPreset={handleChallengeCreation} />
      )}
    </div>
  );
}
