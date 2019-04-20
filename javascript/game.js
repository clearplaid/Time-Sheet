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