import firebase from "firebase-admin"
import 'dotenv/config'
// @ts-ignore
import * as credentials from "../config/credentials.json"

firebase.initializeApp({
    credential: firebase.credential.cert(credentials),
    databaseURL: process.env.DATABASE_URL_FIREBASE,
});

export default  firebase