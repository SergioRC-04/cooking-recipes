// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtr2PnH9Zx3dEE5ZseVua9NDM9Dg4v4wU",
  authDomain: "cooking-recipes-48a8f.firebaseapp.com",
  projectId: "cooking-recipes-48a8f",
  storageBucket: "cooking-recipes-48a8f.firebasestorage.app",
  messagingSenderId: "842196704091",
  appId: "1:842196704091:web:c8045220a2e062af7dd87e",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
