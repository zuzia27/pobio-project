import { useNavigate } from 'react-router-dom'

const TaskCompletionModal = ({ isOpen, onClose, nextTask, isLastTask = false }) => {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleNext = () => {
    onClose()
    if (nextTask) {
      navigate(nextTask)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
        <div className="mb-4 text-6xl">✅</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {isLastTask ? 'Dziękujemy za udział!' : 'Zadanie zakończone!'}
        </h2>
        <p className="text-gray-600 mb-8">
          {isLastTask 
            ? 'Ukończyłeś wszystkie zadania testowe. Twoje dane biometryczne zostały zapisane. Teraz możesz spróbować się zalogować używając swojego profilu biometrycznego.'
            : 'Przejdź do kolejnego zadania.'
          }
        </p>
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-indigo-400 to-blue-400 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:scale-105"
        >
          {isLastTask ? 'Przejdź do logowania →' : 'Przejdź dalej →'}
        </button>
      </div>
    </div>
  )
}

export default TaskCompletionModal

