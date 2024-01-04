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
    if(findLike.user != user) {
      return res.status(401).json("You can remove only your likes");
    }
    await Like.findByIdAndDelete(findLike._id);
    return res.status(200).json("Like removed");

  } catch (error) {
    next(error);
  }
};

// check if i liked the listing
export const checkLike = async (req, res, next) => {
  try {
    const { user, listing } = req.body;
    const findLike = await Like.findOne({ user, listing });
    if (!findLike) {
      return res.status(200).json(false);
    }
    return res.status(200).json(true);
  } catch (error) {
    next(error);
  }
};

export const favorites = async (req, res, next) => {
  try {
    const { user } = req.body;
    const findFavorites = await Like.find({ user }, "listing").sort({ createdAt: -1 });
    if (findFavorites.length === 0) {
      return res.status(200).json("You have no favorites");
    }
    const favorites = findFavorites.map(like => like.listing);
    return res.status(200).json(favorites);

  } catch (error) {
    next(error);
  }
};