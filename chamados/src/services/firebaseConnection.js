import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyBjdna7z90eavBlWk9CC21ykYJiilvfA_U",
    authDomain: "chamados-2c62a.firebaseapp.com",
    projectId: "chamados-2c62a",
    storageBucket: "chamados-2c62a.appspot.com",
    messagingSenderId: "991587293804",
    appId: "1:991587293804:web:5001ddfcb7032065105649",
    measurementId: "G-V1ED8P7M0V"
  };

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;