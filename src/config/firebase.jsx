// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzGs33VWdJRsqMLhqCtN-vDe1Wpn0k000",
  authDomain: "fir-01-1a740.firebaseapp.com",
  projectId: "fir-01-1a740",
  storageBucket: "fir-01-1a740.firebasestorage.app",
  messagingSenderId: "670255679452",
  appId: "1:670255679452:web:2342471a9dc3b56b52b119",
  measurementId: "G-KQJFRWRBQR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { analytics, auth, firestore}