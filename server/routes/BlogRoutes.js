const express = require("express");
const {
  createBlogPost,
  getBlogPosts,
  getBlogPost,
  deleteBlog,
  updateBlogPost,
  getBlogPostsForUser
} = require("../controllers/BlogController");
const requireAuth = require ('../middleware/requireAuth')


const router = express.Router();

router.use (requireAuth)
// get all blogs
router.get("/", getBlogPosts);

// get a single blog
router.get("/:id", getBlogPost);

// get a single blog
router.get("/post", getBlogPostsForUser);

// create a single blog
router.post("/", createBlogPost);

// delete a single blog
router.delete("/:id", deleteBlog);

// update a single blog
router.patch("/:id", updateBlogPost);

module.exports = router;
