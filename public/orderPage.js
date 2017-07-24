//
// $( document ).ready(function() {
//
// alert('');
//     $('adminTable').on('click', 'button[type="button"]', function(e) {
//       alert('');
//     // var inputValue = $(this).closest("tr").find("input[type=text]").val();
//     // var selectValuse = $(this).closest("tr").find("[name='select_job']").val();
//     var index = $(this).closest("tr").remove();
//   });
// });



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


function sunshine(){

  var Inven = firebase.database().ref('Ports').child('Sunshine').orderByKey();
  Inven.on('value', function(snapshot) {

    var string = JSON.stringify(snapshot);
    var Dict = JSON.parse(string);
    for (var key in Dict){
      var listing = Dict[key];
      console.log(key);
      var price = listing.Price;
      var inv = listing.Inventory;

      myCreateFunction(key, inv, price);
    }


  });

}
function stonington(){


  var Inven = firebase.database().ref('Ports').child('Stonington').orderByKey();
  Inven.on('value', function(snapshot) {
    // snapshot.forEach(function(childSnapshot){
    var string = JSON.stringify(snapshot);
    var Dict = JSON.parse(string);
    // console.log(Dict);
    for (var key in Dict){
      var listing = Dict[key];
      console.log(key);
      var price = listing.Price;
      var inv = listing.Inventory;

      myCreateFunction(key, inv, price);
    }

    // });

  });

}

function webbsCove(){

  var websInven = firebase.database().ref('Ports').child('Webbs Cove').orderByKey();
  websInven.on('value', function(snapshot) {
    // snapshot.forEach(function(childSnapshot){
    var string = JSON.stringify(snapshot);
    var Dict = JSON.parse(string);
    // console.log(Dict);
    for (var key in Dict){
      var listing = Dict[key];
      console.log(key);
      var price = listing.Price;
      var inv = listing.Inventory;

      myCreateFunction(key, inv, price);
    }

    // });

  });

}
// admin

function adminSunshine(){

  var Inven = firebase.database().ref('Ports').child('Sunshine').orderByKey();
  Inven.on('value', function(snapshot) {
    var string = JSON.stringify(snapshot);
    var Dict = JSON.parse(string);
    // console.log(Dict);
    for (var key in Dict){
      var listing = Dict[key]
      console.log(key);
      var price = listing.Price;
      var inv = listing.Inventory;

      addExsistingListings(key, inv, price);
    }


  });

}
function adminStonington(){


  var Inven = firebase.database().ref('Ports').child('Stonington').orderByKey();
  Inven.on('value', function(snapshot) {
    var string = JSON.stringify(snapshot);
    var Dict = JSON.parse(string);
    // console.log(Dict);
    for (var key in Dict){
      var listing = Dict[key]
      console.log(key);
      var price = listing.Price;
      var inv = listing.Inventory;

      addExsistingListings(key, inv, price);
    }

  });

}

function adminWebbsCove(){

  var websInven = firebase.database().ref('Ports').child('Webbs Cove').orderByKey();
  websInven.on('value', function(snapshot) {
    // snapshot.forEach(function(childSnapshot){
    var string = JSON.stringify(snapshot);
    var Dict = JSON.parse(string);
    // console.log(Dict);
    for (var key in Dict){
      var listing = Dict[key]
      console.log(key);
      var price = listing.Price;
      var inv = listing.Inventory;

      addExsistingListings(key, inv, price);
    }

    // });

  });

}

//creating rows

function myCreateFunction(key, inv, price) {
  console.log('create!');
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

function addNewListings() {
    var table = document.getElementById("adminTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "<input class='baitType' type='text' value=''>";
    cell2.innerHTML = "<input class='inv' type='text' value=''>";
    cell3.innerHTML = "<input class='price' type='text' value=''>";
    cell4.innerHTML = "<button id='dBtn' class='deleteBtn' type='button' onClick='myDeleteFunction(this)'>Delete</button>";
}//onClick='myDeleteFunction(this.row)'

function addExsistingListings(key, inv, price) {
    var table = document.getElementById("adminTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "<input class='baitType' type='text' value='"+key+"'>";
    cell2.innerHTML = "<input class='inv' type='text' value='"+inv+"'>";
    cell3.innerHTML = "<input class='price' type='text' value='"+price+"'>";
    cell4.innerHTML = "<button id='dBtn' class='deleteBtn' type=button' onClick='myDeleteFunction(this)'>Delete</button>";
}//onClick='myDeleteFunction(this.row)'


function myDeleteFunction(x) {
    console.log('eeeeeee');
    var table = document.getElementById("adminTable");
    table.deleteRow(x.closest('tr').rowIndex);
    console.log(x.closest('tr'));

}



//not pushing to the server properly... going as to many dictionaries

function SaveAdminData(port) {
  var adminTable = document.getElementById("adminTable");
  var updateDict = {};
  // console.log(adminTable.rows);
  for (var i = 0; i < adminTable.rows.length - 1; i++) {
      var rowDict = {};
      var bait = document.getElementsByClassName('baitType')[i].value;
      var inven = document.getElementsByClassName('inv')[i].value;
      var price = document.getElementsByClassName('price')[i].value;
      rowDict['Inventory'] = inven;
      rowDict['Price'] = price;
      updateDict[bait] = rowDict;
  }

try {
  const update = firebase.database().ref('Ports').child(port).set(updateDict);
  location.reload();
} catch (err) {
  alert('You cannot insert empty values or . , # , $ , / , [ , or ] in the textbox');
}

  // update.catch(err => {
  //     console.log(err);
  //     alert(err);
  //   });




}

function createOrder(port) {
  var myTable = document.getElementById("myTable");
  var updateDict = {};
  // console.log(adminTable.rows);
  for (var i = 0; i < myTable.rows.length - 1; i++) {
      var rowDict = {};
      var bait = document.getElementsByClassName('baitType')[i].value;
      var inven = document.getElementsByClassName('inv')[i].value;
      var price = document.getElementsByClassName('price')[i].value;
      rowDict['Inventory'] = inven;
      rowDict['Price'] = price;
      updateDict[bait] = rowDict;
  }

try {
  const update = firebase.database().ref('Ports').child(port).set(updateDict);
  location.reload();
} catch (err) {
  alert('You cannot insert empty values or . , # , $ , / , [ , or ] in the textbox');
}

  // update.catch(err => {
  //     console.log(err);
  //     alert(err);
  //   });




}
