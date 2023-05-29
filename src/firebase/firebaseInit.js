import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import "firebase/performance";
import 'firebase/messaging';
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: "therosarians-b21de.firebaseapp.com",
    projectId: "therosarians-b21de",
    storageBucket: "therosarians-b21de.appspot.com",
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_PROJECT_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const perf = firebase.performance();
export { timestamp };
export default firebaseApp.firestore();