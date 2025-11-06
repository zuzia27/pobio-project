import { useState, useEffect } from 'react'
import { HelpCircle } from 'lucide-react'
import UserHeader from '../components/UserHeader'
import TaskCompletionModal from '../components/TaskCompletionModal'
import LoginResultModal from '../components/LoginResultModal'
import axios from 'axios'

const Zad2 = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showLoginResult, setShowLoginResult] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginDistance, setLoginDistance] = useState(0)
  const [isLoginMode, setIsLoginMode] = useState(false)

  // STANY DO POMIARÓW
  const [startTime, setStartTime] = useState(null)
  const [firstMoveTime, setFirstMoveTime] = useState(null)
  const [mouseMoves, setMouseMoves] = useState([])
  const [clicks, setClicks] = useState(0)
  const [lastPos, setLastPos] = useState(null)

  // inicjalizacja trybu i startTime
  useEffect(() => {
    window.scrollTo(0, 0)
    const loginMode = localStorage.getItem('loginMode') === 'true'
    const loginTask = localStorage.getItem('loginTask')
    setIsLoginMode(loginMode && loginTask === 'zad2')
    setStartTime(Date.now())
  }, [])

  // zbieranie ruchów myszy i kliknięć
  useEffect(() => {
    const handleMove = (e) => {
      if (!firstMoveTime) setFirstMoveTime(Date.now())
      if (!lastPos) {
        setLastPos({ x: e.clientX, y: e.clientY })
        return
      }

      const dx = e.clientX - lastPos.x
      const dy = e.clientY - lastPos.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      setMouseMoves((prev) => [...prev, dist])
      setLastPos({ x: e.clientX, y: e.clientY })
    }

    const handleClick = () => setClicks((prev) => prev + 1)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('click', handleClick)
    }
  }, [firstMoveTime, lastPos])

  const handleAnswerSelect = async (answerId) => {
    setSelectedAnswer(answerId)

    // dajemy lekkie opóźnienie jak wcześniej
    setTimeout(async () => {
      // policz wektor na podstawie zebranych danych
      const endTime = Date.now()
      const duration = startTime ? (endTime - startTime) / 1000 : 1

      const reaction_time = firstMoveTime ? (firstMoveTime - startTime) / 1000 : 0

      const smoothness =
        mouseMoves.length > 1
          ? 1 - Math.min(1, (Math.max(...mouseMoves) - Math.min(...mouseMoves)) / 500)
          : 0

      const interaction_speed = clicks / duration

      const vector = [
        Number(reaction_time.toFixed(3)),
        Number(smoothness.toFixed(3)),
        Number(interaction_speed.toFixed(3)),
      ]

      console.log('📊 Wektor z Zad2:', vector)

      const loginMode = localStorage.getItem('loginMode') === 'true'
      const loginTask = localStorage.getItem('loginTask')
      const isLogin = loginMode && loginTask === 'zad2'

      if (isLogin) {
        //  TRYB LOGOWANIA BIOMETRYCZNEGO
        try {
          const res = await axios.post('http://localhost:5001/login_biometric', {
            first_name: localStorage.getItem('first_name'),
            last_name: localStorage.getItem('last_name'),
            vector_login: vector,
          })
          console.log('Odpowiedź login_biometric (zad2):', res.data)
          setLoginSuccess(res.data.authenticated)
          setLoginDistance(res.data.distance)
        } catch (err) {
          console.error('Błąd logowania biometrycznego (zad2):', err)
          setLoginSuccess(false)
          setLoginDistance(0)
        }
        setShowLoginResult(true)
      } else {
        // 📝 TRYB REJESTRACJI – zapisujemy wektor z zadania 2
        const storedUserId = localStorage.getItem('user_id')
        if (!storedUserId) {
          alert('Brak user_id – najpierw się zarejestruj.')
          console.error('Brak user_id w localStorage')
          return
        }

        try {
          const res = await axios.post('http://localhost:5001/api/save_task_vector', {
            user_id: Number(storedUserId),
            task_name: 'zad2',
            feature_vector: vector,
          })
          console.log('✅ Wektor Zad2 zapisany:', res.data)
        } catch (err) {
          console.error('❌ Błąd zapisu wektora Zad2:', err)
        }

        setShowModal(true)
      }
    }, 300)
  }

  const answers = [
    { id: 'A', label: 'Odpowiedz A' },
    { id: 'B', label: 'Odpowiedz B' },
    { id: 'C', label: 'Odpowiedz C' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader />
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-indigo-200 py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-lg md:text-xl text-indigo-900 font-medium">
            Zadanie: Przeczytaj poniższy artykuł i odpowiedz na pytanie
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
                Tytuł artykułu
              </h1>
            </header>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>

              <p>
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
              </p>

              <p>
                Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>

              <p>
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
              </p>

              <p>
                Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>

              <p>
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
              </p>

              <p>
                Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>

              <p>
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
              </p>

              <p>
                Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
              </p>
            </div>

            <section className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 mt-12">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 flex-shrink-0 mt-1 text-blue-500" />
                  <h2 className="text-2xl font-semibold text-gray-900">Pytanie</h2>
                </div>

                <p className="text-lg font-medium text-gray-700 pl-9">
                  Jakie jest główne przesłanie artykułu?
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
        threshold={0.25}
      />
    </div>
  )
}

export default Zad2
