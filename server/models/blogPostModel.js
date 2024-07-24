const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPostSchema = new Schema(
  {
    image: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
      unique: false,
    },
    blogbody: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    favoritesCount: { type: Number, default: 0 }, // Add this line
  },
  { timestamps: true }
);

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
module.exports = BlogPost;
