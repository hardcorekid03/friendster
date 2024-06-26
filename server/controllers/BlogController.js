const BlogPost = require ('../models/blogPostModel')
const mongoose = require("mongoose");

// get all blogs
const getBlogPosts = async (req, res) => {
  const blog = await BlogPost.find({}).sort({ createdAt: -1 });
  res.status(200).json(blog);
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

  // create new coffee
const createBlogPost = async (req, res) => {
    const {image,title,slug,blogbody,author,authorId} = req.body
    try {
        const blog = await BlogPost.create({ image, title, slug, blogbody, author,authorId })
        res.status(200).json(blog)
      } catch (error) {
        res.status(400).json({ error: error.message })
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

  // update coffee
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
  };
  