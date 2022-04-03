const mongoose = require('mongoose');
const mongoOperator = require('./mongoOperator');

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    unique: true
  },
  url: {
    type: String,
    unique: true
  }
},{timestamps: true});


fileSchema.set('toJSON', {
  transform: mongoOperator.transform
});

module.exports = mongoose.model('File', fileSchema);
