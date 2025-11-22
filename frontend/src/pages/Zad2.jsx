import { useState, useEffect } from 'react'
import { HelpCircle } from 'lucide-react'
import UserHeader from '../components/UserHeader'
import TaskCompletionModal from '../components/TaskCompletionModal'
import LoginResultModal from '../components/LoginResultModal'
import axios from 'axios'
import { getZad2Content, isCorrectAnswer } from '../data/zad2-content'
import { getContentMode } from '../helpers'

const Zad2 = () => {
  const [contentMode] = useState(() => getContentMode())
  const [content] = useState(() => getZad2Content(contentMode))
  const [answers] = useState(() => content.answers)
  
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showLoginResult, setShowLoginResult] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginDistance, setLoginDistance] = useState(0)
  const [loginThreshold, setLoginThreshold] = useState(0.18)
  const [isLoginMode, setIsLoginMode] = useState(false)
  const [taskCompleted, setTaskCompleted] = useState(false)

  const [showError, setShowError] = useState(false)
  const [errorShownTime, setErrorShownTime] = useState(null)

  const [startTime, setStartTime] = useState(null)
  const [firstMoveTime, setFirstMoveTime] = useState(null)
  
  const [mouseSpeeds, setMouseSpeeds] = useState([])
  const [lastPos, setLastPos] = useState(null)
  const [lastMoveTime, setLastMoveTime] = useState(null)
  
  const [scrollData, setScrollData] = useState([])
  const [lastScrollY, setLastScrollY] = useState(0)
  const [lastScrollTime, setLastScrollTime] = useState(null)
  const [scrollPauses, setScrollPauses] = useState(0)
  const [scrollEndTime, setScrollEndTime] = useState(null)
  
  const [answerHistory, setAnswerHistory] = useState([])
  const [scrollAfterError, setScrollAfterError] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const loginMode = localStorage.getItem('loginMode') === 'true'
    const loginTask = localStorage.getItem('loginTask')
    setIsLoginMode(loginMode && loginTask === 'zad2')
    setStartTime(Date.now())
  }, [])

  // Listener: ruchy myszy 
  useEffect(() => {
    const handleMove = (e) => {
      if (taskCompleted) return 
      
      const now = Date.now()
      
      if (!firstMoveTime) {
        setFirstMoveTime(now)
      }
      
      if (!lastPos) {
        setLastPos({ x: e.clientX, y: e.clientY })
        setLastMoveTime(now)
        return
      }

      const dx = e.clientX - lastPos.x
      const dy = e.clientY - lastPos.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Oblicz prędkość
      const timeDelta = (now - lastMoveTime) / 1000
      if (timeDelta > 0 && dist > 0) {
        const speed = dist / timeDelta
        setMouseSpeeds((prev) => [...prev, speed])
      }

      setLastPos({ x: e.clientX, y: e.clientY })
      setLastMoveTime(now)
    }

    window.addEventListener('mousemove', handleMove)

    return () => {
      window.removeEventListener('mousemove', handleMove)
    }
  }, [firstMoveTime, lastPos, lastMoveTime, taskCompleted])

  // Listener: scrollowanie + wykrywanie pauz
  useEffect(() => {
    let pauseTimer = null

    const handleScroll = () => {
      if (taskCompleted) return 
      
      const now = Date.now()
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY
      
      if (delta !== 0) {
        // Sprawdź czy scroll w górę po pokazaniu błędu (powrót do tekstu)
        if (delta < 0 && errorShownTime !== null) {
          setScrollAfterError(true)
        }
        
        setScrollData((prev) => [...prev, { delta, position: currentScrollY, time: now }])
        setLastScrollY(currentScrollY)
        setLastScrollTime(now)
        setScrollEndTime(null) 
        
        // Reset timera pauzy
        if (pauseTimer) clearTimeout(pauseTimer)
        
        // Ustaw nowy timer - jeśli 500ms bez scrolla to była pauza
        pauseTimer = setTimeout(() => {
          setScrollPauses((prev) => prev + 1)
          if (!scrollEndTime) {
            setScrollEndTime(Date.now())
          }
        }, 500)
      }
    }

    window.addEventListener('scroll', handleScroll)
    setLastScrollY(window.scrollY)
    setLastScrollTime(Date.now())

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (pauseTimer) clearTimeout(pauseTimer)
    }
  }, [lastScrollY, scrollEndTime, errorShownTime, taskCompleted])

  const handleAnswerSelect = (answerId) => {

    setAnswerHistory((prev) => [...prev, { answer: answerId, time: Date.now() }])
    
    setSelectedAnswer(answerId)

    setShowError(false)
  }

  const handleConfirmAnswer = async () => {
    if (!selectedAnswer) return
    
    // Sprawdź czy odpowiedź jest poprawna
    if (!isCorrectAnswer(contentMode, selectedAnswer)) {
      setShowError(true)
      setErrorShownTime(Date.now())
      setScrollAfterError(false) 
      return 
    }

    setTaskCompleted(true)

    // OBLICZ WEKTOR CECH 
      const endTime = Date.now()
      const duration = startTime ? (endTime - startTime) / 1000 : 1

    // 1. TOTAL TIME [s]
    const total_time = Number(duration.toFixed(3))

    // 2. READING TIME BEFORE ANSWER [s]
    // Czas ostatniego scrolla = jeśli był scroll, bierzemy ostatni, w przeciwnym razie startTime
    const lastScrollTime = scrollData.length > 0 
      ? scrollData[scrollData.length - 1].time 
      : startTime
    const reading_time_before_answer = answerHistory.length > 0
      ? Math.max(0, Number(((answerHistory[0].time - lastScrollTime) / 1000).toFixed(3)))
      : 0

    // 3. TOTAL SCROLL DISTANCE [px]
    const total_scroll_distance = scrollData.reduce((sum, s) => sum + Math.abs(s.delta), 0)

    // 4. SCROLL DIRECTION CHANGES [-]
    let scroll_direction_changes = 0
    for (let i = 1; i < scrollData.length; i++) {
      if ((scrollData[i].delta > 0 && scrollData[i-1].delta < 0) ||
          (scrollData[i].delta < 0 && scrollData[i-1].delta > 0)) {
        scroll_direction_changes++
      }
    }

    // 5. AVG SCROLL SPEED [px/s]
    let avg_scroll_speed = 0
    if (scrollData.length > 1) {
      const scrollDurations = []
      for (let i = 1; i < scrollData.length; i++) {
        const timeDelta = (scrollData[i].time - scrollData[i-1].time) / 1000
        if (timeDelta > 0) {
          const speed = Math.abs(scrollData[i].delta) / timeDelta
          scrollDurations.push(speed)
        }
      }
      if (scrollDurations.length > 0) {
        avg_scroll_speed = Number((scrollDurations.reduce((a, b) => a + b, 0) / scrollDurations.length).toFixed(2))
      }
    }

    // 6. SCROLL PAUSE COUNT [-]
    const scroll_pause_count = scrollPauses

    // 7. AVG MOUSE SPEED [px/s]
    const avg_mouse_speed = mouseSpeeds.length > 0
      ? Number((mouseSpeeds.reduce((a, b) => a + b, 0) / mouseSpeeds.length).toFixed(2))
      : 0

    // 8. ANSWER CHANGES [-]
    const answer_changes = Math.max(0, answerHistory.length - 1)

    // 9. REREADS TEXT ON ERROR [0/1]
    // Czy po pokazaniu błędu wraca do tekstu (scroll w górę)?
    const rereads_text_on_error = scrollAfterError ? 1 : 0

    // ostateczny wektor
      const vector = [
      total_time,
      reading_time_before_answer,
      total_scroll_distance,
      scroll_direction_changes,
      avg_scroll_speed,
      scroll_pause_count,
      avg_mouse_speed,
      answer_changes,
      rereads_text_on_error
    ]

      const loginMode = localStorage.getItem('loginMode') === 'true'
      const loginTask = localStorage.getItem('loginTask')
      const isLogin = loginMode && loginTask === 'zad2'

      if (isLogin) {
      //  tryb logowania biometrycznego
        try {
          const res = await axios.post('http://localhost:5001/login_biometric', {
            first_name: localStorage.getItem('first_name'),
            last_name: localStorage.getItem('last_name'),
          task_number: 2,
            vector_login: vector,
          })
        setLoginSuccess(res.data.authenticated)
        setLoginDistance(res.data.distance || 0)
        setLoginThreshold(res.data.threshold || 0.18)
      } catch (err) {
        if (err.response?.data) {
          setLoginSuccess(err.response.data.authenticated || false)
          setLoginDistance(err.response.data.distance || 0)
          setLoginThreshold(err.response.data.threshold || 0.18)
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
          task_name: 'Zad2',
            feature_vector: vector,
          })
        } catch (err) {
        console.error('Błąd zapisu wektora Zad2:', err.response?.data || err.message)
        }

        setShowModal(true)
      }
  }

  return (
    <div className="min-h-screen flex flex-col">
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
          <h1 className="text-2xl font-bold text-gray-900">BioNews</h1>
        </div>
      </header>

      <main className="flex-1 bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <article className="space-y-8">
            <header className="pb-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {content.title}
              </h1>
            </header>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              {content.article.split('\n\n').map((paragraph, index) => 
                paragraph.trim() && (
                  <p key={index}>
                    {paragraph.trim()}
                  </p>
                )
              )}
            </div>

            <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 mt-12">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 flex-shrink-0 mt-1 text-blue-500" />
                  <h2 className="text-2xl font-semibold text-gray-900">Pytanie</h2>
                </div>

                <p className="text-lg font-medium text-gray-700 pl-9">
                  {content.question}
                </p>

                <div className="space-y-4">
                  {answers.map((answer) => (
                    <button
                      key={answer.id}
                      onClick={() => handleAnswerSelect(answer.id)}
                      className={`w-full flex items-center gap-4 p-4 md:p-5 rounded-lg border-2 transition-all ${
                        selectedAnswer === answer.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 bg-white hover:border-indigo-300'
                      }`}
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-semibold flex-shrink-0">
                        {answer.id}
                      </span>
                      <span className="text-gray-700 text-base text-left">{answer.label}</span>
                    </button>
                  ))}
                </div>

                {showError && (
                  <div className="pt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 font-medium text-center">
                      Niepoprawna odpowiedź. Spróbuj ponownie!
                    </p>
                  </div>
                )}

                {selectedAnswer && (
                  <div className="pt-4">
                    <button
                      onClick={handleConfirmAnswer}
                      className="w-full bg-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Potwierdź odpowiedź
                    </button>
                  </div>
                )}
              </div>
            </section>
          </article>
        </div>
      </main>

      <TaskCompletionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        nextTask="/zad3"
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

export default Zad2
