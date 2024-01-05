import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { addComment, getComments, removeComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/add", verifyToken, addComment);
router.post("/remove", verifyToken, removeComment);
router.get("/get", getComments);

export default router;