const aws = require('aws-sdk');
const lambda = new aws.Lambda();

const runLambda = async (name, payload) => {
  const params = {
    FunctionName: name,
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify(payload)
  };
  return lambda.invoke(params).promise();
};

module.exports = { runLambda }
