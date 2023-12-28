import expres from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { addLike, checkLike, removeLike } from "../controllers/likes.controller.js";

const router = expres.Router();

router.post("/add", verifyToken, addLike);
router.post("/remove", verifyToken, removeLike);
router.post("/check", verifyToken, checkLike);

export default router;
