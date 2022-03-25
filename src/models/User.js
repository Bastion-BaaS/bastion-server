const mongoose = require('mongoose');
const mongoOperator = require('./mongoOperator');

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    minLength: 2,
    maxLength: 25
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validateEmail, 'Invalid email format'],
    required: 'Please provide a valid email address',
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  }
},{timestamps: true});


userSchema.set('toJSON', {
  transform: mongoOperator.transform
});

module.exports = mongoose.model('User', userSchema);
