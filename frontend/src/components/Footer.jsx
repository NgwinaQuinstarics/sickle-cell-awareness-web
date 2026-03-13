import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { FaTwitter, FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { useState } from 'react';
import { api } from '../utils/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSub = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await api.subscribe(email, '');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer style={{ background: '#080F1A', color: '#94A3B8' }}>
     
      <div className="wrap" style={{ padding: '60px 28px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.4fr', gap: 40, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff', marginBottom: 16, textDecoration: 'none' }}>
              <div style={{ width: 38, height: 38, background: 'var(--red)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🩸</div>
              <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 800, fontSize: '1.2rem' }}>SickleCare</span>
            </Link>
            <p style={{ fontSize: 14, lineHeight: 1.75, maxWidth: 300, marginBottom: 24 }}>
              Nigeria's leading sickle cell awareness and prevention platform. Educating, sensitizing, and empowering communities to break the cycle of sickle cell disease.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[[FaTwitter, '#'], [FaFacebook, '#'], [FaInstagram, '#'], [FaWhatsapp, '#'], [FaYoutube, '#']].map(([Icon, href], i) => (
                <a key={i} href={href} style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', transition: 'var(--transition)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#64748B'; }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Awareness</h4>
            {[['/about', 'What is SCD?'], ['/dangers', 'Dangers of Ignorance'], ['/prevention', 'Prevention Guide'], ['/quiz', 'Know Your Risk'], ['/living', 'Living With SCD']].map(([to, lbl]) => (
              <Link key={to} to={to} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, marginBottom: 10, color: '#64748B', transition: 'var(--transition)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
              ><FiArrowRight size={12} />{lbl}</Link>
            ))}
          </div>

          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Platform</h4>
            {[['/centers', 'Test Centers'], ['/resources', 'Resources'], ['/pledge', 'Take the Pledge'], ['/contact', 'Contact Us']].map(([to, lbl]) => (
              <Link key={to} to={to} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, marginBottom: 10, color: '#64748B', transition: 'var(--transition)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
              ><FiArrowRight size={12} />{lbl}</Link>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Stay Informed</h4>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>Get awareness updates, health tips, and SCD news delivered to your inbox.</p>
            <form onSubmit={handleSub}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address"
                style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 14, marginBottom: 10, outline: 'none' }}
                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              <button type="submit" className="btn btn-red btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Subscribe</button>
              {status === 'success' && <div style={{ fontSize: 12, color: '#4ADE80', marginTop: 6 }}>✓ Subscribed successfully!</div>}
              {status === 'error' && <div style={{ fontSize: 12, color: '#F87171', marginTop: 6 }}>Something went wrong. Try again.</div>}
            </form>
            <div style={{ marginTop: 20 }}>
              {[[FiPhone, '+237 6XXXXXXXX SCD-CARE'], [FiMail, 'hello@sicklecare.org'], [FiMapPin, 'Bamenda, Cameroon']].map(([Icon, text], i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10, fontSize: 13 }}><Icon size={13} /> {text}</div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: '#334155' }}>© 2026 SickleCare Cameroon. All rights reserved. This platform is for educational purposes and does not replace medical advice.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Use', 'Disclaimer'].map(t => (
              <Link key={t} to="#" style={{ fontSize: 13, color: '#334155', transition: 'var(--transition)' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#334155'}
              >{t}</Link>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){footer .wrap > div:first-child{grid-template-columns:1fr 1fr!important}}@media(max-width:480px){footer .wrap > div:first-child{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}
