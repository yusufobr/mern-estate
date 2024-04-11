import mongoose from "mongoose";
import Like from "../models/likes.model.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find(
      {},
      "name description adress images discountedPrice type userRef bedrooms bathrooms parking furnished propertyType"
    ).sort({ createdAt: -1 });

    const promises = listings.map(async (listing) => {
      const user = await User.findById(listing.userRef);
      if (!user) return null;
      return { username: user.username, avatar: user.profilePicture };
    });

    const postedByInfos = await Promise.all(promises);

    const correctedListings = listings.map((listing, index) => {
      return {
        id: listing._id,
        title: listing.name,
        description: listing.description,
        adress: listing.adress,
        images: listing.images,
        price: listing.discountedPrice,
        category: listing.type,
        propertyType: listing.propertyType,
        bedroom: listing.bedrooms,
        bathroom: listing.bathrooms,
        parking: listing.parking,
        furnished: listing.furnished,
        postedBy: postedByInfos[index],
      };
    });
    return res.status(200).json(correctedListings);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "userRef",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          userDetails: {
            username: "$userDetails.username",
            avatar: "$userDetails.profilePicture",
          },
          name: 1,
          description: 1,
          adress: 1,
          images: 1,
          discountedPrice: 1,
          type: 1,
          bedrooms: 1,
          bathrooms: 1,
          parking: 1,
          furnished: 1,
          propertyType: 1,
        },
      },
    ];
    const listings = await Listing.aggregate(pipeline);

    const correctedListing = listings.map((listing) => {
      return {
        id: listing._id,
        title: listing.name,
        description: listing.description,
        adress: listing.adress,
        images: listing.images,
        price: listing.discountedPrice,
        category: listing.type,
        propertyType: listing.propertyType,
        bedroom: listing.bedrooms,
        bathroom: listing.bathrooms,
        parking: listing.parking,
        furnished: listing.furnished,
        postedBy: listing.userDetails,
      };
    });

    return res.status(200).json(correctedListing);
  } catch (error) {
    next(error);
  }
};

export const getSinglePost = async (req, res, next) => {
  try {
    const listing = await Listing.findById(
      req.params.id,
      "name description adress images discountedPrice type userRef bedrooms bathrooms parking furnished propertyType"
    );

    const user = await User.findById(listing.userRef);

    const likes = await Like.find({ listing: req.params.id });

    const correctedListing = {
      id: listing._id,
      title: listing.name,
      description: listing.description,
      adress: listing.adress,
      images: listing.images,
      price: listing.discountedPrice,
      category: listing.type,
      propertyType: listing.propertyType,
      bedroom: listing.bedrooms,
      bathroom: listing.bathrooms,
      parking: listing.parking,
      furnished: listing.furnished,
      postedBy: { username: user.username, avatar: user.profilePicture },
      likes: likes.length || 0,
    };
    return res.status(200).json(correctedListing);
  } catch (error) {
    next(errorHandler(404, "Listing not found!"));
  }
};

export const getMyListings = async (req, res, next) => {
  try {
    const listing = await Listing.find(
      { userRef: req.params.id },
      "name description adress images discountedPrice propertyType"
    ).sort({ createdAt: -1 });

    const correctedListings = listing.map((listing) => {
      return {
        id: listing._id,
        title: listing.name,
        description: listing.description,
        propertyType: listing.propertyType,
        adress: listing.adress,
        images: listing.images,
        price: listing.discountedPrice,
      };
    });

    return res.status(200).json(correctedListings);
  } catch (error) {
    next(error);
  }
};

export const getSpecificListings = async (req, res, next) => {
  try {
    // listingklist is an array of listing ids
    const { listingList } = req.body;
    const newIds = await listingList.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    const pipeline = [
      { $match: { _id: { $in: newIds } } },
      {
        $lookup: {
          from: "users",
          localField: "userRef",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          userDetails: {
            username: "$userDetails.username",
            avatar: "$userDetails.profilePicture",
          },
          name: 1,
          description: 1,
          adress: 1,
          images: 1,
          discountedPrice: 1,
          type: 1,
          bedrooms: 1,
          bathrooms: 1,
          parking: 1,
          furnished: 1,
          propertyType: 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ];

    const listing = await Listing.aggregate(pipeline);

    const correctedListings = listing.map((listing) => {
      return {
        id: listing._id,
        title: listing.name,
        description: listing.description,
        adress: listing.adress,
        images: listing.images,
        propertyType: listing.propertyType,
        price: listing.discountedPrice,
        bedroom: listing.bedrooms,
        bathroom: listing.bathrooms,
        parking: listing.parking,
        furnished: listing.furnished,
        postedBy: listing.userDetails,
      };
    });

    return res.status(200).json(correctedListings);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  const userRefStr = listing.userRef.toString();
  if (req.user.id !== userRefStr) {
    return next(
      errorHandler(403, "You are not authorized to delete this listing!")
    );
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing has been deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(
      errorHandler(403, "You are not authorized to update this listing!")
    );
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    let furnished = req.query.furnished;
    let parking = req.query.parking;
    let type = req.query.type;
    let propertyType = req.query.propertyType;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    if (propertyType === undefined || propertyType === "all") {
      propertyType = { $in: ["house", "apartment", "studio"] };
    }

    const listings = await Listing.aggregate([
      {
        $match: {
          $and: [
            { name: { $regex: searchTerm, $options: "i" } },
            { type },
            { furnished },
            { parking },
            { propertyType },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userRef",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          userDetails: {
            username: "$userDetails.username",
            avatar: "$userDetails.profilePicture",
          },
          name: 1,
          description: 1,
          adress: 1,
          images: 1,
          discountedPrice: 1,
          type: 1,
          bedrooms: 1,
          bathrooms: 1,
          parking: 1,
          furnished: 1,
          propertyType: 1,
        },
      },
    ])
      .sort({ [sort]: order })
      .skip(startIndex)
      .limit(limit);

    const correctedListings = listings.map((listing) => {
      return {
        id: listing._id,
        title: listing.name,
        description: listing.description,
        adress: listing.adress,
        images: listing.images,
        price: listing.discountedPrice,
        category: listing.type,
        propertyType: listing.propertyType,
        bedroom: listing.bedrooms,
        bathroom: listing.bathrooms,
        parking: listing.parking,
        furnished: listing.furnished,
        postedBy: listing.userDetails,
      };
    });

    return res.status(200).json(correctedListings);
  } catch (error) {
    next(error);
  }
};
