
function getSchedules() {

    db.collection("Reservation").orderBy("time").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            //console.log(doc.id, "=>", doc.data());

            calendar.addEvent({
                'title': doc.data()["patientName"] + "\n Dr." + doc.data()["docName"] + "\n Time:" + doc.data()["time"],
                'start': doc.data()["date"],
                'end': doc.data()["date"],
                'id': doc.id,
                'date':doc.data()["date"]
            });

            events = calendar.getEvents();

            console.log(events);
        });
    });
}

function addSchedule() {

    var name = document.getElementById("Name").value;
    var date = document.getElementById("Date").value;
    var time = document.getElementById("Time").value;
    var dr = document.getElementById("Doctor").value;

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

function editSchedule(id) {

    var name = document.getElementById("Name_edit").value;
    var date = document.getElementById("Date_edit").value;
    var time = document.getElementById("Time_edit").value;
    var dr = document.getElementById("Doctor_edit").value;

    if (name != "" && date != "" && time != "" && dr != "") {
        db.collection("Reservation").doc(id).set({
            "date": date,
            "docName": dr,
            "patientName": name,
            "time": time,
            "state": "",
        }).then(function () {
            console.log("OK");
            window.location.reload();
        });
    }
}

function deleteSchedule(id) {

    db.collection("Reservation").doc(id).delete().then(function () {
        window.location.reload();
    });
}

var db = firebase.firestore();

var schedules = new Array();
getSchedules();