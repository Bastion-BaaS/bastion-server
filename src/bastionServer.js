const morgan = require('morgan');
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const formData = require('express-form-data');
const os = require('os');
const router = require('./routers');
const dbRouter = require('./routers/dbRouter');
const config = require('./utils/config');
const routeGenerator = require('./utils/routeGenerator');
const userAuth = require('./utils/userAuthentication');

const configureAndStart = (app, newCollections) => {
  app.use(express.json());
  // Allow nested objects in request bodies
  app.use(express.urlencoded({ extended: true }));
  app.use(formData.parse({uploadDir: os.tmpdir(), autoClean: true}));
  app.use(formData.format());
  app.use(formData.stream());
  app.use(formData.union());

  app.use(morgan('tiny'));

  app.use(session(userAuth.sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(userAuth.validate));
  passport.serializeUser(userAuth.serialize);
  passport.deserializeUser(userAuth.deserialize);

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
