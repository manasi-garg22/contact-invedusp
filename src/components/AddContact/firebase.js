// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-hEQdk9EASJgQkR9yos9grnPSed_UFUw",
  authDomain: "contact-invedus.firebaseapp.com",
  projectId: "contact-invedus",
  storageBucket: "contact-invedus.appspot.com",
  messagingSenderId: "602248600444",
  appId: "1:602248600444:web:d714a8fe4efd636f5ae2f9",
  measurementId: "G-52PMLHRG6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);