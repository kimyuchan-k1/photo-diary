from flask import Blueprint, jsonify
from models import User

bp = Blueprint('users',__name__,url_prefix="/users")

@bp.route('/list',methods=['GET'])
def list_users():
    users = User.query.all()
    result =[{"id":user.id , "username":user.username} for user in users]
    return jsonify(result),200

