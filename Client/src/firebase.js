// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAB3MeNl-U7Jv7tkwr0REv4He1w6ZJGiqw",
  authDomain: "docflow-c43aa.firebaseapp.com",
  projectId: "docflow-c43aa",
  storageBucket: "docflow-c43aa.appspot.com",
  messagingSenderId: "670709148689  ",
  appId: "1:670709148689:web:8db4f67fe929901d84d5b0",
  measurementId: "G-95S8311DTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const authInstance = getAuth();
export default app;
