// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../middleware/validation'); // Optional
const errorHandler = require('../middleware/errorHandler'); // Optional

// POST /api/users — register new user
router.post('/', validateUser, userController.register);

router.use(errorHandler); // Optional centralized error handling

module.exports = router;