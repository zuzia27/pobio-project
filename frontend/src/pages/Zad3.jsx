import { useState, useEffect } from 'react'
import UserHeader from '../components/UserHeader'
import TaskCompletionModal from '../components/TaskCompletionModal'
import LoginResultModal from '../components/LoginResultModal'
import axios from 'axios'
import { getZad3Content } from '../data/zad3-content'
import { getContentMode } from '../helpers'

const Zad3 = () => {
  const [contentMode] = useState(() => getContentMode())
  const [content] = useState(() => getZad3Content(contentMode))
  const [items] = useState(() => content.items)
  
  const [draggedItem, setDraggedItem] = useState(null)
  const [droppedItems, setDroppedItems] = useState(Array(9).fill(null))
  const [showModal, setShowModal] = useState(false)
  const [showLoginResult, setShowLoginResult] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginDistance, setLoginDistance] = useState(0)
  const [loginThreshold, setLoginThreshold] = useState(0.12)
  const [isLoginMode, setIsLoginMode] = useState(false)
  const [taskCompleted, setTaskCompleted] = useState(false)

  const [startTime, setStartTime] = useState(null)
  const [firstDragTime, setFirstDragTime] = useState(null)
  
  const [dragEvents, setDragEvents] = useState([])
  const [currentDragStart, setCurrentDragStart] = useState(null)
  const [currentDragPath, setCurrentDragPath] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [lastDragEndTime, setLastDragEndTime] = useState(null)

  const [dragHesitations, setDragHesitations] = useState([])
  const [lastMousePos, setLastMousePos] = useState(null)
  const [lastMouseTime, setLastMouseTime] = useState(null)
  
  const [repositionCount, setRepositionCount] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    
    const loginMode = localStorage.getItem('loginMode') === 'true'
    const loginTask = localStorage.getItem('loginTask')
    setIsLoginMode(loginMode && loginTask === 'zad3')
    
    setStartTime(Date.now())
  }, [])

  // Listener: ruchy myszy podczas draga
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (taskCompleted) return 
      if (isDragging) {
        const now = Date.now()
        const pos = { x: e.clientX, y: e.clientY, time: now }
        
        setCurrentDragPath((prev) => [...prev, pos])
        
        // Wykrywanie wahania (zatrzymanie > 100ms)
        if (lastMousePos && lastMouseTime) {
          const dx = e.clientX - lastMousePos.x
          const dy = e.clientY - lastMousePos.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const timeDelta = now - lastMouseTime
          
          // Jeśli ruch < 10px przez > 100ms = wahanie
          if (dist < 10 && timeDelta > 100) {
            setDragHesitations((prev) => [...prev, { time: now, duration: timeDelta }])
          }
        }
        
        setLastMousePos({ x: e.clientX, y: e.clientY })
        setLastMouseTime(now)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isDragging, lastMousePos, lastMouseTime, taskCompleted])

  const handleDragStart = (item, e) => {
    const now = Date.now()
    
    if (!firstDragTime) {
      setFirstDragTime(now)
    }
    
    const startPos = { x: e.clientX, y: e.clientY, time: now }
    setDraggedItem(item)
    setCurrentDragStart({ item, time: now, pos: startPos })
    setCurrentDragPath([startPos])
    setIsDragging(true)
    setDragHesitations([])
    setLastMousePos({ x: e.clientX, y: e.clientY })
    setLastMouseTime(now)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, index) => {
    e.preventDefault()
    if (draggedItem) {
      const now = Date.now()
      
      // Sprawdź czy to miejsce już zajęte
      if (droppedItems[index] !== null) {
        setRepositionCount((prev) => prev + 1)
      }
      
      const newDropped = [...droppedItems]
      newDropped[index] = draggedItem
      setDroppedItems(newDropped)
      
      // Zapisz informacje o drag event
      if (currentDragStart) {
        const duration = (now - currentDragStart.time) / 1000
        
        const startPos = currentDragStart.pos
        const endPos = { x: e.clientX, y: e.clientY }
        
        const straightDist = Math.sqrt(
          Math.pow(endPos.x - startPos.x, 2) + Math.pow(endPos.y - startPos.y, 2)
        )
        
        const actualDist = straightDist
        
        const straightness = 1.0  
        const speed = straightDist > 0 ? straightDist / duration : 0
        const hesitationCount = dragHesitations.length
        
        setDragEvents((prev) => [...prev, {
          item: draggedItem.id,
          duration,
          straightDist,
          actualDist,
          straightness,
          speed,
          hesitationCount,
          time: now
        }])
      }
      
      setDraggedItem(null)
      setIsDragging(false)
      setLastDragEndTime(now)
    }
  }

  const handleFinishTask = async () => {
    setTaskCompleted(true)
    
    // OBLICZ WEKTOR CECH
    const endTime = Date.now()
    const duration = startTime ? (endTime - startTime) / 1000 : 1

    // 1. TOTAL TIME [s]
    const total_time = Number(duration.toFixed(3))

    // 2. FIRST DRAG TIME [s]
    const first_drag_time = firstDragTime 
      ? Number(((firstDragTime - startTime) / 1000).toFixed(3))
      : 0

    // 3. AVG PAUSE BETWEEN DRAGS [s]
    let avg_pause_between_drags = 0
    if (dragEvents.length > 1) {
      const pauses = []
      for (let i = 1; i < dragEvents.length; i++) {
        const prevEndTime = dragEvents[i-1].time
        const currStartTime = dragEvents[i].time - (dragEvents[i].duration * 1000)
        const pause = (currStartTime - prevEndTime) / 1000
        if (pause > 0) pauses.push(pause)
      }
      if (pauses.length > 0) {
        avg_pause_between_drags = Number((pauses.reduce((a, b) => a + b, 0) / pauses.length).toFixed(3))
      }
    }

    // 4. TOTAL DRAGS [-]
    const total_drags = dragEvents.length

    // 5. ITEMS PLACED [-]
    const items_placed = droppedItems.filter(item => item !== null).length

    // 6. AVG DRAG DURATION [s]
    const avg_drag_duration = dragEvents.length > 0
      ? Number((dragEvents.reduce((sum, e) => sum + e.duration, 0) / dragEvents.length).toFixed(3))
      : 0

    // 7. DRAG PATH STRAIGHTNESS [0-1]
    const drag_path_straightness = dragEvents.length > 0
      ? Number((dragEvents.reduce((sum, e) => sum + e.straightness, 0) / dragEvents.length).toFixed(3))
      : 1

    // 8. HESITATION DURING DRAG [-]
    const hesitation_during_drag = dragEvents.reduce((sum, e) => sum + e.hesitationCount, 0)

    // 9. REPOSITIONS [-]
    const repositions = repositionCount

    // 10. AVG DRAG SPEED [px/s]
    const avg_drag_speed = dragEvents.length > 0
      ? Number((dragEvents.reduce((sum, e) => sum + e.speed, 0) / dragEvents.length).toFixed(2))
      : 0

    // ostateczny wektor
    const vector = [
      total_time,
      first_drag_time,
      avg_pause_between_drags,
      total_drags,
      items_placed,
      avg_drag_duration,
      drag_path_straightness,
      hesitation_during_drag,
      repositions,
      avg_drag_speed
    ]

    const loginMode = localStorage.getItem('loginMode') === 'true'
    const loginTask = localStorage.getItem('loginTask')
    const isLogin = loginMode && loginTask === 'zad3'
    
    if (isLogin) {
      // tryb logowania biometrycznego
      try {
        const res = await axios.post('http://localhost:5001/login_biometric', {
          first_name: localStorage.getItem('first_name'),
          last_name: localStorage.getItem('last_name'),
          task_number: 3,
          vector_login: vector,
        })
        setLoginSuccess(res.data.authenticated)
        setLoginDistance(res.data.distance || 0)
        setLoginThreshold(res.data.threshold || 0.12)
      } catch (err) {
        if (err.response?.data) {
          setLoginSuccess(err.response.data.authenticated || false)
          setLoginDistance(err.response.data.distance || 0)
          setLoginThreshold(err.response.data.threshold || 0.12)
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
          task_name: 'Zad3',
          feature_vector: vector,
        })
      } catch (err) {
        console.error('Błąd zapisu wektora Zad3:', err.response?.data || err.message)
      }

      setShowModal(true)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <UserHeader />
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-indigo-200 py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-lg md:text-xl text-indigo-900 font-medium">
            {content.title}
          </p>
          <p className="text-center text-sm text-indigo-700 mt-2">
            {content.description}
          </p>
        </div>
      </div>

      <header className="bg-white border-b border-gray-200 shadow-sm py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">BioDesk</h1>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-80 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Dostępne przedmioty</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(item, e)}
                  className="flex items-center gap-4 p-6 border border-gray-200 rounded-xl bg-white cursor-move hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {item.iconComponent && <item.iconComponent className={`w-6 h-6 ${item.textColor}`} />}
                  </div>
                  <span className="text-gray-800 font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-hidden flex flex-col">
          <div 
            className="w-full h-full rounded-2xl shadow-lg flex items-center justify-center p-12"
            style={{
              background: 'linear-gradient(90deg, rgba(120, 53, 15, 0.2) 0%, rgba(180, 83, 9, 0.2) 100%)',
            }}
          >
            <div className="w-full max-w-6xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {droppedItems.map((item, index) => (
                  <div
                    key={index}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`h-40 rounded-xl border-2 border-dashed border-gray-300 bg-white flex items-center justify-center transition-colors ${
                      item ? 'bg-gray-50' : 'hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {item ? (
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                          {item.iconComponent && <item.iconComponent className={`w-6 h-6 ${item.textColor}`} />}
                        </div>
                        <span className="text-gray-800 font-medium">{item.name}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 font-medium">Upuść tutaj</span>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleFinishTask}
                  className="bg-gradient-to-r from-indigo-300 to-purple-300 hover:from-indigo-400 hover:to-purple-400 text-indigo-900 font-bold py-3 px-10 rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Zakończ zadanie →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <TaskCompletionModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        nextTask="/zad4"
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

export default Zad3
