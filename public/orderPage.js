


function toOrderPage(x){
  console.log(x);
  // document.location.href = "orderPage.html";
  if (x == 'WebsCove'){
    websCove()
  }
}



function websCove(){

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
