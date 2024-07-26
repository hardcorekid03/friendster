const express = require("express");
const { getComments, addComment,deleteComment } = require("../controllers/CommentController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);


router.get("/:blogId/comments", getComments);
router.post("/:blogId/comments", addComment);
router.delete("/:blogId/comments/:commentId", deleteComment);

module.exports = router;
