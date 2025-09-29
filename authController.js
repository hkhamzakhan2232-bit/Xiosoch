// controllers/authController.js
const express = require('express');
const router = express.Router();

// Registration handler
const register = (req, res) => {
  const { email, password, firstName, lastName } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  // Placeholder for future DB logic
  return res.status(201).json({
    success: true,
    message: 'Registration successful (stub)',
    user: { email, firstName, lastName },
  });
};

// Login handler
const login = (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  // Placeholder for future authentication logic
  return res.status(200).json({
    success: true,
    message: 'Login successful (stub)',
  });
};

module.exports = { register, login };