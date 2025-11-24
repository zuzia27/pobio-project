// data/zad5-content.js

// --- DANE DLA REJESTRACJI ---

const registrationTabsData = [
  { 
    id: 'home', 
    label: 'Strona główna', 
    emoji: '🏠',
    subTabs: null
  },
  { 
    id: 'about', 
    label: 'O nas', 
    emoji: '📖',
    subTabs: [
      { id: 'history', label: 'Historia' },
      { id: 'team', label: 'Zespół' },
      { id: 'values', label: 'Nasze wartości' }
    ]
  },
  { 
    id: 'services', 
    label: 'Usługi', 
    emoji: '💼',
    subTabs: [
      { id: 'biometric', label: 'Systemy biometryczne' },
      { id: 'consulting', label: 'Doradztwo' },
      { id: 'projects', label: 'Zrealizowane projekty' }
    ]
  },
  { 
    id: 'contact', 
    label: 'Kontakt', 
    emoji: '📞',
    subTabs: [
      { id: 'info', label: 'Informacje kontaktowe' },
      { id: 'form', label: 'Formularz kontaktowy' }
    ]
  },
];

const registrationProjects = [
  {
    id: 'bank',
    name: 'Bank Narodowy Polska',
    client: 'Bank Narodowy Polska',
    date: '2024-01',
    description: 'Kompleksowy system biometryczny dla 150 oddziałów bankowych. Wdrożenie rozpoznawania twarzy i odcisków palców dla pracowników i klientów VIP.',
    scope: 'Zakres: 3500 urządzeń, integracja z systemem bankowym, szkolenie 800 pracowników',
    reference: 'Ref: BNP-2024-01-0156',
    borderColor: 'border-blue-500',
    hoverColor: 'hover:bg-blue-50'
  },
  {
    id: 'airport',
    name: 'Lotnisko Chopina',
    client: 'Lotnisko Chopina',
    date: '2023-04',
    description: 'System kontroli dostępu dla personelu lotniska oparty na biometrii twarzy i dłoni. Integracja z międzynarodowymi bazami bezpieczeństwa.',
    scope: 'Zakres: 45 bramek biometrycznych, system centralny, backup redundantny',
    reference: 'Ref: LCH-2023-04-0892',
    borderColor: 'border-green-500',
    hoverColor: 'hover:bg-green-50'
  },
  {
    id: 'university',
    name: 'Politechnika Warszawska',
    client: 'Politechnika Warszawska',
    date: '2023-03',
    description: 'Modernizacja systemu dostępu do laboratoriów badawczych. Wykorzystanie biometrii odcisków palców i kart RFID dla 2500 studentów i pracowników.',
    scope: 'Zakres: 78 czytników biometrycznych, system raportowania, aplikacja mobilna',
    reference: 'Ref: PW-2023-03-0445',
    borderColor: 'border-purple-500',
    hoverColor: 'hover:bg-purple-50'
  },
  {
    id: 'ministry',
    name: 'Ministerstwo Cyfryzacji',
    client: 'Ministerstwo Cyfryzacji',
    date: '2023-02',
    description: 'Pilotażowy projekt systemu e-ID z wykorzystaniem biometrii twarzy dla obywateli. System obejmuje weryfikację tożsamości online oraz dostęp do usług publicznych.',
    scope: 'Zakres: Platforma centralna, 500 punktów rejestracji, aplikacja mobilna dla 100,000 użytkowników pilotażowych',
    reference: 'Ref: MC-2023-02-1337',
    borderColor: 'border-orange-500',
    hoverColor: 'hover:bg-orange-50'
  }
];

