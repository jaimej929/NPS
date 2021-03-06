//d3.json("http://localhost:5000/", function(data){console.log("yeah!!!!!", data)})
axios.get('http://localhost:5000/')
  .then(function (response) {
    // handle success
    console.log(response);
  })