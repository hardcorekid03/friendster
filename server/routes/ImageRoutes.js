const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/images/blogs'); // Destination folder for storing images
  },
  // filename: (req, file, cb) => {
  //   // Generate a unique filename
  //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  //   cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  // }
  filename:(req,file,fn)=>{
    fn(null,req.body.img)
    // fn(null,"image1.jpg")
}
});

const upload = multer({ storage: storage }).single('file');

// Endpoint for file upload
router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Multer Error:', err);
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json('Image has been uploaded successfully!');
  });
});

module.exports = router;
