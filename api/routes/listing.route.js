import expres from 'express';
import { createListing, getAllListings, getMyListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = expres.Router();

router.post('/create', verifyToken, createListing);
router.post('/mylistings/:id', verifyToken, getMyListings);
router.get('/all', getAllListings);

export default router;