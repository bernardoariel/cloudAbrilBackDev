// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfd1SsZoBsAYvaYkd5d7lUm3Oj6-MXuAk",
  authDomain: "abril-login.firebaseapp.com",
  projectId: "abril-login",
  storageBucket: "abril-login.appspot.com",
  messagingSenderId: "78779911413",
  appId: "1:78779911413:web:7f68d722800855052689bc"
};

const app = initializeApp(firebaseConfig);
// console.log("Firebase initialized:", app); // Verifica que Firebase esté correctamente inicializado
export const auth = getAuth(app);