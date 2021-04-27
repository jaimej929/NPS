from app import (db, Park, Activity, Park_Activities, Park_Stats)

import os
import requests
import json
import pandas as pd
# import numpy as np
# from config import NPS_key
# import pprint as pp

# Import SQLAlchemy `automap` and other dependencies here
# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, inspect, func, MetaData,Table, Column, Integer, String
# from sqlalchemy.ext.declarative import declarative_base
# Base = declarative_base()

#get parks data
parks_url = "https://developer.nps.gov/api/v1/parks?limit=600&api_key="

NPS_key = os.environ.get('NPS_key')
response = requests.get(parks_url + NPS_key)     
data = response.json()
parkData = data['data']

parks_info =[]
park_activity_info=[]
for park in parkData:
    if (isinstance(park['images'], list) and len(park['images'])> 0):
        park_info = {
            "name": park['name'],
            "lat": park['latitude'],
            "long": park['longitude'],
            "parkCode": park['parkCode'],
            "image_url": park['images'][0]['url'],
            "image_title":park['images'][0]['title'],
            "image_credit":park['images'][0]['credit']
            }
        print(park['name'])
    
    else:
        park_info = {
            "name": park['name'],
            "lat": park['latitude'],
            "long": park['longitude'],
            "parkCode": park['parkCode'],
            "image_url": "",
            "image_title":"",
            "image_credit":""
            }    
    parks_info.append(park_info) 
    park_activities = park['activities']
    for activity in park_activities:
        park_activity ={
            "parkCode":park['parkCode'],
            "activityId":activity["id"]
            }
        park_activity_info.append(park_activity)

#get activities

activities_url = "https://developer.nps.gov/api/v1/activities?api_key="

response = requests.get(activities_url + NPS_key)     
data = response.json()
activitiesData = data['data']

activities_info =[]
for activity in activitiesData:
    act_info = {
        "id": activity['id'],
        "name": activity['name']
        }
    activities_info.append(act_info) 

for np in parks_info:
    park = Park(park_name=np['name'], parkCode =np['parkCode'], lat =np['lat'], long = np['long'],image_url =np['image_url'], image_title = np['image_title'], image_credit =np['image_credit'])
    db.session.add(park)

for act in activities_info:
    activity = Activity(id= act['id'],activities_name= act['name'])
    db.session.add(activity)
db.session.commit()

for pa in park_activity_info:
    park_activity = Park_Activities(id = pa['activityId'], parkCode = pa['parkCode'])
    db.session.add(park_activity)
db.session.commit()

#pull from csv files
headers = ["park_name", "visitors"]
park_visit_stats = []
park_types = ['NRRA','IHS','MEM PKWY','NPRES','PRES','NRES','NMP','RES','NMEM','PKWY', 'NP', 'NSR', 'NS', 'NM', 'NHS','MEM','NBP', 'BP', 'NRA', 'NHL','NHP','EHP','HS','NL','NB']

#2020
inputFile = "Resources/Visitation By State and By Park (2020).csv"
np_stats_df = pd.read_csv(inputFile)

parkStats_data  = [np_stats_df["Field1"], np_stats_df["Field2"]]
year_stats = pd.concat(parkStats_data, axis=1, keys=headers)

for ptype in park_types:
    repStr1 = "& " + ptype
    repStr2 = " " + ptype
    year_stats["park_name"] = year_stats["park_name"].str.replace(repStr1, "")
    year_stats["park_name"] = year_stats["park_name"].str.replace(repStr2, "")
    year_stats["park_name"] = year_stats["park_name"].str.strip()
    
# loop thru the df; take the name and select the park from the park table where df.park_name like name
# get the parkCode and the visitor count and append to a new table
for i in range(len(year_stats)) : 
    parkName = year_stats.loc[i, "park_name"]
    parkVisitors = year_stats.loc[i, "visitors"]
    #print(f"{parkName}: {parkVisitors}")
    result = db.session.query(Park)\
    .filter(Park.park_name == parkName)
    res = result.first()    
    if res:
        stats_info = {
            "parkCode":result[0].parkCode,
            "visitors": parkVisitors,
            "year":"2020"   
            } 
        park_visit_stats.append(stats_info) 

