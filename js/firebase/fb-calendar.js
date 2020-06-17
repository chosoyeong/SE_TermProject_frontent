
function getSchedules() {

    db.collection("Reservation").orderBy("time").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {

            console.log(doc.id, "=>", doc.data());

            calendar.addEvent({
                'title': doc.data()["patientName"] + "\n Dr." + doc.data()["docName"] + "\n Time:" + doc.data()["time"],
                'start': doc.data()["date"],
                'end': doc.data()["date"]
            });
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

var db = firebase.firestore();

var schedules = new Array();
getSchedules();