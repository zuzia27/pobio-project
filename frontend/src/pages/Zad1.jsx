import { useState, useEffect } from 'react'
import { Image } from 'lucide-react'
import UserHeader from '../components/UserHeader'
import TaskCompletionModal from '../components/TaskCompletionModal'
import LoginResultModal from '../components/LoginResultModal'
import axios from 'axios'
import { getZad1Content, isCorrectProduct } from '../data/zad1-content'
import { getContentMode } from '../helpers'

// 🔁 Funkcja mieszająca tablicę (poza komponentem!)
const shuffleArray = (array) => {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const ProductImage = () => (
  <Image className="w-full h-full text-purple-400" strokeWidth={1.5} />
)

const Zad1 = () => {
  const [contentMode] = useState(() => getContentMode())
  const [content] = useState(() => getZad1Content(contentMode))

  // 🧩 Tu tworzymy jednorazowo przetasowaną listę produktów
  const [shuffledProducts] = useState(() => shuffleArray(content.products))

  const [showModal, setShowModal] = useState(false)
  const [showLoginResult, setShowLoginResult] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginDistance, setLoginDistance] = useState(0)
  const [loginThreshold, setLoginThreshold] = useState(0.15)
  const [isLoginMode, setIsLoginMode] = useState(false)
  const [taskCompleted, setTaskCompleted] = useState(false)

  const [startTime, setStartTime] = useState(null)
  const [firstMoveTime, setFirstMoveTime] = useState(null)

  const [mouseMoves, setMouseMoves] = useState([])
  const [mouseSpeeds, setMouseSpeeds] = useState([])
  const [lastPos, setLastPos] = useState(null)
  const [lastMoveTime, setLastMoveTime] = useState(null)

  const [clickedProducts, setClickedProducts] = useState([])

  const [scrollData, setScrollData] = useState([])
  const [lastScrollY, setLastScrollY] = useState(0)

  const [hoveredProducts, setHoveredProducts] = useState(new Set())
  const [hoverStartTimes, setHoverStartTimes] = useState({})
  const [hoverDurations, setHoverDurations] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const loginMode = localStorage.getItem('loginMode') === 'true'
    const loginTask = localStorage.getItem('loginTask')
    setIsLoginMode(loginMode && loginTask === 'zad1')
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

      const timeDelta = (now - lastMoveTime) / 1000
      if (timeDelta > 0 && dist > 0) {
        const speed = dist / timeDelta
        setMouseSpeeds((prev) => [...prev, speed])
      }

      setMouseMoves((prev) => [...prev, dist])
      setLastPos({ x: e.clientX, y: e.clientY })
      setLastMoveTime(now)
    }

    window.addEventListener('mousemove', handleMove)

    return () => {
      window.removeEventListener('mousemove', handleMove)
    }
  }, [firstMoveTime, lastPos, lastMoveTime, taskCompleted])

  // Listener: scrollowanie
  useEffect(() => {
    const handleScroll = () => {
      if (taskCompleted) return

      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY

      if (delta !== 0) {
        setScrollData((prev) => [...prev, { delta, position: currentScrollY }])
        setLastScrollY(currentScrollY)
      }
    }

    window.addEventListener('scroll', handleScroll)
    setLastScrollY(window.scrollY)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY, taskCompleted])

  const handleProductClick = async (productId) => {
    const updatedClickedProducts = [...clickedProducts, productId]
    setClickedProducts(updatedClickedProducts)

    if (!isCorrectProduct(contentMode, productId)) return

    setTaskCompleted(true)

    const loginMode = localStorage.getItem('loginMode') === 'true'
    const loginTask = localStorage.getItem('loginTask')
    const isLogin = loginMode && loginTask === 'zad1'

    const endTime = Date.now()
    const duration = startTime ? (endTime - startTime) / 1000 : 1

    const total_time = Number(duration.toFixed(3))

    const first_reaction_time = firstMoveTime
      ? Number(((firstMoveTime - startTime) / 1000).toFixed(3))
      : 0

    const total_scroll_distance = scrollData.reduce(
      (sum, s) => sum + Math.abs(s.delta),
      0
    )

    let scroll_direction_changes = 0
    for (let i = 1; i < scrollData.length; i++) {
      if (
        (scrollData[i].delta > 0 && scrollData[i - 1].delta < 0) ||
        (scrollData[i].delta < 0 && scrollData[i - 1].delta > 0)
      ) {
        scroll_direction_changes++
      }
    }

    const total_clicks = updatedClickedProducts.length
    const clicks_before_correct = updatedClickedProducts.length

    const avg_mouse_speed =
      mouseSpeeds.length > 0
        ? Number(
            (
              mouseSpeeds.reduce((a, b) => a + b, 0) / mouseSpeeds.length
            ).toFixed(2)
          )
        : 0

    let mouse_speed_variance = 0
    if (mouseSpeeds.length > 1) {
      const mean =
        mouseSpeeds.reduce((a, b) => a + b, 0) / mouseSpeeds.length
      const variance =
        mouseSpeeds.reduce(
          (sum, speed) => sum + Math.pow(speed - mean, 2),
          0
        ) / mouseSpeeds.length
      mouse_speed_variance = Number(Math.sqrt(variance).toFixed(2))
    }

    const products_hovered = hoveredProducts.size

    const avg_hover_duration =
      hoverDurations.length > 0
        ? Number(
            (
              hoverDurations.reduce((a, b) => a + b, 0) /
              hoverDurations.length
            ).toFixed(3)
          )
        : 0

    const vector = [
      total_time,
      first_reaction_time,
      total_scroll_distance,
      scroll_direction_changes,
      total_clicks,
      clicks_before_correct,
      avg_mouse_speed,
      mouse_speed_variance,
      products_hovered,
      avg_hover_duration
    ]

    if (isLogin) {
      try {
        const res = await axios.post('http://localhost:5001/login_biometric', {
          first_name: localStorage.getItem('first_name'),
          last_name: localStorage.getItem('last_name'),
          task_number: 1,
          vector_login: vector
        })
        setLoginSuccess(res.data.authenticated)
        setLoginDistance(res.data.distance || 0)
        setLoginThreshold(res.data.threshold || 0.15)
      } catch (err) {
        if (err.response?.data) {
          setLoginSuccess(err.response.data.authenticated || false)
          setLoginDistance(err.response.data.distance || 0)
          setLoginThreshold(err.response.data.threshold || 0.15)
        } else {
          setLoginSuccess(false)
          setLoginDistance(0)
        }
      }
      setShowLoginResult(true)
    } else {
      const storedUserId = localStorage.getItem('user_id')

      if (!storedUserId) {
        alert('Brak user_id w localStorage – najpierw się zarejestruj.')
        return
      }

      try {
        await axios.post('http://localhost:5001/api/save_task_vector', {
          user_id: Number(storedUserId),
          task_name: 'Zad1',
          feature_vector: vector
        })
      } catch (err) {
        console.error('Błąd zapisu wektora:', err.response?.data || err.message)
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
            {content.title}
          </p>
        </div>
      </div>

      <header className="bg-white border-b border-gray-200 shadow-sm py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">{content.storeName}</h1>
        </div>
      </header>

      <div className="flex-1 bg-gray-50 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4">
            {shuffledProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                onMouseEnter={() => {
                  setHoveredProducts((prev) => new Set(prev).add(product.id))
                  setHoverStartTimes((prev) => ({
                    ...prev,
                    [product.id]: Date.now()
                  }))
                }}
                onMouseLeave={() => {
                  if (hoverStartTimes[product.id]) {
                    const duration =
                      (Date.now() - hoverStartTimes[product.id]) / 1000
                    setHoverDurations((prev) => [...prev, duration])
                  }
                }}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer hover:border-indigo-300"
              >
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                  <div className="w-28 h-28 flex-shrink-0 mx-auto sm:mx-0">
                    <ProductImage />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-base mb-3">
                      {product.description}
                    </p>
                    {product.price && (
                      <p className="text-xl font-bold text-gray-900">
                        {product.price} zł
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TaskCompletionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        nextTask="/zad2"
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

export default Zad1
