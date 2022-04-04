const filesRouter = require('express').Router();
const filesController = require('../controllers/files');
const { authEither, authClientSDKRequest } = require('../utils/authenticate');
const { checkAuthenticated } = require('../utils/userAuthentication');

filesRouter.get('/', authEither, checkAuthenticated, filesController.retrieveAll);
filesRouter.get('/:fileId', authEither, checkAuthenticated, filesController.retrieve);
filesRouter.post('/', authClientSDKRequest, checkAuthenticated, filesController.create);
filesRouter.delete('/:fileId', authEither, checkAuthenticated, filesController.remove);

module.exports = filesRouter;
