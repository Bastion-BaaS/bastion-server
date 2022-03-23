const { authClientSDKRequest } = require('../utils/authenticate');


const addRoutes = (router, collection) => {

  router.get(`/${collection.name}`, authClientSDKRequest, async (req, res, next) => {
    // Get all instances of the given collection
    // client-sdk only
    // add authorization
    // allow client-sdk to pass in queries here
    const results = await collection.getMany();

    res.status(200).json({ data: results });
  });

  router.get(`/${collection.name}/:id`, authClientSDKRequest, async (req, res, next) => {
    // Get a single instance of the given collection
    // client-sdk only
    // add authorization
    const result = await collection.getOne(req.params.id);

    res.status(200).json({ data: result });
  });

  router.post(`/${collection.name}/`, authClientSDKRequest, async (req, res, next) => {
    // Create an instance of the given collection
    // client-sdk only
    // add authorization
    if (!req.body) { next() };
    const result = await collection.create(req.body);

    res.status(201).json({ data: result });
  });

  router.put(`/${collection.name}/:id`, authClientSDKRequest, async (req, res, next) => {
    // Update an instance of the given collection
    // client-sdk
    // add authorization
    if (!req.body) { next() };
    const result = await collection.update(req.params.id, req.body);

    res.status(201).json({ data: result });
  });

  router.patch(`/${collection.name}/:id`, authClientSDKRequest, async (req, res, next) => {
    // Update an instance of the given collection
    // client-sdk
    // add authorization
    if (!req.body) { next() };
    const result = await collection.update(req.params.id, req.body);

    res.status(201).json({ data: result });
  });

  router.delete(`/${collection.name}/:id`, authClientSDKRequest, async (req, res, next) => {
    // Update an instance of the given collection
    // client-sdk
    // add authorization
    const result = await collection.delete(req.params.id);

    if (!result) { next() };
    res.status(204).send();
  });
};


module.exports = { addRoutes }
