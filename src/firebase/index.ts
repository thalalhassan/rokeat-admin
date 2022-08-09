// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaXDtPmzy0gtftHPB1OxC1ThuHHNc0NOA",
  authDomain: "rokeat-896a5.firebaseapp.com",
  projectId: "rokeat-896a5",
  storageBucket: "rokeat-896a5.appspot.com",
  messagingSenderId: "56836402728",
  appId: "1:56836402728:web:03f17a03339c36d863cf1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;