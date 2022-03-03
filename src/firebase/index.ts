import firebase, { ServiceAccount } from "firebase-admin";
import "dotenv/config";
import credentials from "../config/credentials";

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: process.env.DATABASE_URL_FIREBASE.replace(/\\n/g, "\n"),
});

export default firebase;
