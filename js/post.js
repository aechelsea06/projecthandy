
const getVideo_name = document.querySelector('#vdo_name');
const getVideo_detail = document.querySelector('#vdo_detail');

// catagory = document.getElementById('catagory1').value;
// catagory = document.getElementById('catagory2').value;
// catagory = document.getElementById('catagory3').value;







const email = localStorage.getItem('email');



// create vdo
function createVdoPost() {

   dataPost = "video";
   // Get vdo

   vdo_name = document.getElementById('vdo_name').value;
   vdo_detail = document.getElementById('vdo_detail').value;
   catagory = document.getElementById('catagory').value;
   
      UploadProcess(dataPost);

   
   console.log("create video post success");



}


// create article
function createArticlePost() {

   dataPost = "image";
   // // Get article

   article_name = document.getElementById('article_name').value;
   article_detail = document.getElementById('article_detail').value;
   catagory = document.getElementById('catagory').value;
   
   UploadProcess(dataPost);
   boxArt()
   console.log("create article post success");
   alert("create video post success")




}




// create product
function createProductPost() {

   dataPost = "product";
   // // Get product

   pd_name = document.getElementById('pd_name').value;
   pd_detail = document.getElementById('pd_detail').value;
   facebook = document.getElementById('facebook').value;
   shop_link = document.getElementById('shop_link').value;


   UploadProcess(dataPost);

   console.log("create product post success");


}

// create comment
function createCommentPost() {
   dataPost = "comment";
   // // Get comment
   comment_detail = document.getElementById('comment_detail').value;


   db.collection("comments").doc().set({
      comment_detail: document.getElementById('comment_detail').value,
      userId: email,
   });

   UploadProcess(dataPost);

   console.log("create product post success");
}








async function getBlogByEmail(collection, email) {
   try {
      return await db
         .collection(collection)
         .doc(email)
         .get()
         .then((result) => {
            if (result) {
               console.log(result.data());
               return result.data();
            }
            console.log("No  data");
            return false;
         });
   } catch (error) {
      console.log("Error readDataByUID : ", error);
   }
};








var files = [];
var reader = new FileReader();

//ตัวแปรรูปภาพ
var nameimage = document.getElementById('nameimage')
var extlab = document.getElementById('extlab')
var myimage = document.getElementById('myimage')
var proglab = document.getElementById('upprogress')
var Selbtn = document.getElementById('selbtn')
var Upbtn = document.getElementById('upbtn')
var Downbtn = document.getElementById('down')

const storage = firebase.storage();

// const storageRef = sRef(storage, "Images/" + ImgName);
const storageRef = storage.ref();

var input = document.createElement('input')
input.type = 'file';

input.onchange = e => {
   files = e.target.files;

   var extention = GetFileExt(files[0]);
   var name = GetFileName(files[0]);

   nameimage.value = name;
   extlab.innerHTML = extention;

   reader.readAsDataURL(files[0]);

}
reader.onload = function () {
   myimage.src = reader.result;
}
// ฟังชั่นเลือกรูป และเปลี่ยนนามสกุุลไฟล์

Selbtn.onclick = function () {
   event.preventDefault();
   input.click();
}
function GetFileExt(file) {
   var temp = file.name.split('.');
   var ext = temp.slice((temp.length - 1), (temp.length));
   return '.' + ext[0]
}
function GetFileName(file) {
   var temp = file.name.split('.');
   var fname = temp.slice(0, -1).join('.');
   return fname;
}



// ฟังก์ชั่นโหลดรูปภาพ วิดีโอ สินค้า
async function UploadProcess(dataPost) {
   var ImgToUpload = files[0];

   var ImgName = nameimage.value + extlab.innerHTML;

   if (!ValidateName()) {
      alert('ชื่อไฟล์ไม่สามารถใช้ " . "," # "," $ "," [", or "] " ');
      return;
   }
   const metaData = {
      contentType: ImgToUpload.type
   }

   if (dataPost == "image") {


      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child('Images/' + ImgName).put(ImgToUpload, metaData);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
         (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
               case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
               case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
            }
         },
         (error) => {

            switch (error.code) {
               case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
               case 'storage/canceled':
                  // User canceled the upload
                  break;

               // ...

               case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
            }
         },
         () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
               console.log('File available at', downloadURL);
               SaveURLtoFirestore(downloadURL);

            });



            async function SaveURLtoFirestore(downloadURL) {
               var name = nameimage.value;
               var ext = extlab.innerHTML;


               db.collection("articles").doc().set({

                  imageName: (name + ext),
                  imageURL: downloadURL,
                  userId: email,
                  article_name: document.getElementById('article_name').value,
                  article_detail: document.getElementById('article_detail').value,
                  catagory: document.getElementById('catagory').value,
                  

               })
               
            }
         }
      );

   }






   // เก็บข้อมูลวิดีโอ
   if (dataPost == "video") {

      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child('Videos/' + ImgName).put(ImgToUpload, metaData);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
         (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
               case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
               case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
            }
         },
         (error) => {

            switch (error.code) {
               case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
               case 'storage/canceled':
                  // User canceled the upload
                  break;

               // ...

               case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
            }
         },
         () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
               console.log('File available at', downloadURL);
               SaveURLtoFirestore(downloadURL);

            });

            //  ฟังชั่นของ firestorage databaes
            async function SaveURLtoFirestore(downloadURL) {
               var name = nameimage.value;
               var ext = extlab.innerHTML;


               db.collection("videos").doc().set({

                  videoName: (name + ext),
                  videoURL: downloadURL,
                  vdo_name: document.getElementById('vdo_name').value,
                  vdo_detail: document.getElementById('vdo_detail').value,
                  userId: email,
                  catagory: document.getElementById('catagory').value,



               })
               alert("create video post success")
            }


         }
      );

   }




   // เก็บข้อมูลสินค้า
   if (dataPost == "product") {


      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storageRef.child('Products/' + ImgName).put(ImgToUpload, metaData);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
         (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
               case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
               case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
            }
         },
         (error) => {

            switch (error.code) {
               case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
               case 'storage/canceled':
                  // User canceled the upload
                  break;

               // ...

               case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
            }
         },
         () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
               console.log('File available at', downloadURL);
               SaveURLtoFirestore(downloadURL);

            });



            async function SaveURLtoFirestore(downloadURL) {
               var name = nameimage.value;
               var ext = extlab.innerHTML;


               db.collection("products").doc().set({

                  productName: (name + ext),
                  productURL: downloadURL,
                  pd_name: document.getElementById('pd_name').value,
                  pd_detail: document.getElementById('pd_detail').value,
                  facebook: document.getElementById('facebook').value,
                  shop_link: document.getElementById('shop_link').value,
                  userId: email,


               })
               alert("create video post success")
            }
         }
      );


   }



}



// ฟังชัน ดักจับคัวอักษรแปลกๆ
function ValidateName() {
   var regex = /[\.#$\[\]]/
   return !(regex.test(nameimage.value));
}


function boxArt() {
   var wrapper = document.getElementById("box");

   var myHTML = '';

   for (var i = 0; i < 1; i++) {
      myHTML += `<div class="col-md-4 col-sm-4 card-body">
                       <div class="">
                           
                               <div class="concard">
                                   <img class="card" src="" height="10px" width="10px" id="imageURL">
                               </div>
                               <div class="wrimagecard">
                                   <div class="card-body">
                                       <span   ${id = "showArticle_name"}></span ><br>
                                       <span id="showArticle_detail"></span>
                                   </div>
                               </div>
                          
                       </div>
                   </div>`;
   }

   wrapper.innerHTML = myHTML
   console.log("testbox");
}






