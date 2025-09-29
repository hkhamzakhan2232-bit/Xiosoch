// utils/email.js
const nodemailer = require('nodemailer');

const sendEmail = async ({ from, to, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from,
      to,
      subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Email sending error:', error.message);
    return { success: false, message: 'Failed to send email' };
  }
};

module.exports = sendEmail;