const registrationPageContent = {
  home: {
    title: "Witamy w BioCorp",
    paragraphs: [
      "Jesteśmy wiodącym dostawcą innowacyjnych rozwiązań biometrycznych dla przedsiębiorstw na całym świecie.",
      "Nasze technologie pomagają organizacjom poprawić bezpieczeństwo, zwiększyć wydajność i zapewnić najwyższy poziom ochrony danych."
    ]
  },
  aboutHistory: {
    title: "Historia",
    paragraphs: [
      "BioCorp została założona w 2015 roku przez grupę ekspertów w dziedzinie bezpieczeństwa cyfrowego i biometrii.",
      "Od pierwszych dni działalności nasza firma skupiała się na innowacyjnych rozwiązaniach, które łączą najnowsze technologie z praktycznymi zastosowaniami biznesowymi.",
      "Dziś, po prawie dekadzie działalności, obsługujemy ponad 500 klientów korporacyjnych w 15 krajach."
    ]
  },
  aboutTeam: {
    title: "Nasz Zespół",
    intro: "W BioCorp pracuje ponad 80 specjalistów z różnych dziedzin - od inżynierów oprogramowania, przez analityków bezpieczeństwa, po ekspertów od uczenia maszynowego.",
    cards: [
      { title: "Dział R&D", description: "25 osób pracujących nad nowymi rozwiązaniami" },
      { title: "Wsparcie Techniczne", description: "Całodobowa pomoc dla klientów" }
    ]
  },
  aboutValues: {
    title: "Nasze Wartości",
    values: [
      { title: "Bezpieczeństwo przede wszystkim", description: "Chronimy dane naszych klientów jak własne" },
      { title: "Innowacyjność", description: "Nieustannie rozwijamy nowe technologie" },
      { title: "Transparentność", description: "Jasna komunikacja z klientami" }
    ]
  },
  servicesBiometric: {
    title: "Systemy Biometryczne",
    intro: "Oferujemy kompleksowe rozwiązania biometryczne oparte na różnych technologiach identyfikacji.",
    systems: [
      { title: "Odciski palców", description: "Szybka i precyzyjna identyfikacja" },
      { title: "Rozpoznawanie twarzy", description: "AI-powered face recognition" },
      { title: "Skan tęczówki", description: "Najwyższy poziom bezpieczeństwa" },
      { title: "Analiza głosu", description: "Biometria głosowa" }
    ]
  },
  servicesConsulting: {
    title: "Doradztwo",
    intro: "Pomagamy firmom wybrać i wdrożyć optymalne rozwiązania biometryczne dostosowane do ich potrzeb.",
    services: [
      { title: "Audyt bezpieczeństwa", description: "Ocena aktualnego stanu zabezpieczeń" },
      { title: "Planowanie wdrożenia", description: "Strategia implementacji systemów biometrycznych" },
      { title: "Szkolenia", description: "Przygotowanie zespołu do obsługi systemów" }
    ]
  },
  servicesProjects: {
    title: "Zrealizowane Projekty",
    intro: "Poniżej przedstawiamy nasze ostatnie projekty wdrożeniowe. "
  },
  contactInfo: {
    title: "Informacje Kontaktowe",
    sections: [
      { emoji: "📧", title: "Email", items: ["kontakt@biocorp.pl", "wsparcie@biocorp.pl"] },
      { emoji: "📞", title: "Telefon", items: ["+48 22 123 45 67 (Centrala)", "+48 22 123 45 68 (Wsparcie techniczne)"] },
      { emoji: "📍", title: "Adres", items: ["ul. Nowa 12", "00-001 Warszawa"] },
      { emoji: "🕒", title: "Godziny pracy", items: ["Pn-Pt: 9:00 - 17:00", "Sb-Nd: Zamknięte"] }
    ]
  },
  contactForm: {
    title: "Formularz Kontaktowy",
    fields: [
      { label: "Imię i nazwisko", type: "text", placeholder: "Jan Kowalski" },
      { label: "Email", type: "email", placeholder: "jan.kowalski@example.com" },
      { label: "Temat", type: "text", placeholder: "Zapytanie ofertowe" },
      { label: "Wiadomość", type: "textarea", rows: 5, placeholder: "Twoja wiadomość..." }
    ],
    buttonText: "Wyślij wiadomość"
  }
};

// --- DANE DLA LOGOWANIA ---

const loginTabsData = [
  { 
    id: 'home', 
    label: 'Panel główny', 
    emoji: '📊',
    subTabs: null
  },
  { 
    id: 'about', 
    label: 'O firmie', 
    emoji: '🏢',
    subTabs: [
      { id: 'history', label: 'Kim jesteśmy' },
      { id: 'team', label: 'Zespół projektowy' },
      { id: 'values', label: 'Nasze podejście' }
    ]
  },
  { 
    id: 'services', 
    label: 'Rozwiązania', 
    emoji: '🛡️',
    subTabs: [
      { id: 'biometric', label: 'Platformy biometryczne' },
      { id: 'consulting', label: 'Consulting bezpieczeństwa' },
      { id: 'projects', label: 'Realizacje' }
    ]
  },
  { 
    id: 'contact', 
    label: 'Wsparcie', 
    emoji: '💬',
    subTabs: [
      { id: 'info', label: 'Dane kontaktowe' },
      { id: 'form', label: 'Zgłoszenie serwisowe' }
    ]
  },
];

