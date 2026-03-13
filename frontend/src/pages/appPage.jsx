// src/pages/AppPage.jsx
import { FiBell, FiDroplet, FiActivity, FiShield, FiUsers, FiBook } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const appFeatures = [
  { icon: <FiBell />, color: '#1B4FD8', bg: '#EEF2FF', title: 'Medication Reminders', desc: 'Never miss a dose with personalized reminders for all your medications.' },
  { icon: <FiDroplet />, color: '#16A34A', bg: '#F0FDF4', title: 'Hydration Tracking', desc: 'Log and track water intake to stay on target every day.' },
  { icon: <FiActivity />, color: '#F59E0B', bg: '#FEF3C7', title: 'Symptom Monitoring', desc: 'Track daily symptoms and health notes to spot patterns and triggers.' },
  { icon: <FiShield />, color: '#EF4444', bg: '#FEF2F2', title: 'Crisis Prevention', desc: 'Get alerts and guidance to help avoid crisis situations.' },
  { icon: <FiUsers />, color: '#8B5CF6', bg: '#F5F3FF', title: 'Caregiver Connect', desc: 'Share health data with family or caregivers for support.' },
  { icon: <FiBook />, color: '#0891B2', bg: '#ECFEFF', title: 'Health Education', desc: 'Access curated educational content about SCD and healthy living.' },
];

export default function AppPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)',
          color: '#fff',
          padding: 'calc(var(--nav-h) + 60px) 0 80px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: 16 }}>
          Your Personal <span style={{ color: '#93C5FD' }}>Health Companion</span> for SCD
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#94A3B8', maxWidth: 600, margin: '0 auto 24px', lineHeight: 1.6 }}>
          SickleCare is the dedicated mobile app built for sickle cell warriors. Track your health, stay on top of medications, and receive personalized guidance — all in one beautiful app.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          {/* App Store Button */}
          <a
            href="https://apps.apple.com/app/idYOUR_APP_ID" // replace with your actual App Store link
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button style={{
              background: '#fff',
              color: '#1B4FD8',
              fontWeight: 600,
              padding: '10px 24px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              opacity: 1, // fully visible now
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              🍎 App Store
            </button>
          </a>

          {/* Google Play Button */}
          <a
            href="https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME" // replace with your Play Store link
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button style={{
              background: '#1B4FD8',
              color: '#fff',
              fontWeight: 600,
              padding: '10px 24px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              opacity: 1,
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              🤖 Google Play
            </button>
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
          {/*[['10K+', 'Downloads'], ['4.8', 'App Rating'], ['95%', 'User Satisfaction']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{val}</div>
              <div style={{ fontSize: 12, color: '#64748B' }}>{label}</div>
            </div>
          ))*/}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '60px 0', background: '#f9fafb' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>App Features</h2>
          <p style={{ color: '#64748B' }}>Designed with input from patients, caregivers, and healthcare professionals.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24,
          maxWidth: 1000,
          margin: '0 auto'
        }}>
          {appFeatures.map(({ icon, color, bg, title, desc }) => (
            <div key={title} style={{
              background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
              textAlign: 'center'
            }}>
              <div style={{
                width: 50, height: 50, margin: '0 auto 16px',
                borderRadius: 12, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
              }}>{icon}</div>
              <h3 style={{ fontWeight: 600, marginBottom: 8 }}>{title}</h3>
              <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ padding: '40px 0', background: '#1B4FD8', color: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: 16 }}>Be First to Download</h2>
        <p style={{ marginBottom: 24, lineHeight: 1.6, maxWidth: 500, margin: '0 auto 24px' }}>
          The app is launching soon. Leave your email and we'll notify you the moment it's available.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <input type="email" placeholder="your@email.com" style={{
            padding: '10px 16px', borderRadius: 50, border: 'none', outline: 'none', minWidth: 220
          }} />
          <button style={{
            background: '#fff', color: '#1B4FD8', fontWeight: 600, padding: '10px 24px', borderRadius: 50, border: 'none', cursor: 'pointer'
          }}>
            Notify Me
          </button>
        </div>
      </section>
    </div>
  )
}