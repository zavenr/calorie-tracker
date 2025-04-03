// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF0Dnlbrq81JJXc2jPkPL1-7HK6bkH0VY",
  authDomain: "calorietracker-f73de.firebaseapp.com",
  projectId: "calorietracker-f73de",
  storageBucket: "calorietracker-f73de.firebasestorage.app",
  messagingSenderId: "753118669457",
  appId: "1:753118669457:web:c94c745b5f4474aac6ad30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ These two lines are what Login.jsx is looking for
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
