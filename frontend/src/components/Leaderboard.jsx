import React, { useEffect, useState } from "react";
import { fetchHandler } from "../utils";
import { basicFetchOptions } from "../utils/";

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

  const renderUser = (user, index) => (
    <div key={user.id}>
      {index + 1}. {user.display_name} - {user.points} points
    </div>
  );

  return (
    <div>
      <div className="gold">
        <h2>Gold</h2>
        {users.slice(0, 1).map(renderUser)}
      </div>
      <div className="silver">
        <h2>Silver</h2>
        {users.slice(1, 3).map(renderUser)}
      </div>
      <div className="brass">
        <h2>Brass</h2>
        {users.slice(3, 5).map(renderUser)}
      </div>
    </div>
  );
};

export default Leaderboard;
