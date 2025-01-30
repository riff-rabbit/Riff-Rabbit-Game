import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GameOver = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { 
    gameName, 
    rounds, 
    correctAnswers, 
    totalPoints, 
    isMultiplayer,
    isWinner,
    isTie 
  } = location.state || {};

  const pointsEarned = correctAnswers * 10;
  const scorePercentage = ((correctAnswers / rounds) * 100).toFixed(2);

  return (
    <div className="flex flex-row items-center align-middle justify-center">
      <div className="flex flex-col md:w-[35vw] items-center justify-center p-6 bg-ct-light-grey text-white rounded-xl m-5 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Game Over</h1>
        
        {/* Show winner/loser message for multiplayer games */}
        {isMultiplayer && (
          <div className="text-2xl font-bold mb-4">
            {isTie ? (
              <span className="text-yellow-500">Tied</span>
            ) : isWinner ? (
              <span className="text-ct-light-green">You Won!</span>
            ) : (
              <span className="text-ct-orange">You Lost!</span>
            )}
          </div>
        )}

        <p className="text-lg">
          Game: <span className="text-orange-300">{gameName}</span>
        </p>
        <p className="text-lg">
          Rounds: <span className="text-orange-300">{rounds}</span>
        </p>
        <p className="text-lg">
          Correct Answers:{" "}
          <span className="text-orange-300">{correctAnswers}</span>
        </p>
        <p className="text-lg">
          Score: <span className="text-orange-300">{scorePercentage}%</span>
        </p>
        <p className="text-lg">
          Points Earned:{" "}
          <span className="text-ct-light-green">+{pointsEarned}xp</span>
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 py-2 px-4 bg-ct-light-blue hover:bg-ct-hover-blue text-white font-semibold rounded-lg shadow-md focus:outline-none transition-colors ease-in-out duration-300 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default GameOver;
