const bcrypt = require('bcrypt');
const User = require('../models/User');
const SALT_ROUNDS = 10;

const sessionConfig = {
  secret: 'bastion rules',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 }
};

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
  return done(null, user.id);
};

const deserialize = async (userId, done) => {
  const user = await User.findById(userId);
  return done(null, user);
};

const hashPassword = async (plaintextPassword) => {
  return await bcrypt.hash(plaintextPassword, SALT_ROUNDS);
};

exports.sessionConfig = sessionConfig;
exports.serialize = serialize;
exports.deserialize = deserialize;
exports.validate = validate;
exports.hashPassword = hashPassword;
