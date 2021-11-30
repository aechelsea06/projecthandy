
// Your web app's Firebase configuration
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
const database = firebase.database();
const db = firebase.firestore();
const userList = document.querySelector('#userList');

// Set up our register function
function register() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  confirm_password = document.getElementById('confirm_password').value
  // phone = null
  // detail = null


  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  if (validate_field(full_name) == false || validate_field(confirm_password) == false) {
    alert('One or More Extra Fields is Outta Line!!')
    return
  }
  if (password !== confirm_password) {
    alert('ยืนยันรหัสผ่านไม่ตรงกัน')
    return
  }


  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(email).set({
      email: document.getElementById('email').value,
      name: document.getElementById('full_name').value,
      phone: null,
      detail: null,
      image_profile: null

    }).then(() => {
      var user = auth.currentUser

      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        last_login: Date.now()

      }
      
      if (user) {
        // User is login in.
        console.log(user);
        window.location.href = 'index.html';
      }

      alert('Register สำเร็จ')
    })
  })

    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message
      alert(error_message + error_code)
    })
}

// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password ไม่ถูกต้อง')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)

    .then(function () {
      // Declare user variable
      var user = auth.currentUser
      // Add this user to Firebase Database
      var database_ref = database.ref()

      // Create User data
      var user_data = {
        last_login: Date.now()

      }
      if (email === "handy.project01@gmail.com") {
        // User is login in.
        console.log(user);
        window.location.href = '../admin/admin_page/DatamanageArticle.html';
      }else {
        // User is login in.
        console.log(user);
        window.location.href = '../page/total_content.html';
        localStorage.setItem('email', email);
        console.log();



      }
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)

      // DOne
      alert('Login สำเร็จ')


    })

    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message

      alert(error_message)
    })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function SignOut() {

  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  
    alert("Sign-out successful")
    window.location.href = '../authen/index.html';
  
  }).catch((error) => {
    // An error happened.
  });



}

function SignOutAdmin() {

  firebase.auth().signOut().then(() => {
    // Sign-out successful.
 
    alert("Sign-out successful")
    window.location.href = '../../authen/index.html';
   
  }).catch((error) => {
    // An error happened.
  });



}




function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}


var provider = new firebase.auth.GoogleAuthProvider();

function googleSignIn(){

  firebase.auth().signInWithPopup(provider).then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential.accessToken;
    console.log(user);

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}








