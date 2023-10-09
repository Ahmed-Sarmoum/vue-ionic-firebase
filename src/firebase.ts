// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "YOUR API KEY",
  authDomain: "YOUR AUTH DOMAIN",
  projectId: "YOUR PROJECT ID",
  storageBucket: "YOUR STORAGE BUCKET",
  messagingSenderId: "YOUR MSG SENDER ID",
  appId: "YOUR APP ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app)

export { database }