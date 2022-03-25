const mongoose = require('mongoose');

const defaultSchema = new mongoose.Schema({
  // new models will be created from this schema
},{
  timestamps: true,
  strict: false
});

module.exports = defaultSchema;
