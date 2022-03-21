const mongoose = require('mongoose');
const mongoOperator = require('./mongoOperator');

const cloudCodeFunctionSchema = new mongoose.Schema({
  functionName: {
    type: String,
    unique: true,
    required: true
  },
  lambdaName: {
    type: String,
    unique: true,
    required: 'Please provide a valid Lambda function name',
  },
},{timestamps: true});


cloudCodeFunctionSchema.set('toJSON', {
  transform: mongoOperator.transform
});

module.exports = mongoose.model('CloudCodeFunction', cloudCodeFunctionSchema);
