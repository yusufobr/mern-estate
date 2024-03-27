import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { addComment, getComments, getUserCommentsCount, removeComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/add", verifyToken, addComment);
router.post("/remove", verifyToken, removeComment);
router.get("/get", getComments);
router.get("/userCommentsCount", verifyToken, getUserCommentsCount);

export default router;