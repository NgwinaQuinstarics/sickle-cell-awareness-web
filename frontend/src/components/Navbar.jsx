import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiHeart } from 'react-icons/fi';
import './Navbar.css';

import logo from '../assets/logo.png';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About SCD', to: '/about' },
  { label: 'Prevention', to: '/prevention' },
  { label: 'Living With SCD', to: '/living' },
  { label: 'Mobile App', to: '/app' },
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">

        {/* LOGO ONLY (IMAGE BIG) */}
        <Link to="/" className="logo">
          <img src={logo} alt="SickleCare Logo" className="logo-img" />
        </Link>

        {/* NAV LINKS */}
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Link to="/app" className="cta-btn">
            <FiHeart /> Get App
          </Link>
        </nav>

        {/* MOBILE MENU */}
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>

      </div>
    </header>
  );
}