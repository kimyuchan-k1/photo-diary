from flask import Blueprint, request, jsonify, session
from werkzeug.security import check_password_hash, generate_password_hash
from models import User, db

# from filter import login_required


bp = Blueprint("auth", __name__, url_prefix="/auth")


# 회원가입
@bp.route("/register", methods=["POST"])
def register():
    username = request.json["username"]
    password = request.json["password"]
    hashed_password = generate_password_hash(password)

    user = User(username=username, password=hashed_password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "회원가입 성공"}), 201


# session 확인
@bp.route("/check", methods=["GET"])
def check_login():
    if "user_id" in session:
        user_id = session.get("user_id")
        username = session.get("username")
        return jsonify({"user_id": user_id, "username": username}), 200
    return jsonify({"message": "User is not logged in"}), 401


# 로그인
@bp.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]

    user = User.query.filter_by(username=username).first()

    # 해당 user 가 있으면서 password 가 같다면? 로그인 실행
    if user and check_password_hash(user.password, password):
        session["user_id"] = user.id
        session["username"] = user.username

        return jsonify({"message": "로그인 성공"}), 200
    return jsonify({"message": "유효하지 않습니다."}), 401


@bp.route("/logout", methods=["POST"])
def logout():

    session.pop("user_id", None)
    session.pop("username", None)

    return jsonify({"message": "로그아웃 성공"}), 200
