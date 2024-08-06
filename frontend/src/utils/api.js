// api.js
import axios from 'axios';

export const updateUserPoints = async (pointsEarned) => {
  try {
    const response = await axios.put('/api/users/update-points', { pointsEarned });
    return response.data.points; // Assuming the API returns the updated total points
  } catch (error) {
    console.error('Failed to update user points:', error);
    throw error; // Re-throw the error for further handling if needed
  }
};

