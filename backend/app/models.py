from app import db
from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash


class User(UserMixin, db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    username = db.Column(db.String(64))
    password_hash = db.Column(db.String(128))
    assets = db.relationship('Asset', backref='allocator', lazy='dynamic')

    def __reg__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_id(self):
        return self.user_id

class Asset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    asset_class = db.Column(db.String)
    asset = db.Column(db.String)
    quantity = db.Column(db.Float, nullable=False)
    price = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))

    def __repr__(self):
        return '<Asset {}'.format(self.asset)

    def set_price(self):
        self.price = get_price(self.asset_class, self.asset)

    def format_time(self):
        return self.timestamp.strftime('%m/%d/%Y, %H:%M:%S')
