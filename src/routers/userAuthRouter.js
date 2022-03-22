const userAuthRouter = require('express').Router();
const userAuthController = require('../controllers/userAuth');
const { authClientSDKRequest } = require('../utils/authenticate');

userAuthRouter.post('/signup', authClientSDKRequest, userAuthController.signup);
userAuthRouter.post('/login', authClientSDKRequest, userAuthController.login);
userAuthRouter.post('/logout', authClientSDKRequest, userAuthController.logout);

module.exports = userAuthRouter;
