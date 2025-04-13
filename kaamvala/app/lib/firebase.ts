// lib/firebase.ts
"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 👈 Add this

const firebaseConfig = {
  apiKey: "AIzaSyDcyewNunpmJaYbSOxyv8daq0LkqSOEUXU",
  authDomain: "kaamvala-9636f.firebaseapp.com",
  projectId: "kaamvala-9636f",
  storageBucket: "kaamvala-9636f.firebasestorage.app",
  messagingSenderId: "665173422799",
  appId: "1:665173422799:web:4f033e2a8c1ebe66e9fdba",
  measurementId: "G-CPWF674W5K"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

if (typeof window !== "undefined") {
  getAnalytics(app);
}

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // 👈 Export Firestore

export { auth, provider, db };
