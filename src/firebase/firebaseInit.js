import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCiC2C9os8y041_3Hx0oxgMTOP8U-T0RiY",
    authDomain: "therosarians-b21de.firebaseapp.com",
    projectId: "therosarians-b21de",
    storageBucket: "therosarians-b21de.appspot.com",
    messagingSenderId: "1051151607866",
    appId: "1:1051151607866:web:b78b77dc1aaf7ec2b6ed03"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();