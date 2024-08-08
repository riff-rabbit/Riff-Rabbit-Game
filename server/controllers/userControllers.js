const { isAuthorized } = require('../utils/auth-utils');
const User = require('../db/models/User');

exports.createUser = async (req, res) => {
  const { username, password, displayName } = req.body;

  // TODO: check if username is taken, and if it is what should you return?
  const user = await User.create(username, password, displayName);
  req.session.userId = user.id;

  res.send(user);
};

exports.listUsers = async (req, res) => {
  const users = await User.list();
  res.send(users);
};

exports.showUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.find(id); // Assuming `find` fetches all user fields
    if (!user) return res.sendStatus(404);

    res.send(user); // Ensure the user object includes high_score and points
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getTop5Users = async (req, res) => {
  try {
    const top5Users = await User.getTop5Users();
    res.json(top5Users);
  } catch (error) {
    console.error('Failed to fetch top 5 users:', error);
    res.status(500).send('Server error');
  }
};


exports.updateUserPoints = async (req, res) => {
  const { pointsEarned } = req.body;
  const userId = req.session.userId; // Assuming the user ID is stored in the session
  console.log('updating user points', userId, pointsEarned);

  try {
    // Retrieve the user from the database
    const user = await User.find(userId);
    if (!user) return res.status(404).send('User not found');

    // Calculate the new total points
    const newTotalPoints = (user.points || 0) + pointsEarned;

    // Update the user's points in the database
    const updatedUser = await User.updatePoints(userId, newTotalPoints);

    // Send the updated total points back to the client
    res.send({ totalPoints: updatedUser.points });
  } catch (error) {
    console.error('Error updating points:', error);
    res.status(500).send('Internal Server Error');
  }
};


exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, friends } = req.body;

  // Ensure users are logged in and authorized to perform this action
  if (!isAuthorized(id, req.session)) return res.sendStatus(403);

  // Create an object to hold the updates, ensuring we only update provided fields
  const updates = {};
  if (username) updates.username = username;
  if (friends) updates.friends = friends;

  try {
    // Assuming `User.update` is a method that can handle partial updates
    const updatedUser = await User.updateUser(id, updates);
    if (!updatedUser) return res.sendStatus(404);

    res.send(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

