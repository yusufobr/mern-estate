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
      "name description adress images discountedPrice type userRef bedrooms bathrooms parking furnished"
    ).sort({ createdAt: -1 });

    const promises = listings.map(async (listing) => {
      const user = await User.findById(listing.userRef);
      if (!user) return null;
      return { username: user.username, avatar: user.profilePicture };
    });

    const profilePictures = await Promise.all(promises);

    const correctedListings = listings.map((listing, index) => {
      return {
        id: listing._id,
        title: listing.name,
        description: listing.description,
        adress: listing.adress,
        images: listing.images,
        price: listing.discountedPrice,
        category: listing.type,
        bedroom: listing.bedrooms,
        bathroom: listing.bathrooms,
        parking: listing.parking,
        furnished: listing.furnished,
        postedBy: profilePictures[index],
      };
    });
    return res.status(200).json(correctedListings);
  } catch (error) {
    next(error);
  }
};

export const getSinglePost = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id, "name description adress images discountedPrice type userRef bedrooms bathrooms parking furnished");
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    };
    const correctedListing = {
      id: listing._id,
      title: listing.name,
      description: listing.description,
      adress: listing.adress,
      images: listing.images,
      price: listing.discountedPrice,
      category: listing.type,
      bedroom: listing.bedrooms,
      bathroom: listing.bathrooms,
      parking: listing.parking,
      furnished: listing.furnished,
    };
    return res.status(200).json(correctedListing);
  } catch (error) {
    next(error);
  }
};

export const getMyListings = async (req, res, next) => {
  try {
    const listing = await Listing.find(
      { userRef: req.params.id },
      "name description adress images discountedPrice"
    ).sort({ createdAt: -1 });

    const correctedListings = listing.map((listing) => {
      return {
        id: listing._id,
        title: listing.name,
        description: listing.description,
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


export const deleteListing = async (req, res, next) => {
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Listing has been deleted successfully!" })
    } catch (error) {
        next(error);
    }
};