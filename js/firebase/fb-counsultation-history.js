

const customerName = document.getElementById('name');
const customerBirth = document.getElementById('birth');
const consultationDate = document.getElementById('now_date');
const type_T = document.getElementById('treatment');
const type_B = document.getElementById('beauty');
const counselor = document.getElementById('counselor');
const title = document.getElementById('counsultation-title');
const content = document.getElementById('consultation-content');


function addConsultation(event){
    var postData={
        customerName: customerName.value,
        customerBirth: customerBirth.value,
        consultationDate: consultationDate.value,
        type: {
            treatment:type_T.checked,
            beauty:type_B.checked
        },
        counselor: counselor.value,
        title: title.value,
        content: content.value
    };
    db.collection("History")
    .add(postData)
    .then(function(docRef) {
        console.log('Added document withID: ',docRef.id );
    })
    .catch(function(error){
        alert("Error adding document: ",error);
    });
    console.log(customerBirth.value,customerName.value,consultationDate.value,type_B.checked,type_T.checked,counselor.value,title.value,content.value);

}
window.onload = function () {

    document.getElementById('add-consultation-btn').addEventListener('click', addConsultation,false);
}
var db = firebase.firestore();