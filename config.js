import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// configuration from firebase
const firebaseConfig = {
  apiKey: "AIzaSyDPItS742C50ETPQmVZ6LTPxNy5UdXqcFU",
  authDomain: "fir-87123.firebaseapp.com",
  projectId: "fir-87123",
  storageBucket: "fir-87123.appspot.com",
  messagingSenderId: "995711751257",
  appId: "1:995711751257:web:15480acf2361b9859e0d48",
  measurementId: "G-31JJ1JCR4G"
};

// checking if there is no app in firebase, if so initialize with firebase configuration
if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };