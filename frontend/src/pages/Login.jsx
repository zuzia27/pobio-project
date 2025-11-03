import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!firstName.trim() || !lastName.trim()) {
      setMessage('Wypełnij wszystkie pola!')
      setIsError(true)
      return
    }

    try {
      const response = await fetch('http://localhost:5001/login', {
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
        setMessage(data.message)
        setIsError(false)
        
        // Losuj zadanie do logowania
        const tasks = ['zad1', 'zad2', 'zad3', 'zad4', 'zad5']
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)]
        
        // Zapisz dane użytkownika
        localStorage.setItem('user_id', data.user_id)
        localStorage.setItem('first_name', data.first_name)
        localStorage.setItem('last_name', data.last_name)
        
        // Zapisz tryb logowania i losowe zadanie
        localStorage.setItem('loginMode', 'true')
        localStorage.setItem('loginTask', randomTask)

        setTimeout(() => {
          navigate(`/${randomTask}`)
        }, 200)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Logowanie
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Zaloguj się do swojego konta
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
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
            Zaloguj się
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
            onClick={() => navigate('/register')}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Nie masz konta? Zarejestruj się
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
    </div>
  )
}

export default Login

