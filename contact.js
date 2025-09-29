// routes/contact.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const errorHandler = require('../middleware/errorHandler'); // Optional centralized error handling

// POST /api/contact
router.post('/', contactController.submit);

// Optional: attach error handler if needed
router.use(errorHandler);

module.exports = router;