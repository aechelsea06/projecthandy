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
const userList = document.querySelector('#userList');

function createDatabase() {
    // Get user
    // username = document.getElementById('username').value;
    // email = document.getElementById('email').value;
    // phone = document.getElementById('phone').value;
    // detail = document.getElementById('detail').value;
    // // Get article
    // cont_image = document.getElementById('cont_image').value;
    // cont_name = document.getElementById('cont_name').value;
    // cont_detail = document.getElementById('cont_detail').value;

    // // Get vdo
    // video = document.getElementById('video').value;
    // vdo_name = document.getElementById('vdo_name').value;
    // vdo_name = document.getElementById('vdo_name').value;

    // // Get product
    // pd_image = document.getElementById('pd_image').value;
    // pd_name = document.getElementById('pd_name').value;
    // pd_detail = document.getElementById('pd_detail').value;
    // facebook = document.getElementById('facebook').value;
    // shop_link = document.getElementById('shop_link').value;

    // Move on with Auth
    // db.collection("users").add({ 
    //     username: "sanadee",
    //     email: "sanadee@gmail.com",
    //     phone:"091111111",
    //     detail:"ดี",
    // });
    // db.collection("video").add({ 
    //     vdo_name: "คลิป",
    //     vdo_detail: "อะไรก็ได้",
    //     img:"xxxxxx.png",

    // });

    db.collection("users").doc().set({
        // username: document.getElementById('username').value,
        // email:document.getElementById('username').value,
        phone: null,
        detail: null,

    });
    db.collection("articles").doc().set({
        cont_image: null,
        cont_name: null,
        cont_detail: null,

    });
    db.collection("videos").doc().set({
        video: null,
        vdo_name: null,
        vdo_detail: null,

    });
    db.collection("products").doc().set({
        pd_image: null,
        pd_name: null,
        pd_detail: null,
        facebook: null,
        shop_link: null,
    });

    db.collection("comments").doc().set({
        comment_detail: null,

    });









}