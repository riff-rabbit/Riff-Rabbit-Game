import React from 'react';
import playSequence from '../utils/playSequence';

const NotePlayer = ({roundNotes}) => {
  
const handlePlay = () => {
    playSequence(roundNotes.firstNote , roundNotes.secondNote);
  };

  return (
    <div>
      <button onClick={handlePlay}>Play Sequence</button>
    </div>
  );
};

export default NotePlayer;
