import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [displayName, setDisplayName] = useState('');

  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    if (!username || !password || !displayName || !passwordConfirm) {
      return setErrorText('Please fill in all fields');
    }
    if (password !== passwordConfirm) {
      return setErrorText('Passwords do not match');
    }

    const [user, error] = await createUser({ username, password, displayName });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'passwordConfirm':
        setPasswordConfirm(value);
        break;
      case 'displayName':
        setDisplayName(value);
        break;
    }
  };

  return (
<>
  <div className="p-4 flex flex-col items-center align-middle justify-center">
    <form
      onSubmit={handleSubmit}
      className="bg-ct-light-grey border-0 flex flex-col items-center justify-center align-middle w-full md:w-[35vw] rounded-xl p-10"
      aria-labelledby="create-heading"
    >
      <h2 id="create-heading" className="text-center font-bold text-3xl mb-4 text-white">Create Account</h2>
      
      <div className="flex flex-col">
        <label htmlFor="displayName" className="font-bold text-ct-orange">Full Name</label>
        <input
          className="rounded-xl p-2 border-4 border-transparent bg-[#13111D] text-white focus:outline-none focus:border-ct-orange"
          autoComplete="name"
          type="text"
          id="displayName"
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="username" className="font-bold text-ct-orange">Username</label>
        <input
          className="rounded-xl p-2 border-4 border-transparent bg-[#13111D] text-white focus:outline-none focus:border-ct-orange"
          autoComplete="username"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="font-bold text-ct-orange">Password</label>
        <input
          className="rounded-xl p-2 border-4 border-transparent bg-ct-dark-grey text-white focus:outline-none focus:border-ct-orange"
          autoComplete="new-password"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password-confirm" className="font-bold text-ct-orange">Confirm Password</label>
        <input
          className="rounded-xl p-2 border-4 border-transparent bg-ct-dark-grey text-white focus:outline-none focus:border-ct-orange"
          autoComplete="new-password"
          type="password"
          id="password-confirm"
          name="passwordConfirm"
          onChange={handleChange}
          value={passwordConfirm}
        />
      </div>

      <button className="bg-ct-orange bulge-on-hover hover:bg-ct-light-blue text-white font-bold py-2 px-4 rounded-xl transition duration-150">
        Create Account
      </button>
    </form>

    {!!errorText && <p className="text-red-500 text-center">{errorText}</p>}
    <p className="text-white">Already have an account with us? <Link to="/login" className="text-ct-orange hover:text-ct-light-blue">Log in!</Link></p>
  </div>
</>

  );
}
