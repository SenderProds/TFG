// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALIqI0KtPj-Hpt80a8hCCar-4Y3_QzAS4",
  authDomain: "ecosender-3e436.firebaseapp.com",
  projectId: "ecosender-3e436",
  storageBucket: "ecosender-3e436.appspot.com",
  messagingSenderId: "904761736309",
  appId: "1:904761736309:web:6226155b02d27816eccc3c",
  measurementId: "G-7CBGHF3W87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };