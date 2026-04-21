import { useState, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiDroplet, FiChevronDown, FiLogOut, FiSettings, FiGrid } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useScrolled, useDisclosure, useOutsideClick } from '../../hooks/index.js';

const LINKS = [
  { to: '/',           label: 'Home',         end: true },
  { to: '/about',      label: 'About SCD' },
  { to: '/dangers',    label: 'Dangers' },
  { to: '/prevention', label: 'Prevention' },
  { to: '/centres',    label: 'Test Centres' },
  { to: '/living',     label: 'Living with SCD' },
  { to: '/resources',  label: 'Resources' },
  { to: '/app',        label: 'Get App' },
];

function UserMenu({ user, isAdmin, logout }) {
  const { isOpen, open, close, toggle } = useDisclosure();
  const ref = useRef(null);
  useOutsideClick(ref, close);
  return (
    <div ref={ref} className="relative">
      <button onClick={toggle}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700">
        <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center">
          {user.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <span className="hidden sm:block">{user.name?.split(' ')[0]}</span>
        <FiChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-50 animate-in">
          <div className="px-4 py-2 border-b border-slate-100 mb-1">
            <p className="text-xs text-slate-400">Signed in as</p>
            <p className="text-sm font-semibold text-slate-800 truncate">{user.email}</p>
          </div>
          {isAdmin && (
            <Link to="/admin" onClick={close}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors">
              <FiSettings size={14} /> Admin Panel
            </Link>
          )}
          <Link to="/dashboard" onClick={close}
            className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors">
            <FiGrid size={14} /> Dashboard
          </Link>
          <div className="border-t border-slate-100 mt-1 pt-1">
            <button onClick={() => { logout(); close(); }}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
              <FiLogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { isOpen, toggle, close } = useDisclosure();
  const scrolled = useScrolled();
  const { isLoggedIn, user, logout, isAdmin } = useAuth();

  return (
    <>
      {/* Alert bar */}
      <div className="bg-red-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium">
        1 in 4 Cameroonians carries the sickle cell gene —{' '}
        <Link to="/centres" className="underline font-bold hover:text-red-100 transition-colors">
          Get Tested Free →
        </Link>
      </div>

      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${scrolled ? 'shadow-sm' : ''} border-b border-slate-100`}>
        <div className="page-container h-16 flex items-center gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 mr-auto lg:mr-0">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <FiDroplet className="text-white" size={16} />
            </div>
            <span className="font-bold text-slate-900 text-base" style={{fontFamily:'Sora, sans-serif'}}>
              SickleCare
              <span className="hidden sm:inline text-slate-400 font-normal text-sm ml-1">Cameroon</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5 mx-auto">
            {LINKS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end}
                className={({ isActive }) =>
                  `text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'text-red-600 bg-red-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >{label}</NavLink>
            ))}
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-2 ml-auto">
            <Link to="/quiz" className="btn-outline btn-sm ml-1">Risk Quiz</Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={toggle} className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 animate-in">
            <div className="flex flex-col gap-0.5 mb-4">
              {LINKS.map(({ to, label, end }) => (
                <NavLink key={to} to={to} end={end} onClick={close}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? 'text-red-600 bg-red-50' : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                >{label}</NavLink>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
             
              <Link to="/quiz" onClick={close} className="btn-outline btn-md justify-center">Risk Quiz</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
