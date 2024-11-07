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
  const [showSettings, setShowSettings] = useState(false); // state to track button click
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser(id);
      if (!user) {
        setErrorText("Failed to fetch user");
        return;
      }
      setUserProfile(user);
    };

    loadUser();
  }, [id]);

  const handleLogout = async () => {
    await logUserOut();
    setCurrentUser(null);
    navigate("/");
  };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  const profileUsername = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;
  const profileDisplayName = isCurrentUserProfile
    ? currentUser.display_name
    : userProfile.display_name;
  const profileHighScore = userProfile ? userProfile.high_score : null;
  const profilePoints = userProfile ? userProfile.points : null;

  return (
    <div className="flex flex-col align-middle items-center justify-center p-4">
      <p className="font-bold text-ct-orange">{profileDisplayName}</p>
      <h1 className="text-xs bg-ct-dark-grey text-white p-2 rounded-lg">{profileUsername}</h1>

      <div
        className="bg-ct-light-blue flex flex-col align-middle items-center justify-center p-4 rounded-lg m-4"
        style={{
          border: "4px solid transparent",
          borderRadius: "12px",
          backgroundImage:
            "linear-gradient(to right, #13111D, #13111D), linear-gradient(to right, #47B6FF, #957FFF)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <p className="text-ct-orange">High Score: {profileHighScore}</p>
        <p className="text-white">Points: {profilePoints}</p>
        <div className="bulge-on-hover rounded-full">
          {!isCurrentUserProfile && <ChallengeButton />}
        </div>
      </div>

      {isCurrentUserProfile && (
        <>
          <button
            className="bulge-on-hover hover:text-ct-light-blue p-2 rounded-xl text-white font-normal"
            onClick={() => setShowSettings(!showSettings)}
          >
            Account Settings
          </button>

          {/* Conditionally render the UpdateUsernameForm */}
          {showSettings && (
            <UpdateUsernameForm
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
        </>
      )}

      {isCurrentUserProfile && (
        <button
          className="bulge-on-hover hover:text-ct-light-blue relative p-2 rounded-xl text-white font-normal"
          onClick={handleLogout}
        >
          Log Out
        </button>
      )}
    </div>
  );
}
