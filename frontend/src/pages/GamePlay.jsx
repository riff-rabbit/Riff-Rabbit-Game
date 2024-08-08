// GamePlay.jsx
import React, { useEffect, useState } from "react";
import { generateGameRounds } from "../utils/gameLogic";
import { useSelectedPreset } from "../contexts/SelectedPresetContext";
import { intervals } from "../utils/gameLogic";
import { updateUserPoints } from "../adapters/user-adapter";
import { useNavigate } from "react-router-dom";
import Vex from "vexflow";
import { useRef } from "react";
import NoteRender from "../components/NoteRender";
import NotePlayer from "../components/NotePlayer";
import playSequence from "../utils/playSequence";

const GamePlay = () => {
  const VF = Vex.Flow;
  const { selectedPreset } = useSelectedPreset();
  const [currentRound, setCurrentRound] = useState(0);
  const [rounds, setRounds] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();
  const notationRef = useRef(null);

  useEffect(() => {
    if (selectedPreset) {
      const generatedRounds = generateGameRounds(selectedPreset);
      setRounds(generatedRounds);
      setTimeLeft(selectedPreset.secondsPerRound);
      console.log(generatedRounds);
    }
  }, [selectedPreset]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (currentRound < rounds.length) {
      // console.log("Out of time");
      handleNextRound();
    }
  }, [timeLeft, currentRound, rounds]);

  useEffect(() => {
    console.log('playing sound', rounds, currentRound)
    if (!rounds || !rounds[currentRound]) return;

    const {firstNote, secondNote} = rounds[currentRound];
    playSequence(firstNote, secondNote);
  }, [rounds, currentRound]);

  //! CURRENT ROUND DATA 

  const currentRoundData = rounds[currentRound];
  

  const handleAnswerClick = (answer) => {
    if (selectedAnswer !== null) return; // prevent changing answer
    setSelectedAnswer(answer);

    if (rounds[currentRound].correct === answer) {
      console.log(`Correct answer. Correct answers: ${correctAnswers}`);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      console.log(`Incorrect answer. Correct answers: ${correctAnswers}`);
    }
  };

  const handleNextRound = () => {
    setSelectedAnswer(null);
    if (currentRound < rounds.length - 1) {
      setCurrentRound(currentRound + 1);

      setTimeLeft(selectedPreset.secondsPerRound);
    } else {
      console.log(`Game over! Correct answers: ${correctAnswers}`);
      const pointsEarned = correctAnswers * 10;
      updateUserPoints(pointsEarned).then((totalPoints) => {
        console.log(totalPoints);
        navigate("/gameover", {
          state: {
            gameName: selectedPreset.name,
            rounds: selectedPreset.rounds,
            correctAnswers,
            pointsEarned,
            totalPoints,
          },
        });
      });
    }
  };

  if (!selectedPreset) return <div>No game selected.</div>;

  
  // console.log("🚀 ~ GamePlay ~ currentRoundData:", currentRoundData)

  return (
    <div>
      <h1>{selectedPreset.name}</h1>
      <h2>Round {currentRound + 1}</h2>
      <h3>
        First Note: {currentRoundData?.firstNote}, Second Note:{" "}
        {currentRoundData?.secondNote}
      </h3>
      <NoteRender roundNotes={currentRoundData} />
      <NotePlayer roundNotes={currentRoundData} />
      <div>
        {intervals.map((interval) => (
          <button
            key={interval}
            onClick={() => handleAnswerClick(interval)}
            disabled={selectedAnswer !== null}
          >
            {interval}
          </button>
        ))}
      </div>
      <div>
        {selectedAnswer && <button onClick={handleNextRound}>Next</button>}
      </div>
      <div>Time left: {timeLeft}s</div>
    </div>
  );
};

export default GamePlay;

GamePlay.jsx;
