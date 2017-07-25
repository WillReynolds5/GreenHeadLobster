
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
    cell1.setAttribute("class", "UserBaitType");
    cell2.innerHTML = inv;
    cell3.innerHTML = price;
    cell3.setAttribute("class", "UserPrice");
    cell4.innerHTML = "<input type='text' class='UserQuantity' value=''>";
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

}


function placeOrder(){
  var myTable = document.getElementById("myTable");
  var updateDict = {};
  // console.log(adminTable.rows);
  var ports = localStorage.getItem("locationValue");
  var name = '';
  for (var i = 0; i < myTable.rows.length - 1; i++) {
    var qty = document.getElementsByClassName('UserQuantity')[i].value;
      if (qty != ''){
        // console.log(qty);
        var rowDict = {};
        var bait = document.getElementsByClassName('UserBaitType')[i].innerHTML;
        console.log(bait);
        var price = document.getElementsByClassName('UserPrice')[i].innerHTML;
        rowDict['quantity'] = qty;
        rowDict['Price'] = price * qty;
        updateDict[bait] = rowDict;
        // console.log(rowDict);
      }

  }
  // console.log(updateDict);
  firebase.auth().onAuthStateChanged(function(user){
      name = user.uid;
      console.log(name);
      firebase.database().ref('Users').child(name).once('value').then(function(snapshot){

          try {
            console.log(ports);
            console.log(snapshot.val());
            console.log(updateDict);
            const update = firebase.database().ref('Orders').child(ports).child(snapshot.val()).set(updateDict);
            alert("Order Placed!");
            location.reload();
          } catch (err) {
            console.log(err);
            alert('You cannot insert empty values, letters or . , # , $ , / , [ , or ] in the textbox');
          }
      }, function(error) {
        // The Promise was rejected.
      console.error(error);
      });
    });
}

function loadOrders(){

  var tables = document.getElementById('orders');
  var location = localStorage.getItem("locationValue");

  firebase.database().ref('Orders').child(location).on('value', function(snapshot){


    snapshot.forEach(function(child) {

      var tab = document.createElement('table');

      var header = tab.createTHead();
      var confirmBtn = document.createElement('button');
      // confirmBtn.type = 'button';
      confirmBtn.setAttribute('class', 'AdminBtns');
      header.innerHTML = child.key;
      header.setAttribute('class', 'cptHeader');
      tab.className = "tab";
      var hRow = tab.insertRow(0);
      var hcell1 = hRow.insertCell(0);
      var hcell2 = hRow.insertCell(1);
      var hcell3 = hRow.insertCell(2);
      // var hcell4 = hRow.insertCell(3);
      hcell1.innerHTML = "<h3 id='listingHeader'>Bait type</h3>";
      hcell2.innerHTML = "<h3 id='listingHeader'>Quantity</h3>";
      hcell3.innerHTML = "<h3 id='listingHeader'>Price</h3>";
      // confirmBtn.setAttribute('id', 'adminBtn');

      // hcell4.innerHTML = "<h3>delete</h3>";

      var orderDict = {};
      orderDict = child.val();
      var string = JSON.stringify(orderDict);
      var cptsOrder = JSON.parse(string);
      // console.log(orderDict);
      var cptName = child.key;
      tab.setAttribute('id', cptName);
      console.log(cptName);
      // console.log(cptsOrder);

      for (var x in cptsOrder){
        console.log(x);
        var listing = cptsOrder[x];
        console.log(listing.Price);
        console.log(listing.quantity);


        var row = tab.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        // var cell4 = row.insertCell(3);
        cell1.innerHTML = x;
        cell2.innerHTML = "<input type='text' value='"+listing.quantity+"'>";
        cell3.innerHTML = listing.Price;
        // cell4.innerHTML = "<button id='dBtn' class='deleteBtn' type=button' onClick='cptOrderDeleteFunction(this)'>Delete</button>";


        tables.appendChild(tab);

        // document.getElementById('confirmButton').appendChild(confirmBtn);



      }
      var t = document.createTextNode('Confirm Order');
      confirmBtn.appendChild(t);
      tables.appendChild(confirmBtn);

    });

  });

}

function cptOrderDeleteFunction(x) {

    var table = document.getElementById("adminTable");
    table.deleteRow(x.closest('tr').rowIndex);
    console.log(x.closest('tr'));

}
