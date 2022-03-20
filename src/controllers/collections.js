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
}
