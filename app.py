# Import packages
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import os
from models import (create_classes_park, create_classes_activity, create_classes_park_activities, create_classes_park_stats)
from flask import ( 
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_cors import CORS

# # Database Setup
# engine = create_engine("sqlite:///NPS.sqlite")
# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)

# # Save reference to the tables
# Park = Base.classes.park
# Activity = Base.classes.activity
# Park_Activities = Base.classes.parkActivities
# Park_Stats = Base.classes.parkStats

# Create app
app = Flask(__name__)
from flask_sqlalchemy import SQLAlchemy
# DATABASE_URL will contain the database connection string:
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///NPS.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# wrap app in CORS to avoid CORS errors
CORS(app)
db = SQLAlchemy(app)
Park = create_classes_park(db)
Activity = create_classes_activity(db)
Park_Activities = create_classes_park_activities(db)
Park_Stats = create_classes_park_stats(db)
# Define what to do when a user hits the index route
@app.route("/")
def home():

    return render_template("index.html")

# Define what to do when a user hits the /about route
@app.route("/data")
def data():
    print("Server received request for 'Home' page...")
    # # open session
    # session = Session(engine)

    # Query the sqlite database to get all the table information
    results_parks = db.session.query(Park.park_code, Park.park_name, Park.lat, Park.long, Park.image_url, Park.image_title, Park.image_credit).all()
    results_activities = db.session.query(Activity.id, Activity.activities_name).all()
    results_park_activities = db.session.query(Park_Activities.id, Park_Activities.park_code).all()
    results_visitors = db.session.query(Park_Stats.id, Park_Stats.park_code, Park_Stats.visitors, Park_Stats.year).all()
    
    # close session
    # session.close()
    
    # Create a dictionary from the Park table row data and append to a list of all_Parks
    all_Parks = []
    for park_code, park_name, lat, long, image_url, image_title, image_credit in results_parks:
        Parks_dict = {}
        Parks_dict["park_code"] = park_code    
        Parks_dict["park_name"] = park_name
        Parks_dict["lat"] = lat
        Parks_dict["long"] = long
        Parks_dict["image_url"] = image_url
        Parks_dict["image_title"] = image_title
        Parks_dict["image_credit"] = image_credit
        all_Parks.append(Parks_dict)
    
    # Create a dictionary from the Activity table row data and append to a list of all_activities
    all_activities = []
    for id, activities_name in results_activities:
        activities_dict = {}
        activities_dict["id"] = id   
        activities_dict["activities_name"] = activities_name
        all_activities.append(activities_dict)
    
    # Create a dictionary from the Park_Activities table row data and append to a list of all_park_activities
    all_park_activities = []
    for id, park_code in results_park_activities:
        park_activities_dict = {}
        park_activities_dict["id"] = id   
        park_activities_dict["park_code"] = park_code
        all_park_activities.append(park_activities_dict)
    
    # Create a dictionary from the Park_Stats table row data and append to a list of all_visitors
    all_visitors = []
    for id, park_code, visitors, year in results_visitors:
        visitors_dict = {}
        visitors_dict["id"] = id   
        visitors_dict["park_code"] = park_code
        visitors_dict["visitors"] = visitors
        visitors_dict["year"] = year
        all_visitors.append(visitors_dict)

    # Create a dictionary and add all the lists created from the tables
    all_data = {"park": all_Parks, "activities": all_activities, "park_activities": all_park_activities, "visitors": all_visitors}
    return jsonify(all_data)

@app.route("/graph")
def graph():
    return render_template("graphs.html")

@app.route("/about")
def about():
    return render_template("AboutPage.html")

if __name__ == "__main__":
    app.run()