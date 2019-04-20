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


  $('#add-employee').on("click", function(){
    // get value
    var name = $('name-input').val().trim();
    var role = $('role-input').val().trim();
    var startDate = $('date-input').val().trim();
    var monthlyRate = $('rate-input').val().trim();
    // validate
    if (name === "" || role === "" || startDate === "" || monthlyRate === "") return;
    // empty inputs

    
    // compute field data

    // add to database
    database.ref().push({name: name, 
                        role: role, 
                        startDate: startDate, 
                        monthlyRate: monthlyRate, 
                        dataAdded: firebase.database.ServerValue.TIMESTAMP});

  });