const express = require("express");
const {
  createBlogPost,
  getBlogPosts,
  getBlogPost,
  deleteBlog,
  updateBlogPost,
  getBlogPostsForUser,
  getBlogPostsById,
} = require("../controllers/BlogController");
const requireAuth = require ('../middleware/requireAuth')


const router = express.Router();

router.use (requireAuth)

// get all blogs
router.get("/all", getBlogPosts);
// get a single blog
router.get("/:id", getBlogPost);

router.get("/", getBlogPostsForUser);

// get blogs by id
// router.get("/post/:authorId", getBlogPostsById);

// create a single blog
router.post("/", createBlogPost);

// delete a single blog
router.delete("/:id", deleteBlog);

// update a single blog
router.patch("/:id", updateBlogPost);



module.exports = router;
