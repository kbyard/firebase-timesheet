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
        var startDate = moment($('#startDate').val().trim()).format("MM/DD/YY");
        var monthlyRate = $('#monthlyRate').val().trim();
        var newEmp = {
            name: empName,
            role: role,
            startDate: startDate.replace(/\//g, ''),
            monthlyRate: monthlyRate,
            joinDate: firebase.database.ServerValue.TIMESTAMP
        }

        dataRef.ref().push(newEmp);

        alert("Employee Successfully Added");

        $('#empName').val("");
        $('#role').val("");
        $('#startDate').val("");
        $('#monthlyRate').val("");
    });
    dataRef.ref().on("child_added", function (childSnapshot) {

        var dbName = childSnapshot.val().name;
        var dbRole = childSnapshot.val().role;
        var dbStart = childSnapshot.val().startDate;
        var dbRate = childSnapshot.val().monthlyRate;
        var dbJoin = childSnapshot.val().joinDate;

        //console.log(childSnapshot.val().name);
        //console.log(childSnapshot.val().role);
        //console.log(childSnapshot.val().startDate);
        //console.log(childSnapshot.val().monthlyRate);
        //console.log(childSnapshot.val().joinDate);

        var dbStartPretty = moment.unix(dbStart).format("MM/DD/YY");

        var dbMonths = moment().diff(moment.unix(dbStart, "X"), "months");

        var dbBilled = dbMonths * dbRate;

        $("table > tbody").append(`
            <tr>
                <td>${dbName}</td>
                <td>${dbRole}</td>
                <td>${dbStartPretty}</td>
                <td>${dbMonths}</td>
                <td>$${dbRate}</td>
                <td>$${dbBilled}</td>
            </tr>    
        `);
    });
});