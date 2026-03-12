import { FiCheck, FiBell, FiDroplet, FiActivity, FiShield, FiUsers, FiBook, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const appFeatures = [
  { icon: <FiBell />, color: '#1B4FD8', bg: '#EEF2FF', title: 'Medication Reminders', desc: 'Never miss a dose. Set customized reminders for all your medications with detailed instructions.' },
  { icon: <FiDroplet />, color: '#16A34A', bg: '#F0FDF4', title: 'Hydration Tracking', desc: 'Log and track your water intake throughout the day. Visual progress helps you stay on target.' },
  { icon: <FiActivity />, color: '#F59E0B', bg: '#FEF3C7', title: 'Symptom Monitoring', desc: 'Log daily symptoms, pain levels, and health notes. Identify patterns and triggers over time.' },
  { icon: <FiShield />, color: '#EF4444', bg: '#FEF2F2', title: 'Crisis Prevention', desc: 'Receive personalized alerts and guidance to help you avoid crisis triggers and act early.' },
  { icon: <FiUsers />, color: '#8B5CF6', bg: '#F5F3FF', title: 'Caregiver Connect', desc: 'Share your health data with family members or caregivers so they can support you better.' },
  { icon: <FiBook />, color: '#0891B2', bg: '#ECFEFF', title: 'Health Education', desc: 'Access curated educational content about SCD, medications, and healthy living strategies.' },
]

const screens = [
  { title: 'Dashboard', emoji: '📊', color: 'linear-gradient(160deg, #1B4FD8, #3B82F6)', items: ['Wellness score: 87/100', 'Meds: 3/3 taken', 'Hydration: 6/8 glasses', 'Pain level: Low'] },
  { title: 'Medications', emoji: '💊', color: 'linear-gradient(160deg, #16A34A, #4ADE80)', items: ['Hydroxyurea — 8:00 AM ✓', 'Folic Acid — 8:00 AM ✓', 'Penicillin V — 8:00 PM ○', 'Next dose in 3h 20m'] },
  { title: 'Hydration', emoji: '💧', color: 'linear-gradient(160deg, #0891B2, #38BDF8)', items: ['Today: 6 of 8 glasses', 'Streak: 12 days 🔥', '75% of daily goal', 'Add glass +'] },
]

export default function AppPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)',
        padding: 'calc(var(--nav-h) + 60px) 0 80px',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div className="section-label" style={{ background: 'rgba(255,255,255,0.1)', color: '#93C5FD', marginBottom: 24 }}>📱 SickleCare Mobile App</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 3.4rem)', fontWeight: 700, lineHeight: 1.05, marginBottom: 20, color: '#fff' }}>
                Your Personal<br />
                <span style={{ color: '#93C5FD' }}>Health Companion</span><br />
                for SCD
              </h1>
              <p style={{ color: '#94A3B8', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: 32 }}>
                SickleCare is the dedicated mobile app built for sickle cell warriors. Track your health, stay on top of medications, and receive personalized guidance — all in one beautiful app.
              </p>
              <div style={{ display: 'flex', gap: 14, marginBottom: 36, flexWrap: 'wrap' }}>
                <button className="btn btn-white" style={{ opacity: 0.7, cursor: 'not-allowed' }}>
                  🍎 App Store — Coming Soon
                </button>
                <button className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '2px solid rgba(255,255,255,0.2)', opacity: 0.7, cursor: 'not-allowed' }}>
                  🤖 Google Play — Coming Soon
                </button>
              </div>
              <div style={{ display: 'flex', gap: 32 }}>
                {[['10K+', 'Downloads'], ['4.8', 'App Rating'], ['95%', 'User Satisfaction']].map(([val, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, color: '#fff' }}>{val}</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* App Screens Preview */}
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'flex-start' }}>
              {screens.map(({ title, emoji, color, items }, i) => (
                <div key={title} style={{
                  width: 160,
                  background: color,
                  borderRadius: 28,
                  padding: '24px 18px',
                  color: '#fff',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                  marginTop: i === 1 ? 40 : i === 2 ? 80 : 0,
                  flexShrink: 0,
                }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.8, marginBottom: 12 }}>{title}</div>
                  {items.map(item => (
                    <div key={item} style={{ fontSize: 11, lineHeight: 1.5, opacity: 0.9, marginBottom: 6, padding: '6px 8px', background: 'rgba(255,255,255,0.12)', borderRadius: 8 }}>{item}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 52 }}>
            <div className="section-label">✨ App Features</div>
            <h2 className="section-title">Everything You Need, Right in Your Pocket</h2>
            <p className="section-subtitle">Designed with input from sickle cell patients, caregivers, and healthcare professionals.</p>
          </div>
          <div className="grid-3">
            {appFeatures.map(({ icon, color, bg, title, desc }) => (
              <div key={title} className="card">
                <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.05rem', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" style={{ background: 'var(--primary-light)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <div className="section-label">🚀 Getting Started</div>
            <h2 className="section-title">Up and Running in 3 Steps</h2>
          </div>
          <div className="grid-3">
            {[
              { num: '1', title: 'Download the App', desc: 'Get SickleCare from the App Store or Google Play (launching soon). It\'s completely free.' },
              { num: '2', title: 'Set Up Your Profile', desc: 'Enter your medications, health goals, and preferences. Takes less than 5 minutes.' },
              { num: '3', title: 'Start Tracking Daily', desc: 'Log your hydration, medications, and symptoms each day for personalized insights.' },
            ].map(({ num, title, desc }) => (
              <div key={num} className="card" style={{ textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, margin: '0 auto 16px' }}>{num}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notify me */}
      <section className="section-sm" style={{ background: 'linear-gradient(135deg, var(--primary), #3B82F6)', textAlign: 'center', color: '#fff' }}>
        <div className="container" style={{ maxWidth: 560 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, marginBottom: 16 }}>Be First to Download</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 28, lineHeight: 1.7 }}>
            The app is launching soon. Leave your email and we'll notify you the moment it's available.
          </p>
          <div style={{ display: 'flex', gap: 10, maxWidth: 420, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input type="email" placeholder="your@email.com" style={{ flex: 1, minWidth: 220, padding: '14px 20px', borderRadius: 100, border: 'none', fontSize: 15, outline: 'none' }} />
            <button className="btn" style={{ background: '#fff', color: 'var(--primary)', fontWeight: 600, padding: '14px 24px' }}>Notify Me</button>
          </div>
        </div>
      </section>
    </div>
  )
}
