const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const _DB_USER = process.env.DB_USER;
const _DB_PASSWORD = process.env.DB_PASSWORD;
const _DB_HOST = process.env.DB_HOST;
const _DB_PORT = process.env.DB_PORT;
const _DB_NAME = process.env.DB_NAME;
const APP_NAME = process.env.stackName;
const FILE_BUCKET_NAME = process.env.StackFileBucketName;
const CCF_BUCKET_NAME = process.env.StackCCFBucketName;
const API_KEY = process.env.apiKey;
const MONGO_CREDENTIALS = [
  _DB_USER,
  _DB_PASSWORD,
  _DB_HOST,
  _DB_PORT,
  _DB_NAME,
  NODE_ENV
];

module.exports = {
  PORT,
  NODE_ENV,
  MONGO_CREDENTIALS,
  APP_NAME,
  API_KEY,
  FILE_BUCKET_NAME,
  CCF_BUCKET_NAME
};
