import math
from models import UserTask, db

def calculate_distance(v1, v2):
    """
    Oblicza odległość euklidesową między dwoma wektorami.
    """
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(v1, v2)))

def calculate_global_vector(user_id):
    """
    Tworzy globalny wektor użytkownika jako średnią z wszystkich jego zadań.
    """
    tasks = UserTask.query.filter_by(user_id=user_id).all()
    if not tasks:
        return None
    vectors = [t.feature_vector for t in tasks]
    length = len(vectors[0])
    mean_vector = [sum(v[i] for v in vectors) / len(vectors) for i in range(length)]
    return mean_vector

