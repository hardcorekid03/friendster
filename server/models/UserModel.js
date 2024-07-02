const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userimage: {
      type: String,
      required: false,
    },
    userbanner: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static signup method
userSchema.statics.signup = async function (
  email,
  password,
  username,
  birthdateString,
  location,
  gender,
  userimage = "" // Default to empty string if not provided
) {
  // Validation
  if (
    !email ||
    !password ||
    !username ||
    !birthdateString ||
    !location ||
    !gender
  ) {
    throw new Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  if (username.length < 8) {
    toast.error("Username must be at least 8 characters long");
    return;
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    throw new Error(
      "Username must contain only alphanumeric characters and underscores"
    );
  }
  if (!validator.isLength(username, { min: 3, max: 20 })) {
    throw new Error("Username must be between 3 and 20 characters long");
  }

  // Convert birthdate string to Date object
  const birthdate = new Date(birthdateString);

  // Calculate minimum birthdate for 18 years old
  const minBirthdate = new Date();
  minBirthdate.setFullYear(minBirthdate.getFullYear() - 18);

  // Compare birthdate with minimum required date
  if (birthdate > minBirthdate) {
    throw new Error("You must be at least 18 years old to register");
  }

  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw new Error("Email is already in use");
  }

  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw new Error("Username is already taken");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    username,
    birthdate,
    location,
    gender,
    userimage,
  });

  return user;
};

userSchema.statics.login = async function (identifier, password) {
  // Validation
  if (!identifier || !password) {
    throw new Error("All fields must be filled");
  }

  let user;
  // Check if identifier is in email format
  if (validator.isEmail(identifier)) {
    user = await this.findOne({ email: identifier });
  } else {
    user = await this.findOne({ username: identifier });
  }

  if (!user) {
    throw new Error("Incorrect username or email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
