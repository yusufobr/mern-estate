// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-727fa.firebaseapp.com",
  projectId: "mern-estate-727fa",
  storageBucket: "mern-estate-727fa.appspot.com",
  messagingSenderId: "1087423907942",
  appId: "1:1087423907942:web:3a025502247ff63d32c5a7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);