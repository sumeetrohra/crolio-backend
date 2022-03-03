import express from "express";
import {
  initiateKYC,
  verifyDoc,
  verifySelfie,
  requestKYCApproval,
} from "../controllers/kycControllers";

const router = express.Router();

router.get("/initiateKYC", initiateKYC);
router.post("/verify_doc", verifyDoc);
router.post("/verify_selfie", verifySelfie);
router.post("/request_kyc_approval", requestKYCApproval);

export default router;
