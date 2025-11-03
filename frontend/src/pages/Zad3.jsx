import { useState, useEffect } from 'react'
import { Coffee, Laptop, StickyNote, Book, Smartphone, Tablet, Pen, Package, Droplet, Cookie } from 'lucide-react'
import UserHeader from '../components/UserHeader'
import TaskCompletionModal from '../components/TaskCompletionModal'
import LoginResultModal from '../components/LoginResultModal'

const items = [
  {
    id: 'cup',
    name: 'Kubek',
    icon: <Coffee className="w-6 h-6 text-blue-600" />,
    bgColor: 'bg-blue-100',
  },
  {
    id: 'laptop',
    name: 'Laptop',
    icon: <Laptop className="w-6 h-6 text-gray-600" />,
    bgColor: 'bg-gray-100',
  },
  {
    id: 'notes',
    name: 'Karteczki',
    icon: <StickyNote className="w-6 h-6 text-yellow-600" />,
    bgColor: 'bg-yellow-100',
  },
  {
    id: 'book',
    name: 'Książka',
    icon: <Book className="w-6 h-6 text-green-600" />,
    bgColor: 'bg-green-100',
  },
  {
    id: 'phone',
    name: 'Telefon',
    icon: <Smartphone className="w-6 h-6 text-purple-600" />,
    bgColor: 'bg-purple-100',
  },
  {
    id: 'tablet',
    name: 'Tablet',
    icon: <Tablet className="w-6 h-6 text-blue-600" />,
    bgColor: 'bg-blue-100',
  },
  {
    id: 'pen',
    name: 'Długopis',
    icon: <Pen className="w-6 h-6 text-purple-600" />,
    bgColor: 'bg-purple-100',
  },
  {
    id: 'tissues',
    name: 'Chusteczki',
    icon: <Package className="w-6 h-6 text-green-600" />,
    bgColor: 'bg-green-100',
  },
  {
    id: 'handcream',
    name: 'Krem do rąk',
    icon: <Droplet className="w-6 h-6 text-pink-600" />,
    bgColor: 'bg-pink-100',
  },
  {
    id: 'snacks',
    name: 'Przekąski',
    icon: <Cookie className="w-6 h-6 text-orange-600" />,
    bgColor: 'bg-orange-100',
  },
]

const Zad3 = () => {
  const [draggedItem, setDraggedItem] = useState(null)
  const [droppedItems, setDroppedItems] = useState(Array(9).fill(null))
  const [showModal, setShowModal] = useState(false)
  const [showLoginResult, setShowLoginResult] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginDistance, setLoginDistance] = useState(0)
  const [isLoginMode, setIsLoginMode] = useState(false)

  useEffect(() => {
    // Scrolluj na górę strony
    window.scrollTo(0, 0)
    
    const loginMode = localStorage.getItem('loginMode') === 'true'
    const loginTask = localStorage.getItem('loginTask')
    setIsLoginMode(loginMode && loginTask === 'zad3')
  }, [])

  const handleDragStart = (item) => {
    setDraggedItem(item)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, index) => {
    e.preventDefault()
    if (draggedItem) {
      const newDropped = [...droppedItems]
      newDropped[index] = draggedItem
      setDroppedItems(newDropped)
      setDraggedItem(null)
    }
  }

  const handleFinishTask = () => {

    const loginMode = localStorage.getItem('loginMode') === 'true'
    const loginTask = localStorage.getItem('loginTask')
    const isLogin = loginMode && loginTask === 'zad3'
    
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

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <UserHeader />
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-indigo-200 py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-lg md:text-xl text-indigo-900 font-medium">
            Zadanie: Ułóż przedmioty tak, jakby leżały na twoim biurku
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
                  onDragStart={() => handleDragStart(item)}
                  className="flex items-center gap-4 p-6 border border-gray-200 rounded-xl bg-white cursor-move hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {item.icon}
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
                          {item.icon}
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
        threshold={0.25}
      />
    </div>
  )
}

export default Zad3
