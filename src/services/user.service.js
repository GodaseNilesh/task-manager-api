const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hash");
const generateToken = require("../utils/generateToken");

const createUser = async (data) => {
  const { firstName, lastName, email, password } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    userId: user._id.toString(),
  };
};

const loginUser = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      userId: user._id,
    },
  };
};

module.exports = { createUser, loginUser };
