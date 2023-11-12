import express from "express";
import { updateUserInfo, userController } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", userController);
router.post("/update/:id",verifyToken, updateUserInfo)

export default router;
