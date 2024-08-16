import React from "react";
import { useNavigate } from "react-router-dom";
import { presets } from "../utils/gameLogic";

const GameSelectPanel = ({ onSelectPreset }) => {
  const navigate = useNavigate(); // Correct variable naming

  const handleSelect = (presetName) => {
    const selectedPreset = presets.find((p) => p.name === presetName);
    onSelectPreset(selectedPreset);
    navigate("/GamePlay"); // Use navigate function correctly
  };

  return (
    <div className="bg-ct-light-grey w-full md:w-[50vw] mb-4 rounded-xl pt-10 grid md:grid-cols-3 grid-cols-2 p-4 gap-4">
      {presets.map((preset) => (
        <button
          className="bulge-on-hover relative min-w-fit min-h-fit h-48 rounded-xl"
          key={preset.name}
          onClick={() => handleSelect(preset.name)}
          style={{
            border: "4px solid transparent",
            borderRadius: "12px",
            backgroundImage:
              "linear-gradient(to right, #13111D, #13111D), linear-gradient(to right, #47B6FF, #957FFF)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          <div className="text-ct-orange font-bold text-sm p-2">{preset.name}</div>
          <div className="flex align-middle justify-center font-normal text-3xl gap-1">
            <img src="/public/timer.svg" alt="logo" width="30" height="auto" />{" "}
            {preset.secondsPerRound}s
          </div>
          <div className="text-ct-orange text-xs p-2">
            {preset.rounds} rounds{preset.startOnC && ", Locked first note"}
          </div>

          <div className="text-xs">Direction: {preset.direction}</div>
        </button>
      ))}
    </div>
  );
};

export default GameSelectPanel;
