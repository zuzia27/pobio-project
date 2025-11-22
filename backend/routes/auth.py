from flask import Blueprint, request, jsonify
from models import db, User, UserBiometricProfile
from utils import compare_biometric_vectors, is_biometric_match, THRESHOLDS

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
    
    Wymaga:
    - first_name: imię użytkownika
    - last_name: nazwisko użytkownika
    - vector_login: wektor biometryczny z logowania
    - task_number: numer zadania (1-5)
    
    """
    data = request.get_json()
    
    first_name = data.get('first_name', '').strip()
    last_name = data.get('last_name', '').strip()
    task_number = data.get('task_number')
    vector_login = data.get('vector_login')
    
    # Walidacja danych wejściowych
    if not first_name or not last_name:
        return jsonify({"message": "Imię i nazwisko są wymagane"}), 400
    
    if not task_number or task_number not in [1, 2, 3, 4, 5]:
        return jsonify({"message": "Nieprawidłowy numer zadania (wymagany: 1-5)"}), 400
    
    if not vector_login or not isinstance(vector_login, list):
        return jsonify({"message": "Wektor logowania jest wymagany"}), 400
    
    # Znajdź użytkownika
    user = User.query.filter_by(
        first_name=first_name,
        last_name=last_name
    ).first()
    
    if not user:
        return jsonify({
            "message": "Użytkownik nieznaleziony",
            "authenticated": False
        }), 404

    # Pobierz profil biometryczny
    profile = UserBiometricProfile.query.filter_by(user_id=user.id).first()
    if not profile:
        return jsonify({
            "message": "Brak profilu biometrycznego. Musisz najpierw się zarejestrować.",
            "authenticated": False
        }), 400

    # Pobierz wektor referencyjny dla konkretnego zadania
    reference_vector = profile.get_task_vector(task_number)
    
    if not reference_vector:
        return jsonify({
            "message": f"Brak zapisanego wektora dla zadania {task_number}. Dokończ rejestrację.",
            "authenticated": False
        }), 400
    
    # Porównaj wektory z uwzględnieniem wag i normalizacji
    distance = compare_biometric_vectors(vector_login, reference_vector, task_number)
    
    # Sprawdź czy mieści się w progu
    authenticated = is_biometric_match(distance, task_number)
    
    # Pobierz threshold dla informacji
    threshold = THRESHOLDS.get(task_number, 0.15)
    
    if authenticated:
        return jsonify({
            "message": "Uwierzytelnienie biometryczne zakończone sukcesem",
            "authenticated": True,
            "user_id": user.id,
            "task_number": task_number,
            "distance": round(distance, 4),
            "threshold": threshold
        }), 200
    else:
        return jsonify({
            "message": "Uwierzytelnienie biometryczne nie powiodło się",
            "authenticated": False,
            "distance": round(distance, 4),
            "threshold": threshold,
            "hint": f"Dystans {distance:.4f} przekracza próg {threshold}"
        }), 401

