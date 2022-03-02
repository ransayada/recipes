// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAicrqB2HhnCV4Ux9QvGrbWAk6AoHwjL0o",
    authDomain: "react-recipe-app-e3e18.firebaseapp.com",
    projectId: "react-recipe-app-e3e18",
    storageBucket: "react-recipe-app-e3e18.appspot.com",
    messagingSenderId: "776894251899",
    appId: "1:776894251899:web:95f2070584955785c573de"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };