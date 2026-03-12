import { Link } from 'react-router-dom'
import { FaHeartbeat, FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer style={{ background: '#0F172A', color: '#CBD5E1', paddingTop: 64 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, paddingBottom: 48, borderBottom: '1px solid #1E293B' }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.3rem', marginBottom: 16 }}>
              <span style={{ background: 'var(--primary)', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FaHeartbeat color="#fff" size={16} />
              </span>
              SickleCare
            </Link>
            <p style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 280, marginBottom: 24 }}>
              Empowering individuals and communities with knowledge, tools, and support to combat sickle cell disease across Africa and the world.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[FaTwitter, FaFacebook, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: 8, background: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1E293B'; e.currentTarget.style.color = '#94A3B8' }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: 16, fontSize: 15 }}>Learn</h4>
            {[['/', 'Home'], ['/about', 'About SCD'], ['/prevention', 'Prevention'], ['/living', 'Living With SCD']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', fontSize: 14, marginBottom: 10, color: '#94A3B8', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#94A3B8'}
              >{label}</Link>
            ))}
          </div>

          <div>
            <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: 16, fontSize: 15 }}>Platform</h4>
            {[['/app', 'Mobile App'], ['/resources', 'Resources'], ['/contact', 'Contact Us']].map(([to, label]) => (
              <Link key={to} to={to} style={{ display: 'block', fontSize: 14, marginBottom: 10, color: '#94A3B8', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#94A3B8'}
              >{label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: 16, fontSize: 15 }}>Contact</h4>
            {[
              [FiMail, 'hello@sicklecare.org'],
              [FiPhone, '+1 (800) SCD-CARE'],
              [FiMapPin, 'Lagos, Nigeria'],
            ].map(([Icon, text], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, fontSize: 14, color: '#94A3B8' }}>
                <Icon size={14} style={{ flexShrink: 0 }} /> {text}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: '#475569' }}>© 2025 SickleCare. All rights reserved. Built with ❤️ for sickle cell warriors.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map(t => (
              <a key={t} href="#" style={{ fontSize: 13, color: '#475569', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#475569'}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer .container > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          footer .container > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
