// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3ZziIdNkiBv97yeWMbKYZYElxo5dNx1c",
  authDomain: "sicklecare-15d7a.firebaseapp.com",
  projectId: "sicklecare-15d7a",
  storageBucket: "sicklecare-15d7a.firebasestorage.app",
  messagingSenderId: "822337344078",
  appId: "1:822337344078:web:6b4f8c1b3800b797fe291f",
  measurementId: "G-4F05CTPM31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const db = getFirestore(app);
export const auth = getAuth(app);
