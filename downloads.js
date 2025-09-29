// routes/downloads.js
const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');
const errorHandler = require('../middleware/errorHandler'); // Optional

// GET /api/downloads
router.get('/', downloadController.list);

// POST /api/downloads
router.post('/', downloadController.create); // Move logic to controller

router.use(errorHandler); // Optional centralized error handling

module.exports = router;