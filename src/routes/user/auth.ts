// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import { ICreateUserAccountRequestData } from "../types/kyc";
// import { createVauldAccount } from "../vauldAPI/user";
// import { getUID } from "../utils/auth";
// import {
//     USERS_COLLECTION,
//     USER_PRIVATE_COLLECTION,
//     USER_PRIVATE_VAULD_DATA_DOC,
// } from "./constants";
//
// export const createUserAccount = functions.https.onCall(
//     async (data: ICreateUserAccountRequestData, context) => {
//         const userId = getUID(context);
//
//         // Create vauld user account
//         const vauldUserDetails = await createVauldAccount({
//             userIdentifier: userId,
//             isCorporate: false,
//         });
//
//         const vauldData = vauldUserDetails;
//         if (!vauldData.success && vauldData.error) {
//             functions.logger.log(
//                 "User creation failed, here's the response from vauld: ",
//                 vauldData
//             );
//             throw new Error(vauldData.error?.message);
//         }
//
//         // Create vauld firestore account
//         const db = admin.firestore();
//         const userRef = await db.collection(USERS_COLLECTION).doc(userId);
//
//         const today = new Date();
//
//         await userRef.create({
//             userInfo: {
//                 firstName: data.firstName,
//                 lastName: data.lastName,
//                 createdAt: today,
//                 updatedAt: today,
//             },
//         });
//
//         await userRef
//             .collection(USER_PRIVATE_COLLECTION)
//             .doc(USER_PRIVATE_VAULD_DATA_DOC)
//             .create({
//                 vauldUserID: vauldData.data?.userID,
//             });
//
//         return {
//             success: true,
//             data: {
//                 message: "user created",
//                 uid: userId,
//             },
//         };
//     }
// );