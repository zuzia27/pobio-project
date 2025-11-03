import { useEffect, useState } from 'react'

const UserHeader = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoginMode, setIsLoginMode] = useState(false)

  useEffect(() => {
    const first = localStorage.getItem('first_name')
    const last = localStorage.getItem('last_name')
    const loginMode = localStorage.getItem('loginMode') === 'true'
    
    setFirstName(first || '')
    setLastName(last || '')
    setIsLoginMode(loginMode)
  }, [])

  if (!firstName || !lastName) return null

  return (
    <div className={`${
      isLoginMode 
        ? 'bg-gradient-to-r from-purple-100 to-indigo-100' 
        : 'bg-gradient-to-r from-indigo-100 to-purple-100'
    } text-indigo-900 py-3 px-4 border-b border-indigo-200`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-sm">
          <span className="font-semibold">{firstName} {lastName}</span>
        </div>
        <div className="text-xs">
          {isLoginMode ? (
            <span className="font-semibold text-indigo-700">Logowanie biometryczne</span>
          ) : (
            <span className="text-indigo-600">Rejestracja biometryczna</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserHeader

