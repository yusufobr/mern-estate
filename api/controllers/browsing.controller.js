import Browsing from "../models/browsing.model.js";
import Listing from "../models/listing.model.js";

export const addListingToBrowsing = async (req, res) => {
  try {
    const { userId, listingId } = req.body; // assuming userId and listingId are passed in the request body

    // Find the browsing record for the user
    let browsing = await Browsing.findOne({ user: userId });

    // If no browsing record exists, create a new one
    if (!browsing) {
      browsing = new Browsing({ user: userId, listings: [listingId] });
    } else {
      // Add listingId to the listings array if it's not already there
      if (!browsing.listings.includes(listingId)) {
        browsing.listings.push(listingId);
      }
    }

    // Save the updated browsing document
    await browsing.save();

    res.status(200).json({
      message: "Listing added to browsing history.",
      userId,
      listingId,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding listing to browsing history.", error });
  }
};

export const getBrowsingHistory = async (req, res) => {
  try {
    const { userId } = req.params; // assuming userId is passed as a parameter in the request

    // Find the browsing record for the user
    const browsing = await Browsing.findOne({ user: userId });
    if (!browsing) {
      return res
        .status(404)
        .json({ message: "No browsing history found for this user." });
    }
    const listings = await Listing.find({
      _id: { $in: browsing.listings },
    })
      .sort({ createdAt: -1 })
      .limit(5);

    if (!browsing) {
      return res
        .status(200)
        .json({ message: "No browsing history found for this user." });
    }

    res
      .status(200)
      .json({ message: "Browsing history retrieved successfully.", listings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving browsing history.", error });
  }
};
