import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBw-5ch4oRXYpzE7s59IaF8iKm5_SO9Pbg",
  authDomain: "contentful-cv.firebaseapp.com",
  projectId: "contentful-cv",
  storageBucket: "contentful-cv.appspot.com",
  messagingSenderId: "66872123851",
  appId: "1:66872123851:web:4cf0e5da05881f7aa4d64e",
  measurementId: "G-SJ4Y90H8F1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export {app, auth};
