from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_cors import CORS
from config import Config
from models import db
from views import auth, messages,photos,users
import os

app = Flask(__name__)
app.config.from_object(Config)

# CORS 설정 추가
CORS(app, supports_credentials=True)

db.init_app(app)
Session(app)

# Ensure the upload folder exists
if not os.path.exists('uploads'):
    os.makedirs('uploads')

app.register_blueprint(auth.bp)
app.register_blueprint(photos.bp)
app.register_blueprint(users.bp)
app.register_blueprint(messages.bp)


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
