// CONTROLLER TO BE DELETED
const retrieveAll = async (req, res, next) => {
  // Get all instances of the given collection
  // Both client-sdk

  res.status(200).json({ message: `You accessed records of an existing collection. Collection name: ${collectionName}`});
};

const retrieve = (req, res, next) => {
  // Get a single instance of the given collection
  // client-sdk
  const recordId = req.params.id;
  res.status(200).json({ message: `You accessed a single record of an existing collection. The id was ${recordId}`});
};

const create = (req, res, next) => {
  // Create an instance of the given collection
  // client-sdk
  const record = req.body?.record;

  res.status(201).json({ message: `You created a record of an existing collection ${record ? 'with' : 'without'} a request body`});
};

const update = (req, res, next) => {
  // Update an instance of the given collection
  // client-sdk
  const record = req.body?.record;

  res.status(201).json({ message: `You updated a record of an existing collection ${record ? 'with' : 'without'} a request body`});
};

const remove = (req, res, next) => {
  // Remove an instance of the given collection
  // client-sdk
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
