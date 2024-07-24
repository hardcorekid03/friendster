const BlogPost = require("../models/blogPostModel");
const User = require("../models/UserModel");
const mongoose = require("mongoose");

// get all blogs
const getBlogPosts = async (req, res) => {
  const blog = await BlogPost.find({}).sort({ createdAt: -1 });
  res.status(200).json(blog);
};

const getBlogPostsForUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const authorId = req.user._id;
    const blog = await BlogPost.find({ authorId }).sort({ createdAt: -1 });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUserBlogPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all blog posts by the specific user
    const blogPosts = await BlogPost.find({ authorId: userId }).sort({ createdAt: -1 });

    if (!blogPosts.length) {
      return res
        .status(404)
        .json({ message: "No blog posts found for this user" });
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

const addFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { blogId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favorites.includes(blogId)) {
      user.favorites.push(blogId);
      await user.save();

      const blog = await BlogPost.findById(blogId);
      if (blog) {
        blog.favoritesCount += 1;
        await blog.save();
      }

      return res.status(200).json({ message: "Blog added to favorites" });
    }

    return res.status(400).json({ message: "Blog is already in favorites" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
const removeFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { blogId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favorites.includes(blogId)) {
      user.favorites = user.favorites.filter(
        (favId) => favId.toString() !== blogId
      );
      await user.save();

      const blog = await BlogPost.findById(blogId);
      if (blog) {
        blog.favoritesCount -= 1;
        await blog.save();
      }

      return res.status(200).json({ message: "Blog removed from favorites" });
    }

    return res.status(400).json({ message: "Blog is not in favorites" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const checkFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const { blogId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFavorite = user.favorites.includes(blogId);
    return res.status(200).json({ isFavorite });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    // Find the user and populate their favorites
    const user = await User.findById(userId).populate({
      path: "favorites",
      options: { sort: { createdAt: -1 } }
    });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the populated favorites
    res.status(200).json(user.favorites);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const getUserFavoritesById = async (req, res) => {
  try {
    const{userId}  = req.params;

    // Find the user and populate their favorites
    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the populated favorites
    res.status(200).json(user.favorites);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createBlogPost,
  getBlogPosts,
  getBlogPost,
  deleteBlog,
  updateBlogPost,
  getBlogPostsForUser,
  getUserBlogPosts,
  addFavorite,
  removeFavorite,
  checkFavorite,
  getUserFavorites,
  getUserFavoritesById,
};
