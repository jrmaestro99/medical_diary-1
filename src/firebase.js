// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvYeBg6NlwI_SjnBqsGipGzco72GKXJzw",
  authDomain: "medical-diary-e24bd.firebaseapp.com",
  projectId: "medical-diary-e24bd",
  storageBucket: "medical-diary-e24bd.appspot.com",
  messagingSenderId: "993449709460",
  appId: "1:993449709460:web:608cd9a144c9aaf2590981"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp