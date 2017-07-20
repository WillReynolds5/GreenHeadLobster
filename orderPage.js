

function toOrderPage(x){
  console.log(x);
  localStorage.setItem("locationValue", x);
  document.location.href = "orderPage.html";
  // if (x == 'WebsCove'){
  //   websCove()
  // }
  // if (x == 'Sunshine'){
  //   sunshine()
  //
  // }
  // if (x == 'Stonington') {
  //   stonington()
  // }


}

// window.onload = updateHeader(locationValue)

// function updateHeader(y){
//   console.log(y);
//   document.getElementById("header").innerHTML = "stonington"
// }

function sunshine(){

  var Inven = firebase.database().ref('Sunshine').orderByKey();
  Inven.on('value', function(snapshot) {
    // snapshot.forEach(function(childSnapshot){
    var string = JSON.stringify(snapshot);
    var Dict = JSON.parse(string);
    // console.log(Dict);
    for (var key in Dict){
      var listing = Dict[key]
      console.log(key);
      var price = listing.Price
      var inv = listing.Inventory

      myCreateFunction(key, inv, price)
    }

    // });

  });

}
function stonington(){


  var Inven = firebase.database().ref('Stonington').orderByKey();
  Inven.on('value', function(snapshot) {
    // snapshot.forEach(function(childSnapshot){
    var string = JSON.stringify(snapshot);
    var Dict = JSON.parse(string);
    // console.log(Dict);
    for (var key in Dict){
      var listing = Dict[key]
      console.log(key);
      var price = listing.Price
      var inv = listing.Inventory

      myCreateFunction(key, inv, price)
    }

    // });

  });

}

function webbsCove(){

  var websInven = firebase.database().ref('WebsCove').orderByKey();
  websInven.on('value', function(snapshot) {
    // snapshot.forEach(function(childSnapshot){
    var string = JSON.stringify(snapshot);
    var Dict = JSON.parse(string);
    // console.log(Dict);
    for (var key in Dict){
      var listing = Dict[key]
      console.log(key);
      var price = listing.Price
      var inv = listing.Inventory

      myCreateFunction(key, inv, price)
    }

    // });

  });

}

function myCreateFunction(key, inv, price) {
    var table = document.getElementById("myTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = key;
    cell2.innerHTML = inv;
    cell3.innerHTML = price;
    cell4.innerHTML = "<input type='text' value=''>";
}

function myDeleteFunction() {
    document.getElementById("myTable").deleteRow(0);
}
