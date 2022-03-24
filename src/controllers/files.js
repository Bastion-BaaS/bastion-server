const File = require('../models/File');
const s3 = require('../aws/s3');

const retrieveAll = async (req, res, next) => {
  // Get all file names and links
  // Both client-sdk and admin-app??
  try {
    const files = await File.find({});
    res.json(files);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const retrieve = async (req, res, next) => {
  // Get the details of a single file
  // Both client-sdk and admin-app
  const fileId = req.params.fileId;
  try {
    const file = await File.findById(fileId);
    res.status(200).json(file);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const create = async (req, res, next) => {
  // Create and use an AWS module for this
  // Upload a file to S3 bucket
  // client-sdk
  // const file = req.file;
  // console.log(file);

  try {
    // const result = await s3.uploadFile(file, fileName);
    res.status(201).json({ message: 'it works' });
  } catch(err) {
    res.status(500).send(err);
  }
};

const remove = async (req, res, next) => {
  // Create and use an AWS module for this
  // Remove a file from S3 bucket and remove its details from the files collection
  // client-sdk

  const fileId = req.params.fileId;
  try {
    const file = await File.findById(fileId);
    const result = await s3.removeFile(file.fileName);
    res.status(201).json(result);
  } catch(err) {
    res.status(500).send(err);
  }
};

module.exports = {
  retrieveAll,
  retrieve,
  create,
  remove,
}
