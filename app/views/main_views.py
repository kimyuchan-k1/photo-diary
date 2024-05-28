from flask import Blueprint, url_for


bp = Blueprint('main', __name__,url_prefix='/')

@bp.route('/')
def hello_world():
    return 'hello, world!'

