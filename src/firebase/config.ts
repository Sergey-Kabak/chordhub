// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//     measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };


const firebaseConfig = {
    apiKey: "AIzaSyA_Zci-gqAF2fsACxzGBEpT9Ap4CD8cJUE",
    authDomain: "chordhub-ua.firebaseapp.com",
    projectId: "chordhub-ua",
    storageBucket: "chordhub-ua.firebasestorage.app",
    messagingSenderId: "540996479532",
    appId: "1:540996479532:web:9a643bba2ff46964d77f89",
    measurementId: "G-8CMWF6Y5RF",
};

// Initialize Firebase
const firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(firebase_app);

export { db }

export default firebase_app;