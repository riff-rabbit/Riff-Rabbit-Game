// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";
const baseUrl = '/api/users';

export const createUser = async ({ username, password, displayName }) => {
  return fetchHandler(baseUrl, getPostOptions({ username, password, displayName }))
};

export const getAllUsers = async () => {
  const [users, error] = await fetchHandler(baseUrl);
  if (error) console.log(error); // print the error for simplicity.
  return users || [];
};

export const getUser = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`);
}

export const updateUsername = async ({ id, username }) => {
  return fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }))
}

export const updateUserPoints = async (pointsEarned) => {
  return fetchHandler('/api/users/update-points', getPatchOptions({ pointsEarned }));
 
};