const collectionsRouter = require('express').Router();
const collectionsController = require('../controllers/collections');
const { authClientSDKRequest, authAdminRequest } = require('../utils/authenticate');

collectionsRouter.get('/', authAdminRequest, collectionsController.retrieveAll);
collectionsRouter.get('/:collectionName', authAdminRequest, collectionsController.retrieve);
collectionsRouter.post('/', authAdminRequest, collectionsController.create);
collectionsRouter.delete('/:collectionName', authAdminRequest, collectionsController.remove);

module.exports = collectionsRouter;
