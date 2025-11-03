from flask import Blueprint, request, jsonify
from models import db, User, UserProfile
from utils import calculate_distance

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Rejestruje użytkownika w bazie.
    Wymaga: first_name, last_name
    """
    data = request.get_json()
    
    first_name = data.get('first_name', '').strip()
    last_name = data.get('last_name', '').strip()
    
    if not first_name or not last_name:
        return jsonify({"message": "Imię i nazwisko są wymagane"}), 400
    
    existing_user = User.query.filter_by(
        first_name=first_name,
        last_name=last_name
    ).first()
    
    if existing_user:
        return jsonify({"message": "Użytkownik o takim imieniu i nazwisku już istnieje"}), 400
    
    user = User(first_name=first_name, last_name=last_name)
    db.session.add(user)
    db.session.commit()
    return jsonify({
        "message": "Użytkownik zarejestrowany pomyślnie!", 
        "user_id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name
    })

@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Sprawdza czy użytkownik istnieje w bazie.
    Wymaga: first_name, last_name
    """
    data = request.get_json()
    
    first_name = data.get('first_name', '').strip()
    last_name = data.get('last_name', '').strip()
    
    if not first_name or not last_name:
        return jsonify({"message": "Imię i nazwisko są wymagane"}), 400
    
    user = User.query.filter_by(
        first_name=first_name,
        last_name=last_name
    ).first()
    
    if not user:
        return jsonify({"message": "Nie ma takiego użytkownika"}), 404
    
    return jsonify({
        "authenticated": True,
        "user_id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name
    })

@auth_bp.route('/login_biometric', methods=['POST'])
def login_biometric():
    """
    Loguje użytkownika na podstawie wektora cech biometrycznych.
    Wymaga: first_name, last_name, vector_login
    Zwraca: wynik dopasowania i dystans
    """
    data = request.get_json()
    
    first_name = data.get('first_name', '').strip()
    last_name = data.get('last_name', '').strip()
    
    user = User.query.filter_by(
        first_name=first_name,
        last_name=last_name
    ).first()
    
    if not user:
        return jsonify({"message": "Użytkownik nie znaleziony"}), 404

    profile = UserProfile.query.filter_by(user_id=user.id).first()
    if not profile:
        return jsonify({"message": "Brak profilu biometrycznego"}), 400

    vector_login = data['vector_login']
    vector_global = profile.global_vector

    distance = calculate_distance(vector_login, vector_global)
    threshold = 0.25  

    if distance < threshold:
        return jsonify({
            "message": "Biometric match", 
            "distance": distance,
            "authenticated": True,
            "user_id": user.id
        })
    else:
        return jsonify({
            "message": "Biometric mismatch", 
            "distance": distance,
            "authenticated": False
        }), 401

