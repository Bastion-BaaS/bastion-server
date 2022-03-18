// Get env. variables and set them up
// Get default collection names and set them up
require('dotenv').config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const _DB_USER = process.env.DB_USER;
const _DB_PASSWORD = process.env.DB_PASSWORD;
const _DB_HOST = process.env.DB_HOST;
const _DB_PORT = process.env.DB_PORT;
const _DB_NAME = process.env.DB_NAME;
const MONGO_CREDENTIALS = [
  NODE_ENV,
  _DB_USER,
  _DB_PASSWORD,
  _DB_HOST,
  _DB_PORT,
  _DB_NAME
];

module.exports = {
  PORT,
  NODE_ENV,
  MONGO_CREDENTIALS
};
