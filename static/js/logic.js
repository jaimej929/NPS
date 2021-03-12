
var allData = [];
let normalmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
});
let myMap = L.map('map', {
  center: [39.8283, -98.5795],
  zoom: 4,
  layers: [normalmap]
  });

baseMaps = {};
overlayMaps = {};

// 17 week 1 activity 9
let mylayers = L.control.layers(baseMaps, overlayMaps, {
    collapsed: true
}).addTo(myMap);

function createMap(NationalParks) {
  let baseMaps = {
      "View Map": normalmap
  };

  let overlayMaps = {
      "National Parks": NationalParks
  };
  
  myMap.layers = [normalmap, NationalParks];
}

function createdropdown(data) {
  //load dropdown menu with activities
  data.forEach(name => d3.select("#selActivity").append("option").text(name.activities_name).attr("value",name.id));
}
function selectdropdown(activityid) {
    //create empty lists to hold parkCode and parks
    let parkCode = [];
    let parks = [];

    //loop through park_activities list and match the activity ids from the selected activity in the dropdown
    allData.park_activities.forEach(function(name) {
      if (name.id == activityid) {
        parkCode.push(name.park_code);
      }
    })
    
    //loop through parkcode to match and get park info
    for (code of parkCode) {
      for (park of allData.park) {
        if (code == park.park_code) {
          parks.push(park);
          break;
        }
      }
    }
  
    // Initialize an array to hold park markers
    var parkMarkers = [];
  
    // Loop through the parks array
    for (var index = 0; index < parks.length; index++) {
      var npark = parks[index];
    //   console.log(npark);
    //   console.log(npark.image_url);
      let image = npark.image_url;
    
      // For each park, create a marker and bind a popup with the parks's name and add picture
      var parkMarker = L.marker([npark.lat, npark.long])
        .bindPopup("<h3>" + npark.park_name + "</h3>" + "<img src='" + image + "'" + "class=popupImage " + "/>");
        //console.log(image);
  
      // Add the marker to the parkMarkers array
      parkMarkers.push(parkMarker);
    }
    createMap(L.layerGroup(parkMarkers))

};

  function createMarkers(response) {

    allData = response.data;
    let parks = response.data.park;
    //console.log(parks);
  
    // Initialize an array to hold park markers
    var parkMarkers = [];
  
    // Loop through the parks array
    for (var index = 0; index < parks.length; index++) {
      var npark = parks[index];
    //   console.log(npark);
    //   console.log(npark.image_url);
      let image = npark.image_url;
  
      // For each park, create a marker and bind a popup with the parks's name and add picture
      var parkMarker = L.marker([npark.lat, npark.long])
        .bindPopup("<h3>" + npark.park_name + "</h3>" + "<img src='" + image + "'" + "class=popupImage " + "/>");
        //console.log(image);
  
      // Add the marker to the parkMarkers array
      parkMarkers.push(parkMarker);
    }
  
    // Create a layer group made from the park markers array, pass it into the createMap function
    createMap(L.layerGroup(parkMarkers));
    createdropdown(response.data.activities)
  }
  
  
  // Perform an axios call to the SQLlite dataset to get parks information. Call createMarkers when complete

  axios.get('http://localhost:5000/')
  .then(createMarkers);