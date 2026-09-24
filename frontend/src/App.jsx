import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import About from './pages/About'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import Home from './pages/Home'
import ServiceDetail from './pages/ServiceDetail'
import Services from './pages/Services'

function App() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Navigate to="/services/hair" replace />} />
        <Route path="/services/:category" element={<Services />} />
        <Route path="/services/:category/:serviceId" element={<ServiceDetail />} />
        <Route path="/book-appointment" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App
