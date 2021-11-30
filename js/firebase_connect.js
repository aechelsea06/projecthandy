const firebaseConfig = {
  apiKey: "AIzaSyCjw9hEux7cBFUaTM5-V2fsCmjPbpmj9yo",
  authDomain: "diyproject-93b1f.firebaseapp.com",
  databaseURL: "https://diyproject-93b1f-default-rtdb.firebaseio.com",
  projectId: "diyproject-93b1f",
  storageBucket: "diyproject-93b1f.appspot.com",
  messagingSenderId: "25915915585",
  appId: "1:25915915585:web:89f1e518c905db9158f5c0",
  measurementId: "G-XRGSS0L8WP"
};
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 // Initialize variables
 const auth = firebase.auth();
 const db = firebase.firestore();

