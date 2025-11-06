from flask import Blueprint, request, jsonify
from models import db, UserTask, UserProfile
from utils import calculate_global_vector
from models import db, User, UserTask


tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route("/api/save_task_vector", methods=["POST"])
def save_task_vector():
    data = request.get_json() or {}
    user_id = data.get("user_id")
    task_name = data.get("task_name")
    feature_vector = data.get("feature_vector")

    if user_id is None or task_name is None or feature_vector is None:
        return jsonify({"message": "user_id, task_name and feature_vector are required"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    task = UserTask(
        user_id=user.id,
        task_name=task_name,
        feature_vector=feature_vector,
    )
    db.session.add(task)
    db.session.commit()

    return jsonify({"message": "Task vector saved!", "task_id": task.id}), 201


@tasks_bp.route('/api/save_global_vector', methods=['POST'])
def save_global_vector():
    """
    Oblicza i zapisuje globalny wektor użytkownika ze wszystkich 5 zadań.
    Wymaga: user_id
    """
    data = request.get_json()
    user_id = data['user_id']

    global_vector = calculate_global_vector(user_id)
    
    if global_vector is None:
        return jsonify({"message": "No tasks found for this user"}), 400
    

    profile = UserProfile(user_id=user_id, global_vector=global_vector)
    db.session.add(profile)
    db.session.commit()
    
    return jsonify({
        "message": "Global vector saved!", 
        "global_vector": global_vector
    })

@tasks_bp.route('/api/get_user_tasks/<int:user_id>', methods=['GET'])
def get_user_tasks(user_id):
    """
    Pobiera wszystkie zadania użytkownika.
    """
    tasks = UserTask.query.filter_by(user_id=user_id).all()
    tasks_data = [{
        "id": task.id,
        "task_name": task.task_name,
        "feature_vector": task.feature_vector,
        "created_at": task.created_at.isoformat()
    } for task in tasks]
    return jsonify({"tasks": tasks_data, "count": len(tasks_data)})

