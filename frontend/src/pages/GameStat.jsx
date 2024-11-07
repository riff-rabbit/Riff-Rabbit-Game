// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getChallenge } from '../adapters/challenge-adapter';
// import { getUser } from '../adapters/user-adapter';

// const GameStat = () => {
//     const [challenge, setChallenge] = useState(null);
//     const [challengerName, setChallengerName] = useState('');
//     const [responderName, setResponderName] = useState('');
//     const [winnerName, setWinnerName] = useState('');  // Add winnerName to state
//     const { challenge_id } = useParams();

//     useEffect(() => {
//         const fetchChallenge = async () => {
//             const fetchedChallenge = await getChallenge(challenge_id);
//             if (fetchedChallenge) {
//                 setChallenge(fetchedChallenge);
//                 console.log('Fetched Challenge:', fetchedChallenge);

//                 // Fetch the user details for both challenger and responder
//                 const challengerDetails = await getUser(fetchedChallenge.challenger);
//                 const responderDetails = await getUser(fetchedChallenge.responder);

//                 if (challengerDetails) {
//                     setChallengerName(challengerDetails.display_name);
//                 } else {
//                     setChallengerName('Challenger name not available');
//                 }

//                 if (responderDetails) {
//                     setResponderName(responderDetails.display_name);
//                 } else {
//                     setResponderName('Responder name not available');
//                 }

//                 // Fetch the winner's name if available
//                 if (fetchedChallenge.winner) {
//                     const winnerDetails = await getUser(fetchedChallenge.winner);
//                     setWinnerName(winnerDetails ? winnerDetails.display_name : "It's a tie!");
//                 } else {
//                     setWinnerName("It's a tie!");
//                 }
//             }
//         };

//         if (challenge_id) {
//             fetchChallenge();
//         }
//     }, [challenge_id]);

//     return (
//         <div className="flex flex-row items-center align-middle justify-center">
//             <div className="flex flex-col md:w-[35vw] items-center justify-center p-6 bg-ct-light-grey text-white rounded-xl m-5 shadow-lg">
//                 <h1 className="text-2xl font-bold mb-4">Game Statistics</h1>
//                 {challenge ? (
//                     <ul className="text-lg">
//                         <li className="mb-2">
//                             Challenge ID: <span className="text-orange-300">{challenge.id}</span>
//                         </li>
//                         <li className="mb-2 text-ct-light-purple">
//                             {challengerName} VS {responderName}
//                         </li>
//                         <li className="mb-2">
//                             Status: <span className="text-orange-300">{challenge.status}</span>
//                         </li>
//                         {challenge.status === "completed" && (
//                             <li className="mb-2">
//                                 Winner: <span className="text-green-400">
//                                     {winnerName}
//                                 </span>
//                             </li>
//                         )}
//                     </ul>
//                 ) : (
//                     <p className="text-lg text-orange-300">No challenge data found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };    

// export default GameStat;


// GameStat.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChallenge } from '../adapters/challenge-adapter';
import { getUser } from '../adapters/user-adapter';

const GameStat = () => {
  const [challenge, setChallenge] = useState(null);
  const [challengerName, setChallengerName] = useState('');
  const [responderName, setResponderName] = useState('');
  const [winnerName, setWinnerName] = useState('');
  const { challenge_id } = useParams();

  useEffect(() => {
    const fetchChallenge = async () => {
      const fetchedChallenge = await getChallenge(challenge_id);
      if (fetchedChallenge) {
        setChallenge(fetchedChallenge);
        console.log('Fetched Challenge:', fetchedChallenge);

        // Fetch the user details for both challenger and responder
        const challengerDetails = await getUser(fetchedChallenge.challenger);
        const responderDetails = await getUser(fetchedChallenge.responder);

        if (challengerDetails) {
          setChallengerName(challengerDetails.display_name);
        } else {
          setChallengerName('Challenger name not available');
        }

        if (responderDetails) {
          setResponderName(responderDetails.display_name);
        } else {
          setResponderName('Responder name not available');
        }

        // Fetch the winner's name if available
        if (fetchedChallenge.winner !== null) {
          const winnerDetails = await getUser(fetchedChallenge.winner);
          setWinnerName(winnerDetails ? winnerDetails.display_name : "Winner not found");
        } else {
          setWinnerName("It's a tie!");
        }
      }
    };

    if (challenge_id) {
      fetchChallenge();
    }
  }, [challenge_id]);

  return (
    <div className="flex flex-row items-center align-middle justify-center">
      <div className="flex flex-col md:w-[35vw] items-center justify-center p-6 bg-ct-light-grey text-white rounded-xl m-5 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Game Statistics</h1>
        {challenge ? (
          <ul className="text-lg">
            <li className="mb-2">
              Challenge ID: <span className="text-orange-300">{challenge.id}</span>
            </li>
            <li className="mb-2 text-ct-light-purple">
              {challengerName} VS {responderName}
            </li>
            <li className="mb-2">
              Status: <span className="text-orange-300">{challenge.status}</span>
            </li>
            {challenge.status === "completed" && (
              <li className="mb-2">
                Winner: <span className="text-green-400">
                  {winnerName}
                </span>
              </li>
            )}
          </ul>
        ) : (
          <p className="text-lg text-orange-300">No challenge data found.</p>
        )}
      </div>
    </div>
  );
};

export default GameStat;


