// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDP_JMY7LsT_lb42UDWNNF98WUq7DVTAMs",
    authDomain: "snus-pal.firebaseapp.com",
    projectId: "snus-pal",
    storageBucket: "snus-pal.appspot.com",
    messagingSenderId: "707018671740",
    appId: "1:707018671740:web:b3cd191ae232bb914b2bf9",
    measurementId: "G-TSS690YDE0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
