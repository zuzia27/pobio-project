const registrationTabsData = [
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
      { id: 'consulting', label: 'Consulting bezpieczeństwa' }
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

// --- PROJEKTY DLA REJESTRACJI ---

const registrationProjects = [
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

// --- CZŁONKOWIE ZESPOŁU DLA LOGOWANIA ---

const loginTeamMembers = [
  { 
    id: 'kowalska',
    name: "Dr Anna Kowalska", 
    role: "Kierownik Projektów Publicznych",
    description: "Specjalizuje się w wdrożeniach dla sektora administracji publicznej.",
    projects: [
      { name: "GovID 2.0", client: "Agencja Bezpieczeństwa Cyfrowego", date: "2023-10" },
      { name: "SmartCampus ID", client: "Uniwersytet Miejski", date: "2024-03" }
    ],
    borderColor: "border-orange-500",
    hoverColor: "hover:bg-orange-50"
  },
  { 
    id: 'nowak',
    name: "Mgr inż. Piotr Nowak", 
    role: "Lead Developer - Biometria Behawioralna",
    description: "Odpowiada za rozwój systemów analizy zachowań użytkowników w czasie rzeczywistym.",
    projects: [
      { name: "SecureHospital", client: "Szpital Kliniczny NovaMed", date: "2023-07" },
      { name: "MetroGuard", client: "Zarząd Transportu Miejskiego", date: "2022-11" }
    ],
    borderColor: "border-sky-500",
    hoverColor: "hover:bg-sky-50"
  },
  { 
    id: 'wisniewska',
    name: "Mgr Katarzyna Wiśniewska", 
    role: "Architekt Rozwiązań Korporacyjnych",
    description: "Projektuje systemy biometryczne na dużą skalę dla sektora finansowego i transportu.",
    projects: [
      { name: "BankSecure Pro", client: "Bank Centralny", date: "2023-05" },
      { name: "AirportAccess", client: "Port Lotniczy Krajowy", date: "2023-08" }
    ],
    borderColor: "border-emerald-500",
    hoverColor: "hover:bg-emerald-50"
  },
  { 
    id: 'zielinski',
    name: "Dr hab. Marcin Zieliński", 
    role: "Dyrektor ds. Badań i Rozwoju",
    description: "Nadzoruje prace badawcze nad nowymi metodami biometrii i uczenia maszynowego.",
    projects: [
      { name: "BehaviorAI Platform", client: "Projekt wewnętrzny", date: "2023-01" },
      { name: "FinTech Biometrics", client: "Konsorcjum bankowe", date: "2024-02" }
    ],
    borderColor: "border-purple-500",
    hoverColor: "hover:bg-purple-50"
  }
];

// --- WSPÓLNE DANE STRONY ---

const sharedPageSections = {
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

// --- PAGE CONTENT DLA REJESTRACJI ---

const registrationPageContent = {
  ...sharedPageSections,
  servicesProjects: sharedPageSections.servicesProjects
};

// --- PAGE CONTENT DLA LOGOWANIA ---

const loginPageContent = {
  ...sharedPageSections,
  aboutTeam: {
    title: "Zespół projektowy",
    intro: "Poznaj naszych specjalistów, którzy realizują projekty biometryczne dla klientów w różnych sektorach.",
    members: loginTeamMembers
  }
};

export const zad5Content = {
  registration: {
    instruction: "Znajdź projekt zrealizowany najpóźniej",
    companyName: "BioCorp",
    tabs: registrationTabsData,
    projects: registrationProjects,
    pageContent: registrationPageContent,
    tabOrder: ['home', 'about', 'services', 'contact'],
    initialTab: 'home',
    projectsPageId: { parent: 'services', sub: 'projects' },
    correctPath: {
      tab: 'services',
      subtab: { parent: 'services', sub: 'projects' },
      project: 'campus'
    },
    minimalClicks: 3
  },

  login: {
    instruction: "Znajdź pracownika, który prowadził projekt zrealizowany najwcześniej",
    companyName: "BioCorp",
    tabs: loginTabsData,
    pageContent: loginPageContent,
    tabOrder: ['home', 'about', 'services', 'contact'],
    initialTab: 'home',
    teamPageId: { parent: 'about', sub: 'team' },
    correctPath: {
      tab: 'about',
      subtab: { parent: 'about', sub: 'team' },
      member: 'nowak' 
    },
    minimalClicks: 3
  }
};


export const getZad5Content = (mode) => {
  return zad5Content[mode] || zad5Content.registration;
};


export const isCorrectItem = (mode, itemId) => {
  // Pobierz poprawną odpowiedź z konfiguracji
  const content = zad5Content[mode] || zad5Content.registration;
  
  // Dla rejestracji sprawdzamy project, dla logowania member
  if (mode === 'registration') {
    return itemId === content.correctPath.project;
  } else {
    return itemId === content.correctPath.member;
  }
};

