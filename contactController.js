// controllers/contactController.js
const nodemailer = require('nodemailer');
// const Contact = require('../models/Contact'); // Uncomment when using MongoDB

exports.submit = async (req, res) => {
  const { firstName, lastName, email, message } = req.body || {};

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required: firstName, lastName, email, message',
    });
  }

  try {
    // Optional: Save to MongoDB
    // const contact = new Contact({ firstName, lastName, email, message });
    // await contact.save();

    // Email setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${firstName} ${lastName}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission',
      text: `
Name: ${firstName} ${lastName}
Email: ${email}
Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
    });
  } catch (error) {
    console.error('Contact submission error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.',
    });
  }
};