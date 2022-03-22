// Do we configure cors?
// session store configuration
// check if the request has API_KEY
// set the routes
// set error handler

const morgan = require('morgan');
const express = require('express');
// const authenticate = require('./utils/authenticate');
const router = require('./routers');
const dbRouter = require('./routers/dbRouter');
const config = require('./utils/config');
const routeGenerator = require('./utils/routeGenerator');


const configureAndStart = (app, newCollections) => {
  app.use(express.json());

  app.use(morgan('tiny'));

  // Allow nested objects in request bodies
  app.use(express.urlencoded({ extended: true }));

  // app.use(authenticate.validateAPIKey);

  newCollections.forEach(collection => {
    // mutates the router
    routeGenerator.addRoutes(dbRouter, collection);
  });

  app.use('/', router);

  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
};

module.exports = { configureAndStart };
