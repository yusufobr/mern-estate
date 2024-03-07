import expres from "express";
import {
  createListing,
  deleteListing,
  getAll,
  getMyListings,
  getSinglePost,
  getSpecificListings,
  search,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = expres.Router();

router.post("/create", verifyToken, createListing);
router.post("/mylistings/:id", verifyToken, getMyListings);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/all", getAll);
router.get("/post/:id", getSinglePost);
router.post("/getSpecificListings", getSpecificListings);
router.get("/search", search);

export default router;
