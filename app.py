# Import packages
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

import numpy as np
#import cors to talk
from flask_cors import CORS

from flask import Flask, jsonify

# Database Setup
#***** Refer to Class 10 Week 3 activity 10 *******
engine = create_engine("sqlite:///NPS.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the tables
Park = Base.classes.park
Activity = Base.classes.activity
Park_Activites = Base.classes.parkActivities
#Park_Stats = Base.classes.parkStats
# en = engine.connect()
# conn = sqlite3.connect('NPS.db', check_same_thread=False)
# Create an app, being sure to pass __name__
app = Flask(__name__)
CORS(app)
#session = Session(engine)
# Define what to do when a user hits the index route
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    session = Session(engine)
    results = session.query(Park.name).all()
    #results = session.query(Park).all()
    session.close()
    parks_list = list(np.ravel(results))
    # # Create a dictionary from the row data and append to a list of all_passengers
    # all_Parks = []
    # for park_code, name, lat, long, image_url, image_title, image_credit in results:
    #     Parks_dict = {}
    #     Parks_dict["park_code"] = park_code    
    #     Parks_dict["name"] = name
    #     Parks_dict["lat"] = lat
    #     Parks_dict["long"] = long
    #     Parks_dict["image_url"] = image_url
    #     Parks_dict["image_title"] = image_title
    #     Parks_dict["image_credit"] = image_credit
    #     all_Parks.append(Parks_dict)
    return jsonify(parks_list)
    #return ("hello")

# Define what to do when a user hits the /about route
@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return "Welcome to my 'About' page!"

if __name__ == "__main__":
    app.run(debug=True)