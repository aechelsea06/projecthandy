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




        const toy = "toy"
        const decorate = "decorate"
        const consumable = "comsumable"
       



        

        db.collection('videos').get().then(vdo => {

            vdo.docs.forEach(doc => {

                var row;

                if (toy === doc.data().catagory) {

                    var row = `<div class="col-md-4 col-sm-4" >
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
                    

                }


            })

        
        })


        db.collection('articles').get().then(article => {

            article.docs.forEach(doc => {

                var row;

                if (toy === doc.data().catagory) {

                    row = `<div class="col-md-4 col-sm-4" >
                    <div class="wrimagecard wrimagecard-topimage">
                        <a href="video_content.html" id="viewVDO">
                            <div class="card">
                            <img src="${doc.data().imageURL}"
                            class="card-img-top" >
                    
                            </div>
                            <div class="wrimagecard">
                                <div class="card-body">
                                    <span class="card-title" >${doc.data().article_name}</span><br>
                                    
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



