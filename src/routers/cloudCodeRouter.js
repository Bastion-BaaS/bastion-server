const cloudCodeRouter = require('express').Router();
const cloudCodeController = require('../controllers/cloudCode');
const { authClientSDKRequest, authAdminRequest } = require('../utils/authenticate');

cloudCodeRouter.get('/', authAdminRequest, cloudCodeController.retrieveAll);
cloudCodeRouter.get('/:ccfName/', authAdminRequest, cloudCodeController.retrieve);
cloudCodeRouter.post('/:ccfName/run', authClientSDKRequest, cloudCodeController.run);
cloudCodeRouter.post('/:ccfName/created', authAdminRequest, cloudCodeController.create);
cloudCodeRouter.delete('/:ccfName', authAdminRequest, cloudCodeController.remove);

module.exports = cloudCodeRouter;
