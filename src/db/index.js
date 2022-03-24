const mongoose = require('mongoose');
const errorHandler = require('../utils/errorHandler');
const mongoOperator = require('../models/mongoOperator');

const DEFAULT_COLLECTION_NAMES = ['cloudCodeFunctions', 'files', 'users'];

const getAllCollections = async () => {
  connection = mongoose.connection;
  const allCollections = await connection.db.listCollections().toArray();

  return allCollections.map(collection => collection.name);
};

const removeModel = async(collectionName) => {
  const availableCollections = await getAdditionalCollections();
  if (!availableCollections.includes(collectionName)) { return };

  delete mongoose.connection.models[collectionName];
  mongoose.connection.db.dropCollection(collectionName, (err, result) => {
    console.log('Collection dropped');
  });
};

const createDefaultCollections = async () => {
  let collectionObjects = [];
  const collectionsToBeCreated = await getAdditionalCollections();

  collectionsToBeCreated.forEach(collectionName => {
    let collectionObj = mongoOperator.createModel(collectionName);
    collectionObjects.push(collectionObj);
  });

  return collectionObjects;
};

const getAdditionalCollections = async () => {
  const allCollections = await getAllCollections();
  return allCollections.filter(collectionName => !DEFAULT_COLLECTION_NAMES.includes(collectionName));
};

const establishDBConnection = async (connectionURL, dbName) => {
  try {
    await mongoose.connect(connectionURL);
    console.log(`Connected to MongoDB: ${dbName}`);
  } catch(err) {
    console.error(`Failed to connect to MongoDB: ${connectionURL} \n error: ${err}`);
    return;
  }
};

const configureMongo = async (user, password, host, port, dbName, env) => {
  mongoose.connection.on('error', errorHandler.mongooseError);
  mongoose.set('debug', true);
  if (env === 'production') {
    mongoose.set('debug', { color: false, shell: true });
  } else {
    mongoose.set('debug', { color: true, shell: true });
  }
  const connectionURL = createMongoURL(user, password, host, port, dbName);

  await establishDBConnection(connectionURL, dbName);
};

const createMongoURL = (user, password, host, port, dbName) => {
  return `mongodb://${user}:${password}@${host}:${port}/${dbName}?authSource=admin`;
};

module.exports = { configureMongo, createDefaultCollections, getAdditionalCollections, removeModel, createMongoURL };