// projekty mogą zostać te same – inne są teksty i zadanie
const loginProjects = [
  {
    id: 'metro',
    name: 'MetroGuard',
    client: 'Zarząd Transportu Miejskiego',
    date: '2022-11',
    description: 'System kontroli dostępu dla zaplecza technicznego sieci tramwajowej.',
    scope: 'Zakres: 24 punkty kontroli, integracja z systemem przepustek pracowniczych',
    reference: 'MG-2022-11-0042',
    borderColor: 'border-sky-500',
    hoverColor: 'hover:bg-sky-50'
  },
  {
    id: 'hospital',
    name: 'SecureHospital',
    client: 'Szpital Kliniczny NovaMed',
    date: '2023-07',
    description: 'Wdrożenie biometrii dla personelu medycznego przy wejściu do stref krytycznych.',
    scope: 'Zakres: 40 czytników, logowanie biometryczne do stacji roboczych',
    reference: 'SH-2023-07-0178',
    borderColor: 'border-emerald-500',
    hoverColor: 'hover:bg-emerald-50'
  },
  {
    id: 'govid',
    name: 'GovID 2.0',
    client: 'Agencja Bezpieczeństwa Cyfrowego',
    date: '2023-10',
    description: 'Platforma zdalnej weryfikacji tożsamości obywateli z użyciem biometrii twarzy.',
    scope: 'Zakres: 500k użytkowników pilotażowych, integracja z usługami publicznymi',
    reference: 'GID-2023-10-0931',
    borderColor: 'border-orange-500',
    hoverColor: 'hover:bg-orange-50'
  },
  {
    id: 'campus',
    name: 'SmartCampus ID',
    client: 'Uniwersytet Miejski',
    date: '2024-03',
    description: 'Cyfrowa legitymacja studencka z elementami biometrii behawioralnej.',
    scope: 'Zakres: 15 budynków, logowanie do systemu dziekanatu i bibliotek',
    reference: 'SCI-2024-03-0012',
    borderColor: 'border-purple-500',
    hoverColor: 'hover:bg-purple-50'
  }
];


const loginPageContent = {
  home: {
    title: "Panel klienta BioCorp",
    paragraphs: [
      "Witamy w panelu klienta BioCorp. Tutaj znajdziesz informacje o wdrożonych projektach biometrycznych.",
      "Przejdź po zakładkach, aby zobaczyć szczegóły współpracy z różnymi instytucjami."
    ]
  },
  aboutHistory: {
    title: "Kim jesteśmy",
    paragraphs: [
      "BioCorp specjalizuje się w systemach biometrycznych dla sektora finansowego, publicznego i edukacyjnego.",
      "Od kilku lat wspieramy duże organizacje w zwiększaniu poziomu bezpieczeństwa przy zachowaniu wygody użytkowników.",
      "Nasze rozwiązania działają m.in. w bankach, na lotniskach i na uczelniach wyższych."
    ]
  },
  aboutTeam: {
    title: "Zespół projektowy",
    intro: "Zespół BioCorp łączy doświadczenie z zakresu cyberbezpieczeństwa, analizy zachowania użytkowników oraz projektowania systemów na dużą skalę.",
    cards: [
      { title: "Biometria behawioralna", description: "Zespół odpowiedzialny za analizę sposobu poruszania się po systemach." },
      { title: "Wdrożenia korporacyjne", description: "Zespół prowadzący projekty dla klientów z sektora bankowego i publicznego." }
    ]
  },
  aboutValues: {
    title: "Nasze podejście",
    values: [
      { title: "Bezpieczeństwo i wygoda", description: "Projektujemy systemy tak, aby były bezpieczne, ale nie uciążliwe w codziennym użyciu." },
      { title: "Skalowalność", description: "Systemy BioCorp są przygotowane na tysiące równoczesnych użytkowników." },
      { title: "Współpraca z klientem", description: "Projektujemy rozwiązania w oparciu o realne potrzeby organizacji." }
    ]
  },
  servicesBiometric: {
    title: "Rozwiązania biometryczne",
    intro: "BioCorp dostarcza zarówno klasyczne systemy biometrii fizycznej, jak i rozwiązania analizujące styl korzystania z aplikacji.",
    systems: [
      { title: "Dostęp do stref chronionych", description: "Kontrola wejścia do serwerowni, laboratoriów i stref o ograniczonym dostępie." },
      { title: "Logowanie bez hasła", description: "Weryfikacja użytkownika na podstawie jego zachowania w systemie." },
      { title: "Monitorowanie sesji", description: "Wykrywanie nietypowej aktywności w czasie pracy użytkownika." },
      { title: "Integracje z istniejącymi systemami", description: "Możliwość podłączenia systemów klienta do platformy BioCorp." }
    ]
  },
  servicesConsulting: {
    title: "Consulting bezpieczeństwa",
    intro: "Pomagamy organizacjom zaplanować i wdrożyć rozwiązania biometryczne dopasowane do ich skali i specyfiki.",
    services: [
      { title: "Analiza potrzeb", description: "Wspólnie z klientem identyfikujemy obszary wymagające dodatkowego zabezpieczenia." },
      { title: "Projekt rozwiązania", description: "Dobór właściwych technologii i architektury systemu." },
      { title: "Wsparcie po wdrożeniu", description: "Pomoc w utrzymaniu i rozwijaniu systemu przez cały okres współpracy." }
    ]
  },
  servicesProjects: {
    title: "Realizacje BioCorp",
    intro: "Poniżej prezentujemy wybrane projekty wdrożeniowe dla naszych klientów."
  },
  contactInfo: {
    title: "Dane kontaktowe",
    sections: [
      { emoji: "📧", title: "Email", items: ["biuro@biocorp.pl", "support@biocorp.pl"] },
      { emoji: "📞", title: "Telefon", items: ["+48 22 456 78 90 (Biuro)", "+48 22 456 78 91 (Dział wsparcia)"] },
      { emoji: "📍", title: "Adres", items: ["ul. Bezpieczna 10", "00-950 Warszawa"] },
      { emoji: "🕒", title: "Godziny pracy", items: ["Pn–Pt: 9:00–17:00", "Sb–Nd: wsparcie zdalne dla klientów kontraktowych"] }
    ]
  },
  contactForm: {
    title: "Skontaktuj się z nami",
    fields: [
      { label: "Imię i nazwisko", type: "text", placeholder: "np. Anna Kowalska" },
      { label: "Email", type: "email", placeholder: "anna.kowalska@example.com" },
      { label: "Temat", type: "text", placeholder: "np. Zapytanie dotyczące wdrożenia" },
      { label: "Wiadomość", type: "textarea", rows: 5, placeholder: "Opisz, w czym możemy pomóc..." }
    ],
    buttonText: "Wyślij"
  }
};

