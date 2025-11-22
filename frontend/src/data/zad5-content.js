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

// Treść podstron dla rejestracji
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

const loginPageContent = registrationPageContent;

export const zad5Content = {
  registration: {
    instruction: "Znajdź numer referencyjny ostatniego zrealizowanego projektu przez firmę BioCorp",
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
  
  login: {
    instruction: "Znajdź numer referencyjny ostatniego zrealizowanego projektu przez firmę BioCorp", // TYMCZASOWO
    companyName: "BioCorp", // TYMCZASOWO
    tabs: registrationTabsData, // TYMCZASOWO
    projects: registrationProjects, // TYMCZASOWO
    correctProjectId: 'bank', // TYMCZASOWO
    pageContent: loginPageContent, // TYMCZASOWO
    tabOrder: ['home', 'about', 'services', 'contact'], // TYMCZASOWO
    initialTab: 'home', // TYMCZASOWO
    projectsPageId: { parent: 'services', sub: 'projects' }, // TYMCZASOWO
    correctPath: { // TYMCZASOWO
      tab: 'services',
      subtab: { parent: 'services', sub: 'projects' },
      project: 'bank'
    },
    minimalClicks: 3 // TYMCZASOWO
  }
};

export const getZad5Content = (mode) => {
  return zad5Content[mode] || zad5Content.registration;
};

export const isCorrectProject = (mode, projectId) => {
  const content = getZad5Content(mode);
  return content.correctProjectId === projectId;
};
