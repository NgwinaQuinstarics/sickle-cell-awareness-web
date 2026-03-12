import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Prevention from './pages/Prevention'
import LivingWithSickleCell from './pages/LivingWithSickleCell'
import AppPage from './pages/AppPage'
import Resources from './pages/Resources'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/prevention" element={<Prevention />} />
          <Route path="/living" element={<LivingWithSickleCell />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}
