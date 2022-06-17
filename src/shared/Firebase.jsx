// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjBVdprGCVjQdAAKPoHPmtNvJg3WNmcfA",
  authDomain: "latte-horse2.firebaseapp.com",
  projectId: "latte-horse2",
  storageBucket: "latte-horse2.appspot.com",
  messagingSenderId: "869989306028",
  appId: "1:869989306028:web:79097ccc939db46eaad909"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
// const analytics = getAnalytics(app);