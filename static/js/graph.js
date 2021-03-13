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

  

  for (p of park) {
    for (v of visitor) {
      if ((p.park_code == v.park_code) && v.year == year1) {
        p_name.push(p.park_name);
        let visNum1 = String(v.visitors).replace(/,/g,'');


        v_count1.push(parseInt(visNum1));
        
      }
      else if((p.park_code == v.park_code) && v.year == year2) {
    
        let visNum2 = String(v.visitors).replace(/,/g,'');

       

        v_count2.push(parseInt(visNum2));

      }
      else if((p.park_code == v.park_code) && v.year == year3) {
       
        let visNum3 = String(v.visitors).replace(/,/g,'');

        

        v_count3.push(parseInt(visNum3));

      }
      else if((p.park_code == v.park_code) && v.year == year4) {
       
        let visNum4 = String(v.visitors).replace(/,/g,'');


        v_count4.push(parseInt(visNum4));

        
      }
    }
  }
  var trace1 = {
    y: v_count1,
    x: p_name,
    name: "Visitors in 2020",
    type: "bar",
    orientation: 'v'
  };
  var trace2 = {
    y: v_count2,
    x: p_name,
    name: 'Visitors in 2019',
    type: 'bar'
  };
  var trace3 = {
    y: v_count3,
    x: p_name,
    name: 'Visitors in 2018',
    type: 'bar'
   }
  
   var trace4 = {
    y: v_count4,
    x: p_name,
    name: 'Visitors in 2017',
    type: 'bar'
   }
  // Apply the group barmode to the layout
  var layout = {
    title: "Park Visitations 2017 through 2020",
    barmode: "relative"
  }
  var traceData = [trace1, trace2, trace3, trace4];
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar-plot", traceData, layout);
}
// Function to gather Data needed
function createAllParks(response) {
  getVisitorStats(response.data.park, response.data.visitors)
}
// Call database and run function
axios.get('http://localhost:5000/')
.then(createAllParks);

