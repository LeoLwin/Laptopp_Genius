// firebase.js

import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEB4dBYKeKHo2hiFx_5RnHtkc-CqdIkd0",
  authDomain: "imageupload-fd6db.firebaseapp.com",
  projectId: "imageupload-fd6db",
  storageBucket: "imageupload-fd6db.appspot.com",
  messagingSenderId: "431875194595",
  appId: "1:431875194595:web:329ad80606d9684736cfd6",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
