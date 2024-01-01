import expres from "express";
import {
  createListing,
  deleteListing,
  getAllListings,
  getMyListings,
  getSinglePost,
  getSpecificListings,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = expres.Router();

router.post("/create", verifyToken, createListing);
router.post("/mylistings/:id", verifyToken, getMyListings);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/all", getAllListings);
router.get("/post/:id", getSinglePost);
router.post("/getSpecificListings", getSpecificListings);

export default router;
