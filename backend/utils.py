def get_task_number_from_name(task_name):
    """
    Konwertuje nazwę zadania na numer zadania (1-5).
    """
    task_name_lower = task_name.lower().strip()
    
    # Obsługa różnych formatów nazw zadań
    if 'zad1' in task_name_lower or 'task1' in task_name_lower or task_name_lower == '1':
        return 1
    elif 'zad2' in task_name_lower or 'task2' in task_name_lower or task_name_lower == '2':
        return 2
    elif 'zad3' in task_name_lower or 'task3' in task_name_lower or task_name_lower == '3':
        return 3
    elif 'zad4' in task_name_lower or 'task4' in task_name_lower or task_name_lower == '4':
        return 4
    elif 'zad5' in task_name_lower or 'task5' in task_name_lower or task_name_lower == '5':
        return 5
    
    return None

# Thresholdy akceptacji dla każdego zadania
THRESHOLDS = {
    1: 0.15,  
    2: 0.18,  
    3: 0.12,  
    4: 0.20,  
    5: 0.17,  
}

WEIGHTS_ZAD1 = [
    0.8, 0.9, 0.5, 0.3, 0.2, 0.4, 1.0, 0.7, 0.4, 0.6
]
NORMALIZERS_ZAD1 = [60.0, 10.0, 5000.0, 10.0, 20.0, 10.0, 800.0, 200.0, 12.0, 5.0]

WEIGHTS_ZAD2 = [
    0.7, 0.8, 0.5, 0.3, 0.9, 0.6, 1.0, 0.2, 0.5
]
NORMALIZERS_ZAD2 = [90.0, 10.0, 8000.0, 10.0, 500.0, 30.0, 800.0, 5.0, 1.0]

WEIGHTS_ZAD3 = [
    0.7, 0.8, 0.6, 0.3, 0.1, 0.7, 1.0, 0.5, 0.2, 0.9
]
NORMALIZERS_ZAD3 = [60.0, 10.0, 5.0, 20.0, 9.0, 3.0, 1.0, 10.0, 10.0, 800.0]

WEIGHTS_ZAD4 = [
    0.7, 0.8, 0.6, 0.4, 0.5, 0.3, 0.4, 0.4, 0.9, 0.6, 1.0
]
NORMALIZERS_ZAD4 = [60.0, 10.0, 6.0, 6000.0, 4000.0, 1.0, 5.0, 1.0, 5.0, 1.0, 800.0]

WEIGHTS_ZAD5 = [
    0.7, 0.8, 0.6, 0.3, 0.4, 0.1, 0.3, 0.5, 0.6, 1.0, 0.7, 0.4
]
NORMALIZERS_ZAD5 = [80.0, 10.0, 8.0, 20.0, 10.0, 15.0, 10.0, 1.0, 1.0, 800.0, 20.0, 5.0]


def normalize_value(value, max_val):
    """Normalizuje wartość do zakresu [0, 1]"""
    if max_val <= 0:
        return 0
    return min(value / max_val, 1.0)


def compare_biometric_vectors(login_vector, registration_vector, task_number):
    """
    Porównuje dwa wektory biometryczne z uwzględnieniem wag i normalizacji.
    
    Args:
        login_vector: wektor z logowania
        registration_vector: wektor zapisany podczas rejestracji
        task_number: numer zadania (1-5)
    
    Returns:
        distance: średnia ważona różnica (0-1), gdzie 0 = identyczne
    """
    # Wybierz odpowiednie wagi i normalizatory
    if task_number == 1:
        weights = WEIGHTS_ZAD1
        normalizers = NORMALIZERS_ZAD1
    elif task_number == 2:
        weights = WEIGHTS_ZAD2
        normalizers = NORMALIZERS_ZAD2
    elif task_number == 3:
        weights = WEIGHTS_ZAD3
        normalizers = NORMALIZERS_ZAD3
    elif task_number == 4:
        weights = WEIGHTS_ZAD4
        normalizers = NORMALIZERS_ZAD4
    elif task_number == 5:
        weights = WEIGHTS_ZAD5
        normalizers = NORMALIZERS_ZAD5
    else:
        return float('inf')
    
    # Sprawdź długość wektorów
    if len(login_vector) != len(registration_vector):
        return float('inf')
    if len(login_vector) != len(weights):
        return float('inf')
    
    total_distance = 0
    total_weight = 0
    
    for i in range(len(login_vector)):
        weight = weights[i]
        
        # Pomiń cechy z wagą 0
        if weight == 0:
            continue
        
        # Normalizuj wartości do [0, 1]
        norm_login = normalize_value(login_vector[i], normalizers[i])
        norm_reg = normalize_value(registration_vector[i], normalizers[i])
        
        # Oblicz różnicę
        diff = abs(norm_login - norm_reg)
        
        # Dodaj do dystansu z wagą
        total_distance += diff * weight
        total_weight += weight
    
    # Średni ważony dystans
    if total_weight == 0:
        return float('inf')
    
    average_distance = total_distance / total_weight
    return average_distance


def is_biometric_match(distance, task_number):
    """
    Sprawdza czy dystans biometryczny mieści się w progu akceptacji.
    
    Args:
        distance: obliczony dystans między wektorami
        task_number: numer zadania (1-5)
    
    Returns:
        bool: True jeśli authenticated, False jeśli rejected
    """
    threshold = THRESHOLDS.get(task_number, 0.15)
    return distance < threshold

