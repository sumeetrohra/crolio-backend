import express from "express";
import {
  createPortfolio,
  getAllPortfolios,
  getPortfolioData,
} from "../controllers/portfolioController";

const router = express.Router();

// router.post("/create", createPortfolio);
router.get("/", getAllPortfolios);
router.get("/:portfolioId", getPortfolioData);

export default router;
