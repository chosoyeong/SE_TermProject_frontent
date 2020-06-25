/** * 
 * @file fb-calendar.js 
 * @author Heejin Ryu
 * @version 1.0
 * this file is to manage cutomer information
 * */

/**
 * customer ID 
 */
var customerID;
const customerName = document.getElementById('name');
const customerBirth = document.getElementById('birth');
const customerPhoneNo = document.getElementById('contact-number');
const defaultval = 0;

/**
 * addCustomer(evt)
 * @param {Event} evt
 * set customer information in the customer db
 * and get alert successfully added. 
 */
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
        alert("successfully added");
        console.log('Added document withID: ',docRef.id );
    })
    .catch(function(error){
        alert("Error adding document: ",error);
    });
    $('#name').val("");
    $("#birth").val("");
    $("#contact-number").val("");
}

/**
 * customerList
 * @param {any} id 
 * @param {number} number 
 * @param {string} name 
 * @param {date} birth 
 * @param {phone} phone
 * add customer list dynamically in web site 
 * according to the customer is added,deleted. 
 */
function customerList(id,number,name,birth,phone){
    let tmp_html = `<tr id="${id}" class="tdcls">\
        <td>${number}</td>\
        <td>${name}</td>\
        <td>${birth}</td>\
        <td>${phone}</td>\
    </tr>`;

    $("#customer-lists").append(tmp_html);
    
}

/**
 * searchCustomer
 * searchCustomer using the name and birth that they give in
 * go to customer db where the name and birth are same
 * and then, get the documetation spread information using customerList() function
 */
function searchCustomer(){
    
    var name = $("#search-name").val();
    var birth = $("#search-birth").val();
    
    db.collection("Customer").where("customerName","==",name).where("customerBirth","==",birth)
    .onSnapshot(function (querySnapshot){
        var index=0;
        $("#customer-lists").html("");
       querySnapshot.forEach(function (doc){
            data = doc.data();
            customerList(doc.ref.id,++index,data["customerName"],data["customerBirth"],data["customerPhoneNo"]);
       })
       $("#search-name").val("");
       $("#search-birth").val("");
    })
    
}

/**
 * deleteCustomer
 * get customerID from global value and delete from customer db
 * and also delete all of the histories in history db 
 */
function deleteCustomer(){
    db.collection("Customer")
    .doc(customerID)
    .delete()
    .then(()=>{
    
        alert("successfully deleted");
        console.log("successfully deleted");
    })
    .catch(function(error){
        console.log(error);
    });
    db.collection("History")
    .where("customerId","==",customerID)
    .get()
    .then((querySnapshot)=>{
        querySnapshot.forEach(function(doc){
            doc.ref.delete();
            console.log("deleted histories of this customer");
        })
    })
    .catch((error)=>{
        alert(error+" in delete Customer function");
    })
    back_to_cus_list();
}
    
/**
 * editCustomer
 * if the button is "완료", can not edit the input text
 * and find the sell values and coordinate the level. SILVER, GOLD, VIP, VVIP.
 * and set the updated customer information in customer DB
 * and spread the new customer information in the web site.
 */
