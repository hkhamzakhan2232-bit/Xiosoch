// routes/user.test.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure path is correct

// POST /api/test-user — test user creation and token generation
router.post('/test-user', async (req, res) => {
  const { firstName, lastName, email, password } = req.body || {};

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required: firstName, lastName, email, password',
    });
  }

  try {
    const user = new User({ firstName, lastName, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(201).json({
      success: true,
      message: 'User test endpoint ready',
      token,
      user,
    });
  } catch (error) {
    console.error('User test error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to create test user',
    });
  }
});

module.exports = router;