import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";
const baseUrl = '/api/challenges'; 

export const createChallenge = async ({ challenger, responder, preset, rounds, status }) => {
    return fetchHandler(baseUrl, getPostOptions({ challenger, responder, preset, rounds, status }));
};

export const getAllChallenges = async () => {
  const [challenges, error] = await fetchHandler(baseUrl);
  if (error) console.log(error); 
  return challenges || [];
};

// export const getChallenge = async (id) => {
//   const [challenge, error] = await fetchHandler(`${baseUrl}/${id}`);
//   if (error) console.log(error); 
//   return challenge || null;
// }

export const getChallenge = async (id) => {
  const [challenge, error] = await fetchHandler(`${baseUrl}/${id}`);
  if (error) {
    console.log('Error fetching challenge:', error);
    return null;
  }
  return challenge;
};

export const updateChallengeStatus = async (id, status) => {
  return fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ status })) 
}

// Added if 'getIncomingChallenges' endpoint requires an adapter
export const getIncomingChallenges = async () => {
  return fetchHandler(`${baseUrl}/incoming`);
}

export const updateChallengeResult = async (id, challengerScore, responderScore) => {
  return fetchHandler(
      `${baseUrl}/${id}/result`,
      getPatchOptions({ challengerScore, responderScore })
  );
};
