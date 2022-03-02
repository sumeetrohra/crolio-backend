import express from "express";
import authMiddleware from "../middlewares/auth";
import kycRoutes from "./kycRoutes";
import userRoutes from "./userRoutes";

const router = express.Router();

router.use("/kyc", authMiddleware, kycRoutes);
router.use("/users", authMiddleware, userRoutes);

export default router;
