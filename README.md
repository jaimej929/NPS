# NPS
## Project Background
After graduating from the KU Data Analytics Bootcamp with flying colors, the group members were hired by a travel agency.
They have been asked  to develop a web page which provides users with an interactive experience to explore different activities at various parks and ultimately promote visiting National Parks in the United States. 


## Questions to Address
- At which park can I do my favorite activities?
- What is the weather like at each park?
- How busy is a given park?
- Which National Park should I visit?

## Group Members
- Jaime Jimenez: Leaflet and Plotly; javascript
- Ashwini Kamat: Product presentation; css
- Mary Mays: Data aquisition, cleaning,  and storage; jupyter notebook; APIs; SCRUM master
- Lisa Stroh: Flask; python; project management; JIRA

## Product Design
- Used API and csv files to pull data using jupyter notebook
- Loaded data into relational db using python
- Created flask app to pull from the relational database
- Used axios in javascript to call data return from flask app
- Display was completed using html and javascript
- Maps done with leaflet
- Graph done with plotly
- Bootstrap and css for design

- The jupyter notebook (Project2.ipynb) collected the data from  [National Park Service (NPS) JSON API] (https://www.nps.gov/subjects/developer/api-documentation.htm) and the [statistical data] (https://irma.nps.gov/STATS/) in csv. It was cleaned and then stored into sqlite relational database.
- A flask app was created in python (app.py)  with 3 routes for the website pages. The app connected to the sqlite database and read the tables into a single list of dictionaries, and returned this data. We wrapped the app in CORS.
- the javascript (logic.js) used axios to access the data returned from the python app. 
- The main.html page, built using Bootstrap and css was fed by logic.js. This javascript used Leaflet and D3, and also calls the [OpenWeatherMap API] (api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}) when clicking a location marker.
- Additional js and html pages (graph.js, graphs.html) were created to create and display the graphed statistical data. These are accessed via a navbar.
- A dropdown presents the possible list of park activities. The map updates to show which national parks offer a selected activity. The park name and an image from the National Park Service API are displayed when a marker is clicked. The current weather for the park is retrieved via the weather api and displayed on the page.


- Statistics about park visits for years 2017-2020 are displayed on a graph on the second page. 


