
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter"; 
import { logUserOut } from "../adapters/auth-adapter"; 
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import ChallengeButton from "../components/ChallengeButton";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);
  // console.log(currentUser);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      console.log(user);
      if (error) return setErrorText(error.message);
      setUserProfile(user);
    };

    loadUser();
  }, [id]);

  const handleLogout = async () => {
    await logUserOut();
    setCurrentUser(null);
    navigate('/');
  };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  const profileUsername = isCurrentUserProfile ? currentUser.username : userProfile.username;
  const profileDisplayName = isCurrentUserProfile ? currentUser.display_name : userProfile.display_name;
  const profileHighScore = userProfile ? userProfile.high_score : null;
  const profilePoints = userProfile ? userProfile.points : null;

  
  return (
    <>
      <h1>{profileUsername}</h1>
      {!!isCurrentUserProfile && <button onClick={handleLogout}>Log Out</button>}
      <p>Display Name: {profileDisplayName}</p>
      <p>High Score: {profileHighScore}</p>
      <p>Points: {profilePoints}</p>
        { !isCurrentUserProfile && <ChallengeButton/>}
      {isCurrentUserProfile && (
        <UpdateUsernameForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )}
    </>
  );
}
