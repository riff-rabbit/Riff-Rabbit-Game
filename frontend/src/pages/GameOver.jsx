import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logUserOut } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";

const GameOver = ({
}) => {
  const location = useLocation();
  const {gameName, rounds, correctAnswers, totalPoints} = location.state || {};
  const pointsEarned = correctAnswers * 10;
  const navigate = useNavigate();
  const scorePercentage = ((correctAnswers / rounds) * 100).toFixed(2);

  return (
    <div>
      <h1>Game Over</h1>
      <p>Game: {gameName}</p>
      <p>Rounds: {rounds}</p>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Score: {scorePercentage}%</p>
      <p>Points Earned: +{pointsEarned}xp</p>
      <p>Total Points: {totalPoints[0].totalPoints}xp</p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default GameOver;