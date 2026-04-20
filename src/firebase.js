import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmP-nrZV-m6OavJTeYxFjOIJ0NanfXyK4",
  authDomain: "gurukrupa-construction.firebaseapp.com",
  databaseURL: "https://gurukrupa-construction-default-rtdb.firebaseio.com/",
  projectId: "gurukrupa-construction",
  storageBucket: "gurukrupa-construction.firebasestorage.app",
  messagingSenderId: "105268732089",
  appId: "1:105268732089:web:1d09361c533eadf45d3b68"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);