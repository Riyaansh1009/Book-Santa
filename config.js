import firebase from 'firebase';
require('@firebase/firestore');


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBTn-3K2rkwAuIe7cChf_WZNhi4nRruoOI",
    authDomain: "book-santa-85255.firebaseapp.com",
    projectId: "book-santa-85255",
    storageBucket: "book-santa-85255.appspot.com",
    messagingSenderId: "1052393084362",
    appId: "1:1052393084362:web:38eaba4031ebfe17e06b33"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase.firestore()