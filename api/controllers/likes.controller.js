import Like from "../models/likes.model.js";

export const addLike = async (req, res, next) => {
  try {
    const { user, listing } = req.body;

    const existingLike = await Like.findOne({ user, listing });

    if (existingLike) {
      return res.status(208).json("You already liked this listing");
    }

    const like = await Like.create({
      user,
      listing,
    });
    
    return res.status(201).json(like);
  } catch (error) {
    next(error);
  }
};

export const removeLike = async (req, res, next) => {
  try {
    const { user, listing } = req.body;
    const findLike = await Like.findOne({ user, listing });
    if (!findLike) {
      return res.status(404).json("Like not found");
    }
    await Like.findByIdAndDelete(findLike._id);
    return res.status(200).json("Like removed");

  } catch (error) {
    next(error);
  }
};
