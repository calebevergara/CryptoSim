// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADCqo7EBWYjwUkP_AQrF69hqA9hj4NEKc",
  authDomain: "crypto-sim-b4794.firebaseapp.com",
  databaseURL: "https://crypto-sim-b4794-default-rtdb.firebaseio.com",
  projectId: "crypto-sim-b4794",
  storageBucket: "crypto-sim-b4794.appspot.com",
  messagingSenderId: "1038122867849",
  appId: "1:1038122867849:web:6e5b886e778a38adbefa58",
  measurementId: "G-6T46CTMMDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  