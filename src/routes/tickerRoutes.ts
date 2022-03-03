import express from "express";
import { updateAllTickerPrice } from "../controllers/tickerController";

const router = express.Router();

router.post("/update_daily_ticker_price", updateAllTickerPrice);

export default router;
