const BlogPost = require("../models/blogPostModel");
const mongoose = require("mongoose");

// get all blogs
const getBlogPosts = async (req, res) => {
  const blog = await BlogPost.find({}).sort({ createdAt: -1 });
  res.status(200).json(blog);
};

const getBlogPostsForUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    const authorId  = req.user._id;
    const blog = await BlogPost.find({ authorId }).sort({ createdAt: -1 });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const getUserBlogPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all blog posts by the specific user
    const blogPosts = await BlogPost.find({ authorId: userId });

    if (!blogPosts.length) {
      return res.status(404).json({ message: "No blog posts found for this user" });
    }

    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog posts", error });
  }
};


// get single blog
const getBlogPost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Blog not found" });
  }
  const blog = await BlogPost.findById(id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.status(200).json(blog);
};

// create new blog
const createBlogPost = async (req, res) => {
  const { image, title, slug, blogbody } = req.body;
  try {
    const authorId = req.user._id;
    const blog = await BlogPost.create({
      image,
      title,
      slug,
      blogbody,
      authorId,
    });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Blog not found" });
  }
  const blog = await BlogPost.findOneAndDelete({ _id: id });
  if (!blog) {
    return res.status(400).json({ error: "Blog not found" });
  }
  res.status(200).json(blog);
};

// update blog
const updateBlogPost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Blog not found" });
  }

  const blog = await BlogPost.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!blog) {
    return res.status(400).json({ error: "Blog not found" });
  }
  res.status(200).json(blog);
};

module.exports = {
  createBlogPost,
  getBlogPosts,
  getBlogPost,
  deleteBlog,
  updateBlogPost,
  getBlogPostsForUser,
  getUserBlogPosts
};
