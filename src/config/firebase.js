import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA_Kj0JEzWRSPWPx6-hd_HsM-taRNwRUkY",
  authDomain: "react-crash-432d1.firebaseapp.com",
  projectId: "react-crash-432d1",
  storageBucket: "react-crash-432d1.firebasestorage.app",
  messagingSenderId: "873829517465",
  appId: "1:873829517465:web:439b73d74ad8166a06d008",
  measurementId: "G-62EBKM23PQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);