const mongoOperator = require('../models/mongoOperator');
const routeGenerator = require('../utils/routeGenerator');
const dbRouter = require('../routers/dbRouter');

const retrieveAll = (req, res, next) => {
  // Get all collection names
  // Admin-app

  res.status(200).json({ message: `You get all collection names`});
};

const retrieve = (req, res, next) => {
  // Get details of a collection (number of records etc)
  // Admin-app
  const collectionId = req.params.collectionId;
  console.log(collectionId);

  res.status(200).json({ message: `You tried to access details of a collection. Id was: ${collectionId}`});
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
  const collectionId = req.params.collectionId;
  console.log(collectionId);

  if (collectionId) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "You haven't passed an id"});
  }
};

module.exports = {
  retrieveAll,
  retrieve,
  remove,
  create,
}
