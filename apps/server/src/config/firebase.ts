import { initializeApp, cert, getApps, App } from "firebase-admin/app";
import { getMessaging, Messaging } from "firebase-admin/messaging";
import env from "./env";

export const getFirebaseCredentials = () => {
  const projectId = process.env.FIREBASE_PROJECT_ID || env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY || env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing required Firebase Admin SDK credentials (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY).");
  }

  if (privateKey) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  return { projectId, clientEmail, privateKey };
};

export const isFirebaseConfigured = (): boolean => {
  try {
    getFirebaseCredentials();
    return true;
  } catch (err) {
    return false;
  }
};

let firebaseApp: App;
let fcmMessaging: Messaging | null = null;

try {
  const activeApps = getApps();
  if (activeApps.length === 0) {
    const creds = getFirebaseCredentials();
    firebaseApp = initializeApp({
      credential: cert({
        projectId: creds.projectId,
        clientEmail: creds.clientEmail,
        privateKey: creds.privateKey,
      }),
    });
  } else {
    firebaseApp = activeApps[0];
  }
  fcmMessaging = getMessaging(firebaseApp);
} catch (err) {
  // Graceful fallback for build/test execution
}

export const messaging = fcmMessaging;
export default firebaseApp!;
