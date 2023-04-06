// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmGgWEiRM31XqXz-uQNCssUSr98kMm3jc",
  authDomain: "filmyhub-853f6.firebaseapp.com",
  projectId: "filmyhub-853f6",
  storageBucket: "filmyhub-853f6.appspot.com",
  messagingSenderId: "594896196602",
  appId: "1:594896196602:web:5f32e6ab9562e2bc140a43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db,"movies");
export const reviewsRef = collection(db,"reviews");
export const usersRef = collection(db,"users");
export default app;