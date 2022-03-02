// import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import { getUID } from "../../utils/";
import {
    approveVauldInstantKYC,
    initiateVauldKYC,
    initiateVauldManualKYCVerification,
    requestVauldKYCDocsUploadURL,
    verifyVauldUploadedKYCDoc,
    verifyVauldUploadedSelfie,
} from "../../vauldAPI/kyc";
import {
    IVerifyUploadedDocRequestData,
    UploadedKYCDocType,
} from "../../types/kyc";
import {
    IApproveVauldInstantKYCRequestData,
    IVerifyVauldKYCUploadedDocRequestData,
    IVerifyVauldKYCUploadedSelfieRequestData,
} from "../../vauldAPI/_types/_kyc";
import {
    USERS_COLLECTION,
    USER_PRIVATE_COLLECTION,
    USER_PRIVATE_VAULD_DATA_DOC,
} from "./constants";

// TODO: Add return types here to make it easier to find types
// export const initiateKYC = functions.https.onCall(async (data, context) => {
//     //TODO(Sumeet): Below line will change as userId fetching will change.
//     // const userId = getUID(context);
//
//     // TODO: Abstract out crud methods
//     // Get user data
//     // TODO: Add sensitive_type here to understand id type
//     const db = admin.firestore();
//     const userRef = await db
//         .collection(USERS_COLLECTION)
//         .doc(userId)
//         .collection(USER_PRIVATE_COLLECTION)
//         .doc(USER_PRIVATE_VAULD_DATA_DOC)
//         .get();
//     const userData = userRef.data();
//
//     // initiate kyc
//     const result = await initiateVauldKYC({
//         docType: UploadedKYCDocType.AADHAR,
//         userID: userData?.vauldUserID,
//     });
//
//     if (!result.success) {
//         throw new Error("Couldn't initiate kyc with vauld");
//     }
//
//     const docsUploadURLs = await requestVauldKYCDocsUploadURL({
//         userID: userData?.vauldUserID,
//     });
//
//     return docsUploadURLs;
// });
//
// export const verifyUploadedKYCDoc = functions.https.onCall(
//     async (data: IVerifyUploadedDocRequestData, context) => {
//         const userId = getUID(context);
//
//         // TODO: Abstract out crud methods
//         // Get user data
//         // TODO: Add sensitive_type here to understand id type
//         const db = admin.firestore();
//         const userRef = await db
//             .collection(USERS_COLLECTION)
//             .doc(userId)
//             .collection(USER_PRIVATE_COLLECTION)
//             .doc(USER_PRIVATE_VAULD_DATA_DOC)
//             .get();
//         const userData = userRef.data();
//
//         const payload: IVerifyVauldKYCUploadedDocRequestData = {
//             documentType: data.documentType,
//             userID: userData?.vauldUserID,
//             frontOrBack: data.frontOrBack,
//         };
//
//         const result = await verifyVauldUploadedKYCDoc(payload);
//
//         return result;
//     }
// );
//
// export const verifyUploadedKYCSelfie = functions.https.onCall(
//     async (data, context) => {
//         const userId = getUID(context);
//
//         // TODO: Abstract out crud methods
//         // Get user data
//         // TODO: Add sensitive_type here to understand id type
//         const db = admin.firestore();
//         const userRef = await db
//             .collection(USERS_COLLECTION)
//             .doc(userId)
//             .collection(USER_PRIVATE_COLLECTION)
//             .doc(USER_PRIVATE_VAULD_DATA_DOC)
//             .get();
//         const userData = userRef.data();
//
//         const payload: IVerifyVauldKYCUploadedSelfieRequestData = {
//             userID: userData?.vauldUserID,
//         };
//
//         const result = await verifyVauldUploadedSelfie(payload);
//
//         return result;
//     }
// );
//
// export const requestKYCApproval = functions.https.onCall(
//     async (data, context) => {
//         const userId = getUID(context);
//
//         // TODO: Abstract out crud methods
//         // Get user data
//         // TODO: Add sensitive_type here to understand id type
//         const db = admin.firestore();
//         const userRef = await db
//             .collection(USERS_COLLECTION)
//             .doc(userId)
//             .collection(USER_PRIVATE_COLLECTION)
//             .doc(USER_PRIVATE_VAULD_DATA_DOC)
//             .get();
//         const userData = userRef.data();
//
//         const payload: IApproveVauldInstantKYCRequestData = {
//             userID: userData?.vauldUserID,
//         };
//
//         const result = await approveVauldInstantKYC(payload);
//
//         if (result.success) {
//             await admin.auth().setCustomUserClaims(userId, { isKYCDone: true });
//             return result;
//         }
//
//         const manualKYCResult = await initiateVauldManualKYCVerification(payload);
//
//         return manualKYCResult;
//     }
// );