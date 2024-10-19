import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { addListingToBrowsing, getBrowsingHistory } from '../controllers/browsing.controller.js';

const router = express.Router();

router.post('/add', verifyToken, addListingToBrowsing);
router.get('/get/:userId', verifyToken, getBrowsingHistory);

export default router;