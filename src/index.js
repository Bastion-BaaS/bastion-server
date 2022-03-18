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
const app = express();
const morgan = require('morgan');
const router = express.Router();
const routers = require('./routers');

app.use(express.json());
app.use(morgan('tiny'));

mongoModule.configureMongo(...config.MONGO_CREDENTIALS);
routers.configure(router);

app.use('/', router);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
