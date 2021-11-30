//profile
const getName = document.querySelector('#name');
const getEmail = document.querySelector('#email');
const getPhone = document.querySelector('#phone');
const getDetail = document.querySelector('#detail');

//article
const getArticle_name = document.querySelector('#showArticle_name');
const getArticle_detail = document.querySelector('#showArticle_detail');
const getArticle_image = document.querySelector('#imageURL');





const postArticle = document.querySelector('#postArticle');


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        const email = localStorage.getItem('email');

        function iconPro(){ 
            var pro =``;
        }

        db.collection('users').doc(email).get().then((result) => {
            console.log(result.data());
            getName.innerHTML = result.data().name;
            getEmail.innerHTML = result.data().email;
            getPhone.innerHTML = result.data().phone;
            getDetail.innerHTML = result.data().detail;
            console.log(result.id);
        });







        db.collection('articles').get().then(article => {

            article.docs.forEach(doc => {





                var row = `<div class="row d-flex justify-content-center" >
              <div class="col-md-8 col-lg-5">
                  <div class="card shadow-0 border" style="background-color: #ffffff;">
                      <div class=" p-3">
                          
                              <div >

                                  <div class="d-flex justify-content-between">
                                      <img src="${doc.data().imageURL}"
                                          class="card-img-top" >

                                  </div>
                                  <br>
                                  <h5 >${doc.data().article_name}</h5>
                                  <span class="text-make" >${doc.data().article_detail}</span>
                              </div>
                          

                          <hr >
                          <a href="article_content.html">
                              <div class="col-1">
                                  <i class='bx bx-message-square-detail' id="iconic"></i>
                              </div>
                          </a>
                      </div>
                  </div>
              </div></div><br>`;

                $("#box").append(row)
             iconPro();

            });


        });














    }
}
)


