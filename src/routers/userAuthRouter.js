const userAuthRouter = require('express').Router();
const userAuthController = require('../controllers/userAuth');

userAuthRouter.post('/signup', userAuthController.signup);
userAuthRouter.post('/login', userAuthController.login);
userAuthRouter.post('/logout', userAuthController.logout);

module.exports = userAuthRouter;
