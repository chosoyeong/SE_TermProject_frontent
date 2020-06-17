
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

var db = firebase.firestore();

var schedules = new Array();
getSchedules();