// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7Z9u0U_115rOuk7kL4s-9UjsHl_QfB-E",
    authDomain: "resumebuilder-2273d.firebaseapp.com",
    projectId: "resumebuilder-2273d",
    storageBucket: "resumebuilder-2273d.appspot.com",
    messagingSenderId: "479523997780",
    appId: "1:479523997780:web:00f0ae468cfd04e46985c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage=getStorage();