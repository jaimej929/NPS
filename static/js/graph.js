/**************************************************************** 
 * function getVisitorStats 
 * use parkCode to retrieve park stats
 * draw a graph
 * Display somewhere 
*/
function getVisitorStats(park, visitor){
  //get all the records for the park in the park stats data
  let year1 = "2020";
  let year2 = "2019";
  let year3 = "2018";
  let year4 = "2017";
  let p_name = [];
  let v_count1 = [];
  let v_count2 = [];
  let v_count3 = [];
  let v_count4 = [];
  // let Iv_count = v_count.replace(/,/g, "");
  console.log(p_name);
  console.log(visitor);
  console.log(v_count4);
  

  for (p of park) {
    for (v of visitor) {
      if ((p.park_code == v.park_code) && v.year == year1) {
        p_name.push(p.park_name);
        let visNum1 = String(v.visitors).replace(/,/g,'');

        // console.log(visNum1);

        v_count1.push(parseInt(visNum1));
        
      }
      else if((p.park_code == v.park_code) && v.year == year2) {
        // p_name2.push(p.park_name);
        let visNum2 = String(v.visitors).replace(/,/g,'');

        // console.log(visNum);

        v_count2.push(parseInt(visNum2));

      }
      else if((p.park_code == v.park_code) && v.year == year3) {
        // p_name3.push(p.park_name);
        let visNum3 = String(v.visitors).replace(/,/g,'');

        // console.log(visNum);

        v_count3.push(parseInt(visNum3));

      }
      else if((p.park_code == v.park_code) && v.year == year4) {
        // p_name4.push(p.park_name);
        let visNum4 = String(v.visitors).replace(/,/g,'');

        // console.log(visNum);

        v_count4.push(parseInt(visNum4));

        
      }
    }
  }
  var trace1 = {
    y: v_count1,
    x: p_name,
    // text:subjectSamples[0].otu_labels.slice(0,10),
    name: "Parks 2020",
    type: "bar",
    orientation: 'v'
  };
  var trace2 = {
    y: v_count2,
    x: p_name,
    name: 'Parks 2019',
    type: 'bar'
  };
  var trace3 = {
    y: v_count3,
    x: p_name,
    name: 'Parks 2018',
    type: 'bar'
   }
  
   var trace4 = {
    y: v_count4,
    x: p_name,
    name: 'Parks 2017',
    type: 'bar'
   }
  // Apply the group barmode to the layout
  var layout = {
    title: "Park Visitation in 2020",
    barmode: "relative"
  }
  var traceData = [trace1, trace2, trace3, trace4];
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar-plot", traceData, layout);
}






  



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
  // createMap(L.layerGroup(parkMarkers),parks)

  // add activities to the dropdown
  // createdropdown(response.data.activities)

  getVisitorStats(response.data.park, response.data.visitors)

}

axios.get('http://localhost:5000/')
.then(createAllParks);

