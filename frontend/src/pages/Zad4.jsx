import { useState, useEffect } from 'react'
import { User, Image } from 'lucide-react'
import UserHeader from '../components/UserHeader'
import TaskCompletionModal from '../components/TaskCompletionModal'
import LoginResultModal from '../components/LoginResultModal'

const posts = [
  {
    id: 1,
    author: 'Anna K.',
    timestamp: '2 godziny temu',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    author: 'Michał P.',
    timestamp: '4 godziny temu',
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 3,
    author: 'Katarzyna W.',
    timestamp: '6 godzin temu',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    id: 4,
    author: 'Tomasz L.',
    timestamp: '8 godzin temu',
    text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 5,
    author: 'Magdalena S.',
    timestamp: '10 godzin temu',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
  {
    id: 6,
    author: 'Piotr K.',
    timestamp: '12 godzin temu',
    text: 'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.',
  },
  {
    id: 7,
    author: 'Agnieszka M.',
    timestamp: '14 godzin temu',
    text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
  },
  {
    id: 8,
    author: 'Jakub R.',
    timestamp: '16 godzin temu',
    text: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
  },
  {
    id: 9,
    author: 'Marcin T.',
    timestamp: '18 godzin temu',
    text: 'Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
  },
  {
    id: 10,
    author: 'Ewa B.',
    timestamp: '20 godzin temu',
    text: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi.',
  },
]

const reactions = ['👍', '❤️', '😮', '😢']

const Zad4 = () => {
  const [postReactions, setPostReactions] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [showLoginResult, setShowLoginResult] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginDistance, setLoginDistance] = useState(0)
  const [isLoginMode, setIsLoginMode] = useState(false)

  useEffect(() => {

    window.scrollTo(0, 0)
    
    const loginMode = localStorage.getItem('loginMode') === 'true'
    const loginTask = localStorage.getItem('loginTask')
    setIsLoginMode(loginMode && loginTask === 'zad4')
  }, [])

  const handleReaction = (postId, reaction) => {
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
      setTimeout(() => {
 
        const loginMode = localStorage.getItem('loginMode') === 'true'
        const loginTask = localStorage.getItem('loginTask')
        const isLogin = loginMode && loginTask === 'zad4'
        
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
      }, 500)
    }
  }, [postReactions])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <UserHeader />
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-indigo-200 py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-lg md:text-xl text-indigo-900 font-medium">
            Zadanie: Przejrzyj posty i zostaw pod każdym reakcję
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
                <div className="flex items-center gap-6">
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
        threshold={0.25}
      />
    </div>
  )
}

export default Zad4
