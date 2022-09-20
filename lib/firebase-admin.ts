import admin, { ServiceAccount } from "firebase-admin";

import serviceAccount from "../credentials/firebase-admin.json";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
      databaseURL: "https://fastfeedback-aed78.firebaseio.com",
    });
  } catch (error) {
    console.error("Firebase admin init error", error.stack);
  }
}

const db = admin.firestore();
const adminAuth = admin.auth();

export { db, adminAuth };
