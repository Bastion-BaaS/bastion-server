const genericRouter = require('express').Router();
const config = require('../utils/config');
const pathPrefix = `/server/${config.APP_NAME}`;

// Test routes for development
genericRouter.get('/', (req, res) => {
  res.status(200).json({ message: "Accessed the temporary generic app-server route! You are here but you are not sending a correct request!"});
});

genericRouter.get(pathPrefix, (req, res) => {
  res.status(200).json({ message: "Accessed a temporary app-server route! You also used the correct path with appId"});
});


module.exports = genericRouter;
