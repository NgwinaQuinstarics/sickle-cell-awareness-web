import React from 'react';
import { Link } from 'react-router-dom';

import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
} from 'react-icons/fi';

import logo from '../assets/logo.png';

const LINKS = [
  { label: 'About SCD', to: '/about' },
  { label: 'Prevention', to: '/prevention' },
  { label: 'Living With SCD', to: '/living' },
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer style={styles.footer}>

      <div style={styles.container}>

        {/* BRAND */}
        <div style={styles.brand}>

          <Link to="/" style={styles.logoWrap}>
            <img src={logo} alt="SickleCare Logo" style={styles.logo} />
          </Link>

          <p style={styles.text}>
            Empowering individuals, families, and communities with sickle cell awareness and care.
          </p>

          <div style={styles.socials}>
            <a href="#"><FiFacebook /></a>
            <a href="#"><FiTwitter /></a>
            <a href="#"><FiInstagram /></a>
            <a href="#"><FiYoutube /></a>
          </div>

        </div>

        {/* LINKS */}
        <div>
          <h4>Quick Links</h4>
          {LINKS.map((l) => (
            <div key={l.to}>
              <Link to={l.to} style={styles.link}>{l.label}</Link>
            </div>
          ))}
        </div>

        {/* LEGAL */}
        <div>
          <h4>Legal</h4>

          <div><Link to="/privacy-policy" style={styles.link}>Privacy Policy</Link></div>
          <div><Link to="/terms-and-conditions" style={styles.link}>Terms & Conditions</Link></div>
          <div><Link to="/disclaimer" style={styles.link}>Medical Disclaimer</Link></div>

        </div>

        {/* CONTACT */}
        <div>
          <h4>Contact</h4>

          <p><FiMail /> support@sicklecare.app</p>
          <p><FiPhone /> +237 622114407</p>
          <p><FiMapPin /> Yaoundé, Cameroon</p>
        </div>

      </div>

      <div style={styles.bottom}>
        © {new Date().getFullYear()} SickleCare. All rights reserved.
      </div>

    </footer>
  );
}

/* ================= STYLES ================= */
const styles = {
  footer: {
    background: '#0f172a',
    color: '#fff',
    padding: '40px 20px',
    marginTop: '50px',
  },

  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
    maxWidth: '1100px',
    margin: '0 auto',
  },

  brand: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  logoWrap: {
    display: 'block',
  },

  logo: {
    width: '180px',   
    height: 'auto',
  },

  text: {
    fontSize: '14px',
    color: '#cbd5e1',
    lineHeight: '1.5',
  },

  socials: {
    display: 'flex',
    gap: '12px',
    marginTop: '10px',
    fontSize: '18px',
  },

  link: {
    color: '#cbd5e1',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '6px',
  },

  bottom: {
    textAlign: 'center',
    marginTop: '30px',
    fontSize: '13px',
    color: '#94a3b8',
  },
};