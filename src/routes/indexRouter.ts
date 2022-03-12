import express from "express";
import authMiddleware from "../middlewares/auth";
import kycRoutes from "./kycRoutes";
import userRoutes from "./userRoutes";
import tickerRoutes from "./tickerRoutes";
import portfolioRoutes from "./portfolioRoutes";
import investmentsRoutes from "./investmentsRoutes";

const router = express.Router();

router.use("/kyc", authMiddleware, kycRoutes);
router.use("/users", authMiddleware, userRoutes);
router.use("/tickers", tickerRoutes);
router.use("/portfolios", authMiddleware, portfolioRoutes);
router.use("/investments", authMiddleware, investmentsRoutes);

export default router;
