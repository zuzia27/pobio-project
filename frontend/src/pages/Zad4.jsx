import { useState, useEffect } from 'react'
import { User, Image } from 'lucide-react'
import UserHeader from '../components/UserHeader'
import TaskCompletionModal from '../components/TaskCompletionModal'
import LoginResultModal from '../components/LoginResultModal'
import axios from 'axios'
import { getZad4Content } from '../data/zad4-content'
import { getContentMode } from '../helpers'

const Zad4 = () => {
  const [contentMode] = useState(() => getContentMode())
  const [content] = useState(() => getZad4Content(contentMode))
  const [posts] = useState(() => content.posts)
  const [reactions] = useState(() => content.reactions)
  
  const [postReactions, setPostReactions] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [showLoginResult, setShowLoginResult] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginDistance, setLoginDistance] = useState(0)
  const [loginThreshold, setLoginThreshold] = useState(0.20)
  const [isLoginMode, setIsLoginMode] = useState(false)
  const [taskCompleted, setTaskCompleted] = useState(false)

  const [startTime, setStartTime] = useState(null)
  const [firstReactionTime, setFirstReactionTime] = useState(null)
  const [reactionTimes, setReactionTimes] = useState([])
  
  const [scrollData, setScrollData] = useState([])
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrollBeforeFirstReaction, setScrollBeforeFirstReaction] = useState(0)
  
  const [mouseSpeeds, setMouseSpeeds] = useState([])
  const [lastMousePos, setLastMousePos] = useState(null)
  const [lastMouseTime, setLastMouseTime] = useState(null)
  
  const [hoverTimes, setHoverTimes] = useState({})
  const [hesitationData, setHesitationData] = useState([])
  
  const [reactionHistory, setReactionHistory] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    
    const loginMode = localStorage.getItem('loginMode') === 'true'
    const loginTask = localStorage.getItem('loginTask')
    setIsLoginMode(loginMode && loginTask === 'zad4')
    
    setStartTime(Date.now())
    setLastScrollY(window.scrollY)
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

  // Listener: scrollowanie
  useEffect(() => {
    const handleScroll = () => {
      if (taskCompleted) return
      
      const now = Date.now()
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY
      
      if (delta !== 0) {
        setScrollData((prev) => [...prev, { delta, position: currentScrollY, time: now }])
        
        // Jeśli jeszcze nie było reakcji, zwiększ licznik scrolla przed pierwszą reakcją
        if (!firstReactionTime) {
          setScrollBeforeFirstReaction((prev) => prev + Math.abs(delta))
        }
        
        setLastScrollY(currentScrollY)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, firstReactionTime, taskCompleted])

  const handleReactionButtonHover = (postId) => {
    const now = Date.now()
    if (!hoverTimes[postId]) {
      setHoverTimes((prev) => ({ ...prev, [postId]: now }))
    }
  }

  const handleReaction = (postId, reaction) => {
    const now = Date.now()
    
    if (!startTime) return
    
    if (!firstReactionTime) {
      setFirstReactionTime(now)
    }
    
    // Oblicz czas od hovera do kliknięcia
    if (hoverTimes[postId]) {
      const hesitation = (now - hoverTimes[postId]) / 1000
      setHesitationData((prev) => [...prev, hesitation])
    }
    
    setReactionTimes((prev) => [...prev, now])
    
    // Sprawdź czy to zmiana reakcji
    const previousReaction = postReactions[postId]
    
    // Zapisz historię
    setReactionHistory((prev) => [...prev, {
      postId,
      reaction,
      time: now,
      isChange: previousReaction !== undefined
    }])
    
    const newReactions = {
      ...postReactions,
      [postId]: reaction,
    }
    setPostReactions(newReactions)
  }

  // Sprawdzaj automatycznie czy wszystkie posty mają reakcje
  useEffect(() => {
    const allPostsReacted = posts.every((post) => postReactions[post.id])
    if (allPostsReacted && Object.keys(postReactions).length === posts.length) {
      setTimeout(async () => {
        setTaskCompleted(true)
        
        // OBLICZ WEKTOR CECH
        const endTime = Date.now()
        const duration = startTime ? (endTime - startTime) / 1000 : 1

        // 1. TOTAL TIME [s]
        const total_time = Number(duration.toFixed(3))

        // 2. FIRST REACTION TIME [s]
        const first_reaction_time = firstReactionTime && startTime
          ? Number(((firstReactionTime - startTime) / 1000).toFixed(3))
          : 0

        // 3. AVG TIME PER REACTION [s]
        const avg_time_per_reaction = reactionTimes.length > 1
          ? Number((((reactionTimes[reactionTimes.length - 1] - reactionTimes[0]) / 1000) / (reactionTimes.length - 1)).toFixed(3))
          : 0

        // 4. TOTAL SCROLL DISTANCE [px]
        const total_scroll_distance = scrollData.reduce((sum, s) => sum + Math.abs(s.delta), 0)

        // 5. SCROLL BEFORE FIRST REACTION [px]
        const scroll_before_first_reaction = scrollBeforeFirstReaction

        // 6. REACTION DIVERSITY [0-1]
        const uniqueReactions = new Set(Object.values(postReactions))
        const reaction_diversity = Number((uniqueReactions.size / 4).toFixed(3))

        // 7. REACTION CHANGES [-]
        const reaction_changes = reactionHistory.filter(r => r.isChange).length

        // 8. MOST USED REACTION RATIO [0-1]
        const reactionCounts = {}
        Object.values(postReactions).forEach(r => {
          reactionCounts[r] = (reactionCounts[r] || 0) + 1
        })
        const maxCount = Math.max(...Object.values(reactionCounts))
        const most_used_reaction_ratio = Number((maxCount / posts.length).toFixed(3))

        // 9. CLICK HESITATION TIME [s]
        const click_hesitation_time = hesitationData.length > 0
          ? Number((hesitationData.reduce((a, b) => a + b, 0) / hesitationData.length).toFixed(3))
          : 0

        // 10. INTERACTION PATTERN [0-1]
        const interaction_pattern = total_scroll_distance > 0
          ? Number((1 - (scroll_before_first_reaction / total_scroll_distance)).toFixed(3))
          : 0.5

        // 11. AVG MOUSE SPEED [px/s]
        const avg_mouse_speed = mouseSpeeds.length > 0
          ? Number((mouseSpeeds.reduce((a, b) => a + b, 0) / mouseSpeeds.length).toFixed(2))
          : 0

        const vector = [
          total_time,
          first_reaction_time,
          avg_time_per_reaction,
          total_scroll_distance,
          scroll_before_first_reaction,
          reaction_diversity,
          reaction_changes,
          most_used_reaction_ratio,
          click_hesitation_time,
          interaction_pattern,
          avg_mouse_speed
        ]

        const loginMode = localStorage.getItem('loginMode') === 'true'
        const loginTask = localStorage.getItem('loginTask')
        const isLogin = loginMode && loginTask === 'zad4'
        
        if (isLogin) {
          // tryb logowania biometrycznego
          try {
            const res = await axios.post('http://localhost:5001/login_biometric', {
              first_name: localStorage.getItem('first_name'),
              last_name: localStorage.getItem('last_name'),
              task_number: 4,
              vector_login: vector,
            })
        setLoginSuccess(res.data.authenticated)
        setLoginDistance(res.data.distance || 0)
        setLoginThreshold(res.data.threshold || 0.20)
      } catch (err) {
        if (err.response?.data) {
          setLoginSuccess(err.response.data.authenticated || false)
          setLoginDistance(err.response.data.distance || 0)
          setLoginThreshold(err.response.data.threshold || 0.20)
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
              task_name: 'Zad4',
              feature_vector: vector,
            })
          } catch (err) {
            console.error('Błąd zapisu wektora Zad4:', err.response?.data || err.message)
          }

          setShowModal(true)
        }
      }, 500)
    }
  }, [postReactions, startTime, firstReactionTime, reactionTimes, scrollData, scrollBeforeFirstReaction, 
      hesitationData, reactionHistory, mouseSpeeds])

  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <UserHeader />
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-indigo-200 py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-lg md:text-xl text-indigo-900 font-medium">
            {content.title}
          </p>
        </div>
      </div>

      <header className="bg-white border-b border-gray-200 shadow-sm py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">BioFeed</h1>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="w-7 h-7 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.author}</h3>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>

                <div className="mb-4 h-64 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Image className="w-24 h-24 text-purple-400" strokeWidth={1.5} />
                </div>

                <p className="text-gray-700 leading-relaxed">{post.text}</p>
              </div>

              <div className="border-t border-gray-100 px-6 py-4">
                <div 
                  className="flex items-center gap-6"
                  onMouseEnter={() => handleReactionButtonHover(post.id)}
                >
                  {reactions.map((reaction) => (
                    <button
                      key={reaction}
                      onClick={() => handleReaction(post.id, reaction)}
                      className={`text-2xl p-2 rounded-lg transition-all ${
                        postReactions[post.id] === reaction
                          ? 'bg-indigo-100 scale-125 border-2 border-indigo-300'
                          : 'hover:bg-gray-100'
                      }`}
                      title={`React with ${reaction}`}
                    >
                      {reaction}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>


      <TaskCompletionModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        nextTask="/zad5"
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

export default Zad4
