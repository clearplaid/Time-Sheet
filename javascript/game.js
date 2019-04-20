// Initialize Firebase
var config = {
    apiKey: "AIzaSyBZfnmHbF_SMT7DqIFh6Kdp3LGVV32YA_A",
    authDomain: "awesometeamtimesheet.firebaseapp.com",
    databaseURL: "https://awesometeamtimesheet.firebaseio.com",
    projectId: "awesometeamtimesheet",
    storageBucket: "awesometeamtimesheet.appspot.com",
    messagingSenderId: "361987824664"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

  var name = "";
  var role = "";
  var startDate = "";
  var monthlyRate = 0;

  $('#add-employee').on("click", function(){
    // get value
    name = $('#name-input').val().trim();
    role = $('#role-input').val().trim();
    startDate = $('#date-input').val().trim();
    monthlyRate = $('#rate-input').val().trim();
    console.log(name)
    // validate
    if (name === "" || role === "" || startDate === "" || monthlyRate === "") return;

    // add to database
    database.ref().push({name: name, 
                        role: role, 
                        startDate: startDate, 
                        monthlyRate: monthlyRate, 
                        dataAdded: firebase.database.ServerValue.TIMESTAMP});

  });
  dataRef.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);
    console.log(childSnapshot.val().dataAdded);

    // full list of items to the well
    $("#employeeInfo").append("<tr class='employee'><td class='emp-name'> " + childSnapshot.val().name +
      " </td><td class='emp-role'> " + childSnapshot.val().role +
      " </td><td class='emp-startDate'> " + childSnapshot.val().startDate +
      " </td><td class='emp-monthlyRate'> " + childSnapshot.val().monthlyRate +
      " </td></tr>");

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });