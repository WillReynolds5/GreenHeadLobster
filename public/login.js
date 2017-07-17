
// var fireRef = new firebase('https://green-head-lobster.firebaseio.com');
// var database = firebase.database();
(function() {

  const loginBtn = document.getElementById('loginBtn');
  const signUpBtn = document.getElementById('signUpBtn');
  // var fireRef = new firebase('https://green-head-lobster.firebaseio.com');
  var database = firebase.database().ref();

  signUpBtn.addEventListener('click', e => {

    // console.log(e.message);
    var email = document.getElementById("signUpEmail").value;

    var fullName = document.getElementById("name").value;
    var password = document.getElementById("signUpPassword").value;
    const signUp = firebase.auth().createUserWithEmailAndPassword(email, password);

    signUp
      .catch(e => console.log(e.message));

    const login = firebase.auth().signInWithEmailAndPassword(email, password);

    login
      .catch(e => console.log(e.message));

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          database.child('users').child(firebaseUser.uid).set(fullName);
        }
      });

  });

  loginBtn.addEventListener('click', e => {
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    const login = firebase.auth().signInWithEmailAndPassword(email, password);

    login
      .catch(e => console.log(e.message));

  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      window.location.href = "";
      document.location.href = "homepage.html";
    }
    else {
      console.log('not logged in');
    }

  });

}());

// $(document).ready(function() {
//     // Optimalisation: Store the references outside the event handler:
//     var $window = $(window);
//     var $pane = $('#pane1');
//
//     function checkWidth() {
//         var windowsize = $window.width();
//         if (windowsize > 440) {
//             //if the window is greater than 440px wide then turn on jScrollPane..
//             $pane.jScrollPane({
//                scrollbarWidth:15,
//                scrollbarMargin:52
//             });
//         }
//     }
//     // Execute on load
//     checkWidth();
//     // Bind event listener
//     $(window).resize(checkWidth);
// });
