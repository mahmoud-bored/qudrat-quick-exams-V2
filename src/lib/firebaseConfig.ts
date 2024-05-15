
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, setDoc } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEKm1C9HrBrsu05DzGnW-mTJW6y77ruNA",
  authDomain: "qudrat-database.firebaseapp.com",
  projectId: "qudrat-database",
  storageBucket: "qudrat-database.appspot.com",
  messagingSenderId: "20488206984",
  appId: "1:20488206984:web:09a2176a407e55bce33d3d",
  measurementId: "G-94BW6FLZJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db, doc, getDoc, collection, setDoc }