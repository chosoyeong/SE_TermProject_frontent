

const $bookingStatus = document.querySelector('.main-cal-booking-tbody');
/**
 * initApp handles setting up UI event listeners
 */
function addBooking(number,name,status,doc,time) {
    
    var color;
    switch(status){
        case "Time over":
            color = "red";
            break;
        case "complete":
            color = "blue";
            break;
        case "progressing":
            color="green";
            break;
        case "not yet":
            color="orange";
            break;
        default:
            break;
    }
    console.log(number,name,status,doc,time,color);
    let tmp_html = `<tr>\
            <td>${number}</td>\
            <td>${name}</td>\
            <td><span class="label bg-${color}">${status}</span></td>\
            <td>${doc}</td>\
            <td>${time}</span></td>\
        </tr>`;
    $('#reservation-status').append(tmp_html);
}
 
function reloadTodo(date){
    $('#reservation-status').html('');
    var index=0;

    // query from firestore
    db.collection("Reservation").where("date", "==", date).orderBy("time").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            fieldData = doc.data();
            console.log(fieldData);
            addBooking(++index, fieldData["patientName"], fieldData["state"], fieldData["docName"], fieldData["time"]);
        });
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

var db = firebase.firestore();