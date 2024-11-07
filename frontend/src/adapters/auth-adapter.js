import { fetchHandler, getPostOptions, deleteOptions } from "../utils";

const baseUrl = "/api";

export const checkForLoggedInUser = async () => {
  const [data] = await fetchHandler(`${baseUrl}/me`);
  return data;
};

export const logUserIn = async ({ username, password }) => {
  return fetchHandler(
    `${baseUrl}/login`,
    getPostOptions({ username, password })
  );
};

// the logout route pretty much can't fail with our setup, but if yours can, change this
export const logUserOut = async () => {
  await fetchHandler(`${baseUrl}/logout`, deleteOptions);
  return true;
};

// import { fetchHandler, getPostOptions, deleteOptions } from "../utils";
// import axios from "axios";

// const baseUrl = '/api';

// export const checkForLoggedInUser = async () => {
//   try {
//     const response = await axios.get('/api/me', {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with your method of storing the token
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching logged-in user:', error);
//     return null;
//   }
// };

// export const logUserIn = async ({ username, password }) => {
//   return fetchHandler(`${baseUrl}/login`, getPostOptions({ username, password }))
// };

// // the logout route pretty much can't fail with our setup, but if yours can, change this
// export const logUserOut = async () => {
//   try {
//     await axios.post('/api/logout');
//     // Optionally, handle any post-logout cleanup or redirection here
//   } catch (error) {
//     console.error('Error logging out:', error);
//   }
// };
