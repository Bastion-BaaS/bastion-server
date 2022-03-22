const userRouter = require('express').Router();
const userController = require('../controllers/user');

// TO BE DELETED. THIS WILL BE HANDLED BY CREATE ROUTES LOGIC
userRouter.get('/', userController.retrieveAll);
userRouter.get('/:id', userController.retrieve);
userRouter.post('/', userController.create);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.remove);

module.exports = userRouter;
