

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
    var booking = reservation.orderByChild("date").equalTo(date);
    console.log(booking);
    var index=0;
    booking.on('value',function(snapshot){
        snapshot.forEach(childSnapshot=>{
            childData = childSnapshot.val();
            addBooking(++index,childData["patientName"],childData["state"],childData["docName"],childData["time"]);
            console.log(childSnapshot.val());
        });
      
    });
    
}

var database = firebase.database();
var reservation = database.ref('Reservation');

