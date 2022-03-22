const cloudCodeRouter = require('express').Router();
const cloudCodeController = require('../controllers/cloudCode');

cloudCodeRouter.get('/', cloudCodeController.retrieveAll);
cloudCodeRouter.get('/:ccfName/', cloudCodeController.retrieve);
cloudCodeRouter.post('/:ccfName/run', cloudCodeController.run);
cloudCodeRouter.post('/:ccfName/created', cloudCodeController.create);
cloudCodeRouter.delete('/:ccfName', cloudCodeController.remove);

module.exports = cloudCodeRouter;
