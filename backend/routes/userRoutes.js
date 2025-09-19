const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateUserProfile,
  getAllUsers,
  updateUserByAdmin,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

//admin
router.get("/", protect, adminOnly, getAllUsers);

// User Profile
router.get("/profile", protect, getMe);
router.put("/profile", protect, updateUserProfile);

// Admin

router.put("/:id", protect, adminOnly, updateUserByAdmin);

module.exports = router;
