
// var fireRef = new firebase('https://green-head-lobster.firebaseio.com');
// var database = firebase.database();
(function(){


  const loginButton = document.getElementById('loginButton')

  // var fireRef = new firebase('https://green-head-lobster.firebaseio.com');
  var database = firebase.database().ref();

  loginButton.addEventListener('click', e => {
    window.alert('clickstArted');
    var email = document.getElementById("signUpEmail").value;
    console.log(email);

    var fullName = document.getElementById("name").value;
    var password = document.getElementById("signUpPassword").value;


      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (error != null) {
          window.alert(errorMessage);
          return;
        }
        console.log(fullName);
        database.child(email).set(fullName);



        // ...
      });
  })



}());



function signUp(){

}
