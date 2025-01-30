// GamePlay.jsx
import React, { useEffect, useState, useContext } from "react";
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
import { updateChallengeStatus } from "../adapters/challenge-adapter";
import { updateChallengeResult } from "../adapters/challenge-adapter";
import CurrentUserContext from "../contexts/current-user-context";

const GamePlay = () => {
  const VF = Vex.Flow;
  let { selectedPreset } = useSelectedPreset();
  const [currentRound, setCurrentRound] = useState(0);
  const [rounds, setRounds] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const navigate = useNavigate();
  const notationRef = useRef(null);
  const location = useLocation();
  const game = location.state?.rounds;
  const status = location.state?.status;
  const challenge_id = location.state?.challenge_id;
  console.log(location);

  const { currentUser } = useContext(CurrentUserContext);

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

  // const handleAnswerClick = (answer) => {
  //   playAudio()
  //   if (selectedAnswer !== null) return; // prevent changing answer
  //   setSelectedAnswer(answer);

  //   if (rounds[currentRound].correct === answer) {
  //     console.log(`Correct answer. Correct answers: ${correctAnswers}`);
  //     setCorrectAnswers(correctAnswers + 1);
  //   } else {
  //     console.log(`Incorrect answer. Correct answers: ${correctAnswers}`);
  //   }
  // };

  const handleAnswerClick = (answer) => {
    playAudio();
    if (selectedAnswer !== null) return; // Prevent changing answer
    setSelectedAnswer(answer);
  
    const correctInterval = rounds[currentRound].correct;
  
    if (correctInterval === answer) {
      console.log(`Correct answer. Correct answers: ${correctAnswers + 1}`);
      setCorrectAnswers(correctAnswers + 1);
      setFeedback("correct");
    } else {
      console.log(`Incorrect answer. Correct answers: ${correctAnswers}`);
      setFeedback("incorrect");
    }
  
    // Reset feedback after 1 second
    setTimeout(() => {
      setFeedback(null);
    }, 1000);
  };
  
  

const handleNextRound = async () => {
  setSelectedAnswer(null);

  if (currentRound < rounds.length - 1) {
    setCurrentRound(currentRound + 1);
    setTimeLeft(selectedPreset.secondsPerRound);
  } else {
    console.log(`Game over! Correct answers: ${correctAnswers}`);
    const pointsEarned = correctAnswers * 10;

    try {
      // Only perform challenge updates if in multiplayer mode
      if (challenge_id) {
        console.log('Updating challenge status...');
        await updateChallengeStatus(challenge_id, "completed");
        
        const challengerScore = correctAnswers;
        const responderScore = rounds.length - correctAnswers;
        
        console.log('Submitting challenge result...');
        const [updatedChallenge] = await submitChallengeResult(
          challenge_id,
          challengerScore,
          responderScore
        );

        console.log('Updated challenge:', updatedChallenge);

        // Get the winner information
        const isWinner = updatedChallenge.winner === currentUser.id;
        const isTie = updatedChallenge.winner === null;

        // Update user points
        const [updatedUser, error] = await updateUserPoints(pointsEarned);
        if (error) {
          console.error('Failed to update user points:', error);
        }

        navigate("/gameover", {
          state: {
            gameName: selectedPreset.name,
            rounds: selectedPreset.rounds,
            correctAnswers,
            pointsEarned,
            totalPoints: updatedUser ? updatedUser.points : null,
            status: game ? status : null,
            isMultiplayer: true,
            isWinner,
            isTie
          },
        });
        return;
      }

      console.log('Updating user points...');
      const [updatedUser, error] = await updateUserPoints(pointsEarned);
      if (error) {
        console.error('Failed to update user points:', error);
      }

      console.log('Updated user:', updatedUser);

      navigate("/gameover", {
        state: {
          gameName: selectedPreset.name,
          rounds: selectedPreset.rounds,
          correctAnswers,
          pointsEarned,
          totalPoints: updatedUser ? updatedUser.points : null,
          status: game ? status : null,
        },
      });
    } catch (err) {
      console.error('Error in handleNextRound:', err);

      // Ensure navigation to GameOver page even if errors occur
      navigate("/gameover", {
        state: {
          gameName: selectedPreset.name,
          rounds: selectedPreset.rounds,
          correctAnswers,
          pointsEarned,
          totalPoints: null,
          status: game ? status : null,
        },
      });
    }
  }
};




const submitChallengeResult = async (challengeId, challengerScore, responderScore) => {
  try {
    const [response, error] = await updateChallengeResult(
      challengeId,
      challengerScore,
      responderScore
    );
    if (error) {
      console.error("Failed to update challenge result:", error);
      return [null, error];
    } else {
      console.log("Challenge result updated successfully:", response);
      return [response, null];
    }
  } catch (error) {
    console.error("Error in submitting challenge result:", error);
    return [null, error];
  }
};




  if (!selectedPreset) return <div>No game selected.</div>;

  // console.log("🚀 ~ GamePlay ~ currentRoundData:", currentRoundData)

  const audio = new Audio('../../public/click.mp3')
  const playAudio = () => {
    audio.play()
  }



  return (
    <div className="flex flex-col align-middle justify-center items-center">
      <h1>{selectedPreset.name}</h1>

      <div className="flex gap-3">
        <h2 className="text-ct-orange font-semibold">Round {currentRound + 1}</h2>
        <div className="flex items-center justify-center">
          <img className="w-2 m-1" src="../../public/timer.svg" alt="" />
          {timeLeft}s
        </div>
      </div>

      {/* <h3>
        First Note: {currentRoundData?.firstNote}, Second Note:{" "}
        {currentRoundData?.secondNote}
      </h3> */}
      <div className="flex flex-col align-middle justify-center items-center">
        {/* <NoteRender roundNotes={currentRoundData} /> */}
        <NoteRender roundNotes={currentRoundData} feedback={feedback} />

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
      {/* <div className="grid md:grid-cols-6 grid-cols-2 gap-2 align-middle items-center justify-center">
        {intervals.map((interval) => (
          <button
            className="bulge-on-hover transition-colors ease-in-out duration-300 hover:bg-ct-hover-blue border-2 border-ct-orange flex flex-col justify-center items-center rounded-md p-4 h-16 text-center w-full "
            key={interval}
            onClick={() => handleAnswerClick(interval)}
            disabled={selectedAnswer !== null}
          >
            {interval}
          </button>
        ))}
      </div> */}
      <div className="grid md:grid-cols-6 grid-cols-2 gap-2 align-middle items-center justify-center">
  {intervals.map((interval) => (
    <button
      className="bulge-on-hover transition-colors ease-in-out duration-300 hover:bg-ct-hover-blue border-2 border-ct-orange flex flex-col justify-center items-center rounded-md p-4 h-16 text-center w-full"
      key={interval}
      onClick={() => handleAnswerClick(interval)}
      disabled={selectedAnswer !== null}
    >
      {interval}
    </button>
  ))}
</div>
    </div>
  );
};

export default GamePlay;

GamePlay.jsx;
