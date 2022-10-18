import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: "ukkms-e1bb7.firebaseapp.com",
    projectId: "ukkms-e1bb7",
    storageBucket: "ukkms-e1bb7.appspot.com",
    messagingSenderId: "34166659000",
    appId: "1:34166659000:web:c4cefcdda3cc6769c2214d",
    measurementId: "G-FDE8JJK2HR"
};
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };