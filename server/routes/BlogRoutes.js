const express = require("express");
const {
  createBlogPost,
  getBlogPosts,
  getBlogPost,
  deleteBlog,
  updateBlogPost
} = require("../controllers/BlogController");

const router = express.Router();

// get all blogs
router.get("/", getBlogPosts);

// get a single blog
router.get("/:id", getBlogPost);

// create a single blog
router.post("/", createBlogPost);

// delete a single blog
router.delete("/:id", deleteBlog);

// update a single blog
router.patch("/:id", updateBlogPost);

module.exports = router;
