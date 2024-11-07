import React, { useEffect, useState } from "react";
import { fetchHandler } from "../utils";
import { basicFetchOptions } from "../utils/";
import { Cover } from "../components/Cover";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const [response, error] = await fetchHandler(
        "/api/users/top5",
        basicFetchOptions
      );
      if (error) {
        console.error("Failed to fetch leaderboard data:", error);
        return;
      }
      setUsers(response);
    };

    fetchLeaderboard();
  }, []);

  const renderUser = (user, index) => {
    let gradient;

    if (index === 0) {
      gradient = "linear-gradient(to right, #FFD700, #FFA500)"; // Gold
    } else if (index === 1 || index === 2) {
      gradient = "linear-gradient(to right, #C0C0C0, #B0C4DE)"; // Silver
    } else if (index === 3 || index === 4) {
      gradient = "linear-gradient(to right, #CD7F32, #8B4513)"; // Brass
    }

    return (
      <>
      <div
        className="relative font-semibold flex items-center my-4 justify-center w-56 justify-items-center h-14 rounded-xl"
        style={{
          border: "4px solid transparent",
          borderRadius: "40px",
          backgroundImage: `linear-gradient(to right, #13111D, #13111D), ${gradient}`,
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
        key={user.id}
      >
       <Cover> <div className="ml-7">{user.display_name} {user.points}xp</div></Cover>
      </div>
      </>
    );
  };

  return (
    <div className="bg-ct-light-grey  md:h-fit flex flex-col items-center justify-items-center rounded-xl p-4">
      {users.slice(0, 5).map(renderUser)}
    </div>
  );
};

export default Leaderboard;
