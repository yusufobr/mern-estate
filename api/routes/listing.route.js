import expres from 'express';
import { createListing, getAllListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = expres.Router();

router.post('/create', verifyToken, createListing);
router.get('/all', getAllListings);

export default router;