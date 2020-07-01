//api key for google maps
var apikeygoogle = "AIzaSyCUhLVjRWl_hRcOuGutBWR_QwLWLQJWaSA";

//api key for both mapquest apis
var apikeymapquest = "wkAXQtPfXHFVQVVsUyUHn1VONKEaiGuR";
//should be directed to user input once merged

function submitFunction() {
  event.preventDefault();
  let city = document.getElementById("city-input").value;

  // ajax request from mapquest for list of apartments in the search area  *** not finished ***
  $.ajax({
    url:
      "https://www.mapquestapi.com/search/v2/radius?origin=" +
      city +
      "&radius=15&maxMatches=3&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|651303&outFormat=json&key=" +
      apikeymapquest,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    let htmlbox2 = document.getElementById("content");
    let htmlBox2Content = "";

    for (let i = 0; i < 3; i++) {
      let apartment = response.searchResults[i].name;
      let address = response.searchResults[i].fields.address;
      let city = response.searchResults[i].fields.city;
      htmlBox2Content +=
        "<p>Name: " +
        apartment +
        "</p><br><p>Address: " +
        address +
        " City: " +
        city +
        "</p><br>";
    }
    htmlbox2.innerHTML = htmlBox2Content;
  });

  //ajax request from mapquest for list of schools in the search area
  $.ajax({
    url:
      "https://www.mapquestapi.com/search/v2/radius?origin=" +
      city +
      "&radius=20&maxMatches=10&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|821103&outFormat=json&key=" +
      apikeymapquest,
    method: "GET",
  }).then(function (response) {
    // list top 3 schools
    let htmlbox = document.getElementById("content1");
    let htmlBoxContent = "";

    for (let i = 0; i < 3; i++) {
      let school = response.searchResults[i].name;
      let schooladdress = response.searchResults[i].fields.address;
      let schoolcity = response.searchResults[i].fields.city;
      htmlBoxContent +=
        "<p>Name: " +
        school +
        "</p><br><p>Address: " +
        schooladdress +
        " City: " +
        schoolcity +
        "</p><br>";
    }
    htmlbox.innerHTML = htmlBoxContent;

    // update google map based on the city geo locations from the api call.
    map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: response.origin.latLng.lat,
        lng: response.origin.latLng.lng,
      },
      zoom: 10,
    });
  });
}

// initial geo location for map

let lat = 36.008727;
let lng = -78.943908;

//function to run google maps based on latitude/longitude
(function (exports) {
  "use strict";

  function initMap() {
    exports.map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: lat,
        lng: lng,
      },
      zoom: 10,
    });
  }

  exports.initMap = initMap;
})((this.window = this.window || {}));
