//profile
const getName = document.querySelector('#name');
const getEmail = document.querySelector('#email');
const getPhone = document.querySelector('#phone');
const getDetail = document.querySelector('#detail');
const getprofil = document.querySelector('#image_profile');

//article
const getArticle_name = document.querySelector('#showArticle_name');
const getArticle_detail = document.querySelector('#showArticle_detail');
const getArticle_image = document.querySelector('#imageURL');
const test = document.querySelector('#test');




firebase.auth().onAuthStateChanged(function (user) {
    if (user) {




        const email = localStorage.getItem('email');

        db.collection('users').doc(email).get().then((result) => {
            console.log(email);
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




        


            db.collection('articles').get().then(article => {
                
                article.docs.forEach(doc => {
                    console.log(doc.data().userId);

                    if (email === doc.data().userId) {

                        var row = `<div class="col-md-4 col-sm-4 card-body">
                        <div class="wrimagecard wrimagecard-topimage">
                        <div class="concard">
                        <img class="" src="${doc.data().imageURL}" width="100%" height="160px">
                        </div>
                        <div class="wrimagecard">
                        <div class="card-body">
                        <span   >${doc.data().article_name}</span ><br>
                        
                        </div>
                        </div>
            
                        </div>
                        </div>`;

                        $("#box").append(row)
                        

                        
                    }

                    // getArticle_name.innerHTML = doc.data().article_name;
                    // getArticle_detail.innerHTML = doc.data().article_detail;

                    // getArticle_image.setAttribute("src", doc.data().imageURL);
                    // getArticle_image.setAttribute("width", "100%");
                    // getArticle_image.setAttribute("height", "150px");
                    // getArticle_image.setAttribute("alt", "The Pulpit Rock");



                   




                });

            
            });

       
















    }
}
)
















// function showdata(doc) {

//     var row = table.insertRow(-1);
//     var cell1 = row.insertCell(0);
//     var cell2 = row.insertCell(1);
//     var cell3 = row.insertCell(2);
//     var cell4 = row.insertCell(3);
//     var cell5 = row.insertCell(4);

//     cell2.innerHTML = img.setAttribute("src", doc.data().imageURL);
//     img.setAttribute("width", "100px");
//     img.setAttribute("height", "100px");
//     document.body.appendChild(img);
//     // getArticle_image.setAttribute("alt", "The Pulpit Rock");
//     cell3.innerHTML = doc.data().article_name;
//     cell4.innerHTML = doc.data().article_detail;





//   }
