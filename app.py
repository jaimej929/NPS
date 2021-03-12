# Import packages
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
<<<<<<< HEAD
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

# Database Setup
#***** Refer to Class 10 Week 3 activity 10 *******
engine = create_engine("sqlite:///nps.sqlite")

=======
from sqlalchemy import create_engine

from flask import Flask, jsonify
from flask_cors import CORS

# Database Setup
engine = create_engine("sqlite:///NPS.sqlite")
>>>>>>> dd9a45f3b0858644309070ee0bba7399b508bfe9
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

<<<<<<< HEAD
# Save reference to the table
#**** need to get table names *******
# Passenger = Base.classes.passenger

# Create an app, being sure to pass __name__
app = Flask(__name__)

=======
# Save reference to the tables
Park = Base.classes.park
Activity = Base.classes.activity
Park_Activities = Base.classes.parkActivities
Park_Stats = Base.classes.parkStats

# Create app
app = Flask(__name__)

# wrap app in CORS to avoid CORS errors
CORS(app)

>>>>>>> dd9a45f3b0858644309070ee0bba7399b508bfe9
# Define what to do when a user hits the index route
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
<<<<<<< HEAD
    return "Welcome to my 'Home' page!"

=======
    # open session
    session = Session(engine)

    # Query the sqlite database to get all the table information
    results_parks = session.query(Park.parkCode, Park.name, Park.lat, Park.long, Park.image_url, Park.image_title, Park.image_credit).all()
    results_activities = session.query(Activity.id, Activity.name).all()
    results_park_activities = session.query(Park_Activities.id, Park_Activities.parkCode).all()
    results_visitors = session.query(Park_Stats.id, Park_Stats.parkCode, Park_Stats.visitors, Park_Stats.year).all()
    
    # close session
    session.close()
    
    # Create a dictionary from the Park table row data and append to a list of all_Parks
    all_Parks = []
    for park_code, name, lat, long, image_url, image_title, image_credit in results_parks:
        Parks_dict = {}
        Parks_dict["park_code"] = park_code    
        Parks_dict["park_name"] = name
        Parks_dict["lat"] = lat
        Parks_dict["long"] = long
        Parks_dict["image_url"] = image_url
        Parks_dict["image_title"] = image_title
        Parks_dict["image_credit"] = image_credit
        all_Parks.append(Parks_dict)
    
    # Create a dictionary from the Activity table row data and append to a list of all_activities
    all_activities = []
    for id, name in results_activities:
        activities_dict = {}
        activities_dict["id"] = id   
        activities_dict["activities_name"] = name
        all_activities.append(activities_dict)
    
    # Create a dictionary from the Park_Activities table row data and append to a list of all_park_activities
    all_park_activities = []
    for id, parkCode in results_park_activities:
        park_activities_dict = {}
        park_activities_dict["id"] = id   
        park_activities_dict["park_code"] = parkCode
        all_park_activities.append(park_activities_dict)
    
    # Create a dictionary from the Park_Stats table row data and append to a list of all_visitors
    all_visitors = []
    for id, parkCode, visitors, year in results_visitors:
        visitors_dict = {}
        visitors_dict["id"] = id   
        visitors_dict["park_code"] = parkCode
        visitors_dict["visitors"] = visitors
        visitors_dict["year"] = year
        all_visitors.append(visitors_dict)

    # Create a dictionary and add all the lists created from the tables
    all_data = {"park": all_Parks, "activities": all_activities, "park_activities": all_park_activities, "visitors": all_visitors}
    return jsonify(all_data)
>>>>>>> dd9a45f3b0858644309070ee0bba7399b508bfe9

# Define what to do when a user hits the /about route
@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return "Welcome to my 'About' page!"

<<<<<<< HEAD

=======
>>>>>>> dd9a45f3b0858644309070ee0bba7399b508bfe9
if __name__ == "__main__":
    app.run(debug=True)