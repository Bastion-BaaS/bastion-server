
const addRoutes = (router, collection) => {

  router.get(`/data/${collection.name}`, async (req, res, next) => {
    // Get all instances of the given collection
    // client-sdk only
    // add authorization
    // allow client-sdk to pass in queries here
    const results = await collection.getMany();

    res.status(200).json({ data: results });
  });

  router.get(`/data/${collection.name}/:id`, async (req, res, next) => {
    // Get a single instance of the given collection
    // client-sdk only
    // add authorization
    const result = await collection.getOne(req.params.id);

    res.status(200).json({ data: result });
  });

  router.post(`/data/${collection.name}/`, async (req, res, next) => {
    // Create an instance of the given collection
    // client-sdk only
    // add authorization
    if (!req.body.record) { next() };
    const result = await collection.create(req.body.record);

    res.status(201).json({ data: result });
  });

  router.put(`/data/${collection.name}/:id`, async (req, res, next) => {
    // Update an instance of the given collection
    // client-sdk
    // add authorization
    if (!req.body.record) { next() };
    const result = await collection.update(req.params.id, req.body.record);

    res.status(201).json({ data: result });
  });

  router.patch(`/data/${collection.name}/:id`, async (req, res, next) => {
    // Update an instance of the given collection
    // client-sdk
    // add authorization
    if (!req.body.record) { next() };
    const result = await collection.update(req.params.id, req.body.record);

    res.status(201).json({ data: result });
  });

  router.delete(`/data/${collection.name}/:id`, async (req, res, next) => {
    // Update an instance of the given collection
    // client-sdk
    // add authorization
    const result = await collection.delete(req.params.id);

    if (!result) { next() };
    res.status(204).send();
  });
};


module.exports = { addRoutes }
