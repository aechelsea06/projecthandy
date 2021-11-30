//profile
const getName = document.querySelector('#name');
const getEmail = document.querySelector('#email');
const getPhone = document.querySelector('#phone');
const getDetail = document.querySelector('#detail');
const getprofil = document.querySelector('#image_profile');





//product
const getProductName = document.querySelector('#productName');
const getProductDetail = document.querySelector('#productDetali');
const getFacebook = document.querySelector('#facebook');
const getProductShopLink = document.querySelector('#productShopLink');
const getProductURL = document.querySelector('#produstURL');




firebase.auth().onAuthStateChanged(function (user) {
    if (user) {

        


            const email = localStorage.getItem('email');

          


      

        db.collection('products').get().then(product => {

            product.docs.forEach(doc => {
                if (email === doc.data().userId) {

                // getProductName.innerHTML = doc.data().pd_name;
                // getProductDetail.innerHTML = doc.data().pd_detail;
                // getFacebook.innerHTML = doc.data().facebook;


                // getProductURL.setAttribute("src", doc.data().productURL);
                // getProductURL.setAttribute("width", "100%");
                // getProductURL.setAttribute("height", "50%");
                // getProductURL.setAttribute("alt", "The Pulpit Rock");


                // getProductShopLink.setAttribute("href", doc.data().shop_link);
                // document.body.appendChild(s);



                var row =` <div class="col-md-3 col-sm-4">
                <div class="wrimagecard wrimagecard-topimage">
                    <a href="#">
                        <div class="">
                            <img class="card-img-top" src="${doc.data().productURL}"  alt="Card image cap" id="produstURL">
                        </div>
                    </a>
                    <div class="wrimagecard">
                        <div class="card-body">
                            <h5 class="card-title" >${doc.data().pd_name}</h5>
                            <span class="card-text" >${doc.data().pd_detail}</span>
                            <br><br>
                            <i class='bx bxl-facebook-square' style='color:#0056b3'><span >${doc.data().facebook} </span>
                                   </i>
                            <a href="${doc.data().shop_link}" ><i class='bx bx-link-alt' style='color:#af0404'><span>Shopping</span></i></a>
                        </div>
                        <hr>
                        <div > 
                        </div>
                    </div>
                </div>
            </div>`;
            $("#box").append(row)
                }
            })


        })










    }
}
)



