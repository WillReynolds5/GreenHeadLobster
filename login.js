
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
    }
    else {
      console.log('not logged in');
    }

  });



}());
