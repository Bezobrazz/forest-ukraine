// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfzRpbS5AOusNdlNVgvaVx0EJ2_dNnHE4",
  authDomain: "forest-ukraine.firebaseapp.com",
  projectId: "forest-ukraine",
  storageBucket: "forest-ukraine.appspot.com",
  messagingSenderId: "349220888327",
  appId: "1:349220888327:web:80e5c4f771b24ea6b16fa2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const DBFinishedProducts = getFirestore(app);
