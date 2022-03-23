const passport = require('passport');
const User = require('../models/User');
const { hashPassword } = require('../utils/userAuthentication');

const signup = async (req, res, next) => {
  // Register a user
  // Consumer: client-sdk
  const hashedPassword = await hashPassword(req.body.password);
  const newUser = { ...req.body, password: hashedPassword };
  User.create(newUser)
    .then(result => {
      console.log('saved new user');
      console.log('result: ', result);
      res.json({ status: "created" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};

const login = (req, res, next) => {
  // Login a user
  // Consumer: client-sdk
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json(403, { message: 'No user found' });
    }

    req.login(user, err => {
      if (err) {
        return next(err);
      }

      return res.json({ message: 'user authenticated' });
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  // Logout a user
  // Consumer: client-sdk
  const user = req.user;
  req.logout();
  res.status(200).json({ message: `A user logged out. The username was: ${user.username}`});
};

module.exports = {
  signup,
  login,
  logout,
}
