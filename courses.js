// routes/Courses.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Course = require('../models/Course'); // Ensure path is correct

router.post('/courses', async (req, res) => {
  const { title, description, difficultyLevel, durationHours, price, isPremium, email } = req.body || {};

  if (!title || !description || !difficultyLevel || durationHours == null || price == null || isPremium == null || !email) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required: title, description, difficultyLevel, durationHours, price, isPremium, email',
    });
  }

  try {
    const course = new Course({ title, description, difficultyLevel, durationHours, price, isPremium });
    await course.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'New Course Created',
      text: `A new course has been created: ${title}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: 'Course created and email sent successfully',
      course,
    });
  } catch (error) {
    console.error('Course creation error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to create course',
    });
  }
});

module.exports = router;