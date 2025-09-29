// utils/password.js
const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return { hashedPassword, salt };
  } catch (error) {
    console.error('Password hashing error:', error.message);
    return null;
  }
};

module.exports = hashPassword;