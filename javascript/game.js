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
  var totalBilled = 0;
  var monthsWorked = 0;

  $('#add-employee').on("click", function(){
    // get value
    name = $('#name-input').val().trim();
    role = $('#role-input').val().trim();
    startDate = $('#date-input').val().trim();
    monthlyRate = $('#rate-input').val().trim();
    

    // validate
    if (name === "" || role === "" || startDate === "" || monthlyRate === "") return;
    
     
    // add to database
    database.ref().push({name: name, 
                        role: role, 
                        startDate: startDate, 
                        monthlyRate: monthlyRate, 
                        dataAdded: firebase.database.ServerValue.TIMESTAMP});

  });
  database.ref().on("child_added", function(childSnapshot) {

    var sd = moment(childSnapshot.val().startDate);
    var today = moment(childSnapshot.val().dataAdded);
    monthsWorked = today.diff(sd, "months");
    totalBilled = (monthsWorked * childSnapshot.val().monthlyRate);
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().role);
    console.log(childSnapshot.val().startDate);
    console.log(childSnapshot.val().monthlyRate);
    console.log(childSnapshot.val().dataAdded);
    console.log(childSnapshot.key);
    
    // full list of items to the well
    $("#employeeInfo").append("<tr class='employee'><td class='emp-name'> " + childSnapshot.val().name +
      " </td><td class='emp-role'> " + childSnapshot.val().role +
      " </td><td class='emp-startDate'> " + childSnapshot.val().startDate + 
      " </td><td class='emp-monthsWorked'> " + monthsWorked +
      " </td><td class='emp-monthlyRate'> " + childSnapshot.val().monthlyRate +
      " </td><td class='emp-totalBilled'> " + totalBilled +
      " </td><td class='delete'><button class='delete-emp' data-key='"+ childSnapshot.key + "'>Delete</button>" +
      " </td></tr>");

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
  $(document).on('click', '.delete-emp', function(){
    database.ref($(this).data('key')).remove();
    $(this).parent().parent().remove();


  });