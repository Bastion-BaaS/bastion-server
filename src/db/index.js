// DB models 
// Default schema for newly created models
// Module for creating new collections
const mongoose = require('mongoose');
const errorHandler = require('../utils/errorHandler');
const mongoOperator = require('../models/mongoOperator');

const DEFAULT_COLLECTION_NAMES = ['cloudCodeFunctions', 'files', 'users'];

const getAllCollections = async () => {
  connection = mongoose.connection;
  const allCollections = await connection.db.listCollections().toArray();

  return allCollections.map(collection => collection.name);
};

const createDefaultCollections = async () => {
  let collectionObjects = [];
  const allCollections = await getAllCollections();
  const collectionsToBeCreated = allCollections.map(collectionName => !DEFAULT_COLLECTION_NAMES.includes(collectionName));

  collectionsToBeCreated.forEach(collectionName => {
    let collectionObj = mongoOperator.createModel(collectionName);
    collectionObjects.push(collectionObj);
  });

  return collectionObjects;
};

const establishDBConnection = async (connectionURL, dbName) => {
  try {
    await mongoose.connect(connectionURL);
    console.log(`Connected to MongoDB: ${dbName}`);
  } catch(err) {
    console.error(`Failed to connect to MongoDB: ${connectionURL} \n error: ${err}`);
    return;
  }
}


const configureMongo = async (env, user, password, host, port, dbName) => {
  mongoose.connection.on('error', errorHandler.mongooseError);
  mongoose.set('debug', true);
  if (env === 'production') {
    mongoose.set('debug', { color: false, shell: true });
  } else {
    mongoose.set('debug', { color: true, shell: true });
  }
  const connectionURL = `mongodb://${user}:${password}@${host}:${port}/${dbName}?authSource=admin`;

  await establishDBConnection(connectionURL, dbName);
}

module.exports = { configureMongo, createDefaultCollections };