function editCustomer() {
    if( document.getElementById("edit-customer-btn").innerText  == "완료"){
        document.getElementById("edit-customer-btn").innerText  = "EDIT";
        var oEle1 = document.getElementById('txt1') ;
        oEle1.readOnly = true ;
        var oEle2 = document.getElementById('txt2') ;
        oEle2.readOnly = true ;
        var oEle3 = document.getElementById('txt3') ;
        oEle3.readOnly = true ;
        var oEle4 = document.getElementById('txt4') ;
        oEle4.readOnly = true ;
        var oEle5 = document.getElementById('txt5') ;
        oEle5.readOnly = true ;
        var oEle6 = document.getElementById('txt6') ;
        oEle6.readOnly = true ;
        var oEle7 = document.getElementById('txt7') ;
        oEle7.readOnly = true ;
        var oEle8 = document.getElementById('txt8') ;
        oEle8.readOnly = true ;
        
        var sell = Number($("#txt4").val());
        var level = "SILVER";
        if(sell>=1000000&&sell<5000000){
            level="GOLD"
        }else if(sell>=5000000&&sell<10000000){
            level="VIP"
        }else if(sell>=10000000){
            level="VVIP"
        }
        db.collection("Customer")
        .doc(customerID)
        .set({
            customerName: $('#txt1').val(),
            customerBirth: $('#txt2').val(),
            customerPhoneNo:$('#txt3').val(),
            level:level,
            sell:$('#txt4').val(),
            reservation:$('#txt5').val(),
            consulting:$('#txt6').val(),
            points:$('#txt7').val(),
            coupons:$('#txt8').val()                   
        })
        .then((docRef)=>{
            alert("succesfully updated");
        })
         .catch(function(error){
            alert(error);
        });

        db.collection("Customer")
        .doc(customerID)
        .get()
        .then((docRef)=>{
                data = docRef.data();
                $("#txt1").val(data["customerName"]);
                $("#txt2").val(data["customerBirth"]);
                $("#txt3").val(data["customerPhoneNo"]);
                $("#txt4").val(data["sell"]);
                $("#txt5").val(data["reservation"]);
                $("#txt6").val(data["consulting"]);
                $("#txt7").val(data["points"]);
                $("#txt8").val(data["coupons"]);
                $("#level").text(data["level"]);
        })
        .catch((error)=>{
            alert("error in select_customer");
    })
  
    }
    else if( document.getElementById("edit-customer-btn").innerText  == "EDIT"){
        document.getElementById("edit-customer-btn").innerText  = "완료";
        document.getElementById("edit-customer-btn").background= "blue";

        var oEle1 = document.getElementById('txt1') ;
        oEle1.readOnly = false ;
        var oEle2 = document.getElementById('txt2') ;
        oEle2.readOnly = false ;
        var oEle3 = document.getElementById('txt3') ;
        oEle3.readOnly = false ;
        var oEle4 = document.getElementById('txt4') ;
        oEle4.readOnly = false ;
        var oEle5 = document.getElementById('txt5') ;
        oEle5.readOnly = false ;
        var oEle6 = document.getElementById('txt6') ;
        oEle6.readOnly = false ;
        var oEle7 = document.getElementById('txt7') ;
        oEle7.readOnly = false ;
        var oEle8 = document.getElementById('txt8') ;
        oEle8.readOnly = false ;

        

    }
}

/**
 * select_customer
 * @param {any} id
 * when you click the <tr> tag, select customer and get the information of who they choose
 * and give the information in HTML tags 
 */
function select_customer(id) {
    db.collection("Customer")
    .doc(id)
    .get()
    .then((docRef)=>{
            data = docRef.data();
            $("#txt1").val(data["customerName"]);
            $("#txt2").val(data["customerBirth"]);
            $("#txt3").val(data["customerPhoneNo"]);
            $("#txt4").val(data["sell"]);
            $("#txt5").val(data["reservation"]);
            $("#txt6").val(data["consulting"]);
            $("#txt7").val(data["points"]);
            $("#txt8").val(data["coupons"]);
            $("#level").text(data["level"]);
       })
    .catch((error)=>{
        alert("error in select_customer");
    })
    document.getElementById("informatio_form").style="display:block" 
    document.getElementById("search_result").style="display:none"   
    
}

/**
 * onClickListener of customer-list button.
 * get customerID of that they choose.
 */
$("#customer-lists").on("click", "tr", function() { 
        var id = $(this).attr('id');
        customerID = id;
        select_customer(id);
 });

 /**
  * back_to_cus_list
  * back to the view and show the view.
  */
 function back_to_cus_list() {
    document.getElementById("informatio_form").style="display:none"
    document.getElementById("search_result").style="display:block"
}

/**
 * onclickListener and onclick functions of buttons.
 */
window.onload = function () {
    document.getElementById('add-customer-btn').addEventListener('click', addCustomer,false);
    document.getElementById('search-btn').addEventListener('click', searchCustomer,false);
    document.getElementById('delete-customer-btn').addEventListener('click', deleteCustomer,false);
    document.getElementById('edit-customer-btn').addEventListener('click', editCustomer,false);
    document.getElementById('info_prev_btn').addEventListener('click', back_to_cus_list,false);
    

}

/**
 * get db from firebase firestore.
 */
var db = firebase.firestore();