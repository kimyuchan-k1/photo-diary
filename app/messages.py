from flask import Blueprint, request, jsonify, session
from models import Message, db

# from filter import login_required


bp = Blueprint("messages", __name__, url_prefix="/messages")


@bp.route("/send", methods=["POST"])
# @login_required
def send_message():
    if "user_id" not in session:
        return jsonify({"message": "Unauthorized"}), 401

    recipient_id = request.json["recipient_id"]
    body = request.json["body"]
    sender_id = session["user_id"]

    message = Message(body=body, recipient_id=recipient_id, sender_id=sender_id)
    db.session.add(message)
    db.session.commit()

    return jsonify({"message": "Message sent successfully!"}), 201


@bp.route("/inbox", methods=["GET"])
# @login_required
def inbox():
    if "user_id" not in session:
        return jsonify({"message": "Unauthorized"}), 401

    user_id = session["user_id"]
    messages = Message.query.filter_by(recipient_id=user_id).all()
    result = [
        {
            "id": message.id,
            "body": message.body,
            "timestamp": message.timestamp,
            "sender_id": message.sender_id,
            "is_read": message.is_read,
        }
        for message in messages
    ]

    return jsonify(result), 200


@bp.route("/<int:message_id>/reply", methods=["POST"])
# @login_required
def reply_message(message_id):
    if "user_id" not in session:
        return jsonify({"message": "Unauthorized"}), 401

    original_message = Message.query.get(message_id)
    if not original_message or original_message.recipient_id != session["user_id"]:
        return jsonify({"message": "Message not found or unauthorized"}), 404

    body = request.json["body"]
    sender_id = session["user_id"]
    recipient_id = original_message.sender_id

    reply = Message(body=body, recipient_id=recipient_id, sender_id=sender_id)
    db.session.add(reply)
    db.session.commit()

    return jsonify({"message": "Reply sent successfully!"}), 201


@bp.route("/<int:message_id>/delete", methods=["DELETE"])
# @login_required
def delete_message(message_id):
    if "user_id" not in session:
        return jsonify({"message": "Unauthorized"}), 401

    message = Message.query.get(message_id)
    if not message or message.recipient_id != session["user_id"]:
        return jsonify({"message": "Message not found or unauthorized"}), 404

    db.session.delete(message)
    db.session.commit()

    return jsonify({"message": "Message deleted successfully!"}), 200
