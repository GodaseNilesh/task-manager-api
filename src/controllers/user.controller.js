const userService = require("../services/user.service");
const { validateSignup } = require("../validators/user.validator");

const signup = async (req, res) => {
  try {
    const error = validateSignup(req.body);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const user = await userService.createUser(req.body);

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const result = await userService.loginUser(req.body);

    res.status(200).json({
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { signup, login };
