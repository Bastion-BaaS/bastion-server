/*
  SETS UP PREREQUISITES FOR APPLICATION TO RUN
  1. Get information from config module
  2. Extract keys
  3. Set default collections using mongo module
  4. Set different routers
  5. Set different controllers
  6. Setup middleware for error handling
  7. Start server

*/
const config = require('./utils/config');
const mongoModule = require('./db');
const express = require('express');
require('express-async-errors');
const app = express();
const morgan = require('morgan');
const router = require('./routers');

app.use(express.json());
app.use(morgan('tiny'));

mongoModule.configureMongo(...config.MONGO_CREDENTIALS);

app.use('/', router);

// Move to App
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
