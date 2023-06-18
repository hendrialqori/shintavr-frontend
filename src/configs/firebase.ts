// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMg0DAqbBweojB8PhHkxVSVb04FgJv5c0",
  authDomain: "shintavr-test.firebaseapp.com",
  projectId: "shintavr-test",
  storageBucket: "shintavr-test.appspot.com",
  messagingSenderId: "35246929020",
  appId: "1:35246929020:web:e96e1f841f2cde337785f9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db_firestore = getFirestore(app);
