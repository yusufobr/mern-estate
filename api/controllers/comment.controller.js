import mongoose from "mongoose";
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

export const getComments = async (req, res, next) => {
  let { limit, listingId } = req.query;

  try {
    if (!listingId) {
      return res.status(400).json({ message: "Listing ID is required." });
    }

    let parsedLimit = 3; // Default limit value if 'limit' query parameter is not provided

    // Check if 'limit' query parameter is provided and it's a number
    if (limit && !isNaN(parseInt(limit))) {
      parsedLimit = parseInt(limit);
    }
    // create a mongoo object id from the listing id
    const objectIdListingId = new mongoose.Types.ObjectId(listingId);

    const comments = await Comment.aggregate([
      {
        $match: { listing: objectIdListingId }
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails"
      },
      {
        $project: {
          comment: 1,
          createdAt: 1,
          updatedAt: 1,
          userDetails: {
            username: "$userDetails.username",
            profilePicture: "$userDetails.profilePicture"
          }
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $limit: parsedLimit
      }
    ]);

    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const getCommentsCount = async (req, res, next) => {
  let { listingId } = req.query;

  try {
    if (!listingId) {
      return res.status(400).json({ message: "Listing ID is required." });
    }

    // create a mongoo object id from the listing id
    const objectIdListingId = new mongoose.Types.ObjectId(listingId);

    const commentsCount = await Comment.aggregate([
      {
        $match: { listing: objectIdListingId }
      },
      {
        $count: "commentsCount"
      }
    ]);

    return res.status(200).json(commentsCount);
  } catch (error) {
    next(error);
  }
};

export const getUserCommentsCount = async (req, res, next) => {
  const { userId } = req.query;
  try {
    const likesNumber = await Comment.find({ user: userId }).countDocuments();
    return res.status(200).json(likesNumber);

  } catch (error) {
    next(error);
  }
};