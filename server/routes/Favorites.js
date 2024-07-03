const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const BlogPost = require("../models/blogPostModel");

// Add to favorites
router.post("/add", async (req, res) => {
  try {
    const userId = req.user._id;
    const { blogId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.favorites.includes(blogId)) {
      user.favorites.push(blogId);
      await user.save();
    }

    res.status(200).json({ message: "Blog added to favorites" });
  } catch (error) {
    console.error("Error adding blog to favorites:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Remove from favorites
router.post("/remove", async (req, res) => {
  try {
    const userId = req.user._id;
    const { blogId } = req.body;

    const user = await User.findById(userId);
    user.favorites = user.favorites.filter((id) => id.toString() !== blogId);
    await user.save();

    res.status(200).json({ message: "Blog removed from favorites" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
