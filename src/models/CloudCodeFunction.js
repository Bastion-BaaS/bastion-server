const mongoose = require('mongoose');
const mongoOperator = require('./mongoOperator');

const cloudCodeFunctionSchema = new mongoose.Schema({
  functionName: {
    type: String,
    unique: true,
    required: true
  }
},{timestamps: true});


cloudCodeFunctionSchema.set('toJSON', {
  transform: mongoOperator.transform
});

module.exports = mongoose.model('CloudCodeFunction', cloudCodeFunctionSchema);
