// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUvdHl15o4wPf6cYew4_JTJvhM9OwRc9A",
  authDomain: "react-firebase-da02c.firebaseapp.com",
  projectId: "react-firebase-da02c",
  storageBucket: "react-firebase-da02c.appspot.com",
  messagingSenderId: "288706957495",
  appId: "1:288706957495:web:d0a2958f9898ce8d3ffd32",
  measurementId: "G-GWC1DJM45T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
