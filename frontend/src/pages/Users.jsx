import { useContext, useEffect, useState } from "react";
import { getAllUsers, getUser } from "../adapters/user-adapter";
import { fetchHandler } from "../utils";
import UserLink from "../components/UserLink";
import CurrentUserContext from "../contexts/current-user-context";
import { getPatchOptions } from "../utils";
import Challenges from "../components/Challenges";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const addFriend = async (friendId) => {
    const newFriendsList = [...currentUser.friends, friendId];
    const [updatedUser, error] = await fetchHandler(
      `/api/users/${currentUser.id}`,
      getPatchOptions({ friends: newFriendsList })
    );
    if (!error) {
      setCurrentUser(updatedUser);
    } else {
      console.error(error);
    }
  };

  const removeFriend = async (friendId) => {
    const newFriendsList = currentUser.friends.filter((id) => id !== friendId);
    const [updatedUser, error] = await fetchHandler(
      `/api/users/${currentUser.id}`,
      getPatchOptions({ friends: newFriendsList })
    );
    if (!error) {
      setCurrentUser(updatedUser);
    } else {
      console.error(error);
    }
  };

  const friends = users.filter(
    (user) => currentUser && currentUser.friends.includes(user.id)
  );
  // const filteredUsers = searchTerm
  //   ? users.filter((user) => user.username.includes(searchTerm))
  //   : [];

  const filteredUsers = searchTerm
  ? users.filter(
      (user) => user.id !== currentUser.id && user.username.includes(searchTerm)
    )
  : [];


  return (
    <>
      <h1>Friends</h1>
      <ul>
        {friends.map((user) => (
          <li key={user.id}>
            <UserLink user={user} />
            <button onClick={() => removeFriend(user.id)}>Remove Friend</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user) => {
          if (currentUser && !currentUser.friends.includes(user.id)) {
            return (
              <li key={user.id}>
                <UserLink user={user} />
                <button onClick={() => addFriend(user.id)}>Add Friend</button>
              </li>
            );
          }
        })}
      </ul>
      <Challenges />
    </>
  );
}

