import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiAlertTriangle } from 'react-icons/fi';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About SCD' },
  { to: '/dangers', label: '⚠️ Dangers' },
  { to: '/prevention', label: 'Prevention' },
  { to: '/quiz', label: 'Know Your Risk' },
  { to: '/centers', label: 'Test Centers' },
  { to: '/living', label: 'Living With SCD' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => setOpen(false), [loc]);

  const active = (to) => loc.pathname === to;

  return (
    <>
      {/* Alert Banner */}
      <div
        style={{
          background: 'var(--red)',
          color: '#fff',
          textAlign: 'center',
          padding: '9px 16px',
          fontSize: 13,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <FiAlertTriangle size={14} />
        <span>
          1 in 4 Cameroonians carries the sickle cell gene —{' '}
          <strong>Do you know your genotype?</strong>
        </span>
        <Link
          to="/centers"
          style={{
            color: '#fff',
            textDecoration: 'underline',
            marginLeft: 6,
            fontWeight: 700,
          }}
        >
          Get Tested Now →
        </Link>
      </div>

      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
          transition: 'var(--transition)',
        }}
      >
        <div
          className="wrap"
          style={{ display: 'flex', alignItems: 'center', height: 'var(--nav-h)' }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginRight: 'auto',
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                background: 'var(--red)',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              🩸
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--ff-display)',
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  color: 'var(--ink)',
                }}
              >
                SickleCare
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: 'var(--ink-muted)',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Awareness Platform
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  padding: '7px 11px',
                  borderRadius: 8,
                  fontSize: 13.5,
                  fontWeight: active(l.to) ? 700 : 500,
                  color: active(l.to) ? 'var(--red)' : 'var(--ink-mid)',
                  background: active(l.to) ? 'var(--red-light)' : 'transparent',
                  whiteSpace: 'nowrap',
                }}
              >
                {l.label}
              </Link>
            ))}

            {/* Get App Button */}
            <Link to="/app" className="btn btn-outline btn-sm">
              Get the App 📱
            </Link>
            {/* Pledge Button */}
            <Link to="/pledge" className="btn btn-red btn-sm" style={{ marginLeft: 6 }}>
              Take the Pledge 🤝
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: '1.5px solid var(--border)',
              borderRadius: 7,
              padding: 7,
              display: 'none',
              color: 'var(--ink)',
            }}
          >
            {open ? <FiX size={15} /> : <FiMenu size={15} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {open && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#fff',
              borderBottom: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
              padding: '12px 18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  padding: '11px 14px',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: active(l.to) ? 700 : 500,
                  color: active(l.to) ? 'var(--red)' : 'var(--ink-mid)',
                  background: active(l.to) ? 'var(--red-light)' : 'transparent',
                }}
              >
                {l.label}
              </Link>
            ))}

            <Link to="/app" className="btn btn-outline" style={{ marginTop: 7, justifyContent: 'center' }}>
              Get the App 📱
            </Link>
            
            <Link to="/pledge" className="btn btn-red" style={{ marginTop: 5, justifyContent: 'center' }}>
              Take the Pledge 🤝
            </Link>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}