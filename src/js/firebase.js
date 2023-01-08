import { initializeApp } from "firebase/app";
import store from '../js/store';
import { useStore } from "framework7-react";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "portfolio-3e5da.firebaseapp.com",
    databaseURL: "https://portfolio-3e5da-default-rtdb.firebaseio.com",
    projectId: "portfolio-3e5da",
    storageBucket: "portfolio-3e5da.appspot.com",
    messagingSenderId: "362249215551",
    appId: "1:362249215551:web:02a5e7390280562f20628a"
};

const myApp    = initializeApp(firebaseConfig);
const database = getDatabase(myApp);

export const updateDatabase = () => {
    const token = useStore('token');
    const notes = useStore('notes');

    set( ref(database, token + '_notes'), notes );
}

export const getNotes = () => {
    const getRef = ref(database, token + '_notes');

    onValue(getRef, (snapshot) => {
        snapshot.val() !== null ? store.dispatch('notes', snapshot.val())
        : store.dispatch('notes', {});
    }, { onlyOnce: true });
}

export default myApp;