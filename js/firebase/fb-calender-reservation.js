/** * 
 * @file fb-calendar-reservation.js 
 * @author Heejin Ryu
 * @version 1.0
 * this file is to manage main calendar reservations
 * */

const $bookingStatus = document.querySelector('.main-cal-booking-tbody');
/**
 * initApp handles setting up UI event listeners
 */

 /**
  * addBooking
  * @param {number} number 
  * @param {string} name 
  * @param {object} doc 
  * @param {string} time 
  * @param {string} date 
  * get reservation and check the status using gap of the time now.
  * set html tags dynamiclly in web with the information
  */
function addBooking(number, name, doc, time, date) {
    var now = new Date();
    var schTime = new Date(date + " " + time);
    var gap = now.getTime() - schTime.getTime();

    var status;
    var color;

    if (gap > 0) {
        color = "blue";
        status = "완료";
    } else if (gap/1000/60 >= -30) {
        color = "green"
        status = "진행중";
    } else {
        color = "orange";
        status = "예정";
    }

    let tmp_html = `<tr>\
            <td>${number}</td>\
            <td>${name}</td>\
            <td><span class="label bg-${color}">${status}</span></td>\
            <td>${doc}</td>\
            <td>${time}</span></td>\
        </tr>`;
    $('#reservation-status').append(tmp_html);
}


/**
 * reloadTodo(date)
 * @param {string} date
 * reload the booking Todos 
 * get reservation db and find the date orderby time.
 * and for each reservations go to add booking funcions to show in the web dynamically. 
 */ 
function reloadTodo(date){
    $('#reservation-status').html('');
    var index=0;

    // query from firestore
    db.collection("Reservation").where("date", "==", date).orderBy("time").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            fieldData = doc.data();
            //console.log(fieldData);
            addBooking(++index, fieldData["patientName"], fieldData["docName"], fieldData["time"], date);
        });
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

var db = firebase.firestore();