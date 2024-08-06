// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";

const baseUrl = '/api/users';

export const createUser = async ({ username, password, displayName }) => {
  return fetchHandler(baseUrl, getPostOptions({ username, password, displayName }))
};

// For this one adapter, if an error occurs, we handle it here by printing
// the error and return an empty array
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

// // These functions all take in a body and return an options object
// // with the provided body and the remaining options
// import { fetchHandler, getPostOptions, getPatchOptions } from "../utils";
// import axios from "axios";

// const baseUrl = '/api/users';

// export const createUser = async ({ username, password }) => {
//   return fetchHandler(baseUrl, getPostOptions({ username, password }))
// };

// // For this one adapter, if an error occurs, we handle it here by printing
// // the error and return an empty array
// export const getAllUsers = async () => {
//   const [users, error] = await fetchHandler(baseUrl);
//   if (error) console.log(error); // print the error for simplicity.
//   return users || [];
// };

// export const getUser = async (id) => {
//   try {
//     const response = await axios.get(`/api/users/${id}`);
//     console.log(response.data)
//     return [response.data, null];
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     return [null, error];
//   }
// };

// export const updateUsername = async ({ id, username }) => {
//   return fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, username }))
// }
