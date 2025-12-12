// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlG7ApXzmzq9y_7wwAeUAysAw8eseF-Ac",
  authDomain: "agri-tech-c9d2f.firebaseapp.com",
  projectId: "agri-tech-c9d2f",
  storageBucket: "agri-tech-c9d2f.firebasestorage.app",
  messagingSenderId: "985163642366",
  appId: "1:985163642366:web:f8de31a94bf491b405bcaf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
