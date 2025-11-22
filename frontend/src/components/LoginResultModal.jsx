import { useNavigate } from 'react-router-dom'

const LoginResultModal = ({ isOpen, onClose, success, distance, threshold }) => {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleClose = () => {
    localStorage.removeItem('loginMode')
    localStorage.removeItem('loginTask')
    onClose()
    navigate('/')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {success ? 'Autoryzacja udana!' : 'Autoryzacja nieudana'}
        </h2>
        <p className="text-gray-600 mb-6">
          {success 
            ? 'Twój wzorzec biometryczny został rozpoznany.'
            : 'Twój wzorzec biometryczny nie pasuje do profilu.'
          }
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Odległość:</span>
            <span className="font-mono font-semibold">{distance.toFixed(4)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Próg:</span>
            <span className="font-mono font-semibold">{threshold.toFixed(4)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className={`font-semibold ${success ? 'text-green-600' : 'text-red-600'}`}>
              {success ? 'DOPASOWANIE' : 'BRAK DOPASOWANIA'}
            </span>
          </div>
        </div>

        <button
          onClick={handleClose}
          className={`bg-gradient-to-r ${
            success 
              ? 'from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500' 
              : 'from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500'
          } text-white font-bold py-3 px-10 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-105`}
        >
          Zamknij
        </button>
      </div>
    </div>
  )
}

export default LoginResultModal

