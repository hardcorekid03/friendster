const User = require("../models/UserModel");
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const secretKey = process.env.SECRET;
  return jwt.sign({ _id }, secretKey, { expiresIn: "1d" });
};

// login user
const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.login(identifier, password);
    const token = createToken(user._id);
    res
      .status(200)
      .json({
        id: user._id,
        token,
        username: user.username,
        // email: user.email,
        // location: user.location,
        // gender: user.gender,
        // createdAt: user.createdAt,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get single user
const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "user not found" });
  }
  const user1 = await User.findById(id);
  if (!user1) {
    return res.status(404).json({ error: "user not found" });
  }
  res.status(200).json(user1);
};

// get all user
const getUsers = async (req, res) => {
  const blog = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(blog);
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
    res
      .status(200)
      .json({
        id: user._id,
        token,
        username: user.username,
        // birthdate: user.birthdate,
        // email: user.email,
        // location: user.location,
        // gender: user.gender,
        // createdAt: user.createdAt,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, getUser, getUsers };
