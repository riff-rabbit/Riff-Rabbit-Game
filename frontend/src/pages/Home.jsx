import React from "react";
import { useNavigate } from "react-router-dom";
import GameSelectPanel from "../components/GameSelectPanel";
import Leaderboard from "../components/Leaderboard";
import { useSelectedPreset } from "../contexts/SelectedPresetContext";

export default function HomePage() {
  const { setSelectedPreset } = useSelectedPreset();
  const navigate = useNavigate();

  const onSelectPreset = (preset) => {
    setSelectedPreset(preset);
    navigate("/gameplay");
  };

  return (
    <>
      <div className="flex p-4 flex-col md:justify-evenly md:w-screen md:flex-row">
        <div className="buttons-and-game flex flex-col align-middle justify-center items-center">
          <div className="m-4 flex gap-2 text-ct-orange font-bold align-middle justify-center bg-ct-light-grey p-2 max-w-fit rounded-xl">
            <button
              className="bulge-on-hover relative p-2 rounded-xl"
              onClick={() => navigate("/users")}
              style={{
                border: "4px solid transparent",
                borderRadius: "12px",
                backgroundImage:
                  "linear-gradient(to right, #13111D, #13111D), linear-gradient(to right, #47B6FF, #957FFF)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              Friends
            </button>

            <button
              className="bulge-on-hover relative p-2 rounded-xl"
              onClick={() => navigate("/challenges")}
              style={{
                border: "4px solid transparent",
                borderRadius: "12px",
                backgroundImage:
                  "linear-gradient(to right, #13111D, #13111D), linear-gradient(to right, #47B6FF, #957FFF)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              Challenges
            </button>
          </div>

          <div className="md:w-1/2 flex flex-col align-middle justify-center items-center">
            <p className="bg-ct-light-grey rounded-full z-20 px-9 py-2 font-extrabold mb-[-7%]">
              Choose a game
            </p>
            <GameSelectPanel onSelectPreset={onSelectPreset} />
          </div>
        </div>

        <div className=" flex flex-col align-middle justify-center items-center">
          <img
            className="w-24 mb-[-1%] z-30 bobbing-head"
            src="../../public/head.png"
          />
          <img className="w-16" src="../../public/body.png" />

          <p className="bg-ct-light-grey rounded-full z-20 px-9 py-2 font-extrabold md:mb-[-3%] mb-[-7%]">
            Leaderboard
          </p>
          <Leaderboard />
        </div>
      </div>
    </>
  );
}
