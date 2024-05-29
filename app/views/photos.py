from flask import Blueprint, request, jsonify, session
from werkzeug.utils import secure_filename
from models import Photo,db
import os
from filter import login_required


bp = Blueprint('photos',__name__,url_prefix='/photos')


# 파일의 확장자 명칭이 올바른지 확인
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


bp.route('/upload',methods=['POST'])
@login_required
def upload_photo():
    if 'user_id' not in session:
        return jsonify({"message" : "Unauthorized"}),401
    if 'file' not in request.files:
        return jsonify({"message" : "파일 없음"}),400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"message":"No selected file"}),400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER,filename)
        file.save(file_path)

    description = request.form['description']
    keywords = request.form['keywords']
    user_id = session['user_id']
    
    photo = Photo(image_url = file_path, description = description, keywords = keywords,user_id=user_id)
    db.session.add(photo)
    db.session.commit()


    return jsonify({"message":"업로드 성공!"}), 201

@bp.route('/<int:photo_id>', methods=['PUT'])
@login_required
def update_photo(photo_id):
    if 'user_id' not in session:
        return jsonify({"message": "Unauthorized"}), 401
    photo = Photo.query.get(photo_id)
    if not photo or photo.user_id != session['user_id']:
        return jsonify({"message": "Photo not found or unauthorized"}), 404

    description = request.form['description']
    keywords = request.form['keywords']

    photo.description = description
    photo.keywords = keywords
    db.session.commit()

    return jsonify({"message": "Photo updated successfully!"}), 200


@bp.route('/<int:photo_id>', methods=['DELETE'])    
@login_required
def delete_photo(photo_id):
    if 'user_id' not in session:
        return jsonify({"message": "Unauthorized"}), 401

    photo = Photo.query.get(photo_id)
    if not photo or photo.user_id != session['user_id']:
        return jsonify({"message": "Photo not found or unauthorized"}), 404

    db.session.delete(photo)
    db.session.commit()

    return jsonify({"message": "Photo deleted successfully!"}), 200


@bp.route('/search', methods=['GET'])
@login_required
def search_photos():
    keyword = request.args.get('keyword', '')
    if not keyword:
        return jsonify({"message": "Keyword is required"}), 400

    photos = Photo.query.filter(Photo.keywords.contains(keyword)).all()
    result = [{
        'id': photo.id,
        'image_url': photo.image_url,
        'description': photo.description,
        'keywords': photo.keywords,
        'timestamp': photo.timestamp
    } for photo in photos]

    return jsonify(result), 200


@bp.route('/', methods=['GET'])
def get_photos():
    if 'user_id' not in session:
        return jsonify({"message": "Unauthorized"}), 401

    photos = Photo.query.all()
    result = [{
        'id': photo.id,
        'image_url': photo.image_url,
        'description': photo.description,
        'keywords': photo.keywords,
        'timestamp': photo.timestamp
    } for photo in photos]

    return jsonify(result), 200
