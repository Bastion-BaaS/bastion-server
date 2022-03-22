const retrieveAll = (req, res, next) => {
  // Create AWS module and use it to handle this functionality
  // Get CCF
  // Only Admin-App

  res.status(200).json({ message: `You get information about all the CCFs`});
};

const retrieve = (req, res, next) => {
  // Create AWS module and use it to handle this functionality
  // Get CCF
  // Only Admin-App
  const ccfName = req.params?.ccfName;

  res.status(200).json({ message: `You get information about a CCF. The name was: ${ccfName}`});
};

const run = (req, res, next) => {
  // Create AWS module and use it to handle this functionality
  // Only Client-SDK
  const code = req.body?.code;

  res.status(200).json({ message: `You executed a cloud code function ${code ? 'with' : 'without'} sending a request body`});
};

const create = (req, res, next) => {
  // Admin app created a CFF(Lambda) and notifying App-Server by providing the supporting info
  // Only Admin-App
  const ccfName = req.body.ccfName;

  res.status(200).json({ message: `You created a cloud code function ${ccfName ? 'with' : 'without'} a request body`});
};

const remove = (req, res, next) => {
  // Admin app deleted a CCF(Lambda) and notifying App-Server by providing the supporting info
  // Only Admin-App
  const ccfName = req.body?.ccfName;

  res.status(200).json({ message: `You said you deleted a cloud code function ${ccfName ? 'with' : 'without'} a request body`});
};

module.exports = {
  retrieveAll,
  retrieve,
  run,
  create,
  remove
}
