import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHS3aNAwPSjiOX2UE2lwLdgy7jGpeVJ-E",
  authDomain: "enimo-new.firebaseapp.com",
  projectId: "enimo-new",
  storageBucket: "enimo-new.appspot.com",
  messagingSenderId: "94435480428",
  appId: "1:94435480428:web:0e00d71643c62e5109d949",
  measurementId: "G-1KJHV8VF2W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
