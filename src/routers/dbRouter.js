const dbRouter = require('express').Router();
const dbController = require('../controllers/db');

dbRouter.get('/:collectionName', dbController.retrieveAll);
dbRouter.get('/:collectionName/:id', dbController.retrieve);
dbRouter.post('/:collectionName', dbController.create);
dbRouter.put('/:collectionName/:id', dbController.update);
dbRouter.patch('/:collectionName/:id', dbController.update);
dbRouter.delete('/:collectionName/:id', dbController.remove);

module.exports = dbRouter;
