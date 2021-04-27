def create_classes_park(db):
    class Park(db.Model):
        __tablename__ = 'park'
        parkCode = db.Column(db.String(255), primary_key=True)
        park_name = db.Column(db.String(255))
        lat = db.Column(db.String(255))
        long = db.Column(db.String(255))
        image_url = db.Column(db.String(255))
        image_title = db.Column(db.String(255))
        image_credit = db.Column(db.String(255))
        def __repr__(self):
            return '<Park %r>' % (self.park_name)
    return Park

def create_classes_activity(db):    
    class Activity(db.Model):
        __tablename__ = 'activity'
        id = db.Column(db.String(255), primary_key=True)
        activities_name = db.Column(db.String(255))
        def __repr__(self):
            return '<Activity %r>' % (self.activities_name)
    return Activity
    
def create_classes_park_activities(db):    
    class Park_Activities(db.Model):
        __tablename__ = 'parkActivities'
        id = db.Column(db.String(255), primary_key=True)
        parkCode = db.Column(db.String(255), primary_key=True)
        def __repr__(self):
            return '<Park_Activities %r>' % (self.park_code)
    return Park_Activities

def create_classes_park_stats(db):    
    class Park_Stats(db.Model):
        __tablename__ = 'parkStats'
        id = db.Column(db.Integer, primary_key=True)
        parkCode = db.Column(db.String(255))
        visitors = db.Column(db.String(255))
        year = db.Column(db.String(255))
        def __repr__(self):
            return '<Park_Stats %r>' % (self.park_code)
    return Park_Stats

