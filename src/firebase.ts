import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBWCR0tEfPVytYQRvV9sv6g6hzNDyr22qo",
    authDomain: "womanup-test-c9dc9.firebaseapp.com",
    projectId: "womanup-test-c9dc9",
    storageBucket: "womanup-test-c9dc9.appspot.com",
    messagingSenderId: "18422516618",
    appId: "1:18422516618:web:e05c76b0e2c3a139555673",
    measurementId: "G-MFY5D07SH5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };