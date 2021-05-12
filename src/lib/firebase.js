import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//import {seedDatabase} from '../seed';

const config = {
    apiKey: "AIzaSyC5Ap0pfuRNFmpzsTwy7cFjoiGMg46nwfM",
    authDomain: "instagram-146eb.firebaseapp.com",
    projectId: "instagram-146eb",
    storageBucket: "instagram-146eb.appspot.com",
    messagingSenderId: "68087648677",
    appId: "1:68087648677:web:818272b315c21f8ba0d84c",
    measurementId: "G-3C7XZ95XJ3"
};

const firebase = Firebase.initializeApp(config);
const {FieldValue} = Firebase.firestore;

//seedDatabase(firebase);

export {firebase, FieldValue};