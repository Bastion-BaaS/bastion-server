const router = require('express').Router();
const dbRouter = require('./dbRouter');
const cloudCodeRouter = require('./cloudCodeRouter');
const collectionsRouter = require('./collectionsRouter');
const filesRouter = require('./filesRouter');
const userAuthRouter = require('./userAuthRouter');
const genericRouter = require('./genericRouter');
const userRouter = require('./userRouter');
const config = require('../utils/config');

router.get('/', (req, res, next) => res.json({ healthcheck: "okay" }));

const pathPrefix = `/server/${config.APP_NAME}`;

router.use(`${pathPrefix}/ccfs`, cloudCodeRouter);
router.use(`${pathPrefix}/data`, dbRouter);
router.use(`${pathPrefix}/users`, userRouter);
router.use(`${pathPrefix}/files`, filesRouter);
router.use(`${pathPrefix}/auth`, userAuthRouter);
router.use(`${pathPrefix}/collections`, collectionsRouter);
if (config.NODE_ENV !== 'production') {
  router.use('/', genericRouter);
}

module.exports = router;
