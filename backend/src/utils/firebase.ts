// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeJ1vEDEwBKZGtLvGKAU1AwpMT07qzUKg",
  authDomain: "codeutsava-80.firebaseapp.com",
  projectId: "codeutsava-80",
  storageBucket: "codeutsava-80.appspot.com",
  messagingSenderId: "68859582386",
  appId: "1:68859582386:web:bf388f7ec7b239fbca36ab",
  measurementId: "G-78S1V9XKB4"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);