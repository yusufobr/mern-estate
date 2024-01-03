import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { addComment, removeComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/add", verifyToken, addComment);
router.post("/remove", verifyToken, removeComment);

export default router;