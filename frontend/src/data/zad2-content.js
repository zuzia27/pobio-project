const registrationArticle = `
  Coraz więcej serwisów internetowych próbuje odejść od klasycznego logowania za pomocą hasła. Powód jest prosty: ludzie tworzą słabe hasła, używają ich wielokrotnie w różnych miejscach i często zapisują je w notatnikach lub w przeglądarce. W efekcie jedno wyciekłe hasło może otworzyć drogę do wielu kont naraz.

  Zamiast tego coraz większą popularność zyskują systemy oparte na biometrii behawioralnej. Zamiast mierzyć odcisk palca czy obraz twarzy, analizują one sposób korzystania z komputera – na przykład sposób poruszania myszą, tempo przewijania strony czy sposób klikania w elementy interfejsu. Dla człowieka te różnice są niewidoczne, ale algorytm potrafi wychwycić charakterystyczny „styl” użytkownika.

  Dzięki temu możliwe jest stworzenie profilu biometrycznego, który nie przechowuje konkretnego hasła, ale opisuje zachowanie użytkownika w postaci wektora liczb. Podczas kolejnych wizyt system nie prosi o hasło, lecz sprawdza, czy obecne zachowanie jest wystarczająco podobne do zapisanego profilu.

  Takie podejście nie jest pozbawione wyzwań. Użytkownik może być zmęczony, korzystać z innej myszki lub pracować na laptopie zamiast na komputerze stacjonarnym – a to wpływa na ruchy kursora i tempo interakcji. Dlatego system musi być na tyle „elastyczny”, żeby uwzględniać naturalną zmienność zachowania, a jednocześnie na tyle czuły, by odróżnić prawdziwego użytkownika od osoby próbującej podszyć się pod niego.
`;

const loginArticle = `
  Tradycyjne logowanie opiera się na prostym schemacie: użytkownik podaje login i hasło, a system sprawdza, czy dane się zgadzają. Ten model działa od lat, ale coraz częściej okazuje się niewystarczający. Wyciek baz haseł, ataki phishingowe oraz używanie tych samych danych logowania w wielu serwisach sprawiają, że samo hasło przestaje być wystarczającym zabezpieczeniem.

  Jednym z podejść do poprawy bezpieczeństwa jest uwierzytelnianie wieloskładnikowe, na przykład połączenie hasła z kodem SMS lub powiadomieniem w aplikacji mobilnej. To rozwiązanie zwiększa poziom ochrony, ale jednocześnie bywa uciążliwe dla użytkownika, który musi każdorazowo wykonywać dodatkowe kroki.

  Systemy biometrii behawioralnej próbują znaleźć kompromis między wygodą a bezpieczeństwem. Zamiast zmuszać użytkownika do wpisywania kolejnych kodów, analizują sposób, w jaki korzysta on z interfejsu: jak szybko przewija stronę, jak długo zatrzymuje się przy danym fragmencie tekstu, jak często zmienia decyzję przy wyborze odpowiedzi czy jak płynny jest jego ruch kursora.

  W praktyce oznacza to, że proces logowania może odbywać się „w tle”. Użytkownik wykonuje pozornie zwykłe zadanie – czyta artykuł, odpowiada na pytanie lub wybiera produkt – a system w tym czasie sprawdza, czy jego zachowanie pasuje do zapisanego wcześniej profilu. Jeśli tak, dostęp zostaje przyznany bez konieczności wpisywania hasła.
`;

export const zad2Content = {
  registration: {
    title: "Biometria behawioralna w logowaniu bez hasła",
    instruction: "Przeczytaj artykuł poniżej, a następnie odpowiedz na pytanie.",
    article: registrationArticle,
    question: "Jakie jest główne przesłanie artykułu?",
    answers: [
      { id: 'A', label: 'Hasła są całkowicie bezpieczne i nie wymagają zmian.' },
      { id: 'B', label: 'Styl korzystania z komputera może być użyty jako forma biometrii.' },
      { id: 'C', label: 'Najlepszym rozwiązaniem jest zapisywanie haseł na kartce.' },
    ],
    correctAnswer: 'B'
  },
  
  login: {
    title: "Logowanie w tle – jak działa biometria zachowania?",
    instruction: "Przeczytaj artykuł poniżej, a następnie odpowiedz na pytanie.",
    article: loginArticle,
    question: "Co wyróżnia biometrię behawioralną w porównaniu z tradycyjnym logowaniem?",
    answers: [
      { id: 'A', label: 'Wymaga wpisywania dłuższego i bardziej skomplikowanego hasła.' },
      { id: 'B', label: 'Opiera się wyłącznie na jednorazowym kodzie SMS.' },
      { id: 'C', label: 'Analizuje sposób korzystania z interfejsu zamiast polegać wyłącznie na haśle.' },
    ],
    correctAnswer: 'C'
  }
};

// Zwraca odpowiedni zestaw danych
export const getZad2Content = (mode) => {
  return zad2Content[mode] || zad2Content.registration;
};

// Sprawdza czy odpowiedź jest poprawna
export const isCorrectAnswer = (mode, answerId) => {
  const content = getZad2Content(mode);
  return content.correctAnswer === answerId;
};
