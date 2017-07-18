
// var fireRef = new firebase('https://green-head-lobster.firebaseio.com');
// var database = firebase.database();
// (function() {
  //
  // const loginBtn = document.getElementById('loginBtn');
  // const signUpBtn = document.getElementById('signUpBtn');
  // var fireRef = new firebase('https://green-head-lobster.firebaseio.com');
  // var database = firebase.database().ref();

//  signUpBtn.addEventListener('click', e => {

// function signUp(){
//     console.log("signing Up");
//     var email = document.getElementById("signUpEmail").value;
//
//     var fullName = document.getElementById("name").value;
//     var password = document.getElementById("signUpPassword").value;
//     const signUp = firebase.auth().createUserWithEmailAndPassword(email, password);
//
//     signUp
//       .catch(e => console.log(e.message));
//
//     const login = firebase.auth().signInWithEmailAndPassword(email, password);
//
//     login
//       .catch(e => console.log(e.message));
//
//     firebase.auth().onAuthStateChanged(firebaseUser => {
//         if (firebaseUser) {
//           database.child('users').child(firebaseUser.uid).set(fullName);
//         }
//       });
//   }
  //});


  // loginBtn.addEventListener('click', e => {

//   function login(){
//     console.log("logining In");
//     var email = document.getElementById("loginEmail").value;
//     var password = document.getElementById("loginPassword").value;
//
//     const login = firebase.auth().signInWithEmailAndPassword(email, password);
//
//     login
//       .catch(e => console.log(e.message));
// }
  // });

  // firebase.auth().onAuthStateChanged(firebaseUser => {
  //   if (firebaseUser) {
  //     console.log(firebaseUser);
  //     document.location.href = "homepage.html";
  //   }
  //   else {
  //     console.log('not logged in');
  //   }
  //
  // });

// }());
(function() {

var database = firebase.database().ref();

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
        console.log("SWITCH");
        document.location.href = "homepage.html";
      }
      else {
        console.log('not logged in');
      }

    });
}());

function signUp(){
    console.log("signing Up");
    var email = document.getElementById("signUpEmail").value;

    var fullName = document.getElementById("name").value;
    var password = document.getElementById("signUpPassword").value;
    console.log(fullName);
    console.log(password);
    const signUp = firebase.auth().createUserWithEmailAndPassword(email, password);

    signUp.catch(e => {
        alert(e.message)
        console.log(e.message)
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          database.child('users').child(firebaseUser.uid).set(fullName);
        }
      });
  }


  function login(){
    console.log("logining In");
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    const login = firebase.auth().signInWithEmailAndPassword(email, password);

    login.catch(e => console.log(e.message));
}
