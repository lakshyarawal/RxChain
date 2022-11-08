// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ16RiDuJ9HANw2X61uoNRjOTbcC3oXCE",
  authDomain: "rxchain-282bf.firebaseapp.com",
  databaseURL: "https://rxchain-282bf-default-rtdb.firebaseio.com",
  projectId: "rxchain-282bf",
  storageBucket: "rxchain-282bf.appspot.com",
  messagingSenderId: "791447700328",
  appId: "1:791447700328:web:732c6568bb8cb9b4210cdd",
  measurementId: "G-C4EGYZH011",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
