from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class UserBiometricProfile(db.Model):
    """
    Profil biometryczny użytkownika zawierający 5 osobnych wektorów - po jednym dla każdego zadania.
    Każdy wektor reprezentuje zachowania biometryczne użytkownika podczas wykonywania konkretnego zadania.
    """
    __tablename__ = 'user_biometric_profile'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, unique=True)
    
    task1_vector = db.Column(db.JSON, nullable=True)
    task2_vector = db.Column(db.JSON, nullable=True)
    task3_vector = db.Column(db.JSON, nullable=True)
    task4_vector = db.Column(db.JSON, nullable=True)
    task5_vector = db.Column(db.JSON, nullable=True)
    
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    
    def get_task_vector(self, task_number):
        """Pobiera wektor dla konkretnego numeru zadania (1-5)"""
        if task_number == 1:
            return self.task1_vector
        elif task_number == 2:
            return self.task2_vector
        elif task_number == 3:
            return self.task3_vector
        elif task_number == 4:
            return self.task4_vector
        elif task_number == 5:
            return self.task5_vector
        return None
    
    def set_task_vector(self, task_number, vector):
        """Ustawia wektor dla konkretnego numeru zadania (1-5)"""
        if task_number == 1:
            self.task1_vector = vector
        elif task_number == 2:
            self.task2_vector = vector
        elif task_number == 3:
            self.task3_vector = vector
        elif task_number == 4:
            self.task4_vector = vector
        elif task_number == 5:
            self.task5_vector = vector