import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import UserHeader from '../components/UserHeader'
import TaskCompletionModal from '../components/TaskCompletionModal'
import LoginResultModal from '../components/LoginResultModal'

const Zad5 = () => {
  const [activeTab, setActiveTab] = useState('home')
  const [activeSubTab, setActiveSubTab] = useState(null)
  const [expandedTab, setExpandedTab] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showFinishButton, setShowFinishButton] = useState(false)
  const [showLoginResult, setShowLoginResult] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginDistance, setLoginDistance] = useState(0)
  const [isLoginMode, setIsLoginMode] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    
    const loginMode = localStorage.getItem('loginMode') === 'true'
    const loginTask = localStorage.getItem('loginTask')
    setIsLoginMode(loginMode && loginTask === 'zad5')
  }, [])

  const handleTabClick = (tabId) => {
    if (expandedTab === tabId) {
      setExpandedTab(null)
    } else {
      setExpandedTab(tabId)
      setActiveTab(tabId)
      setActiveSubTab(null)
    }
  }

  const handleSubTabClick = (parentId, subTabId) => {
    setActiveTab(parentId)
    setActiveSubTab(subTabId)
    // Pokaż przycisk tylko gdy użytkownik znajdzie właściwy numer referencyjny
    if (parentId === 'services' && subTabId === 'projects') {
      setShowFinishButton(true)
    }
  }

  const handleFinish = () => {

    const loginMode = localStorage.getItem('loginMode') === 'true'
    const loginTask = localStorage.getItem('loginTask')
    const isLogin = loginMode && loginTask === 'zad5'
    
    if (isLogin) {
      // Symuluj autoryzację
      const success = Math.random() < 0.7
      const distance = success ? Math.random() * 0.2 : 0.3 + Math.random() * 0.3
      
      setLoginSuccess(success)
      setLoginDistance(distance)
      setShowLoginResult(true)
    } else {
      // Tryb rejestracji
      setShowModal(true)
    }
  }

  const handleModalClose = () => {
    setShowModal(false)

    if (!isLoginMode) {
      localStorage.removeItem('currentTask')
    }
  }

  const tabs = [
    { 
      id: 'home', 
      label: 'Strona główna', 
      subTabs: null
    },
    { 
      id: 'about', 
      label: 'O nas', 
      subTabs: [
        { id: 'history', label: 'Historia' },
        { id: 'team', label: 'Zespół' },
        { id: 'values', label: 'Nasze wartości' }
      ]
    },
    { 
      id: 'services', 
      label: 'Usługi', 
      subTabs: [
        { id: 'biometric', label: 'Systemy biometryczne' },
        { id: 'consulting', label: 'Doradztwo' },
        { id: 'projects', label: 'Zrealizowane projekty' }
      ]
    },
    { 
      id: 'contact', 
      label: 'Kontakt', 
      subTabs: [
        { id: 'info', label: 'Informacje kontaktowe' },
        { id: 'form', label: 'Formularz kontaktowy' }
      ]
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <UserHeader />
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-indigo-200 py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-lg md:text-xl text-indigo-900 font-medium">
            Zadanie: Znajdź numer referencyjny ostatniego zrealizowanego projektu przez firmę BioCorp
          </p>
        </div>
      </div>

      <header className="bg-white border-b border-gray-200 shadow-sm py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">BioCorp</h1>
        </div>
      </header>

      <main className="flex-1 bg-white py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Navigation Tabs */}
          <nav className="bg-white shadow-sm mb-6 rounded-lg">
            <div className="p-4 space-y-2">
              {tabs.map((tab) => (
                <div key={tab.id}>
                  <button
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-between ${
                      activeTab === tab.id
                        ? 'bg-indigo-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{tab.emoji}</span>
                      <span>{tab.label}</span>
                    </div>
                    {tab.subTabs && (
                      expandedTab === tab.id ? 
                        <ChevronUp className="w-5 h-5" /> : 
                        <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  
                  {tab.subTabs && expandedTab === tab.id && (
                    <div className="mt-2 ml-4 space-y-1">
                      {tab.subTabs.map((subTab) => (
                        <button
                          key={subTab.id}
                          onClick={() => handleSubTabClick(tab.id, subTab.id)}
                          className={`w-full px-4 py-2 rounded-lg text-left transition-all ${
                            activeSubTab === subTab.id
                              ? 'bg-indigo-100 text-indigo-900 font-medium'
                              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {subTab.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {activeTab === 'home' && !activeSubTab && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Witamy w BioCorp
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Jesteśmy wiodącym dostawcą innowacyjnych rozwiązań biometrycznych dla przedsiębiorstw na całym świecie.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nasze technologie pomagają organizacjom poprawić bezpieczeństwo, zwiększyć wydajność i zapewnić najwyższy poziom ochrony danych.
              </p>
            </div>
          )}

          {activeTab === 'about' && activeSubTab === 'history' && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Historia</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                BioCorp została założona w 2015 roku przez grupę ekspertów w dziedzinie bezpieczeństwa cyfrowego i biometrii.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Od pierwszych dni działalności nasza firma skupiała się na innowacyjnych rozwiązaniach, które łączą najnowsze technologie z praktycznymi zastosowaniami biznesowymi.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Dziś, po prawie dekadzie działalności, obsługujemy ponad 500 klientów korporacyjnych w 15 krajach.
              </p>
            </div>
          )}

          {activeTab === 'about' && activeSubTab === 'team' && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nasz Zespół</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                W BioCorp pracuje ponad 80 specjalistów z różnych dziedzin - od inżynierów oprogramowania, przez analityków bezpieczeństwa, po ekspertów od uczenia maszynowego.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Dział R&D</h3>
                  <p className="text-gray-600">25 osób pracujących nad nowymi rozwiązaniami</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Wsparcie Techniczne</h3>
                  <p className="text-gray-600">Całodobowa pomoc dla klientów</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && activeSubTab === 'values' && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nasze Wartości</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-500 pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Bezpieczeństwo przede wszystkim</h3>
                  <p className="text-gray-700">Chronimy dane naszych klientów jak własne</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Innowacyjność</h3>
                  <p className="text-gray-700">Nieustannie rozwijamy nowe technologie</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Transparentność</h3>
                  <p className="text-gray-700">Jasna komunikacja z klientami</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && activeSubTab === 'biometric' && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Systemy Biometryczne</h2>
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Oferujemy kompleksowe rozwiązania biometryczne oparte na różnych technologiach identyfikacji.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Odciski palców</h3>
                    <p className="text-gray-600">Szybka i precyzyjna identyfikacja</p>
                  </div>
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Rozpoznawanie twarzy</h3>
                    <p className="text-gray-600">AI-powered face recognition</p>
                  </div>
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Skan tęczówki</h3>
                    <p className="text-gray-600">Najwyższy poziom bezpieczeństwa</p>
                  </div>
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Analiza głosu</h3>
                    <p className="text-gray-600">Biometria głosowa</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && activeSubTab === 'consulting' && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Doradztwo</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Pomagamy firmom wybrać i wdrożyć optymalne rozwiązania biometryczne dostosowane do ich potrzeb.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Audyt bezpieczeństwa</h3>
                  <p className="text-gray-700">Ocena aktualnego stanu zabezpieczeń</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Planowanie wdrożenia</h3>
                  <p className="text-gray-700">Strategia implementacji systemów biometrycznych</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Szkolenia</h3>
                  <p className="text-gray-700">Przygotowanie zespołu do obsługi systemów</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && activeSubTab === 'projects' && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Zrealizowane Projekty</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Poniżej przedstawiamy nasze ostatnie projekty wdrożeniowe:
              </p>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">Bank Narodowy Polska</h3>
                    <span className="text-sm text-gray-500">2024-Q1</span>
                  </div>
                  <p className="text-gray-700 mb-3">
                    Kompleksowy system biometryczny dla 150 oddziałów bankowych. Wdrożenie rozpoznawania twarzy i odcisków palców dla pracowników i klientów VIP.
                  </p>
                  <p className="text-sm text-gray-600">
                    Zakres: 3500 urządzeń, integracja z systemem bankowym, szkolenie 800 pracowników
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Ref: BNP-2024-Q1-0156</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">Lotnisko Chopina</h3>
                    <span className="text-sm text-gray-500">2023-Q4</span>
                  </div>
                  <p className="text-gray-700 mb-3">
                    System kontroli dostępu dla personelu lotniska oparty na biometrii twarzy i dłoni. Integracja z międzynarodowymi bazami bezpieczeństwa.
                  </p>
                  <p className="text-sm text-gray-600">
                    Zakres: 45 bramek biometrycznych, system centralny, backup redundantny
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Ref: LCH-2023-Q4-0892</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">Politechnika Warszawska</h3>
                    <span className="text-sm text-gray-500">2023-Q3</span>
                  </div>
                  <p className="text-gray-700 mb-3">
                    Modernizacja systemu dostępu do laboratoriów badawczych. Wykorzystanie biometrii odcisków palców i kart RFID dla 2500 studentów i pracowników.
                  </p>
                  <p className="text-sm text-gray-600">
                    Zakres: 78 czytników biometrycznych, system raportowania, aplikacja mobilna
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Ref: PW-2023-Q3-0445</p>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-300">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-indigo-900">Ministerstwo Cyfryzacji</h3>
                    <span className="text-sm font-semibold text-indigo-600">2023-Q2</span>
                  </div>
                  <p className="text-gray-700 mb-3">
                    Pilotażowy projekt systemu e-ID z wykorzystaniem biometrii twarzy dla obywateli. System obejmuje weryfikację tożsamości online oraz dostęp do usług publicznych.
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    Zakres: Platforma centralna, 500 punktów rejestracji, aplikacja mobilna dla 100,000 użytkowników pilotażowych
                  </p>
                  <div className="bg-white p-3 rounded border border-indigo-200">
                    <p className="text-sm font-medium text-gray-700 mb-1">Szczegóły projektu:</p>
                    <p className="text-xs text-gray-600">Czas realizacji: 8 miesięcy | Budżet: 12.5M PLN | Status: Zakończony z sukcesem</p>
                    <p className="text-xs font-bold text-indigo-700 mt-2">Numer referencyjny: MC-2023-Q2-1337</p>
                  </div>
                </div>
              </div>

              {showFinishButton && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleFinish}
                    className="bg-gradient-to-r from-indigo-300 to-purple-300 hover:from-indigo-400 hover:to-purple-400 text-indigo-900 font-bold py-3 px-10 rounded-xl transition-all shadow-md hover:shadow-lg"
                  >
                    ✓ Zakończ test
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contact' && activeSubTab === 'info' && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Informacje Kontaktowe</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📧 Email</h3>
                  <p className="text-gray-700">kontakt@biocorp.pl</p>
                  <p className="text-gray-700">wsparcie@biocorp.pl</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📞 Telefon</h3>
                  <p className="text-gray-700">+48 22 123 45 67 (Centrala)</p>
                  <p className="text-gray-700">+48 22 123 45 68 (Wsparcie techniczne)</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📍 Adres</h3>
                  <p className="text-gray-700">ul. Nowa 12</p>
                  <p className="text-gray-700">00-001 Warszawa</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">🕒 Godziny pracy</h3>
                  <p className="text-gray-700">Pn-Pt: 9:00 - 17:00</p>
                  <p className="text-gray-700">Sb-Nd: Zamknięte</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && activeSubTab === 'form' && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Formularz Kontaktowy</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Imię i nazwisko</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Jan Kowalski" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="jan.kowalski@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Temat</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Zapytanie ofertowe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wiadomość</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg" rows="5" placeholder="Twoja wiadomość..."></textarea>
                </div>
                <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-all">
                  Wyślij wiadomość
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <TaskCompletionModal 
        isOpen={showModal}
        onClose={handleModalClose}
        nextTask="/login"
        isLastTask={true}
      />

      <LoginResultModal 
        isOpen={showLoginResult}
        onClose={() => setShowLoginResult(false)}
        success={loginSuccess}
        distance={loginDistance}
        threshold={0.25}
      />
    </div>
  )
}

export default Zad5
