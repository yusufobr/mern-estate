import Comment from "../models/comment.model.js";

export const addComment = async (req, res, next) => {
  try {
    const { listing, comment, user } = req.body;
    const newComment = await Comment.create({
      user,
      listing,
      comment,
    });
    return res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const removeComment = async (req, res, next) => {
  try {
    const { commentId, user } = req.body;
    const findComment = await Comment.findById(commentId);
    if (!findComment) {
      return res.status(404).json("Comment not found");
    }
    if (findComment.user != user) {
      return res.status(401).json("You can delete only your comments");
    }
    await Comment.findByIdAndDelete(commentId);
    return res.status(200).json("Comment removed");
  } catch (error) {
    next(error);
  }
};
