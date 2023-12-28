import expres from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { addLike } from "../controllers/likes.controller.js";

const router = expres.Router();

router.post("/add", verifyToken, addLike);

export default router;
