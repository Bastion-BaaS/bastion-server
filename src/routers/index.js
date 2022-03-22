const router = require('express').Router();
const dbRouter = require('./dbRouter');
const cloudCodeRouter = require('./cloudCodeRouter');
const collectionsRouter = require('./collectionsRouter');
const filesRouter = require('./filesRouter');
const userAuthRouter = require('./userAuthRouter');
const genericRouter = require('./genericRouter');
const userRouter = require('./userRouter');
const config = require('../utils/config');

// Change this to work with StackName
const pathPrefix = `/server/${config.APP_NAME}`;

router.use(`${pathPrefix}/ccfs`, cloudCodeRouter);
// router.use(`${pathPrefix}/data`, dbRouter);
// Remove dbRouter
// Create user router
router.use(`${pathPrefix}/users`, userRouter);
router.use(`${pathPrefix}/collections`, collectionsRouter);
router.use(`${pathPrefix}/files`, filesRouter);
router.use(`${pathPrefix}/auth`, userAuthRouter);
// temporary
router.use('/', genericRouter);

module.exports = router;
