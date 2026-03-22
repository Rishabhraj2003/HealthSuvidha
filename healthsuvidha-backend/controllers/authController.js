const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// ✅ REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      gender,
      age,
      bloodGroup,
      city,
      emergencyContact,
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      gender,
      age,
      bloodGroup,
      city,
      emergencyContact,
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id),
      user,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// ✅ LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        message: "Login successful",
        token: generateToken(user._id),
        user,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

// ✅ GET USER PROFILE (for dashboard)
exports.getUserProfile = async (req, res) => {
  res.json(req.user);
};
