// let myMap = L.map('map', {
//     center: [39.8283, -98.5795],
//     zoom: 5
// });
// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
function createMap(NationalParks) {
    let normalmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
  });

  let baseMaps = {
      "View Map": normalmap
  };

  let overlayMaps = {
      "National Parks": NationalParks
  };
  let myMap = L.map('map', {
    center: [39.8283, -98.5795],
    zoom: 5,
    layers: [normalmap, NationalParks]
  });
  L.control.layers(baseMaps, overlayMaps, {
      collapsed: true
  }).addTo(myMap);
}


// var marker = L.marker([39.52, -98.67], {
//     draggable: true,
//     title: "My First Marker"
//   }).addTo(myMap);

//   marker.bindPopup("<h1>" + "Random Mark for futre stuff" + "</h1>");

//   let layers = {
//     COMING_SOON: new L.LayerGroup(),
//     EMPTY: new L.LayerGroup(),
//     LOW: new L.LayerGroup(),
//     NORMAL: new L.LayerGroup(),
//     OUT_OF_ORDER: new L.LayerGroup()
//   };

  function createMarkers(response) {
      console.log(response);

    
    let parks = response.data.park;
    console.log(parks);
  
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
        // console.log(image);
  
      // Add the marker to the parkMarkers array
      parkMarkers.push(parkMarker);
    }
  
    // Create a layer group made from the park markers array, pass it into the createMap function
    createMap(L.layerGroup(parkMarkers));

  }
  
  
  // Perform an axios call to the SQLlite dataset to get parks information. Call createMarkers when complete

  axios.get('http://localhost:5000/')
  .then(createMarkers);
