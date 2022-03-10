import express from "express";
import {
  getAllTickers,
  updateAllTickerPrice,
} from "../controllers/tickerController";

const router = express.Router();

router.get("/update_daily_ticker_price", updateAllTickerPrice);
router.get("/", getAllTickers);

export default router;
