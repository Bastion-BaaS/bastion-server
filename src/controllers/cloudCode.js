const CloudCodeFunction = require('../models/CloudCodeFunction');
const ccf = require('../aws/ccf');

const retrieveAll = async (req, res, next) => {
  // Create AWS module and use it to handle this functionality
  // Get CCF
  // Only Admin-App
  try {
    const ccfObjs = await CloudCodeFunction.find({});
    res.status(200).json(ccfObjs);
  } catch(err) {
    res.status(500).send(err);
  }
};

const retrieve = async (req, res, next) => {
  // Create AWS module and use it to handle this functionality
  // Get CCF
  // Only Admin-App
  const ccfName = req.params?.ccfName;
  try {
    const ccfObj = await CloudCodeFunction.findOne({ functionName: ccfName });
    res.status(200).json(ccfObj);
  } catch(err) {
    res.status(500).send(err);
  }
};

const run = async (req, res, next) => {
  // Create AWS module and use it to handle this functionality
  // Only Client-SDK
  const code = req.body?.code;
  const ccfName = req.params?.ccfName;
  try {
    const ccfObj = await CloudCodeFunction.findOne({ functionName: ccfName });
    let response = await ccf.runLambda(ccfObj.functionName, code);
    res.status(200).json(response.data);
  } catch(err) {
    res.status(500).send(err)
  }
};

const create = async (req, res, next) => {
  // Admin app created a CFF(Lambda) and notifying App-Server by providing the supporting info
  // Only Admin-App
  const ccfName = req.body.ccfName;
  try {
    const ccfObj = { functionName: ccfName };
    const response = await CloudCodeFunction.create(ccfObj)
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const remove = async (req, res, next) => {
  // Admin app deleted a CCF(Lambda) and notifying App-Server by providing the supporting info
  // Only Admin-App
  const ccfName = req.body?.ccfName;
  try {
    const response = await CloudCodeFunction.findOneAndDelete({ functionName: ccfName });
    res.status(204).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = {
  retrieveAll,
  retrieve,
  run,
  create,
  remove
}
