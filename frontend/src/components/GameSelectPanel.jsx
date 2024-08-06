
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { presets } from '../utils/gameLogic';

const GameSelectPanel = ({ onSelectPreset }) => {
  const navigate = useNavigate(); // Correct variable naming

  const handleSelect = (presetName) => {
    const selectedPreset = presets.find(p => p.name === presetName);
    onSelectPreset(selectedPreset);
    navigate('/GamePlay'); // Use navigate function correctly
  };

  return (
    <div>
      {presets.map((preset) => (
        <button key={preset.name} onClick={() => handleSelect(preset.name)}>
          {preset.name}
          <div>Rounds: {preset.rounds}, Time per round: {preset.secondsPerRound}s</div>
          <div>Locked first note: {preset.startOnC ? 'Yes' : 'No'}, Direction: {preset.direction}</div>
        </button>
      ))}
    </div>
  );
};

export default GameSelectPanel;

