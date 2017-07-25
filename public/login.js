
(function() {

    // firebase.auth().onAuthStateChanged(firebaseUser => {
    //   if (firebaseUser) {
    //     console.log(firebaseUser);
    //     console.log("SWITCH");
    //     var fullName = document.getElementById("name").value;
    //     try {
    //
    //       var promise = firebase.database().ref('Users').child(firebaseUser.uid).set(fullName);
    //         promise.then(function(){
    //             document.location.href = "homepage.html";
    //         });
    //
    //
    //     } catch (e) {
    //
    //       console.log(e);
    //
    //     }
    //
    //   }
    //   else {
    //     console.log('not logged in');
    //   }
    //
    // });
}());


function signUp(){
    console.log("signing Up");
    var email = document.getElementById("signUpEmail").value;
    var password = document.getElementById("signUpPassword").value;
    console.log(password);
    var signUp = firebase.auth().createUserWithEmailAndPassword(email, password);

    signUp.then(function(){
      firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
          console.log(firebaseUser);
          console.log("SWITCH");
          var fullName = document.getElementById("name").value;
          try {
            var promise = firebase.database().ref('Users').child(firebaseUser.uid).set(fullName);
              promise.then(function(){
                console.log('everything done');
                  checklogInFromIndex();
              });
          } catch (e) {
            console.log(e);
          }
        }
        else {
          console.log('not logged in');
        }
      });
    });

    signUp.catch(e => {
        alert(e.message);
        console.log(e.message);
    });




    // firebase.auth().onAuthStateChanged(firebaseUser => {
    //     if (firebaseUser) {
    //       alert('adding');
    //       // firebase.database.ref('Users').child(firebaseUser.uid).set(fullName);
    //     }else {
    //       alert('fuck');
    //     }
    //   });
  }


  function login(){
    console.log("logining In");
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    var login = firebase.auth().signInWithEmailAndPassword(email, password);

    login.then(function(){
      checklogInFromIndex();
    });

    login.catch(e => {
        alert(e.message);
        console.log(e.message);
    });
}

function checklogInFromIndex(){
  firebase.auth().onAuthStateChanged(function(user){
    console.log('runniong');
    if (user){
      document.location.href = "homepage.html";

    }
  });
}
