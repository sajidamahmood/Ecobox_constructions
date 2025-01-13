// src/firebase.js
import { initializeApp } from 'firebase/app';  // Modular import for Firebase app
import { getFirestore } from 'firebase/firestore';  // Modular import for Firestore

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAMVs8iXqMWsNiuWVXzd-xM3j_c5wX02Q0",
  authDomain: "ecoboxenergie-a667b.firebaseapp.com",
  projectId: "ecoboxenergie-a667b",
  storageBucket: "ecoboxenergie-a667b.firebasestorage.app",
  messagingSenderId: "919837780419",
  appId: "1:919837780419:web:f10a712752680420457576",
  measurementId: "G-LVQ146TJFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
