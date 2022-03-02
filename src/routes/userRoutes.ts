import express from "express";
import { createUser, getUser } from "../controllers/userController";

const router = express.Router();

router.post("/", createUser);

router.get("/:userId", getUser);

export default router;
