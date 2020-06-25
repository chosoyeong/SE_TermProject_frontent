/** * 
 * @file fb-calendar.js 
 * this file is to manage clendar
 * for example, showing reservation
 * */


/**
 * getSchedules gets schedule 
 * @param {any} evt name of customer, time of customer, doctor (In HTML)
 */
function getSchedules() {
    //Get all schedules
    db.collection("Reservation").orderBy("time").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
			scheduleDBData.push(doc.data());

            calendar.addEvent({
                'title': doc.data()["patientName"] + "\n Dr." + doc.data()["docName"] + "\n Time:" + doc.data()["time"],
                'start': doc.data()["date"],
                'end': doc.data()["date"],
                'id': doc.id,
                'date':doc.data()["date"]
            });

            //Calender events Save
            events = calendar.getEvents();
        });
    });
}

/**
 * AddSchedule adds schedule
 * @param {any} evt name of customer, time of customer, doctor (In HTML)
 */
function addSchedule() {
    // get elements
    var name = document.getElementById("Name").value;
    var date = document.getElementById("Date").value;
    var time = document.getElementById("Time").value;
    var dr = document.getElementById("Doctor").value;

    // ADD in firestore
    if (name != "" && date != "" && time != "" && dr != "") {
        db.collection("Reservation").add({
            "date": date,
            "docName": dr,
            "patientName": name,
            "time": time,
            "state": "",
        }).then(function () {
            window.location.reload();
        });
    }

}

/**
 * Edit Schedule 
 * @param {any} id, name of customer, time of customer, doctor (In HTML)
 * Modify the contents of the schedule DB through Id(Doc).
 */
function editSchedule(id) {
    // Get elements
    var name = document.getElementById("Name_edit").value;
    var date = document.getElementById("Date_edit").value;
    var time = document.getElementById("Time_edit").value;
    var dr = document.getElementById("Doctor_edit").value;

    // edit firestore documentation
    if (name != "" && date != "" && time != "" && dr != "") {
        db.collection("Reservation").doc(id).set({
            "date": date,
            "docName": dr,
            "patientName": name,
            "time": time,
            "state": "",
        }).then(function () {
            window.location.reload();
        });
    }
}


/**
 * Delete Schedule
 * @param {any} id
 * Delete the schedule with the corresponding ID in the DB through the Id value of the corresponding schedule
 */
function deleteSchedule(id) {
    // delete in 
    db.collection("Reservation").doc(id).delete().then(function () {
        window.location.reload();
    });
}

/**
 * Filtering calendar
 * @param {any} drName
 * Function to filter calendars to show only events with their name
 * If already filtered, return to original
 */
function filterEvent(drName){
	if(!isfilted){
		calendar.removeAllEvents();
		for(value of events){

			var data = value._def["title"].split("\n");
			docName = data[1].substring(4, data[1].len);

			if(docName == drName) {
			calendar.addEvent(value);
			}
		}
		isfilted = true;
	}
	else {
		calendar.removeAllEvents();

		for(value of events){
			calendar.addEvent(value);
		}

		isfilted = false;
	}
}

var db = firebase.firestore();
var scheduleDBData = new Array();
var schedules = new Array();
getSchedules();

var isfilted = false;
