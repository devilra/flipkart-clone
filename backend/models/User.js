const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, sparse: true, lowercase: true },
    phone: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },

    // Role Management
    role: { type: String, enum: ["user", "admin", "seller"], default: "user" },

    // Account Status
    isActive: { type: Boolean, default: true }, // deactivate/ban user
    isVerified: { type: Boolean, default: false }, // email/phone verification

    // Security
    lastLogin: { type: Date },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date }, // account lock for brute force protection
    refreshToken: { type: String }, // for JWT refresh mechanism

    // Profile
    profilePic: { type: String, default: "" },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    dob: { type: Date },

    // Loyalty & Wallet (future use)
    loyaltyPoints: { type: Number, default: 0 },
    walletBalance: { type: Number, default: 0 },

    // Preferences
    language: { type: String, default: "en" },
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    notificationPreferences: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },

    // Audit Trails
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    }, // who created this user (admin case)
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
