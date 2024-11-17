import express from "express";
import { getme, login, logout, register } from "../controller/user.controller.js";
import protectRoutes from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getme", protectRoutes, getme);

export default router;
