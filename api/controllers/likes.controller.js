import Like from "../models/likes.model.js";

export const addLike = async (req, res, next) => {
  try {
    const { user, listing } = req.body;
    const like = await Like.create({
      user,
      listing,
    });
    return res.status(201).json(like);
  } catch (error) {
    next(error);
  }
};
