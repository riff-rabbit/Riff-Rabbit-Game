// GamePlay.jsx
import React, { useEffect, useState } from "react";
import { generateGameRounds, presets } from "../utils/gameLogic";
import { useSelectedPreset } from "../contexts/SelectedPresetContext";
import { intervals } from "../utils/gameLogic";
import { updateUserPoints } from "../adapters/user-adapter";
import { useLocation, useNavigate } from "react-router-dom";
import Vex from "vexflow";
import { useRef } from "react";
import NoteRender from "../components/NoteRender";
import NotePlayer from "../components/NotePlayer";
import playSequence from "../utils/playSequence";

const GamePlay = () => {
  const VF = Vex.Flow;
  let { selectedPreset } = useSelectedPreset();
  const [currentRound, setCurrentRound] = useState(0);
  const [rounds, setRounds] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const navigate = useNavigate();
  const notationRef = useRef(null);
  const location = useLocation();
  const game = location.state?.rounds;
  const status = location.state?.status;
  console.log(location);

  useEffect(() => {
    if (selectedPreset) {
      const generatedRounds = game || generateGameRounds(selectedPreset);
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
    console.log("playing sound", rounds, currentRound);
    if (!rounds || !rounds[currentRound]) return;

    const { firstNote, secondNote } = rounds[currentRound];
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
            status: game ? status : null,
          },
        });
      });
    }
  };

  if (!selectedPreset) return <div>No game selected.</div>;

  // console.log("🚀 ~ GamePlay ~ currentRoundData:", currentRoundData)

  return (
    <div className="flex flex-col align-middle justify-center items-center">
      <h1>{selectedPreset.name}</h1>
      <h2>Round {currentRound + 1}</h2>
      {/* <h3>
        First Note: {currentRoundData?.firstNote}, Second Note:{" "}
        {currentRoundData?.secondNote}
      </h3> */}
      <div className="flex flex-col align-middle justify-center items-center">
        <NoteRender roundNotes={currentRoundData} />
      </div>
      <div>
        <div className="p-4 flex">
          <div className="m-3 bulge-on-hover hover:bg-ct-hover-purple bg-ct-light-purple transition-all ease-in-out  font-medium px-4 rounded-full">
            <NotePlayer roundNotes={currentRoundData} />
          </div>
          {selectedAnswer ? (
            <button
              className="m-3 bulge-on-hover bg-ct-light-purple hover:bg-ct-hover-purple opacity-100 transition-all duration-300 ease-in-out font-medium px-4 rounded-full"
              onClick={handleNextRound}
            >
              Next
            </button>
          ) : (
            <button
              className="m-3 bulge-on-hover bg-ct-light-purple opacity-25 transition-opacity duration-300 ease-in-out font-medium px-4 rounded-full"
              onClick={handleNextRound}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-6 grid-cols-2 gap-2 align-middle items-center justify-center">
        {intervals.map((interval) => (
          <button
            className="bulge-on-hover border-2 border-ct-orange flex flex-col justify-center items-center rounded-md p-4 h-16 text-center w-full "
            key={interval}
            onClick={() => handleAnswerClick(interval)}
            disabled={selectedAnswer !== null}
          >
            {interval}
          </button>
        ))}
      </div>
      <div className="my-4 flex items-center justify-center">
        Time left: {timeLeft}s
      </div>
    </div>
  );
};

export default GamePlay;

GamePlay.jsx;
