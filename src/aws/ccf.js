const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');

const runLambda = async (name, payload) => {
  const client = new LambdaClient();
  const params = {
    FunctionName: name,
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify(payload)
  };
  const command = new InvokeCommand(params);
  const response = await client.send(command);
  return response;
}

module.exports = { runLambda }
