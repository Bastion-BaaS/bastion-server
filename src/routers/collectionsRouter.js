const collectionsRouter = require('express').Router();
const collectionsController = require('../controllers/collections');

collectionsRouter.get('/', collectionsController.retrieveAll);
collectionsRouter.get('/:collectionName', collectionsController.retrieve);
collectionsRouter.post('/', collectionsController.create);
collectionsRouter.delete('/:collectionName', collectionsController.remove);

module.exports = collectionsRouter;
