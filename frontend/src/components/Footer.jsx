import React from 'react';
import { Link } from 'react-router-dom';
import { MdBloodtype } from 'react-icons/md';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

const LINKS = [
  { label: 'About SCD',   to: '/about'      },
  { label: 'Prevention',  to: '/prevention' },
  { label: 'Living With SCD', to: '/living' },
  { label: 'Mobile App',  to: '/app'        },
  { label: 'Resources',   to: '/resources'  },
  { label: 'Contact',     to: '/contact'    },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#0d2d6e"/>
        </svg>
      </div>
      <div className="footer-body">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <span className="footer-logo-icon"><MdBloodtype size={22}/></span>
                <span>Sickle<em>Care</em></span>
              </Link>
              <p className="footer-tagline">
                Empowering Cameroonians with knowledge, tools and support to fight sickle cell disease.
              </p>
              <div className="footer-social">
                {[
                  { icon: <FiFacebook size={18}/>, href: '#', label: 'Facebook'  },
                  { icon: <FiTwitter  size={18}/>, href: '#', label: 'Twitter'   },
                  { icon: <FiInstagram size={18}/>, href:'#', label: 'Instagram' },
                  { icon: <FiYoutube  size={18}/>, href: '#', label: 'YouTube'   },
                ].map(s => (
                  <a key={s.label} href={s.href} className="social-btn" aria-label={s.label}>{s.icon}</a>
                ))}
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                {LINKS.map(l => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Contact Us</h4>
              <ul className="footer-contact">
                <li><FiMail size={15}/><a href="mailto:info@sicklecare.cm">info@sicklecare.cm</a></li>
                <li><FiPhone size={15}/><a href="tel:+237000000000">+237 000 000 000</a></li>
                <li><FiMapPin size={15}/><span>Yaoundé, Cameroon</span></li>
              </ul>
              <div className="footer-emergency">
                <span className="emergency-dot"/>
                <p>Emergency hotline: <strong>15</strong> (SAMU Cameroon)</p>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} SickleCare. Built for Cameroon with ❤️</p>
            <p className="footer-disclaimer">
              This platform provides educational information only — not medical advice. Always consult a qualified healthcare professional.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
