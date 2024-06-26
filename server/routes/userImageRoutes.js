const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine user-specific upload directory
    const userId = req.params.userId; // Assuming userId is passed in the URL params
    const uploadPath = path.join(__dirname, `../userImages/${userId}`);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('file');

// Endpoint for file upload
router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Multer Error:', err);
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json('Image has been uploaded successfully!');
  });
});

module.exports = router;
