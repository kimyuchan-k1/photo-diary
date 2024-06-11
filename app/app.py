from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_cors import CORS, cross_origin
from config import Config
from models import db
import auth, messages, photos, users
import os


# Ensure the upload folder exists
if not os.path.exists("uploads"):
    os.makedirs("uploads")


app = Flask(__name__)
app.config.from_object(Config)


CORS(app, supports_credentials=True)

# 세션 설정 추가
app.config["SESSION_TYPE"] = "filesystem"
# app.config["SECRET_KEY"] = "dongguk"
app.secret_key = "donggukhtfffhf"


# config  추가

app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

db.init_app(app)
Session(app)


app.register_blueprint(auth.bp)
app.register_blueprint(photos.bp)
app.register_blueprint(users.bp)
app.register_blueprint(messages.bp)


# 사진 서빙 라우트
@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(debug=True)
