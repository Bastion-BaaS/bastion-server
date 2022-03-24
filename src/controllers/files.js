const retrieveAll = (req, res, next) => {
  // Get all file names and links
  // Both client-sdk and admin-app??

  res.status(200).json({ message: `You get a list of all the files.`});
};

const retrieve = (req, res, next) => {
  // Get the details of a single file
  // Both client-sdk and admin-app
  const fileId = req.params.fileId;

  res.status(200).json({ message: `You accessed details of a file. Id was: ${fileId}`});
};

const create = (req, res, next) => {
  // Create and use an AWS module for this
  // Upload a file to S3 bucket
  // client-sdk
  const file = req.body?.file;

  res.status(201).json({ message: `You uploaded a file. There ${file ? 'was' : 'wasnt'} a file in the request.`});
};

const remove = (req, res, next) => {
  // Create and use an AWS module for this
  // Remove a file from S3 bucket and remove its details from the files collection
  // client-sdk

  const fileId = req.params.fileId;
  console.log(fileId);
  if (fileId) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "You haven't passed an id"});
  }
};

module.exports = {
  retrieveAll,
  retrieve,
  create,
  remove,
}
