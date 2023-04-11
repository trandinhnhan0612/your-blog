import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAF-wUj26CZ8NDm9R380IAocmeNxdR_5jQ",
  authDomain: "your-blog-b8b35.firebaseapp.com",
  projectId: "your-blog-b8b35",
  storageBucket: "your-blog-b8b35.appspot.com",
  messagingSenderId: "741399550345",
  appId: "1:741399550345:web:57c4c0369a642b9fea2958",
  // apiKey: "AIzaSyAF-wUj26CZ8NDm9R380IAocmeNxdR_5jQ",
  // authDomain: "your-blog-b8b35.firebaseapp.com",
  // databaseURL:
  //   "https://your-blog-b8b35-default-rtdb.asia-southeast1.firebasedatabase.app",
  // projectId: "your-blog-b8b35",
  // storageBucket: "your-blog-b8b35.appspot.com",
  // messagingSenderId: "741399550345",
  // appId: "1:741399550345:web:57c4c0369a642b9fea2958",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
