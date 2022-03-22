const mongoOperator = require('../models/mongoOperator');
const routeGenerator = require('../utils/routeGenerator');
const db = require('../db');
const dbRouter = require('../routers/dbRouter');

const retrieveAll = async(req, res, next) => {
  // Get all collection names
  // Admin-app
  const additionalCollections = await db.getAdditionalCollections();

  res.status(200).json({ message: `You get all collection names: ${additionalCollections}`});
};

const retrieve = async(req, res, next) => {
  // Get details of a collection (number of records etc)
  // Admin-app
  const collectionName = req.params.collectionName;
  const additionalCollections = await db.getAdditionalCollections();
  console.log(additionalCollections);
  if (additionalCollections.includes(collectionName)) {
    res.status(200).json({ message: `You tried to access details of a collection. Id was: ${collectionName}`});
  } else {
    res.status(404).json({ message: "Collection doesn't exists"});
  }
};

const create = (req, res, next) => {
  // Create a collection
  // Admin-app
  const collection = req.body.name;
  const newCollection = mongoOperator.createModel(collection);
  routeGenerator.addRoutes(dbRouter, newCollection)

  if (newCollection) {
    res.status(201).json({ message: `You created a collection. You can access it via /data/${collection} endpoint`});
  } else {
    res.status(404).json({ message: "There is something wrong!"});
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
    res.status(404).json({ message: "You haven't passed a collection name"});
  }
};

module.exports = {
  retrieveAll,
  retrieve,
  remove,
  create,
}
