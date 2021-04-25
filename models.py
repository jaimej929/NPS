def create_classes_park(db):
    class Park(db.Model):
        __tablename__ = 'park'
        id = db.Column(db.Integer, primary_key=True)
        park_code = db.Column(db.String(100))
        park_name = db.Column(db.String(100))
        lat = db.Column(db.Float)
        long = db.Column(db.Float)
        image_url = db.Column(db.String(100))
        image_title = db.Column(db.String(100))
        image_credit = db.Column(db.String(100))
        def __repr__(self):
            return '<Park %r>' % (self.park_name)
    return Park

def create_classes_activity(db):    
    class Activity(db.Model):
        __tablename__ = 'activity'
        id = db.Column(db.String(100), primary_key=True)
        activities_name = db.Column(db.String(100))
        def __repr__(self):
            return '<Activity %r>' % (self.activities_name)
    return Activity
    
def create_classes_park_activities(db):    
    class Park_Activities(db.Model):
        __tablename__ = 'parkActivities'
        id = db.Column(db.String(100), primary_key=True)
        park_code = db.Column(db.String(100))
        def __repr__(self):
            return '<Park_Activities %r>' % (self.park_code)
    return Park_Activities

def create_classes_park_stats(db):    
    class Park_Stats(db.Model):
        __tablename__ = 'parkStats'
        id = db.Column(db.String(100), primary_key=True)
        park_code = db.Column(db.String(100))
        visitors = db.Column(db.String(100))
        year = db.Column(db.String(4))
        def __repr__(self):
            return '<Park_Stats %r>' % (self.park_code)
    return Park_Stats

