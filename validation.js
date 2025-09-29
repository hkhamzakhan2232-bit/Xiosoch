// middleware/validation.js
module.exports = (req, res, next) => {
    const { email, password } = req.body || {};
  
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }
  
    // Optional: Add regex/email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }
  
    next();
  };