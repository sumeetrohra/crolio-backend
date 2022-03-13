import express from "express";
import {
  addInvestment,
  getAllUserInvestments,
} from "../controllers/investmentController";

const router = express.Router();

router.post("/invest", addInvestment);
router.get("/", getAllUserInvestments);

export default router;
