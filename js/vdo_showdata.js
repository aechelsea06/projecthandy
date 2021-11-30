//profile
const getName = document.querySelector('#name');
const getEmail = document.querySelector('#email');
const getPhone = document.querySelector('#phone');
const getDetail = document.querySelector('#detail');



//video
const getVdo_name = document.querySelector('#showVdo_name');
const getVdo_detail = document.querySelector('#showVdo_detail');
const getVdo_url = document.querySelector('#videoURL');



const postArticle = document.querySelector('#postArticle');


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        const email = localStorage.getItem('email');

        // db.collection('users').doc(email).get().then((result) => {
        //     console.log(result.data());
        //     getName.innerHTML = result.data().name;
        //     getEmail.innerHTML = result.data().email;
        //     getPhone.innerHTML = result.data().phone;
        //     getDetail.innerHTML = result.data().detail;
        //     console.log(result.id);
        // })

console.log(Date());

        db.collection('videos').get().then(vdo => {

            vdo.docs.forEach(doc => {
               



                var row =` <div class="row d-flex justify-content-center ">
                <div class="col-md-8 col-lg-5">
                    <div class="card shadow-0 border">
                        <div class=" p-3">
                            <div class="">
                                <div class="">
                                    <a href="">
                                        <div class="card">
                                            <video class="video-fluid z-depth-1" src="${doc.data().videoURL}" autoplay loop controls muted></video>
                                        </div>
                                    </a>
                                    <br>
                                    <h5 >${doc.data().vdo_name}</h5>
                                    <span class="text-make" >${doc.data().vdo_detail} </span>
                                </div>
                            </div>
                            <hr>
                            <a href="video_content.html">
                                <div class="col-1">
                                    <i class='bx bx-message-square-detail' id="iconic"></i>
                                </div>
                            </a> 
                        </div>
                    </div>
                </div>
            </div><br>`;
            $("#box").append(row)
                
            })


        })




    }
}
)


