// controllers/courseController.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course'); // Make sure this path is correct

// Create a new course
router.post('/courses', async (req, res) => {
  const { title, description, difficultyLevel, durationHours, price, isPremium } = req.body || {};

  if (!title || !description || !difficultyLevel || !durationHours || price == null || isPremium == null) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  try {
    const course = new Course({ title, description, difficultyLevel, durationHours, price, isPremium });
    await course.save();

    return res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course,
    });
  } catch (error) {
    console.error('Error creating course:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to create course',
    });
  }
});

module.exports = router;