const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  const secretKey = process.env.SECRET;
  return jwt.sign({ _id }, secretKey, { expiresIn: '999d' });
};

// login user
const loginUser = async (req, res) => {
  const { identifier, password } = req.body; // identifier can be email or username

  try {
    const user = await User.login(identifier, password);
    // create token
    const token = createToken(user._id);
    res.status(200).json({ email: user.email, username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const {
    email,
    password,
    username,
    birthdateString,
    location,
    gender,
    userimage,
  } = req.body;

  try {
    const user = await User.signup(
      email,
      password,
      username,
      birthdateString,
      location,
      gender,
      userimage
    );
    // create token
    const token = createToken(user._id);
    res.status(200).json({ email: user.email, username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
