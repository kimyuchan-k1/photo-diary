from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    photos = db.relationship('Photo', backref='author', lazy=True)
    messages_received = db.relationship('Message', foreign_keys='Message.recipient_id', backref='recipient', lazy=True)
    messages_sent = db.relationship('Message', foreign_keys='Message.sender_id', backref='sender', lazy=True)

class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    keywords = db.Column(db.String(100), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    recipient_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    is_read = db.Column(db.Boolean, default=False, nullable=False)
