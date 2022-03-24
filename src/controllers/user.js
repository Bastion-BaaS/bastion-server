const User = require('../models/User');
const { hashPassword } = require('../utils/userAuthentication');

const retrieveAll = async (req, res, next) => {
  // Get all users
  // admin-app
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const retrieve = async (req, res, next) => {
  // Get a single user
  // admin-app
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const create = async (req, res, next) => {
  // Create a single user
  // Both client-sdk and admin-app
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const user = {
      ...req.body,
      password: hashedPassword
    };
    const response = await User.create(user)
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const update = async (req, res, next) => {
  // Update a user
  // Both client-sdk and admin-app
  const userId = req.params.id;
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const user = {
      ...req.body,
      password: hashedPassword
    };
    const response = await User.replaceOne({ _id: userId }, user);
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const remove = async (req, res, next) => {
  // Delete a user
  // Both client-sdk and admin-app
  const userId = req.params.id;
  try {
    const response = await User.findByIdAndDelete(userId);
    res.status(204).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  retrieveAll,
  retrieve,
  create,
  update,
  remove,
}
