const mongoose = require('mongoose');
const mongoOperator = require('../models/mongoOperator');
const routeGenerator = require('../utils/routeGenerator');
const db = require('../db');
const dbRouter = require('../routers/dbRouter');
const DefaultSchema = require('../models/DefaultSchema');

const retrieveAll = async(req, res, next) => {
  // Get all collection names
  // Admin-app
  const additionalCollections = await db.getAdditionalCollections();

  res.status(200).json(additionalCollections);
};

const retrieve = async(req, res, next) => {
  // Get details of a collection (number of records etc)
  // Admin-app
  const collectionName = req.params.collectionName;
  const additionalCollections = await db.getAdditionalCollections();
  if (additionalCollections.includes(collectionName)) {
    const searchModel = mongoose.model(collectionName, DefaultSchema)
    const results = await searchModel.find({});
    res.status(200).json(results);
  } else {
    res.status(404).send();
  }
};

const create = (req, res, next) => {
  // Create a collection
  // Admin-app
  const collection = req.body.name;
  const newCollection = mongoOperator.createModel(collection);
  routeGenerator.addRoutes(dbRouter, newCollection)

  if (newCollection) {
    res.status(201).json({ name: newCollection.name});
  } else {
    res.status(404).send();
  }
};

const remove = (req, res, next) => {
  // Remove a collection and all its data
  // Admin-app
  const collectionName = req.params.collectionName;

  db.removeModel(collectionName);
  dbRouter.stack = dbRouter.stack.filter(layer => layer.route.path.split('/')[1] !== collectionName);

  if (collectionName) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
};

module.exports = {
  retrieveAll,
  retrieve,
  remove,
  create,
}