// --- WARIANTY ZADAŃ DLA LOGOWANIA ---

const loginTaskVariants = [
  {
    id: 'earliest',
    instruction: "Znajdź projekt zrealizowany NAJWCZEŚNIEJ",
    mode: 'earliest'
  },
  {
    id: 'latest',
    instruction: "Znajdź projekt zrealizowany NAJPOŹNIEJ",
    mode: 'latest'
  }
];


// --- GŁÓWNA KONFIGURACJA ZADANIA 5 ---

export const zad5Content = {
  registration: {
    instruction: "Znajdź projekt zrealizowany dla Banku Narodowego Polska",
    companyName: "BioCorp",
    tabs: registrationTabsData,
    projects: registrationProjects,
    correctProjectId: 'bank',
    pageContent: registrationPageContent,
    tabOrder: ['home', 'about', 'services', 'contact'],
    initialTab: 'home',
    projectsPageId: { parent: 'services', sub: 'projects' },
    correctPath: {
      tab: 'services',
      subtab: { parent: 'services', sub: 'projects' },
      project: 'bank'
    },
    minimalClicks: 3
  },

  loginBase: {
    companyName: "BioCorp",
    tabs: loginTabsData,
    projects: loginProjects,
    pageContent: loginPageContent,
    tabOrder: ['home', 'about', 'services', 'contact'],
    initialTab: 'home',
    projectsPageId: { parent: 'services', sub: 'projects' },
    correctPath: {
      tab: 'services',
      subtab: { parent: 'services', sub: 'projects' },
      project: 'airport'
    },
    minimalClicks: 3
  }
};

// --- FUNKCJE UŻYWANE PRZEZ Zad5.jsx ---

export const getZad5Content = (mode) => {
  if (mode === 'login') {
    // losujemy, czy szukamy najstarszego czy najnowszego projektu
    const variant = loginTaskVariants[Math.floor(Math.random() * loginTaskVariants.length)];

    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('zad5_login_mode', variant.mode);
    }

    return {
      ...zad5Content.loginBase,
      instruction: variant.instruction
    };
  }

  return zad5Content[mode] || zad5Content.registration;
};


export const isCorrectProject = (mode, projectId) => {
  if (mode === 'login') {
    let variantMode = 'earliest';

    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem('zad5_login_mode');
      if (stored === 'latest' || stored === 'earliest') {
        variantMode = stored;
      }
    }

    // wyznacz projekt z najstarszą datą
    let earliest = loginProjects[0];
    let latest = loginProjects[0];

    for (const p of loginProjects) {
      if (p.date < earliest.date) earliest = p;
      if (p.date > latest.date) latest = p;
    }

    const targetId = variantMode === 'earliest' ? earliest.id : latest.id;
    return projectId === targetId;
  }

  // rejestracja – dalej klikamy konkret: Bank Narodowy Polska
  return projectId === zad5Content.registration.correctProjectId;
};

