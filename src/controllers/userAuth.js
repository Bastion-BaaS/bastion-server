const signup = (req, res, next) => {
  // Create a module for hashing the password, creating the user record, etc.
  // Register a user
  // client-sdk
  const user = req.body?.user;

  res.status(200).json({ message: `A user signed up. The username was: ${user}`});
};

const login = (req, res, next) => {
  // Use an auth module to compare the pasword to the hashed password
  // Login a user
  // client-sdk
  const user = req.body?.user;

  res.status(200).json({ message: `A user logged in. The username was: ${user}`});
};

const logout = (req, res, next) => {
  // Logout a user
  // Send a hand-shake response to client. They should invalidate the session token
  // client-sdk
  const user = req.body?.user;

  res.status(200).json({ message: `A user logged out. The username was: ${user}`});
};

module.exports = {
  signup,
  login,
  logout,
}
