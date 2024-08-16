import React, { useEffect, useState } from "react";
import { fetchHandler } from "../utils";
import { useNavigate } from "react-router-dom";
import { useSelectedPreset } from "../contexts/SelectedPresetContext";
import { presets } from "../utils/gameLogic";

const Challenges = ({ users }) => {
  const [incomingChallenges, setIncomingChallenges] = useState([]);
  const [challengesMade, setChallengesMade] = useState([]);
  const navigate = useNavigate();
  const { setSelectedPreset } = useSelectedPreset();

  useEffect(() => {
    const fetchIncomingChallenges = async () => {
      const [responseData, error] = await fetchHandler(
        "/api/challenges/incoming"
      );

      if (error) {
        console.error("Error fetching incoming challenges:", error);
      } else {
        console.log("Incoming challenges:", responseData);
        setIncomingChallenges(responseData);
      }
    };

    const fetchChallengesMade = async () => {
      const [responseData, error] = await fetchHandler("/api/challenges");
      if (error) {
        console.error("Error fetching challenges made:", error);
      } else {
        console.log("Challenges made:", responseData);
        setChallengesMade(responseData);
      }
    };

    fetchIncomingChallenges();
    fetchChallengesMade();
  }, []);

  const goToChallenge = ({ rounds, preset, status }) => {
    setSelectedPreset(presets[preset]);
    navigate("/Gameplay", { state: { rounds: JSON.parse(rounds), status } });
  };

  const getChallengerName = (challengerId) => {
    const user = users.find((user) => user.id === challengerId);
    return user ? user.display_name : "Unknown User";
  };

  const getResponderName = (responderId) => {
    const user = users.find((user) => user.id === responderId);
    return user ? user.display_name : "Unknown User";
  };

  return (
    <div className="flex md:flex-row align-middle justify-center items-center flex-col">
      {/* <h1 className='text-ct-orange'>Challenges</h1> */}
      <div className="flex flex-col md:flex-row gap-5">
        <div
          className="bg-ct-dark-grey md:w-[40vw] p-4 my-7 rounded-lg flex justify-center flex-col items-center"
          style={{
            border: "4px solid transparent",
            borderRadius: "12px",
            backgroundImage:
              "linear-gradient(to right, #13111D, #13111D), linear-gradient(to right, #47B6FF, #957FFF)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          <h1 className="font-bold">Incoming Challenges</h1>
          <ul>
            {incomingChallenges.map((challenge) => (
              <li
                className="bulge-on-hover bg-ct-light-grey m-3 px-5 py-2 rounded-xl"
                onClick={() =>
                  goToChallenge({
                    rounds: challenge.rounds,
                    preset: challenge.preset,
                    status: challenge.status,
                  })
                }
                key={challenge.id}
              >
                <span className="text-ct-orange font-medium">
                  {challenge.status.toUpperCase()}
                </span>{" "}
                {getChallengerName(challenge.challenger)} has challenged you to{" "}
                {presets[challenge.preset].name}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="bg-ct-dark-grey md:w-[40vw] p-4 my-7 rounded-lg flex justify-center flex-col"
          style={{
            border: "4px solid transparent",
            borderRadius: "12px",
            backgroundImage:
              "linear-gradient(to right, #13111D, #13111D), linear-gradient(to right, #FFA500, #FFD700)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          <h1 className="font-bold">You Challenged</h1>
          <ul>
            {challengesMade.map((challenge) => (
              <li
                className="bulge-on-hover bg-ct-light-grey m-3 px-5 py-2 rounded-xl"
                key={challenge.id}
              >
                <span className="text-ct-orange font-medium">
                  {challenge.status.toUpperCase()}
                </span>{" "}
                You challenged {getResponderName(challenge.responder)} to{" "}
                {presets[challenge.preset].name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
