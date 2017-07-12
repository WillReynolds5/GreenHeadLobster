

function signUp(){

var email = document.getElementById("signUpEmail").value;
console.log(email);

var password = document.getElementById("signUpPassword").value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}
