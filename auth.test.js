// routes/auth.test.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure path is correct

// POST /api/test-auth — test user creation and token generation
router.post('/test-auth', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
  }

  try {
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(201).json({
      success: true,
      message: 'Auth test endpoint ready',
      token,
      user,
    });
  } catch (error) {
    console.error('Auth test error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to create test user',
    });
  }
});

module.exports = router;