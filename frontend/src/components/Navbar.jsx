import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHeart } from 'react-icons/fi';
import './Navbar.css';
import logo from '../assets/logo.png';

const NAV_LINKS = [
  { label: 'Home',             to: '/'           },
  { label: 'About SCD',        to: '/about'       },
  { label: 'Prevention',       to: '/prevention'  },
  { label: 'Living With SCD',  to: '/living'      },
  { label: 'Mobile App',       to: '/app'         },
  { label: 'Resources',        to: '/resources'   },
  { label: 'Contact',          to: '/contact'     },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { pathname }            = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nb-inner container">

        <Link to="/" className="nb-logo">
          <img src={logo} alt="SickleCare Logo" className="nb-logo-img" />
        </Link>

        <nav className={`nb-nav${open ? ' open' : ''}`}>
          {NAV_LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => `nb-link${isActive ? ' active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/app" className="btn btn-primary btn-sm nb-cta">
            <FiHeart size={14} /> Get the App
          </Link>
        </nav>

        <button
          className="nb-toggle"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

      </div>
    </header>
  );
}