const mongoose = require('mongoose');
const mongoOperator = require('./mongoOperator');
const s3 = require('../aws/s3');

const validateFileName = (nameToValidate) => {
  return s3.fileNameAvailable(nameToValidate);
};

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    unique: true
  },
  fileAddress: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validateFileName, 'File name is invalid or already taken'],
    required: 'Please provide a valid link for the file',
  },
},{timestamps: true});


fileSchema.set('toJSON', {
  transform: mongoOperator.transform
});

module.exports = mongoose.model('File', fileSchema);
