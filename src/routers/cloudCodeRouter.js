const cloudCodeRouter = require('express').Router();
const cloudCodeController = require('../controllers/cloudCode');
const { authClientSDKRequest, authAdminRequest } = require('../utils/authenticate');
const { checkAuthenticated } = require('../utils/userAuthentication');

cloudCodeRouter.get('/', authAdminRequest, cloudCodeController.retrieveAll);
cloudCodeRouter.get('/:ccfName/', authAdminRequest, cloudCodeController.retrieve);
cloudCodeRouter.post('/:ccfName/run', authClientSDKRequest, checkAuthenticated, cloudCodeController.run);
cloudCodeRouter.post('/:ccfName/created', authAdminRequest, cloudCodeController.create);
cloudCodeRouter.delete('/:ccfName', authAdminRequest, cloudCodeController.remove);

module.exports = cloudCodeRouter;
