// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ6yLtjvfWnyxXZIOvvqywrIbkNsidKTs",
  authDomain: "boat-book.firebaseapp.com",
  projectId: "boat-book",
  storageBucket: "boat-book.appspot.com",
  messagingSenderId: "155129759750",
  appId: "1:155129759750:web:6ee90aef4a9bcf110adb87",
  measurementId: "G-080PLEX1R6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
