import express from "express";
import {
  initiateKYC,
  verifyDoc,
  verifySelfie,
  requestKYCApproval,
  getKycStatus,
} from "../controllers/kycControllers";

const router = express.Router();

router.get("/initiateKYC", initiateKYC);
router.post("/verify_doc", verifyDoc);
router.post("/verify_selfie", verifySelfie);
router.post("/request_kyc_approval", requestKYCApproval);
router.post("/get_kyc_status", getKycStatus);

export default router;
