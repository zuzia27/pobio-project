from flask import Blueprint, request, jsonify
from models import db, User, UserBiometricProfile
from utils import get_task_number_from_name

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route("/api/save_task_vector", methods=["POST"])
def save_task_vector():
    """
    Zapisuje wektor biometryczny dla konkretnego zadania użytkownika.
    Wymaga: user_id, task_name, feature_vector
    
    Aktualizuje odpowiedni wektor w UserBiometricProfile.
    """
    data = request.get_json() or {}
    user_id = data.get("user_id")
    task_name = data.get("task_name")
    feature_vector = data.get("feature_vector")

    if user_id is None or task_name is None or feature_vector is None:
        return jsonify({"message": "user_id, task_name and feature_vector są wymagane"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Zaktualizuj profil biometryczny
    task_number = get_task_number_from_name(task_name)
    if not task_number:
        return jsonify({"message": f"Invalid task_name: {task_name}"}), 400
    
    profile = UserBiometricProfile.query.filter_by(user_id=user_id).first()
    if not profile:
        profile = UserBiometricProfile(user_id=user_id)
        db.session.add(profile)
    
    profile.set_task_vector(task_number, feature_vector)
    db.session.commit()

    return jsonify({
        "message": f"Biometric vector for {task_name} saved!",
        "task_number": task_number
    }), 201

