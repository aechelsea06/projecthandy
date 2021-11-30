const getForm = document.querySelector('#form');

const getimage_profile = document.querySelector('#image_profile');

const email = localStorage.getItem('email');


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {




        getForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(getForm.name.value);
            console.log(getForm.phone.value);
            console.log(getForm.detail.value);
            console.log(user.email);


            db.collection('users').doc(email).update({

                name: getForm.name.value,
                phone: getForm.phone.value,
                detail: getForm.detail.value

            });

            // if (user) {

            //     console.log(user);
            //     window.location.href = 'profile-blog.html';
            //   }

            alert('อัปเดทการเปลี่ยนแปลงแล้ว')
            return


        });


        

            const email = localStorage.getItem('email');
    
            db.collection('users').doc(email).get().then((result) => {
                
                getimage_profile.setAttribute("src",result.data().image_profile);
                getimage_profile.setAttribute("width", "100%");
                getimage_profile.setAttribute("height", "50%");
                getimage_profile.setAttribute("alt", "The Pulpit Rock");
            })
    
    
    
       



    }

});

function updateProfile() {

    // // Get comment
   


    UploadProcess();

    console.log("create product post success");
}





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
async function UploadProcess() {
    var ImgToUpload = files[0];

    var ImgName = nameimage.value + extlab.innerHTML;

    if (!ValidateName()) {
        alert('ชื่อไฟล์ไม่สามารถใช้ " . "," # "," $ "," [", or "] " ');
        return;
    }
    const metaData = {
        contentType: ImgToUpload.type
    }

    // เก็บข้อมูลรูปภาพ


    // const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metaData);



    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('Profiles/' + ImgName).put(ImgToUpload, metaData);

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


                db.collection('users').doc(email).update({
                    imageName: (name + ext),
                    image_profile: downloadURL,




                });
            }
        }
    );







}



// ฟังชัน ดักจับคัวอักษรแปลกๆ
function ValidateName() {
    var regex = /[\.#$\[\]]/
    return !(regex.test(nameimage.value));
}

