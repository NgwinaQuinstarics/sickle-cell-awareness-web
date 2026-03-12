import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { FaHeartbeat } from 'react-icons/fa'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About SCD' },
  { to: '/prevention', label: 'Prevention' },
  { to: '/living', label: 'Living With SCD' },
  { to: '/app', label: 'Mobile App' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid #E2E8F0' : '1px solid transparent',
      transition: 'all 0.3s ease',
      height: 'var(--nav-h)',
    }}>
      <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.35rem', color: 'var(--primary)' }}>
          <span style={{ background: 'var(--primary)', borderRadius: 10, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaHeartbeat color="#fff" size={18} />
          </span>
          SickleCare
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              padding: '8px 14px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              color: location.pathname === l.to ? 'var(--primary)' : 'var(--text-mid)',
              background: location.pathname === l.to ? 'var(--primary-light)' : 'transparent',
              transition: 'all 0.15s',
            }}
              onMouseEnter={e => { if (location.pathname !== l.to) e.target.style.background = '#F8FAFC' }}
              onMouseLeave={e => { if (location.pathname !== l.to) e.target.style.background = 'transparent' }}
            >{l.label}</Link>
          ))}
          <Link to="/app" className="btn btn-primary" style={{ marginLeft: 8, padding: '10px 22px', fontSize: 14 }}>
            Get the App
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="mobile-menu-btn" style={{ background: 'none', border: 'none', padding: 8, display: 'none' }}>
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div style={{
          position: 'absolute', top: 'var(--nav-h)', left: 0, right: 0,
          background: '#fff',
          borderBottom: '1px solid var(--border)',
          padding: '16px 24px 24px',
          display: 'flex', flexDirection: 'column', gap: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              padding: '12px 16px',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 500,
              color: location.pathname === l.to ? 'var(--primary)' : 'var(--text-dark)',
              background: location.pathname === l.to ? 'var(--primary-light)' : 'transparent',
            }}>{l.label}</Link>
          ))}
          <Link to="/app" className="btn btn-primary" style={{ marginTop: 8, justifyContent: 'center' }}>Get the App</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
