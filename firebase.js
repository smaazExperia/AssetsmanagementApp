// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqhRIALQCpGmgdZ1VZL7nwpCGm_c1W1L0",
  authDomain: "assetstrackmanagement.firebaseapp.com",
  projectId: "assetstrackmanagement",
  storageBucket: "assetstrackmanagement.appspot.com",
  messagingSenderId: "854434216158",
  appId: "1:854434216158:web:e1657a712197168df5ea4f",
  measurementId: "G-RZWN914NER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);