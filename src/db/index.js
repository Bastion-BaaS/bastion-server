// DB models 
// Default schema for newly created models
// Module for creating new collections
const mongoose = require('mongoose');
const errorHandler = require('../utils/errorHandler');

const configureMongo = async (env, user, password, host, port, dbName) => {
  mongoose.connection.on('error', errorHandler.mongooseError);
  mongoose.set('debug', true);
  if (env === 'production') {
    mongoose.set('debug', { color: false, shell: true });
  } else {
    mongoose.set('debug', { color: true, shell: true });
  }
  const connectionURL = `mongodb://${user}:${password}@${host}:${port}/${dbName}?authSource=admin`;

  try {
    await mongoose.connect(connectionURL);
    console.log(`Connected to MongoDB: ${dbName}`);
  } catch(err) {
    console.error(`Failed to connect to MongoDB: ${dbName} \n error: ${err}`);
  }
}

module.exports = { configureMongo };
