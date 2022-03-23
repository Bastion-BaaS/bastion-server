const User = require('../models/User');

const retrieveAll = async (req, res, next) => {
  // Get all users
  // admin-app
  const users = await User.find({});
  res.json(users);
};

const retrieve = (req, res, next) => {
  // Get a single user
  // admin-app
  const userId = req.params.id;
  res.status(200).json({ message: `You get a single user. Id was: ${userId}`});
};

const create = (req, res, next) => {
  // Create a single user
  // Both client-sdk and admin-app
  const user = req.body?.user;

  res.status(201).json({ message: `You created a user ${user ? 'with' : 'without'} a request body`});
};

const update = (req, res, next) => {
  // Update a user
  // Both client-sdk and admin-app
  const user = req.body?.user;

  res.status(201).json({ message: `You updated a user ${user ? 'with' : 'without'} a request body`});
};

const remove = (req, res, next) => {
  // Delete a user
  // Both client-sdk and admin-app
  const id = req.params.id;
  console.log(id);
  if (id) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "You haven't passed an id"});
  }
};

module.exports = {
  retrieveAll,
  retrieve,
  create,
  update,
  remove,
}
