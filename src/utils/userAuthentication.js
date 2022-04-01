const bcrypt = require('bcrypt');
const MongoStore = require('connect-mongo');
const User = require('../models/User');
const config = require('./config');
const { createMongoURL } = require('../db');
const SALT_ROUNDS = 10;

const sessionConfig = (() => {
  const [ user, password, host, port ] = config.MONGO_CREDENTIALS;
  return { 
    secret: 'bastion rules',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      maxAge: 60 * 60 * 1000,
      sameSite: 'none',       // https only
      secure: true,           // https only
    },
    store: MongoStore.create({
      mongoUrl: createMongoURL(user, password, host, port, 'sessionData')
    })
  };
})();

const validate = async (username, password, done) => {
  const user = await User.findOne({ username });
  if (!user) { 
    return done(null, false, { message: 'No user found' }); 
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return done(null, false, { message: 'Incorrect password' });
  }

  return done(null, user);
};

const serialize = (user, done) => {
  return done(null, user._id);
};

const deserialize = async (userId, done) => {
  const user = await User.findById(userId);
  return done(null, user);
};

const hashPassword = async (plaintextPassword) => {
  return await bcrypt.hash(plaintextPassword, SALT_ROUNDS);
};

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() || config.NODE_ENV !== 'production') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  sessionConfig,
  serialize,
  deserialize,
  validate,
  hashPassword,
  checkAuthenticated
}
