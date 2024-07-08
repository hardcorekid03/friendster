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
      unique:false,
    },
    slug: {
      type: String,
      required: true,
      unique:false,

    },
    blogbody: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model ('BlogPost', blogPostSchema)
