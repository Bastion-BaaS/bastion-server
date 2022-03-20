const filesRouter = require('express').Router();
const filesController = require('../controllers/files');

filesRouter.get('/', filesController.retrieveAll);
filesRouter.get('/:fileId', filesController.retrieve);
filesRouter.post('/', filesController.create);
filesRouter.delete('/:fileId', filesController.remove);

module.exports = filesRouter;
