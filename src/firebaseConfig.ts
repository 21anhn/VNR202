import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_g8TKWRoHfJ5sY-8HYvb5FBy4nUEqQM4",
  authDomain: "mln131-fddd7.firebaseapp.com",
  projectId: "mln131-fddd7",
  storageBucket: "mln131-fddd7.appspot.com",
  messagingSenderId: "503881284341",
  appId: "1:503881284341:web:e726e87f666aff1c9963bc",
  measurementId: "G-Y4MYL4SGDQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);