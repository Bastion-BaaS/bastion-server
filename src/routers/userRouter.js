const userRouter = require('express').Router();
const userController = require('../controllers/user');
const { authAdminRequest, authEither } = require('../utils/authenticate');

userRouter.get('/', authAdminRequest, userController.retrieveAll);
userRouter.get('/:id', authAdminRequest, userController.retrieve);
userRouter.post('/', authEither, userController.create);
userRouter.put('/:id',authEither, userController.update);
userRouter.delete('/:id',authEither , userController.remove);

module.exports = userRouter;
