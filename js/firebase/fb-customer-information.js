
const customerName = document.getElementById('name');
const customerBirth = document.getElementById('birth');
const customerPhoneNo = document.getElementById('contact-number');
const defaultval = 0;

function addCustomer(evt){
    evt.preventDefault();
    var postData={
        customerName: customerName.value,
        customerBirth: customerBirth.value,
        customerPhoneNo:customerPhoneNo.value,
        level:"SILVER",
        sell:defaultval,
        reservation:defaultval,
        consulting:defaultval,
        points:defaultval,
        coupons:defaultval
    };
    db.collection("Customer")
    .add(postData)
    .then(function(docRef) {
        console.log('Added document withID: ',docRef.id );
    })
    .catch(function(error){
        alert("Error adding document: ",error);
    });

}
window.onload = function () {
    document.getElementById('add-customer-btn').addEventListener('click', addCustomer,false);
}

var db = firebase.firestore();