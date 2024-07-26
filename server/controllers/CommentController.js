const Comment = require("../models/Comment");
const BlogPost = require("../models/blogPostModel");
const mongoose = require("mongoose");


const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;

    // Validate if blogId is provided
    if (!blogId) {
      return res.status(400).json({ error: "Blog ID is required" });
    }

    // Fetch and sort comments based on createdAt in descending order
    const comments = await Comment.find({ blogId })
      .populate("author", "username")
      .sort({ createdAt: -1 }); // Sort by createdAt field in descending order
      
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error.message); // Log detailed error
    res
      .status(500)
      .json({ error: "Error fetching comments", details: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { text } = req.body;

    // Validate inputs
    if (!blogId || !text) {
      return res.status(400).json({ error: "Blog ID and text are required" });
    }

    // Validate if blogId is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ error: "Invalid Blog ID format" });
    }

    // Validate if blog exists
    const blogExists = await BlogPost.findById(blogId);
    if (!blogExists) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Validate user
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Create and save new comment
    const newComment = new Comment({
      text,
      blogId,
      author: req.user._id,
    });

    const savedComment = await newComment.save();

    // Populate author field
    const populatedComment = await Comment.findById(savedComment._id)
      .populate("author", "username")
      .exec();

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error("Error adding comment:", error.message); // Log the exact error message
    res.status(500).json({ error: "Error adding comment" });
  }
};

const deleteComment = async (req, res) => {

  const { commentId } = req.params;

  try {
    // Find the comment and delete it
    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




module.exports = {
  getComments,
  addComment,
  deleteComment
};
