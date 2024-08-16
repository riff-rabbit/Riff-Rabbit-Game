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
        (user) =>
          user.id !== currentUser.id && user.username.includes(searchTerm)
      )
    : [];

  return (
    <div className="p-5 flex flex-col align-middle justify-center items-center">
      {/* <h1>Friends</h1> */}
      <input
        className="rounded-full text-ct-dark-grey font-medium px-3 py-1"
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

    <div>
      <ul>
        {filteredUsers.map((user) => {
          if (currentUser && !currentUser.friends.includes(user.id)) {
            return (
              <li className=" my-2 rounded-full flex items-center align-middle justify-between"  key={user.id}>
                <div className="bg-ct-light-grey w-full px-4 rounded-l-full py-2"><UserLink user={user} /></div>
                <button className="bg-ct-light-blue w-36 rounded-r-full px-4 py-2 hover:bg-ct-hover-blue transition-colors duration-300 ease-in-out" onClick={() => addFriend(user.id)}>Follow</button>
              </li>
            );
          }
        })}
      </ul>

      <ul>
        {friends.map((user) => (
          <li className=" my-2 rounded-full flex items-center align-middle justify-between" key={user.id}>
            <div className="bg-ct-light-grey w-full px-4 rounded-l-full py-2"><UserLink user={user} /></div>
            <button className="bg-ct-light-purple w-36 rounded-r-full px-4 py-2 hover:bg-ct-hover-purple transition-colors duration-300 ease-in-out" onClick={() => removeFriend(user.id)}>Unfollow</button>
          </li>
        ))}
      </ul>
      </div>

      <Challenges users={users}/>
    </div>
  );
}
