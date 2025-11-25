import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import UserHeader from '../components/UserHeader'
import TaskCompletionModal from '../components/TaskCompletionModal'
import LoginResultModal from '../components/LoginResultModal'
import axios from 'axios'
import { getZad5Content, isCorrectItem } from '../data/zad5-content'
import { getContentMode } from '../helpers'

const Zad5 = () => {
  const [contentMode] = useState(() => getContentMode())
  const [content] = useState(() => getZad5Content(contentMode))
  const [tabs] = useState(() => content.tabs)
  const [projects] = useState(() => content.projects || [])
  const [pageContent] = useState(() => content.pageContent)
  const [tabOrder] = useState(() => content.tabOrder)
  
  const [activeTab, setActiveTab] = useState(() => content.initialTab)
  const [activeSubTab, setActiveSubTab] = useState(null)
  const [expandedTab, setExpandedTab] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showLoginResult, setShowLoginResult] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginDistance, setLoginDistance] = useState(0)
  const [loginThreshold, setLoginThreshold] = useState(0.17)
  const [isLoginMode, setIsLoginMode] = useState(false)
  const [taskCompleted, setTaskCompleted] = useState(false)

  const [startTime, setStartTime] = useState(null)
  const [firstClickTime, setFirstClickTime] = useState(null)
  const [clickTimes, setClickTimes] = useState([])
  const [clickHistory, setClickHistory] = useState([])
  const [tabsVisited, setTabsVisited] = useState(new Set())
  const [teamPageEnterTime, setTeamPageEnterTime] = useState(null)
  const [wrongMemberClicks, setWrongMemberClicks] = useState(0)
  const [projectsPageEnterTime, setProjectsPageEnterTime] = useState(null)
  const [wrongProjectClicks, setWrongProjectClicks] = useState(0)
  
  const [mouseSpeeds, setMouseSpeeds] = useState([])
  const [lastMousePos, setLastMousePos] = useState(null)
  const [lastMouseTime, setLastMouseTime] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    
    const loginMode = localStorage.getItem('loginMode') === 'true'
    const loginTask = localStorage.getItem('loginTask')
    setIsLoginMode(loginMode && loginTask === 'zad5')
    
    setStartTime(Date.now())
  }, [])

  // Listener: ruchy myszy
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (taskCompleted) return
      
      const now = Date.now()
      
      if (lastMousePos && lastMouseTime) {
        const dx = e.clientX - lastMousePos.x
        const dy = e.clientY - lastMousePos.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const timeDelta = (now - lastMouseTime) / 1000
        
        if (timeDelta > 0 && dist > 0) {
          const speed = dist / timeDelta
          setMouseSpeeds((prev) => [...prev, speed])
        }
      }
      
      setLastMousePos({ x: e.clientX, y: e.clientY })
      setLastMouseTime(now)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [lastMousePos, lastMouseTime, taskCompleted])

  const handleTabClick = (tabId) => {
    const now = Date.now()
    
    if (!firstClickTime) {
      setFirstClickTime(now)
    }
    
    // Zapisz kliknięcie
    setClickTimes((prev) => [...prev, now])
    setClickHistory((prev) => [...prev, { type: 'tab', id: tabId, time: now }])
    setTabsVisited((prev) => new Set(prev).add(tabId))
    
    if (expandedTab === tabId) {
      setExpandedTab(null)
    } else {
      setExpandedTab(tabId)
      setActiveTab(tabId)
      setActiveSubTab(null)
    }
  }

  const handleSubTabClick = (parentId, subTabId) => {
    const now = Date.now()
    
    if (!firstClickTime) {
      setFirstClickTime(now)
    }
    
    // Zapisz kliknięcie
    setClickTimes((prev) => [...prev, now])
    setClickHistory((prev) => [...prev, { type: 'subtab', parent: parentId, id: subTabId, time: now }])
    setTabsVisited((prev) => new Set(prev).add(`${parentId}.${subTabId}`))
    
    setActiveTab(parentId)
    setActiveSubTab(subTabId)
    
    // Czas wejścia na stronę projektów (rejestracja)
    if (content.projectsPageId && parentId === content.projectsPageId.parent && subTabId === content.projectsPageId.sub) {
      setProjectsPageEnterTime(now)
    }
    
    // Czas wejścia na stronę zespołu (logowanie)
    if (content.teamPageId && parentId === content.teamPageId.parent && subTabId === content.teamPageId.sub) {
      setTeamPageEnterTime(now)
    }
  }

  const handleProjectClick = async (projectId) => {
    const now = Date.now()
    
    // Zapisz kliknięcie 
    setClickTimes((prev) => [...prev, now])
    setClickHistory((prev) => [...prev, { type: 'project', id: projectId, time: now }])
    
    // Sprawdź czy to poprawny projekt
    if (!isCorrectItem(contentMode, projectId)) {
      // Błędny projekt
      setWrongProjectClicks((prev) => prev + 1)
      return 
    }

    // POPRAWNY PROJEKT - dokończ zadanie
    await completeTask(now)
  }

  const handleMemberClick = async (memberId) => {
    const now = Date.now()
    
    // Zapisz kliknięcie 
    setClickTimes((prev) => [...prev, now])
    setClickHistory((prev) => [...prev, { type: 'member', id: memberId, time: now }])
    
    // Sprawdź czy to poprawny członek zespołu
    if (!isCorrectItem(contentMode, memberId)) {
      // Błędny członek
      setWrongMemberClicks((prev) => prev + 1)
      return 
    }

    // POPRAWNY CZŁONEK - dokończ zadanie
    await completeTask(now)
  }

  const completeTask = async (now) => {
    // OBLICZ WEKTOR CECH
    const endTime = now
    const duration = startTime ? (endTime - startTime) / 1000 : 1

    // 1. TOTAL TIME [s]
    const total_time = Number(duration.toFixed(3))

    // 2. FIRST CLICK TIME [s]
    const first_click_time = firstClickTime && startTime
      ? Number(((firstClickTime - startTime) / 1000).toFixed(3))
      : 0

    // 3. AVG TIME PER CLICK [s]
    const avg_time_per_click = clickTimes.length > 1
      ? Number((((clickTimes[clickTimes.length - 1] - clickTimes[0]) / 1000) / (clickTimes.length - 1)).toFixed(3))
      : 0

    // 4. TOTAL CLICKS [-]
    const total_clicks = clickTimes.length

    // 5. TABS EXPLORED [-]
    const tabs_explored = tabsVisited.size

    // 6. WRONG PATH CLICKS [-]
    const wrong_path_clicks = clickHistory.filter(c => {
      if (c.type === 'tab') return c.id !== content.correctPath.tab
      if (c.type === 'subtab') return !(c.parent === content.correctPath.subtab.parent && c.id === content.correctPath.subtab.sub)
      if (c.type === 'project') return content.correctPath.project && c.id !== content.correctPath.project
      if (c.type === 'member') return content.correctPath.member && c.id !== content.correctPath.member
      return false
    }).length

    // 7. BACKTRACK COUNT [-]
    let backtrack_count = 0
    for (let i = 1; i < clickHistory.length; i++) {
      const prev = clickHistory[i - 1]
      const curr = clickHistory[i]
      // Jeśli wraca do poprzedniej zakładki
      if (prev.type === 'subtab' && curr.type === 'tab') {
        backtrack_count++
      }
    }

    // 8. PATH EFFICIENCY [0-1]
    const path_efficiency = Number((content.minimalClicks / total_clicks).toFixed(3))

    // 9. EXPLORATION SYSTEMATICITY [0-1]
    // Sprawdź czy klika zakładki po kolei
    const tabClicks = clickHistory.filter(c => c.type === 'tab').map(c => c.id)
    let jumps = 0
    for (let i = 1; i < tabClicks.length; i++) {
      const prevIdx = tabOrder.indexOf(tabClicks[i - 1])
      const currIdx = tabOrder.indexOf(tabClicks[i])
      if (Math.abs(currIdx - prevIdx) > 1) jumps++
    }
    const exploration_systematicity = tabClicks.length > 1
      ? Number((jumps / (tabClicks.length - 1)).toFixed(3))
      : 0

    // 10. AVG MOUSE SPEED [px/s]
    const avg_mouse_speed = mouseSpeeds.length > 0
      ? Number((mouseSpeeds.reduce((a, b) => a + b, 0) / mouseSpeeds.length).toFixed(2))
      : 0

    // 11. READING TIME ON TARGET PAGE [s]
    // Dla rejestracji: czas na stronie projektów, dla logowania: czas na stronie zespołu
    const reading_time_on_target_page = projectsPageEnterTime
      ? Number(((now - projectsPageEnterTime) / 1000).toFixed(3))
      : teamPageEnterTime
      ? Number(((now - teamPageEnterTime) / 1000).toFixed(3))
      : 0

    // 12. WRONG ITEM CLICKS [-]
    // Suma błędnych kliknięć w projekty + członków zespołu
    const wrong_item_clicks = wrongProjectClicks + wrongMemberClicks

    const vector = [
      total_time,
      first_click_time,
      avg_time_per_click,
      total_clicks,
      tabs_explored,
      wrong_path_clicks,
      backtrack_count,
      path_efficiency,
      exploration_systematicity,
      avg_mouse_speed,
      reading_time_on_target_page,
      wrong_item_clicks
    ]

    setTaskCompleted(true)

    const loginMode = localStorage.getItem('loginMode') === 'true'
    const loginTask = localStorage.getItem('loginTask')
    const isLogin = loginMode && loginTask === 'zad5'
    
    if (isLogin) {
      // tryb logowania biometrycznego
      try {
        const res = await axios.post('http://localhost:5001/login_biometric', {
          first_name: localStorage.getItem('first_name'),
          last_name: localStorage.getItem('last_name'),
          task_number: 5,
          vector_login: vector,
        })
        setLoginSuccess(res.data.authenticated)
        setLoginDistance(res.data.distance || 0)
        setLoginThreshold(res.data.threshold || 0.17)
      } catch (err) {
        if (err.response?.data) {
          setLoginSuccess(err.response.data.authenticated || false)
          setLoginDistance(err.response.data.distance || 0)
          setLoginThreshold(err.response.data.threshold || 0.17)
        } else {
          setLoginSuccess(false)
          setLoginDistance(0)
        }
      }
      setShowLoginResult(true)
    } else {
      // tryb rejestracji – zapisujemy wektor zadania
      const storedUserId = localStorage.getItem('user_id')
      if (!storedUserId) {
        alert('Brak user_id – najpierw się zarejestruj.')
        return
      }

      try {
        const res = await axios.post('http://localhost:5001/api/save_task_vector', {
          user_id: Number(storedUserId),
          task_name: 'Zad5',
          feature_vector: vector,
        })
      } catch (err) {
        // Błąd zapisu - brak akcji
      }

      setShowModal(true)
    }
  }

  const handleModalClose = () => {
    setShowModal(false)

    if (!isLoginMode) {
      localStorage.removeItem('currentTask')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <UserHeader />
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-indigo-200 py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-lg md:text-xl text-indigo-900 font-medium">
            {content.instruction}
          </p>
        </div>
      </div>

      <header className="bg-white border-b border-gray-200 shadow-sm py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">{content.companyName}</h1>
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
                {pageContent.home.title}
              </h2>
              {pageContent.home.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
              </p>
              ))}
            </div>
          )}

          {activeTab === 'about' && activeSubTab === 'history' && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{pageContent.aboutHistory.title}</h2>
              {pageContent.aboutHistory.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {activeTab === 'about' && activeSubTab === 'team' && pageContent.aboutTeam && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{pageContent.aboutTeam.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {pageContent.aboutTeam.intro}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pageContent.aboutTeam.members && pageContent.aboutTeam.members.map((member) => (
                  <div 
                    key={member.id}
                    onClick={() => handleMemberClick(member.id)}
                    className={`bg-gray-50 p-6 rounded-lg border-l-4 ${member.borderColor} cursor-pointer ${member.hoverColor} hover:shadow-lg transition-all`}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-indigo-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-700 mb-4">{member.description}</p>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <p className="text-sm font-semibold text-gray-800 mb-2">Realizowane projekty:</p>
                      <ul className="space-y-1">
                        {member.projects.map((project, idx) => (
                          <li key={idx} className="text-sm text-gray-600">
                            • <span className="font-medium">{project.name}</span> - {project.client} ({project.date})
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'about' && activeSubTab === 'values' && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{pageContent.aboutValues.title}</h2>
              <div className="space-y-4">
                {pageContent.aboutValues.values.map((value, idx) => (
                  <div key={idx} className="border-l-4 border-indigo-500 pl-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-700">{value.description}</p>
                </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && activeSubTab === 'biometric' && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{pageContent.servicesBiometric.title}</h2>
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  {pageContent.servicesBiometric.intro}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pageContent.servicesBiometric.systems.map((system, idx) => (
                    <div key={idx} className="bg-indigo-50 p-6 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{system.title}</h3>
                      <p className="text-gray-600">{system.description}</p>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && activeSubTab === 'consulting' && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{pageContent.servicesConsulting.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {pageContent.servicesConsulting.intro}
              </p>
              <div className="space-y-4">
                {pageContent.servicesConsulting.services.map((service, idx) => (
                  <div key={idx} className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-700">{service.description}</p>
                </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && activeSubTab === 'projects' && projects.length > 0 && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{pageContent.servicesProjects.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {pageContent.servicesProjects.intro}
              </p>
              
              <div className="space-y-6">
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    onClick={() => handleProjectClick(project.id)}
                    className={`bg-gray-50 p-6 rounded-lg border-l-4 ${project.borderColor} cursor-pointer hover:shadow-lg ${project.hoverColor} transition-all`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                      <span className="text-sm text-gray-500">{project.date}</span>
                    </div>
                    <p className="text-gray-700 mb-3">
                      {project.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      {project.scope}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">{project.reference}</p>
                  </div>
                ))}
              </div>
            </div>
          )}


          {activeTab === 'contact' && activeSubTab === 'info' && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{pageContent.contactInfo.title}</h2>
              <div className="space-y-6">
                {pageContent.contactInfo.sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{section.emoji} {section.title}</h3>
                    {section.items.map((item, itemIdx) => (
                      <p key={itemIdx} className="text-gray-700">{item}</p>
                    ))}
                </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && activeSubTab === 'form' && (
            <div className="bg-white shadow-sm rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{pageContent.contactForm.title}</h2>
              <div className="space-y-4">
                {pageContent.contactForm.fields.map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
                        rows={field.rows} 
                        placeholder={field.placeholder}
                      ></textarea>
                    ) : (
                      <input 
                        type={field.type} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
                        placeholder={field.placeholder} 
                      />
                    )}
                </div>
                ))}
                <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-all">
                  {pageContent.contactForm.buttonText}
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
        threshold={loginThreshold}
      />
    </div>
  )
}

export default Zad5