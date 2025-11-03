import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleRegisterClick = () => {
    navigate('/register')
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-indigo-50">

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-20">
            BioID
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={handleRegisterClick}
              className="bg-gradient-to-r from-indigo-300 to-purple-300 hover:from-indigo-400 hover:to-purple-400 text-indigo-900 font-bold px-8 py-4 rounded-lg transition-all min-w-48 shadow-lg hover:shadow-xl"
            >
              Zarejestruj się
            </button>
            <button
              onClick={handleLoginClick}
              className="border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50 font-semibold px-8 py-4 rounded-lg transition-all min-w-48 shadow-md hover:shadow-lg"
            >
              Zaloguj się
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-base">BioID Test System by Zuzanna & Urszula</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
