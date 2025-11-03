from flask import Flask
from flask_cors import CORS
from models import db
from routes.auth import auth_bp
from routes.tasks import tasks_bp

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
app.register_blueprint(auth_bp)
app.register_blueprint(tasks_bp)

with app.app_context():
    db.create_all()
    print("Database initialized successfully!")

@app.route('/')
def home():
    return {
        "message": "Biometric Authentication API",
        "version": "1.0",
        "endpoints": {
            "register": "POST /register",
            "login": "POST /login_biometric",
            "save_task": "POST /api/save_task_vector",
            "save_global": "POST /api/save_global_vector",
            "get_tasks": "GET /api/get_user_tasks/<user_id>"
        }
    }

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)

