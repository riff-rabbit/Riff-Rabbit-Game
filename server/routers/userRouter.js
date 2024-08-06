const express = require('express');
const userControllers = require('../controllers/userControllers');
const checkAuthentication = require('../middleware/checkAuthentication');

const userRouter = express.Router();

userRouter.post('/', userControllers.createUser);
userRouter.patch('/update-points', userControllers.updateUserPoints);
userRouter.get('/', checkAuthentication, userControllers.listUsers);
userRouter.get('/top5', checkAuthentication, userControllers.getTop5Users);
userRouter.get('/:id', checkAuthentication, userControllers.showUser);
userRouter.patch('/:id', checkAuthentication, userControllers.updateUser);

module.exports = userRouter;
