from flask import Blueprint, request, jsonify, session
from models import Message, db, User


bp = Blueprint("messages", __name__, url_prefix="/messages")


@bp.route("/send", methods=["POST"])
def send_message():
    if "user_id" not in session:
        return jsonify({"message": "Unauthorized"}), 401
    recipient_id = request.json["recipient_id"]
    content = request.json["content"]
    sender_id = session["user_id"]

    message = Message(sender_id=sender_id, recipient_id=recipient_id, body=content)
    db.session.add(message)
    db.session.commit()

    return jsonify({"message": "Message sent successfully!"}), 201


@bp.route("/sent", methods=["GET"])
def sent_messages():
    if "user_id" not in session:
        return jsonify({"message": "Unauthorized"}), 401
    user_id = session["user_id"]
    messages = Message.query.filter_by(sender_id=user_id).all()
    message_list = [
        {
            "id": message.id,
            "recipient_id": message.recipient_id,
            "content": message.body,
            "timestamp": message.timestamp,
        }
        for message in messages
    ]
    return jsonify(message_list), 200


@bp.route("/received", methods=["GET"])
def received_messages():
    if "user_id" not in session:
        return jsonify({"message": "Unauthorized"}), 401
    user_id = session["user_id"]
    messages = Message.query.filter_by(recipient_id=user_id).all()
    message_list = [
        {
            "id": message.id,
            "sender_id": message.sender_id,
            "content": message.body,
            "timestamp": message.timestamp,
        }
        for message in messages
    ]
    return jsonify(message_list), 200


@bp.route("/delete/<int:message_id>", methods=["DELETE"])
def delete_message(message_id):
    if "user_id" not in session:
        return jsonify({"message": "Unauthorized"}), 401
    message = Message.query.get(message_id)
    if message.sender_id != session["user_id"]:
        return jsonify({"message": "Forbidden"}), 403

    db.session.delete(message)
    db.session.commit()
    return jsonify({"message": "Message deleted successfully!"}), 200
