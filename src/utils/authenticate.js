// Check http headers and compare it against the valid API_KEY
const config = require('./config');
const API_KEY = config.API_KEY;

const authClientSDKRequest = (req, res, next) => {
  const apiKey = req.get('AUTHORIZATION').split(' ')[1];

  if (_requester(req) === 'client-sdk' && apiKey === API_KEY) {
    next();
  }
  return res.status(401);
};

const authAdminRequest = (req, res, next) => {
  if (_requester(req) !== 'admin-app') {
    return res.status(401);
  }
}

const authEither = (req, res, next) => {
  const apiKey = req.get('AUTHORIZATION').split(' ')[1];
  const requester = _requester(req);

  if (!['client-sdk', 'admin-app'].includes(requester)) {
    return res.status(401);
  }

  if (requester === 'client-sdk' && apiKey !== API_KEY) {
    return res.status(401);
  }

  next();
}

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
