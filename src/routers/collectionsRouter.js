const collectionsRouter = require('express').Router();
const collectionsController = require('../controllers/collections');

collectionsRouter.get('/', collectionsController.retrieveAll);
collectionsRouter.get('/:collectionId', collectionsController.retrieve);
collectionsRouter.delete('/:collectionId', collectionsController.remove);

module.exports = collectionsRouter;
