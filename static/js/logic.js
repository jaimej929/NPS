
var allData = [];
let normalmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 6,
        minZoom:4,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
});
let myMap = L.map('map', {
  center: [39.8283, -98.5795],
  zoom: 4,
  layers: [normalmap]
  });

var baseMaps = {};
var overlayMaps = {};
var layerscontrol = L.control.layers(baseMaps, overlayMaps)

/**************************************************************** 
 * function create dropdown
 * 
 * * */
function createdropdown(data) {
  //load dropdown menu with activities
  d3.select("#selActivity").append("option").text("All Parks").attr("value","allparks");
  data.forEach(name => d3.select("#selActivity").append("option").text(name.activities_name).attr("value",name.id));
}
/**************************************************************** 
 * function to handle selecting an activity
 * 
 * * */
function selectdropdown(activityid) {
    //create empty lists to hold parkCode and parks
    let parkCode = [];
    let parks = [];
    if (activityid == "allparks") {
        parks = allData.park;

    }
    else {
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
    }
    // Initialize an array to hold park markers
    let parkMarkers = []; 
    // Loop through the parks array
    for (var index = 0; index < parks.length; index++) {
      let npark = parks[index];
      let image = npark.image_url;
    
      // For each park, create a marker and bind a popup with the parks's name and add picture
      var parkMarker = L.marker([npark.lat, npark.long])
        .bindPopup("<h3>" + npark.park_name + "</h3>" + "<img src='" + image + "'" + "class=popupImage " + "/>");
  
      // Add the marker to the parkMarkers array
      parkMarkers.push(parkMarker);
    }
    createMap(L.layerGroup(parkMarkers))
};
/**************************************************************** 
 * function createMap
 * 
 * * */
function createMap(parkMarkerLayer) {
  console.log(">>>>>>Creating Map");

  for (var name in overlayMaps) {
    myMap.removeLayer(overlayMaps[name]);
  }

    baseMaps = {
        "View Map": normalmap
    };
  
    overlayMaps = {
        "National Parks": parkMarkerLayer
     };

    myMap.removeControl(layerscontrol);
    layerscontrol = L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);
    myMap.addLayer(parkMarkerLayer);

  }
/**************************************************************** 
 * function createAllParks 
 * Used once, to load all the park markers
 * 
*/
  function createAllParks(response) {
    console.log(">>>>Creating All Parks");

    //place all the data into a single global variable
    allData = response.data;

    let parks = response.data.park;

    // Initialize an array to hold park markers
    let parkMarkers = [];
  
    // Loop through the parks array
    for (var index = 0; index < parks.length; index++) {
      let npark = parks[index];
      let image = npark.image_url;
  
      // For each park, create a marker and bind a popup with the parks's name and add picture
      var parkMarker = L.marker([npark.lat, npark.long])
        .bindPopup("<h3>" + npark.park_name + "</h3>" + "<img src='" + image + "'" + "class=popupImage " + "/>");
        //console.log(image);
  
      // Add the marker to the parkMarkers array
      parkMarkers.push(parkMarker);

    }
    //add the markers to the map
    createMap(L.layerGroup(parkMarkers))

    // add activities to the dropdown
    createdropdown(response.data.activities)
  }
   
  // Perform an axios call to the SQLlite dataset to get parks information. Call createMarkers when complete

  axios.get('http://localhost:5000/')
  .then(createAllParks);