import { useState, useEffect } from 'react'
import { Image } from 'lucide-react'
import UserHeader from '../components/UserHeader'
import TaskCompletionModal from '../components/TaskCompletionModal'
import LoginResultModal from '../components/LoginResultModal'

const products = [
  {
    id: 1,
    name: 'Kubek ceramiczny',
    description: 'Klasyczny kubek ceramiczny w intensywnym czerwonym kolorze. Idealny do kawy i herbaty.',
    price: 43,
  },
  {
    id: 2,
    name: 'Talerz porcelanowy',
    description: 'Elegancki talerz porcelanowy w klasycznym białym kolorze. Średnica 25 cm.',
    price: 28,
  },
  {
    id: 3,
    name: 'Szklanka',
    description: 'Stylowa szklanka w odcieniu zieleni. Pojemność 300ml, idealna do napojów.',
    price: 22,
  },
  {
    id: 4,
    name: 'Kubek do kawy',
    description: 'Niebieski kubek ceramiczny z wygodnym uchwytem. Pojemność 350ml.',
    price: 55,
  },
  {
    id: 5,
    name: 'Zestaw akcesoriów kuchennych',
    description: 'Kompletny zestaw narzędzi kuchennych z drewnianymi uchwytami. 5 elementów.',
    price: 89,
  },
  {
    id: 6,
    name: 'Kubek ceramiczny',
    description: 'Piękny kubek w kobaltowym odcieniu niebieskiego. Doskonały do codziennego użytku.',
    price: 39,
  },
  {
    id: 7,
    name: 'Szklana miska',
    description: 'Przezroczysta szklana miska o średnicy 20 cm. Idealna do sałatek i owoców.',
    price: 32,
  },
  {
    id: 8,
    name: 'Kubek termiczny stalowy',
    description: 'Termos ze stali nierdzewnej z pokrywką. Utrzymuje temperaturę przez 6 godzin.',
    price: 75,
  },
  {
    id: 9,
    name: 'Filiżanka z podstawką',
    description: 'Delikatna filiżanka porcelanowa w słonecznym żółtym kolorze z pasującą podstawką.',
    price: 42,
  },
  {
    id: 10,
    name: 'Drewniana deska do krojenia',
    description: 'Solidna deska z drewna bambusowego. Wymiary 30x20 cm, naturalne wykończenie.',
    price: 55,
  },
  {
    id: 11,
    name: 'Miska ceramiczna',
    description: 'Kolorowa miska w odcieniu fioletu. Pojemność 500ml, idealna do zupy i płatków.',
    price: 38,
  },
  {
    id: 12,
    name: 'Zestaw silikonowych przyborów',
    description: 'Kolorowy zestaw 6 silikonowych przyborów kuchennych. Odporny na wysokie temperatury.',
    price: 65,
  },
]

const ProductImage = () => (
  <Image className="w-full h-full text-purple-400" strokeWidth={1.5} />
)

const Zad1 = () => {
  const [showModal, setShowModal] = useState(false)
  const [showLoginResult, setShowLoginResult] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginDistance, setLoginDistance] = useState(0)
  const [isLoginMode, setIsLoginMode] = useState(false)

  useEffect(() => {

    window.scrollTo(0, 0)
    
    const loginMode = localStorage.getItem('loginMode') === 'true'
    const loginTask = localStorage.getItem('loginTask')
    setIsLoginMode(loginMode && loginTask === 'zad1')
  }, [])

  const handleProductClick = (productId) => {

    if (productId === 6) {
      const loginMode = localStorage.getItem('loginMode')
      const loginTask = localStorage.getItem('loginTask')
      const isLogin = loginMode === 'true' && loginTask === 'zad1'
      
      console.log('Debug Zad1:', { loginMode, loginTask, isLogin })
      
      if (isLogin) {
        // Symuluj autoryzację biometryczną
        const success = Math.random() < 0.7 
        const distance = success ? Math.random() * 0.2 : 0.3 + Math.random() * 0.3
        
        setLoginSuccess(success)
        setLoginDistance(distance)
        setShowLoginResult(true)
      } else {
        // Tryb rejestracji - pokaż standardowy modal
        setShowModal(true)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader />
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-indigo-200 py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-lg md:text-xl text-indigo-900 font-medium">
            Zadanie: Znajdź niebieski kubek w cenie poniżej 50 zł
          </p>
        </div>
      </div>

      <header className="bg-white border-b border-gray-200 shadow-sm py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">BioShop</h1>
        </div>
      </header>

      <div className="flex-1 bg-gray-50 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
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
        threshold={0.25}
      />
    </div>
  )
}

export default Zad1
