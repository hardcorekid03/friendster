const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogPost",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},

{ timestamps: true }

);



const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
