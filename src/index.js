const express = require('express');
require('express-async-errors');
const config = require('./utils/config');
const mongoModule = require('./db');
const app = express();
const bastionServer = require('./bastionServer');

const configureStore = async () => {
 await mongoModule.configureMongo(...config.MONGO_CREDENTIALS);

 // configure session store, this will be a separate mongoDB store
 let collections = await mongoModule.createDefaultCollections();

 bastionServer.configureAndStart(app, collections)
};

configureStore();
