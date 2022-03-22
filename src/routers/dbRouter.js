const dbRouter = require('express').Router();
const dbController = require('../controllers/db');

// TO BE DELETED. THIS WILL BE HANDLED BY CREATE ROUTES LOGIC
dbRouter.get('/:collectionName', dbController.retrieveAll);
dbRouter.get('/:collectionName/:id', dbController.retrieve);
dbRouter.post('/:collectionName', dbController.create);
dbRouter.put('/:collectionName/:id', dbController.update);
dbRouter.patch('/:collectionName/:id', dbController.update);
dbRouter.delete('/:collectionName/:id', dbController.remove);

module.exports = dbRouter;
