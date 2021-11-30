//profile
const getName = document.querySelector('#name');
const getEmail = document.querySelector('#email');
const getPhone = document.querySelector('#phone');
const getDetail = document.querySelector('#detail');
const getprofil = document.querySelector('#image_profile');


//video
const getVdo_name = document.querySelector('#showVdo_name');
const getVdo_detail = document.querySelector('#showVdo_detail');
const getVdo_url = document.querySelector('#videoURL');






firebase.auth().onAuthStateChanged(function (user) {
    if (user) {




        const email = localStorage.getItem('email');

        db.collection('users').doc(email).get().then((result) => {
            console.log(result.data());
            getName.innerHTML = result.data().name;
            getEmail.innerHTML = result.data().email;
            getPhone.innerHTML = result.data().phone;
            getDetail.innerHTML = result.data().detail;

            getprofil.setAttribute("src", result.data().image_profile);
            getprofil.setAttribute("width", "100%");
            getprofil.setAttribute("height", "50%");
            getprofil.setAttribute("alt", "The Pulpit Rock");

            console.log(result.id);
        })



        

        db.collection('videos').get().then(vdo => {

            vdo.docs.forEach(doc => {

                var row;

                if (email === doc.data().userId) {

                    row = `<div class="col-md-4 col-sm-4" >
                    <div class="wrimagecard wrimagecard-topimage">
                        <a href="video_content.html" id="viewVDO">
                            <div class="card">
                                <video class="video-fluid" autoplay loop controls muted src="${doc.data().videoURL}"
                                type="video/mp4" >
                                   
                                </video>
                    
                            </div>
                            <div class="wrimagecard">
                                <div class="card-body">
                                    <span class="card-title" >${doc.data().vdo_name}</span><br>
                                    
                                </div>
                            </div>
                        </a>
                    </div>
                    </div>`;
                    $("#box").append(row)
                    return row;

                }

             
                
 

            })

           
           
            
                                    
                                


        })




















    }
}
)



