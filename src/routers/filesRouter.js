const filesRouter = require('express').Router();
const filesController = require('../controllers/files');
const { authEither, authClientSDKRequest } = require('../utils/authenticate');
const s3 = require('../aws/s3');

filesRouter.get('/', authEither, filesController.retrieveAll);
filesRouter.get('/:fileId', authEither, filesController.retrieve);
filesRouter.post('/', authClientSDKRequest, filesController.create);
filesRouter.delete('/:fileId', authEither, filesController.remove);

module.exports = filesRouter;
