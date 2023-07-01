import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMg0DAqbBweojB8PhHkxVSVb04FgJv5c0",
  authDomain: "shintavr-test.firebaseapp.com",
  projectId: "shintavr-test",
  storageBucket: "shintavr-test.appspot.com",
  messagingSenderId: "35246929020",
  appId: "1:35246929020:web:e96e1f841f2cde337785f9",
};

export const app = initializeApp(firebaseConfig);

export const db_firestore = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

export const auth = getAuth(app)