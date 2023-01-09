import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.FIREBASE_API_KEY,
    authDomain: import.meta.env.AUTH_DOMAIN,
    databaseURL: import.meta.env.DATABASE_URL,
    projectId: import.meta.env.PROJECT_ID,
    storageBucket: import.meta.env.STORAGE_BUCKET,
    messagingSenderId: import.meta.env.MSG_SENDER_ID,
    appId: import.meta.env.APP_ID
};

const myApp    = initializeApp(firebaseConfig);
export const database = getDatabase(myApp);

export default myApp;