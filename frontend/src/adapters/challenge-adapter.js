// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";
const baseUrl = '/api/challenges';

export const createChallenge = async ({ challenger, responder, preset, rounds, status }) => {
    return fetchHandler(baseUrl, getPostOptions({ challenger, responder, preset, rounds, status }));
};

export const getAllChallenges = async () => {
  const [challenges, error] = await fetchHandler(baseUrl);
  if (error) console.log(error); // print the error for simplicity.
  return challenges || [];
};

export const getChallenge = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`);
}

export const updateChallengeStatus = async ({ id, status }) => {
  return fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, status }))
}