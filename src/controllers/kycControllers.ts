import {
  approveVauldInstantKYC,
  initiateVauldKYC,
  initiateVauldManualKYCVerification,
  requestVauldKYCDocsUploadURL,
  verifyVauldUploadedKYCDoc,
  verifyVauldUploadedSelfie,
} from "../vauldAPI/kyc";
import { UploadedDocFace, UploadedKYCDocType } from "../types/kyc";
import { getUserByFirebaseIdentifier } from "./userController";
import { IVerifyVauldKYCUploadedDocRequestData } from "../vauldAPI/_types/_kyc";
import UserModel from "../models/userModel";

export const initiateKYC = async (req, res) => {
  const uid = req.uid;
  const user = await getUserByFirebaseIdentifier(uid);
  const data = await initiateVauldKYC({
    docType: UploadedKYCDocType.AADHAR,
    userID: user._private._vauldUserId,
  });
  if (!data.success) {
    throw new Error("Couldn't initiate kyc with vauld");
  }
  const docsUploadURLs = await requestVauldKYCDocsUploadURL({
    userID: user._private._vauldUserId,
  });
  return res.status(201).json(docsUploadURLs);
};

export const verifyDoc = async (req, res) => {
  const uid = req.uid;
  const data = req.body;
  const user = await getUserByFirebaseIdentifier(uid);
  const payload: IVerifyVauldKYCUploadedDocRequestData = {
    documentType: data.documentType,
    userID: user._private._vauldUserId,
    frontOrBack: data.frontOrBack,
  };
  const result = await verifyVauldUploadedKYCDoc(payload);
  // @ts-ignore
  if (result.success) {
    let newKycStatus = { ...user.kycStatus };
    if (
      payload.documentType === UploadedKYCDocType.AADHAR &&
      payload.frontOrBack === UploadedDocFace.FRONT
    ) {
      newKycStatus = { ...newKycStatus, isAadharFrontVerified: true };
    } else if (
      payload.documentType === UploadedKYCDocType.AADHAR &&
      payload.frontOrBack === UploadedDocFace.BACK
    ) {
      newKycStatus = { ...newKycStatus, isAadharBackVerified: true };
    } else if (payload.documentType === UploadedKYCDocType.PAN_CARD) {
      newKycStatus = { ...newKycStatus, isPanCardVerified: true };
    }
    await UserModel.findOneAndUpdate(
      { firebaseIdentifier: uid },
      {
        $set: {
          kycStatus: newKycStatus,
        },
      }
    );
    return res.status(200).json(result);
  }
  return res.status(500);
};

export const verifySelfie = async (req, res) => {
  const uid = req.uid;
  const user = await getUserByFirebaseIdentifier(uid);
  const payload = {
    userID: user._private._vauldUserId,
  };
  const result = await verifyVauldUploadedSelfie(payload);

  // @ts-ignore
  if (result.success) {
    await UserModel.findOneAndUpdate(
      { firebaseIdentifier: uid },
      {
        $set: {
          kycStatus: { ...user.kycStatus, isSelfieVerified: true },
        },
      }
    );
    return res.status(200).json(result);
  }
  return res.status(500);
};

export const requestKYCApproval = async (req, res) => {
  const uid = req.uid;
  const user = await getUserByFirebaseIdentifier(uid);
  const payload = {
    userID: user._private._vauldUserId,
  };

  const result = await approveVauldInstantKYC(payload);

  if (result.success) {
    // await admin.auth().setCustomUserClaims(userId, { isKYCDone: true });
    await UserModel.findOneAndUpdate(
      { firebaseIdentifier: uid },
      {
        $set: {
          kycStatus: { ...user.kycStatus, isKYCDone: true },
        },
      }
    );
    return res.status(200).json({});
  }

  const manualKYCResult = await initiateVauldManualKYCVerification(payload);
  if (manualKYCResult.success) {
    await UserModel.findOneAndUpdate(
      { firebaseIdentifier: uid },
      {
        $set: {
          kycStatus: { ...user.kycStatus, isManualKYCApprovalInitiated: true },
        },
      }
    );
  }

  return manualKYCResult;
};

// TODO: Sumeet For manual kyc check
// export const getKycStatusFromVauld = async (req, res) => {};
