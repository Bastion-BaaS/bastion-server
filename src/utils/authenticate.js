// Check http headers and compare it against the valid API_KEY
const config = require('./config');
const API_KEY = config.API_KEY;

const authClientSDKRequest = (req, res, next) => {
  if (config.NODE_ENV !== "production") {
    next();
  } else if (_requester(req) === 'client-sdk' && _getApiKey(req) === API_KEY) {
    next();
  } else {
    res.status(401).send();
  }
};

const authAdminRequest = (req, res, next) => {
  if (config.NODE_ENV !== "production") {
    next();
  } else if (_requester(req) === 'admin-app' && _getApiKey(req) === API_KEY) {
    next();
  } else {
    res.status(401).send();
  }
};

const authEither = (req, res, next) => {
  const requester = _requester(req);
  if (config.NODE_ENV !== "production") {
    next();
  } else if (!['client-sdk', 'admin-app'].includes(requester)) {
    res.status(401).send();
  } else if (_getApiKey(req) !== API_KEY) {
    res.status(401).send();
  } else {
    next();
  }
};

const _getApiKey = (req) => {
  return req.get('AUTHORIZATION').split(' ')[1];
};

const _requester = (req) => {
  const requester = req.get('X-REQUESTED-BY');

  if (requester === 'client-sdk') {
    return 'client-sdk';
  }
  if (requester === 'admin-app') {
    return 'admin-app';
  }
};


module.exports = { authAdminRequest, authClientSDKRequest, authEither };
