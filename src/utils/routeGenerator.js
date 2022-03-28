const { authClientSDKRequest } = require('../utils/authenticate');
const { checkAuthenticated } = require('../utils/userAuthentication');

const addRoutes = (router, collection) => {

  router.get(`/${collection.name}`, authClientSDKRequest, checkAuthenticated, async (req, res, next) => {
    // Get all instances of the given collection
    // client-sdk only
    // allow client-sdk to pass in queries here
    const results = await collection.getMany({});

    res.status(200).json(results);
  });

  router.get(`/${collection.name}/:id`, authClientSDKRequest, checkAuthenticated, async (req, res, next) => {
    // Get a single instance of the given collection
    // client-sdk only
    const result = await collection.getOne(req.params.id);

    res.status(200).json(result);
  });

  router.post(`/${collection.name}/`, authClientSDKRequest, checkAuthenticated, async (req, res, next) => {
    // Create an instance of the given collection
    // client-sdk only
    if (!req.body.data) { next() };
    const result = await collection.create({ ...req.body, username: req.user.username });
    
    res.status(201).json(result);
  });

  router.put(`/${collection.name}/:id`, authClientSDKRequest, checkAuthenticated, async (req, res, next) => {
    // Update an instance of the given collection
    // client-sdk
    if (!req.body.data) { next() };
    const result = await collection.update(req.params.id, { ...req.body, username: req.user.username });
    
    res.status(201).json(result);
  });

  router.patch(`/${collection.name}/:id`, authClientSDKRequest, checkAuthenticated, async (req, res, next) => {
    // Update an instance of the given collection
    // client-sdk
    if (!req.body.data) { next() };
    const result = await collection.patch(req.params.id, { ...req.body, username: req.user.username });

    res.status(201).json(result);
  });

  router.delete(`/${collection.name}/:id`, authClientSDKRequest, checkAuthenticated, async (req, res, next) => {
    // Update an instance of the given collection
    // client-sdk
    const result = await collection.delete(req.params.id);

    if (!result) { next() };
    res.status(204).send();
  });
};


module.exports = { addRoutes }
