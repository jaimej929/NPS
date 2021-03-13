
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
    d3.select("#sample-weatherdata").html("");
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
    createMap(L.layerGroup(parkMarkers),parks)
};
/**************************************************************** 
 * function createMap
 * 
 * * */
function createMap(parkMarkerLayer,parkInfo) {
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

  // select all of the leaflet supplied class
  let natParkMarkers = document.querySelectorAll(".leaflet-marker-icon");
  // loop through those elements and first assign the indexed custom class
  for (i = 0; i < natParkMarkers.length; ++i) {

    natParkMarkers[i].classList.add("marker_" + parkInfo[i].park_code);
    natParkMarkers[i].addEventListener("click",onMarkerClick);
  }

  }
/**************************************************************** 
 * function onMarkerClick 
 * 
 * 
*/
function onMarkerClick() {
 console.log("in onMarkerClick");

 let classList = String(this.classList);

  let parkCode = classList.split(" ");
  parkCode = parkCode[parkCode.length - 1].replace("marker_", "");

   console.log(parkCode);

   getCurrentWeather(parkCode);

}

/**************************************************************** 
 * function getCurrentWeather
 * use parkCode to retrieve the lat/lon
 * use openWeatherMap to get weather conditions
 * Display somewhere
*/
function getCurrentWeather(parkCode){
    //find park in the park data
    let lat = "";
    let long = "";
    let parkname = "";
    for (park of allData.park) {
      if (parkCode == park.park_code) {
        lat= park.lat;
        long = park.long;
        parkname = park.park_name;
      break;
     }
   }
   console.log(lat);
   console.log(long);
   console.log(parkname);
   let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEATHER_KEY}&units=imperial`
   response = d3.json(url).then(display_temps);
   console.log(response);

}
function display_temps(weather){
  console.log(weather.main.temp);
  let temps = weather.main.temp;
  let feelslike = weather.main.feels_like;
  let desc = weather.weather[0].description;
  console.log(temps);
  let curr_conditions = "<p style='color:green'>Current temperature:<br>" + 
                           temps + " F<br>Feels like:<br>" + feelslike +
                          "<br>Current conditions:<br>" + desc  +"</p>";
  d3.select("#sample-weatherdata").html(curr_conditions);
}






/**************************************************************** 
 * function getVisitorStats 
 * use parkCode to retrieve park stats
 * draw a graph
 * Display somewhere 
*/
function getVisitorStats(park, visitor){
    //get all the records for the park in the park stats data
    let year = "2020";
    let p_name = [];
    let v_count = [];
    console.log(visitor);

    for (p of park) {
      for (v of visitor) {
        if ((p.park_code == v.park_code) && v.year == year) {
          p_name.push(p.park_name);
          v_count.push(v.visitors);
          break;
        }
     }
   }
  console.log(v_count);
  console.log(p_name);

    
    



    
// var trace1 = {
//   y: otu_id_strs.slice(0,10),
//   x: subjectSamples[0].sample_values.slice(0,10),
//   text:subjectSamples[0].otu_labels.slice(0,10),
//   name: "Yuck",
//   type: "bar",
//   orientation: 'h'
// };
// // Apply the group barmode to the layout
// var layout = {
//   title: "Gross stuff",
//   barmode: "group"
//   }
// var traceData = [trace1];
// // Render the plot to the div tag with id "plot"
// Plotly.newPlot("bar", , layout);



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
      // Add the marker to the parkMarkers array
      parkMarkers.push(parkMarker);

    }
    //add the markers to the map
    createMap(L.layerGroup(parkMarkers),parks)

    // add activities to the dropdown
    createdropdown(response.data.activities)
    
  }


   
  // Perform an axios call to the SQLlite dataset to get parks information. Call createMarkers when complete

  axios.get('http://localhost:5000/')
  .then(createAllParks);
