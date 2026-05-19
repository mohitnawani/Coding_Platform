const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    // Basic Info
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },

    lastName: {
      type: String,
      minLength: 2,
      maxLength: 50,
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
    },

    age: {
      type: Number,
      min: 6,
      max: 80,
    },

    // Authentication
    password: {
      type: String,
      default: null, // Not required for Google users
    },

    // Google OAuth Fields
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allow null for non-Google users
    },

    profilePicture: {
      type: String,
      default: null,
    },

    authSource: {
      type: String,
      enum: ['google', 'local'],
      default: 'google',
    },

    // User Role & Status
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    isVerified: {
      type: Boolean,
      default: true, // Auto-verified for Google users
    },

    // User Activity
    problemSolved: {
      type: [
        {
          type: schema.Types.ObjectId,
          ref: 'problem',
        },
      ],
      default: [],
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent OverwriteModelError in watch/reload environments
const User = mongoose.models.user || mongoose.model('user', userSchema);
module.exports = User;
