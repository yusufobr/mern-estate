import expres from "express";
import {
  createListing,
  deleteListing,
  getAllListings,
  getMyListings,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = expres.Router();

router.post("/create", verifyToken, createListing);
router.post("/mylistings/:id", verifyToken, getMyListings);
router.delete("/delete/:id", verifyToken, deleteListing);
router.get("/all", getAllListings);

export default router;
