import React, { useEffect, useState, useContext } from "react";
import { fetchHandler } from "../utils";
import { useNavigate } from "react-router-dom";
import { useSelectedPreset } from "../contexts/SelectedPresetContext";
import { presets } from "../utils/gameLogic";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import './Challenges.css'; // Import the CSS file for custom styles

const Challenges = ({ users }) => {
  const [incomingChallenges, setIncomingChallenges] = useState([]);
  const [challengesMade, setChallengesMade] = useState([]);
  const navigate = useNavigate();
  const { setSelectedPreset } = useSelectedPreset();
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const fetchIncomingChallenges = async () => {
      const [responseData, error] = await fetchHandler(
        "/api/challenges/incoming"
      );

      if (error) {
        console.error("Error fetching incoming challenges:", error);
      } else {
        console.log("Incoming challenges:", responseData);
        // Sort challenges by created_at in descending order (newest first)
        const sortedChallenges = responseData.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        setIncomingChallenges(sortedChallenges);
      }
    };

    const fetchChallengesMade = async () => {
      const [responseData, error] = await fetchHandler("/api/challenges");
      if (error) {
        console.error("Error fetching challenges made:", error);
      } else {
        console.log("Challenges made:", responseData);
        // Sort challenges by created_at in descending order (newest first)
        const sortedChallenges = responseData.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        setChallengesMade(sortedChallenges);
      }
    };

    fetchIncomingChallenges();
    fetchChallengesMade();
  }, []);

  const goToChallenge = async (challenge, isOutgoing) => {
    const { rounds, preset, status, id: challenge_id } = challenge;
    setSelectedPreset(presets[preset]);

    if (status === 'completed') {
      navigate(`/completed-challenge/${challenge_id}`, { state: { rounds: JSON.parse(rounds), status } });
    } else if (status === 'pending') {
      if (isOutgoing) {
        // Outgoing pending challenge - navigate to PendingScreen
        navigate(`/pending-challenge/${challenge_id}`);
      } else {
        // Incoming pending challenge - navigate to Gameplay
        navigate("/Gameplay", { state: { rounds: JSON.parse(rounds), status, challenge_id } });
      }
    } else {
      // Handle other statuses if necessary
    }
  };

  const getChallengerName = (challengerId) => {
    if (!users) return "Unknown User";
    const user = users.find((user) => user.id === challengerId);
    return user ? user.display_name : "Unknown User";
  };

  const getResponderName = (responderId) => {
    if (!users) return "Unknown User";
    const user = users.find((user) => user.id === responderId);
    return user ? user.display_name : "Unknown User";
  };

  const determineOutcome = (challenge) => {
    if (challenge.status === "completed") {
      if (challenge.winner === currentUser.id) {
        return { text: "You won", className: "outcome-won" };
      } else if (challenge.winner === null) {
        return { text: "Tied", className: "outcome-tie" };
      } else {
        return { text: "You lost", className: "outcome-lost" };
      }
    }
    return { text: "Unplayed", className: "outcome-unplayed" };
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4">
      <div
        className="bg-ct-dark-grey md:w-[30vw] rounded-lg"
        style={{
          height: '60vh',
          overflowY: 'auto',
          backgroundImage:
            "linear-gradient(to right, #13111D, #13111D), linear-gradient(to right, #47B6FF, #957FFF)",
          border: "4px solid transparent",
          borderRadius: "12px",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <h1 className="font-bold p-3">Incoming Challenges</h1>
        <ul>
          {incomingChallenges.map((challenge) => {
            const outcome = determineOutcome(challenge);
            return (
              <li
                className="bulge-on-hover bg-ct-light-grey m-3 px-5 py-2 rounded-xl"
                onClick={() => goToChallenge(challenge, false)}
                key={challenge.id}
              >
                <span className="text-ct-orange font-medium">
                  {challenge.status.toUpperCase()}
                </span>{" "}
                {getChallengerName(challenge.challenger)} challenged you to{" "}
                <span className="text-ct-light-green font-semibold">
                  {presets[challenge.preset].name}
                </span>{" "}
                ▪ <span className={outcome.className}>{outcome.text}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="bg-ct-dark-grey md:w-[30vw] rounded-lg"
        style={{
          height: '60vh',
          overflowY: 'auto',
          backgroundImage:
            "linear-gradient(to right, #13111D, #13111D), linear-gradient(to right, #FFA500, #FFD700)",
          border: "4px solid transparent",
          borderRadius: "12px",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <h1 className="font-bold p-3">You Challenged</h1>
        <ul>
          {challengesMade.map((challenge) => {
            const outcome = determineOutcome(challenge);
            return (
              <li
                className="bulge-on-hover bg-ct-light-grey m-3 px-5 py-2 rounded-xl"
                onClick={() => goToChallenge(challenge, true)}
                key={challenge.id}
              >
                <span className="text-ct-orange font-medium">
                  {challenge.status.toUpperCase()}
                </span>{" "}
                You challenged {getResponderName(challenge.responder)} to{" "}
                <span className="text-ct-light-green font-semibold">
                  {presets[challenge.preset].name}
                </span>{" "}
                ▪ <span className={outcome.className}>{outcome.text}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Challenges;

