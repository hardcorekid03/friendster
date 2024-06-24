const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPostSchema = new Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model ('BlogPost', blogPostSchema)
