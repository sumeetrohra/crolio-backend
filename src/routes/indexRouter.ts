import express from "express";
import authMiddleware from "../middlewares/auth";
import kycRoutes from "./kycRoutes";
import userRoutes from "./userRoutes";
import tickerRoutes from "./tickerRoutes";

const router = express.Router();

router.use("/kyc", authMiddleware, kycRoutes);
router.use("/users", authMiddleware, userRoutes);
router.use("/tickers", tickerRoutes);

export default router;
