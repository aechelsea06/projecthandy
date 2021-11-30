



const postArticle = document.querySelector('#postArticle');


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {

    const email = localStorage.getItem('email');





    db.collection('videos').get().then(vdo => {

      vdo.docs.forEach(doc => {


        var row = ` 
                <tr>
                  <th scope="row"></th>
                    <td><video class="video-fluid z-depth-1" autoplay loop controls muted src="${doc.data().videoURL}" alt="" width="90px" height"90px"></td></video>
                  <td><span>${doc.data().vdo_name}</span></td>
                  <td><span>${doc.data().vdo_detail}</span></td>
                  <td id="td4"></td>
                </tr>
               
              `;
        $("#box").append(row)
        showdata(doc);

      })


    })



    function showdata(doc) {
      let td = document.getElementById('td4')
      let btn = document.createElement('button')
      var table = document.querySelector('#tbresult')
      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);

      btn.textContent = 'Delete';
      btn.setAttribute('data-id', doc.id)
      btn.setAttribute('class', 'btn btn-danger')
      cell5.appendChild(btn)
      btn.addEventListener('click', (e => {
        let id = e.target.getAttribute('data-id')
        db.collection('videos').doc(id).delete().then(() => {
          console.log("Document successfully deleted!");
          location.reload();
        }).catch((error) => {
          console.error("Error removing document: ", error);
        })
      }));
    }




  }
}
)


