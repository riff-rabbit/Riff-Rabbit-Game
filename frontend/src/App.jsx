// import { useContext, useEffect } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import Home from "./pages/Home";
// import SignUpPage from "./pages/SignUp";
// import LoginPage from "./pages/Login";
// import SiteHeadingAndNav from "./components/SiteHeadingAndNav";
// import NotFoundPage from "./pages/NotFound";
// import UserContext from "./contexts/current-user-context";
// import { checkForLoggedInUser } from "./adapters/auth-adapter";
// import UsersPage from "./pages/Users";
// import UserPage from "./pages/User";
// import GamePlay from "./pages/GamePlay";
// import { SelectedPresetProvider } from "./contexts/SelectedPresetContext";
// import GameOver from "./pages/GameOver";
// import "./index.css";
// import ChallengesPage from "./pages/ChallengesPage";
// import GameStat from "./pages/GameStat";
// import Welcome from "./pages/Welcome";

// export default function App() {
//   const { setCurrentUser } = useContext(UserContext);
//   useEffect(() => {
//     checkForLoggedInUser().then(setCurrentUser);
//   }, [setCurrentUser]);

//   return (
//     <>
//       <SiteHeadingAndNav />
//       <main className="flex flex-col">
//         <SelectedPresetProvider>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/welcome" element={<Welcome />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/sign-up" element={<SignUpPage />} />
//             <Route path="/users" element={<UsersPage />} />
//             <Route path="/users/:id" element={<UserPage />} />
//             <Route path="/gameplay" element={<GamePlay />} />
//             <Route path="/gameover" element={<GameOver />} />
//             <Route path="*" element={<NotFoundPage />} />
//             <Route path="/challenges" element={<ChallengesPage />} />
//             <Route
//               path="/completed-challenge/:challenge_id"
//               element={<GameStat />}
//             />
//           </Routes>
//         </SelectedPresetProvider>
//       </main>
//     </>
//   );
// }

import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import SiteHeadingAndNav from "./components/SiteHeadingAndNav";
import NotFoundPage from "./pages/NotFound";
import UserContext from "./contexts/current-user-context";
import { checkForLoggedInUser } from "./adapters/auth-adapter";
import UsersPage from "./pages/Users";
import UserPage from "./pages/User";
import GamePlay from "./pages/GamePlay";
import { SelectedPresetProvider } from "./contexts/SelectedPresetContext";
import GameOver from "./pages/GameOver";
import "./index.css";
import ChallengesPage from "./pages/ChallengesPage";
import GameStat from "./pages/GameStat";
import Welcome from "./pages/Welcome";
import PendingScreen from "./pages/PendingScreen";

export default function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    checkForLoggedInUser().then(user => {
      setCurrentUser(user);
      // If no user and not on sign-up/login, redirect to welcome page
      if (!user && !['/login', '/sign-up'].includes(window.location.pathname)) {
        navigate('/welcome');  // Redirect to Welcome if no user is logged in
      }
    });
  }, [setCurrentUser, navigate]);

  return (
    <>
      {currentUser && <SiteHeadingAndNav />}
      <main className="flex flex-col">
        <SelectedPresetProvider>
          <Routes>
            <Route path="/" element={currentUser ? <Home /> : <Welcome />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/gameplay" element={<GamePlay />} />
            <Route path="/gameover" element={<GameOver />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/pending-challenge/:challenge_id" element={<PendingScreen />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route
              path="/completed-challenge/:challenge_id"
              element={<GameStat />}
            />
          </Routes>
        </SelectedPresetProvider>
      </main>
    </>
  );
}

