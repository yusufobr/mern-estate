import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { addLike, checkLike, favorites, removeLike } from "../controllers/likes.controller.js";

const router = express.Router();

router.post("/add", verifyToken, addLike);
router.post("/remove", verifyToken, removeLike);
router.post("/check", verifyToken, checkLike);
router.post("/favorites", verifyToken, favorites);

export default router;
