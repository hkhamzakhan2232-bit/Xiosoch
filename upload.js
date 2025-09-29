// routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// POST /api/upload-file
router.post('/upload-file', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  const {
    path: uploadedFile,
    size: fileSize,
    mimetype: fileType,
    originalname,
  } = req.file;

  return res.status(200).json({
    success: true,
    message: 'File uploaded successfully',
    uploadedFile,
    fileSize,
    fileType,
    originalName: originalname,
  });
});

module.exports = router;