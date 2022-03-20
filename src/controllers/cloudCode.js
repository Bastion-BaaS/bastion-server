const run = (req, res, next) => {
  // Create AWS module and use it to handle this functionality
  // Only Client-SDK
  const code = req.body?.code;

  res.status(200).json({ message: `You executed a cloud code function ${code ? 'with' : 'without'} sending a request body`});
};

const create = (req, res, next) => {
  // Admin app created a CFF(Lambda) and notifying App-Server by providing the supporting info
  // Only Admin-App
  const name = req.body.name;

  res.status(200).json({ message: `You created a cloud code function ${name ? 'with' : 'without'} a request body`});
};

const remove = (req, res, next) => {
  // Admin app deleted a CCF(Lambda) and notifying App-Server by providing the supporting info
  // Only Admin-App
  const name = req.body?.name;

  res.status(200).json({ message: `You said you deleted a cloud code function ${name ? 'with' : 'without'} a request body`});
};

module.exports = {
  run,
  create,
  remove
}
