import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Dangers from './pages/Dangers'
import Quiz from './pages/Quiz'
import Centers from './pages/Centers'
import Pledge from './pages/Pledge'
import Contact from './pages/Contact'
import AppPage from "./pages/AppPage"; 
import { About, Prevention, Living, Resources } from './pages/OtherPages'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dangers" element={<Dangers />} />
        <Route path="/prevention" element={<Prevention />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/centers" element={<Centers />} />
        <Route path="/living" element={<Living />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/pledge" element={<Pledge />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/app" element={<AppPage />} />
        
        
        <Route path="*" element={<div style={{padding:'120px 28px',textAlign:'center',minHeight:'60vh'}}><div style={{fontSize:64,marginBottom:16}}>🩸</div><h1 style={{fontFamily:'var(--ff-display)',fontSize:'2rem',marginBottom:12}}>Page Not Found</h1><a href="/" style={{color:'var(--red)',fontWeight:600}}>← Back to Home</a></div>} />
      </Routes>
      <Footer />
    </Router>
  )
}
