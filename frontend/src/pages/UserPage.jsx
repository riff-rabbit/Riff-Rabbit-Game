import React from "react";
import { useUserContext } from "../contexts/UserContext";

const UserPage = () => {
  const { user } = useUserContext();

  return (
    <div className="min-h-screen bg-ct-dark2 text-white flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-ct-light-grey rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">User Profile</h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-md"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">{user.displayName}</h2>
            <p className="text-lg mb-4">{user.email}</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Total Points:</span>
                <span className="font-semibold">{user.totalPoints}xp</span>
              </div>
              <div className="flex justify-between">
                <span>High Score:</span>
                <span className="font-semibold">{user.highScore}</span>
              </div>
              <div className="flex justify-between">
                <span>Games Played:</span>
                <span className="font-semibold">{user.gamesPlayed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage; 