#2019
inputFile = "Resources/Visitation By State and By Park (2019).csv"
np_stats_df = pd.read_csv(inputFile)

parkStats_data  = [np_stats_df["Field1"], np_stats_df["Field2"]]
year_stats = pd.concat(parkStats_data, axis=1, keys=headers)

for ptype in park_types:
    repStr1 = "& " + ptype
    repStr2 = " " + ptype
    year_stats["park_name"] = year_stats["park_name"].str.replace(repStr1, "")
    year_stats["park_name"] = year_stats["park_name"].str.replace(repStr2, "")
    year_stats["park_name"] = year_stats["park_name"].str.strip()
    
for i in range(len(year_stats)) : 
    parkName = year_stats.loc[i, "park_name"]
    parkVisitors = year_stats.loc[i, "visitors"]
    #print(f"{parkName}: {parkVisitors}")
    result = db.session.query(Park)\
    .filter(Park.park_name == parkName)
    res = result.first()    
    if res:
        stats_info = {
            "parkCode":result[0].parkCode,
            "visitors": parkVisitors,
            "year":"2019"   
            } 
        park_visit_stats.append(stats_info) 

#2018
inputFile = "Resources/Visitation By State and By Park (2018).csv"
np_stats_df = pd.read_csv(inputFile)

parkStats_data  = [np_stats_df["Field1"], np_stats_df["Field2"]]
year_stats = pd.concat(parkStats_data, axis=1, keys=headers)

for ptype in park_types:
    repStr1 = "& " + ptype
    repStr2 = " " + ptype
    year_stats["park_name"] = year_stats["park_name"].str.replace(repStr1, "")
    year_stats["park_name"] = year_stats["park_name"].str.replace(repStr2, "")
    year_stats["park_name"] = year_stats["park_name"].str.strip()
    
for i in range(len(year_stats)) : 
    parkName = year_stats.loc[i, "park_name"]
    parkVisitors = year_stats.loc[i, "visitors"]
    #print(f"{parkName}: {parkVisitors}")
    result = db.session.query(Park)\
    .filter(Park.park_name == parkName)
    res = result.first()    
    if res:
        stats_info = {
            "parkCode":result[0].parkCode,
            "visitors": parkVisitors,
            "year":"2018"   
            } 
        park_visit_stats.append(stats_info)

#2017
inputFile = "Resources/Visitation By State and By Park (2017).csv"
np_stats_df = pd.read_csv(inputFile)

parkStats_data  = [np_stats_df["Field1"], np_stats_df["Field2"]]
year_stats = pd.concat(parkStats_data, axis=1, keys=headers)

for ptype in park_types:
    repStr1 = "& " + ptype
    repStr2 = " " + ptype
    year_stats["park_name"] = year_stats["park_name"].str.replace(repStr1, "")
    year_stats["park_name"] = year_stats["park_name"].str.replace(repStr2, "")
    year_stats["park_name"] = year_stats["park_name"].str.strip()
    
for i in range(len(year_stats)) : 
    parkName = year_stats.loc[i, "park_name"]
    parkVisitors = year_stats.loc[i, "visitors"]
    #print(f"{parkName}: {parkVisitors}")
    result = db.session.query(Park)\
    .filter(Park.park_name == parkName)
    res = result.first()    
    if res:
        stats_info = {
            "parkCode":result[0].parkCode,
            "visitors": parkVisitors,
            "year":"2017"   
            } 
        park_visit_stats.append(stats_info)  

#Populate db
i = 0
for stat in park_visit_stats:
    park_stat = Park_Stats(id = i, parkCode = stat['parkCode'], visitors = stat['visitors'], year = stat['year'])
    db.session.add(park_stat)
    i= i + 1
db.session.commit()

stats_list = db.session.query(Park_Stats)
for stat in stats_list:
    print(stat.id," ",stat.parkCode," ", stat.visitors," ",stat.year)