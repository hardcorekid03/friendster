const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/images/blogs");
  },

  filename: (req, file, fn) => {
    fn(null, req.body.img);
  },
});

const storageBanner = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/images/banners");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  },
});

const storageProfile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/images/profiles");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
  },
});

const upload = multer({ storage: storage }).single("file");
const uploadBanner = multer({ storage: storageBanner }).single("file");
const uploadProfile = multer({ storage: storageProfile }).single("file");

// Endpoint for uploading banners
router.post("/uploadBanner", (req, res) => {
  uploadBanner(req, res, (err) => {
    if (err) {
      console.error("Multer Error:", err);
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json("Banner image has been uploaded successfully!");
  });
});

// Endpoint for uploading profile pictures
router.post("/uploadProfile", (req, res) => {
  uploadProfile(req, res, (err) => {
    if (err) {
      console.error("Multer Error:", err);
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json("Profile picture has been uploaded successfully!");
  });
});

// Endpoint for blog images
router.post("/", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Multer Error:", err);
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json("Image has been uploaded successfully!");
  });
});

// DELETE endpoint for deleting images
router.delete("/:imageName", (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(__dirname, "../assets/images/blogs", imageName); // Adjust path accordingly

  try {
    // Check if the file exists
    if (fs.existsSync(imagePath)) {
      // Delete the file
      fs.unlinkSync(imagePath);
      console.log(`Deleted image: ${imageName}`);
      res.status(200).json({ message: "Image deleted successfully" });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (err) {
    console.error("Error deleting image:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE endpoint for deleting user image
router.delete("/uploadProfile/:imageName", (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(
    __dirname,
    "../assets/images/profiles",
    imageName
  ); // Adjust path accordingly

  try {
    // Check if the file exists
    if (fs.existsSync(imagePath)) {
      // Delete the file
      fs.unlinkSync(imagePath);
      console.log(`Deleted image: ${imageName}`);
      res.status(200).json({ message: "Image deleted successfully" });
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (err) {
    console.error("Error deleting image:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
