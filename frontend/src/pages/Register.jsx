import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    
    if (!firstName.trim() || !lastName.trim()) {
      setMessage('Wypełnij wszystkie pola!')
      setIsError(true)
      return
    }

    try {
      const response = await fetch('http://localhost:5001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName
        })
      })

      const data = await response.json()

      if (response.ok) {

        localStorage.setItem('user_id', data.user_id)
        localStorage.setItem('first_name', data.first_name)
        localStorage.setItem('last_name', data.last_name)
        localStorage.setItem('currentTask', '1')
        
        localStorage.removeItem('loginMode')
        localStorage.removeItem('loginTask')
        
        setShowSuccessModal(true)
        
        setTimeout(() => {
          navigate('/zad1')
        }, 3000)
      } else {
        setMessage(data.message)
        setIsError(true)
      }
    } catch (error) {
      setMessage('Błąd połączenia z serwerem')
      setIsError(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Rejestracja
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Utwórz nowe konto
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imię
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
              placeholder="Wprowadź swoje imię"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nazwisko
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition"
              placeholder="Wprowadź swoje nazwisko"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-300 to-purple-300 hover:from-indigo-400 hover:to-purple-400 text-indigo-900 font-bold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Zarejestruj się
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            isError 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message}
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Masz już konto? Zaloguj się
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-700"
          >
            ← Powrót do strony głównej
          </button>
        </div>
      </div>

      {/* Modal udanej rejestracji */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Rejestracja pomyślna!
            </h2>
            <p className="text-gray-600 mb-6">
              Witaj, <span className="font-semibold">{firstName} {lastName}</span>!
              <br />
              Za chwilę zostaniesz przekierowany do pierwszego zadania testowego.
            </p>
            <div className="flex items-center justify-center space-x-2 text-indigo-600">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
              <span>Przekierowywanie...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register

