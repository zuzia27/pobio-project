import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Zad1 from './pages/Zad1'
import Zad2 from './pages/Zad2'
import Zad3 from './pages/Zad3'
import Zad4 from './pages/Zad4'
import Zad5 from './pages/Zad5'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/zad1" element={<Zad1 />} />
        <Route path="/zad2" element={<Zad2 />} />
        <Route path="/zad3" element={<Zad3 />} />
        <Route path="/zad4" element={<Zad4 />} />
        <Route path="/zad5" element={<Zad5 />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
