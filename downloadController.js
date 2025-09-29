// controllers/downloadController.js
const nodemailer = require('nodemailer');
const Download = require('../models/Download'); // Adjust path if needed

// GET /api/downloads — static list (can be replaced with DB fetch)
exports.list = (req, res) => {
  return res.status(200).json({
    success: true,
    downloads: [
      {
        id: 1,
        title: 'Complete Web Design Guide',
        description: 'A comprehensive 200-page PDF guide',
        fileSize: '2.5 MB',
        fileType: 'PDF',
        isPremium: false,
      },
      {
        id: 2,
        title: 'UI/UX Design Templates',
        description: 'Professional Figma templates',
        fileSize: '15 MB',
        fileType: 'Figma',
        isPremium: false,
      },
    ],
  });
};

// POST /api/downloads — create new download
exports.create = async (req, res) => {
  const { title, description, file, isPremium, email } = req.body || {};

  if (!title || !description || !file || isPremium == null || !email) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required: title, description, file, isPremium, email',
    });
  }

  try {
    const download = new Download({ title, description, file, isPremium });
    await download.save();

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
      subject: 'New Download Created',
      text: `A new download has been created: ${title}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: 'Download created and email sent successfully',
      download,
    });
  } catch (error) {
    console.error('Download creation error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to create download',
    });
  }
};