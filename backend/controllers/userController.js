const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");

// @desc Register new user

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    generateToken(res, user._id);

    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Login user

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isActive)
      return res.status(403).json({ message: "Account deactivated" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    user.lastLogin = new Date();
    await user.save();

    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Logout user

exports.logoutUser = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: "false", // prod la secure true
  });
  res.json({ message: "Logged out successfully" });
};

// @desc Get current logged in user ("me")
// @route GET /api/users/me
// @access Private

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Update user profile

exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      user.gender = req.body.gender || user.gender;
      user.dob = req.body.dob || user.dob;

      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 10);
      }
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Admin - Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }
    res.json({
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Admin - Update user role/status
exports.updateUserByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.role = req.body.role || user.role;
      if (req.body.isActive !== undefined) user.isActive = req.body.isActive;
    }
    const updated = await user.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
