const router = require('express').Router();
const dbRouter = require('./dbRouter');
const cloudCodeRouter = require('./cloudCodeRouter');
const collectionsRouter = require('./collectionsRouter');
const filesRouter = require('./filesRouter');
const userAuthRouter = require('./userAuthRouter');
const genericRouter = require('./genericRouter');
const config = require('../utils/config');

// Change this to work with StackName
const pathPrefix = `/server/${config.APP_NAME}`;

router.use(`${pathPrefix}/ccf`, cloudCodeRouter);
router.use(`${pathPrefix}/data`, dbRouter);
router.use(`${pathPrefix}/collection`, collectionsRouter);
router.use(`${pathPrefix}/file`, filesRouter);
router.use(`${pathPrefix}/auth`, userAuthRouter);
// temporary
router.use('/', genericRouter);

module.exports = router;
