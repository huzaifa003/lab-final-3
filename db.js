// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxGEsk065N5cVKsIg33BVW1oV1DnUJQT0",
  authDomain: "lab-exam-65558.firebaseapp.com",
  databaseURL: "https://lab-exam-65558-default-rtdb.firebaseio.com",
  projectId: "lab-exam-65558",
  storageBucket: "lab-exam-65558.appspot.com",
  messagingSenderId: "785596785748",
  appId: "1:785596785748:web:f59623a70162a6a1e479c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
export {db,auth};
