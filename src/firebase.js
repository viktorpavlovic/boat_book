// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAewjHz1Gsibv-0hd5R01nXf29Eg-BgSXw",
  authDomain: "login-boat.firebaseapp.com",
  projectId: "login-boat",
  storageBucket: "login-boat.appspot.com",
  messagingSenderId: "64257702771",
  appId: "1:64257702771:web:1b669ab1cf3c3439cd2306",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
