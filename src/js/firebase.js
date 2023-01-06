import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "portfolio-3e5da.firebaseapp.com",
    databaseURL: "https://portfolio-3e5da-default-rtdb.firebaseio.com",
    projectId: "portfolio-3e5da",
    storageBucket: "portfolio-3e5da.appspot.com",
    messagingSenderId: "362249215551",
    appId: "1:362249215551:web:02a5e7390280562f20628a"
};

const myApp = initializeApp(firebaseConfig);

export default myApp;