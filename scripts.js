$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC8kTqcGN-sn3eg5X1QSyDPMZ1FHtYgZsQ",
        authDomain: "timetracker-347a8.firebaseapp.com",
        databaseURL: "https://timetracker-347a8.firebaseio.com",
        projectId: "timetracker-347a8",
        storageBucket: "timetracker-347a8.appspot.com",
        messagingSenderId: "487105704188"
    };
    firebase.initializeApp(config);

    var dataRef = firebase.database();

    $('#addRecord').on('click', function (e) {
        e.preventDefault();

        var empName = $('#empName').val().trim();
        var role = $('#role').val().trim();
        var startDate = $('#startDate').val().trim();
        var monthlyRate = $('#monthlyRate').val().trim();

        dataRef.ref().push({
            name: empName,
            role: role,
            startDate: startDate,
            monthlyRate: monthlyRate,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });
    dataRef.ref().on("child_added", function(childSnapshot){
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().role);
        console.log(childSnapshot.val().startDate);
        console.log(childSnapshot.val().monthlyRate);
        console.log(childSnapshot.val().dateAdded);
    });

});