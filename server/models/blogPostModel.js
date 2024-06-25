const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPostSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique:true,
    },
    slug: {
      type: String,
      required: true,
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
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model ('BlogPost', blogPostSchema)
