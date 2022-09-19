import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_a5wr-2G_BC-5IM2-UWEpZQ13Gp9odxA",
  authDomain: "fastfeedback-aed78.firebaseapp.com",
  projectId: "fastfeedback-aed78",
  storageBucket: "fastfeedback-aed78.appspot.com",
  messagingSenderId: "963142973704",
  appId: "1:963142973704:web:e6f35372669463596d54bd",
  measurementId: "G-4S9DRE7NGY",
};

const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();
