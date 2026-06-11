// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA3ZziIdNkiBv97yeWMbKYZYElxo5dNx1c",
  authDomain: "sicklecare-15d7a.firebaseapp.com",
  projectId: "sicklecare-15d7a",
  storageBucket: "sicklecare-15d7a.firebasestorage.app",
  messagingSenderId: "822337344078",
  appId: "1:822337344078:web:6b4f8c1b3800b797fe291f",
  measurementId: "G-4F05CTPM31"
};

const app = initializeApp(firebaseConfig);

// SAFE analytics init
let analytics = null;
isSupported().then((yes) => {
  if (yes) analytics = getAnalytics(app);
});

// Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export { analytics };