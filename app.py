# Import packages
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

#import cors to talk
from flask_cors import CORS

from flask import Flask, jsonify

# Database Setup
#***** Refer to Class 10 Week 3 activity 10 *******
engine = create_engine("sqlite:///nps.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the tables
Park = Base.classes.park
Activity = Base.classes.activity
Park_Activites = Base.classes.parkActivities
#Park_Stats = Base.classes.parkStats

# Create an app, being sure to pass __name__
app = Flask(__name__)
CORS(app)
session = Session(engine)
# Define what to do when a user hits the index route
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    parks_list = session.query(Park.name).all()
    #return jsonify(parks_list)
    return jsonify("hello")


# Define what to do when a user hits the /about route
@app.route("/about")
def about():
    print("Server received request for 'About' page...")
    return "Welcome to my 'About' page!"

if __name__ == "__main__":
    app.run(debug=True)