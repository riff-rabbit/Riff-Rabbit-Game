import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-ct-dark-grey">
      <div className="flex flex-col items-center justify-center">
        <img
          className="w-24 mb-[-%] z-30 bobbing-head"
          src="../../public/head.png"
          alt="Head"
        />
        <img
          className="w-16"
          src="../../public/body.png"
          alt="Body"
        />
      </div>

      <div className="bg-ct-light-grey mx-9 rounded-2xl px-8 py-6 text-center flex flex-col items-center">
    <img src="../../public/Logo.svg" className='w-36' alt="" />
        <p className="text-white text-lg m-4">
          Create an account to get started
        </p>
        <button
          onClick={handleSignUp}
          className="bulge-on-hover p-3 rounded-xl bg-ct-light-purple text-white font-bold transition-all duration-300 hover:bg-ct-hover-purple"
          style={{
            border: "4px solid transparent",
            borderRadius: "12px",
            backgroundImage:
              "linear-gradient(to right, #13111D, #13111D), linear-gradient(to right, #47B6FF, #957FFF)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Welcome;
