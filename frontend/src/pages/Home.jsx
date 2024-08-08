import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameSelectPanel from "../components/GameSelectPanel";
import Leaderboard from '../components/Leaderboard';
import { useSelectedPreset } from '../contexts/SelectedPresetContext';

export default function HomePage() {
  const { setSelectedPreset } = useSelectedPreset();
  const navigate = useNavigate();

  const onSelectPreset = (preset) => {
    setSelectedPreset(preset);
    navigate('/gameplay');
  };

  return (
    <>
      <p>Choose a game</p>
      <GameSelectPanel onSelectPreset={onSelectPreset} />
      <Leaderboard />
    </>
  );
}
