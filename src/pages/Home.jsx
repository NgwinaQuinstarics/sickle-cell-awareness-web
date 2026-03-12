import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiHeart, FiDroplet, FiShield, FiUsers, FiBook, FiSmartphone } from 'react-icons/fi'
import { FaGlobeAfrica, FaBaby, FaHospital, FaDna } from 'react-icons/fa'
import FeatureCard from '../components/FeatureCard'

const stats = [
  { icon: <FaGlobeAfrica />, value: '300M+', label: 'Carriers worldwide', color: '#1B4FD8' },
  { icon: <FaBaby />, value: '500K+', label: 'Babies born with SCD yearly', color: '#16A34A' },
  { icon: <FaHospital />, value: '75%', label: 'Occur in sub-Saharan Africa', color: '#F59E0B' },
  { icon: <FaDna />, value: '1 in 4', label: 'Nigerians carry the gene', color: '#EF4444' },
]

const features = [
  { icon: <FiShield />, title: 'Disease Education', description: 'Clear, medically-accurate information about sickle cell disease, its causes, symptoms, and management.' },
  { icon: <FiDroplet />, title: 'Genotype Testing Info', description: 'Learn why knowing your genotype is essential before starting a family. Understand AA, AS, and SS types.' },
  { icon: <FiHeart />, title: 'Wellness Support', description: 'Practical tips and emotional support for those living with sickle cell disease to lead fuller lives.' },
  { icon: <FiSmartphone />, title: 'Mobile App', description: 'Track medications, hydration, and symptoms with our dedicated SickleCare mobile application.' },
  { icon: <FiUsers />, title: 'Community', description: 'Connect with others, share experiences, and find strength in a supportive network of warriors and allies.' },
  { icon: <FiBook />, title: 'Resources Library', description: 'Access articles, FAQs, health tips, and crisis prevention guides curated by healthcare professionals.' },
]

const appFeatures = [
  'Medication reminders & tracking',
  'Daily hydration monitoring',
  'Symptom logging & patterns',
  'Crisis prevention guidance',
  'Emergency contact access',
  'Health journal & reports',
]

export default function Home() {
  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Hero */}
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #EEF2FF 0%, #F0FDF4 60%, #FFF7ED 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(27,79,216,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '2%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 60, alignItems: 'center', padding: '80px 24px' }}>
          <div>
            <div className="section-label" style={{ marginBottom: 24 }}>
              🩸 Sickle Cell Awareness Platform
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 5vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: 24,
              color: 'var(--text-dark)',
            }}>
              Live Stronger,<br />
              <span style={{ color: 'var(--primary)' }}>Know More,</span><br />
              <span style={{ color: 'var(--secondary)' }}>Thrive Together</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', maxWidth: 500, lineHeight: 1.8, marginBottom: 36 }}>
              SickleCare provides education, awareness, and tools to help individuals and communities understand, prevent, and manage sickle cell disease across Africa and beyond.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
              <Link to="/about" className="btn btn-primary">Learn About SCD <FiArrowRight /></Link>
              <Link to="/app" className="btn btn-outline">Explore the App</Link>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              {[['10K+', 'People Educated'], ['50+', 'Partner Hospitals'], ['4.8★', 'App Rating']].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>{val}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-light)', fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual card stack */}
          <div style={{ position: 'relative', height: 420 }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 280, background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.12)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>💊</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Medication Reminder</div>
                  <div style={{ fontSize: 12, color: 'var(--text-light)' }}>8:00 AM — Hydroxyurea</div>
                </div>
              </div>
              <div style={{ background: 'var(--primary-light)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: 'var(--primary)', fontWeight: 500 }}>
                ✓ Taken on time today!
              </div>
            </div>

            <div style={{ position: 'absolute', top: 140, left: 0, width: 260, background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.1)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--text-mid)' }}>💧 Hydration Today</div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} style={{ flex: 1, height: 36, borderRadius: 8, background: i <= 4 ? 'var(--primary)' : 'var(--border)' }} />
                ))}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>4 of 8 glasses — Keep going! 🎯</div>
            </div>

            <div style={{ position: 'absolute', bottom: 0, right: 20, width: 240, background: 'linear-gradient(135deg, var(--secondary), #15803d)', borderRadius: 20, padding: 24, color: '#fff', boxShadow: '0 20px 60px rgba(22,163,74,0.25)' }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, opacity: 0.9 }}>❤️ Wellness Score</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>87<span style={{ fontSize: '1rem', fontWeight: 400 }}>/100</span></div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>Excellent — Crisis risk: Low</div>
            </div>
          </div>
        </div>

        <style>{`@media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Stats */}
      <section style={{ background: '#fff', padding: '64px 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid-4">
            {stats.map(({ icon, value, label, color }) => (
              <div key={label} style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: 32, color, marginBottom: 12 }}>{icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 14, color: 'var(--text-light)', marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 60 }}>
            <div className="section-label">What We Offer</div>
            <h2 className="section-title">Everything You Need to <em style={{ fontStyle: 'italic' }}>Understand & Thrive</em></h2>
            <p className="section-subtitle">SickleCare is your all-in-one platform for sickle cell education, prevention, and daily health management.</p>
          </div>
          <div className="grid-3">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f}
                color={i % 3 === 0 ? 'var(--primary)' : i % 3 === 1 ? 'var(--secondary)' : 'var(--accent)'}
                bg={i % 3 === 0 ? 'var(--primary-light)' : i % 3 === 1 ? 'var(--secondary-light)' : 'var(--accent-warm)'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div className="section-label" style={{ background: 'rgba(255,255,255,0.1)', color: '#93C5FD' }}>📱 SickleCare App</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 600, color: '#fff', marginBottom: 16, lineHeight: 1.15 }}>
                Your Health Companion, <em style={{ fontStyle: 'italic', color: '#86EFAC' }}>Always On</em>
              </h2>
              <p style={{ color: '#94A3B8', lineHeight: 1.8, marginBottom: 32, fontSize: '1.05rem' }}>
                Track your medications, monitor hydration, log symptoms, and receive personalized guidance to prevent crises and stay healthy every day.
              </p>
              <div style={{ marginBottom: 36 }}>
                {appFeatures.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FiCheck size={12} color="#fff" />
                    </div>
                    <span style={{ color: '#CBD5E1', fontSize: 15 }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/app" className="btn btn-white">Explore All Features <FiArrowRight /></Link>
            </div>

            {/* Mockup */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
              {[
                { bg: 'linear-gradient(160deg, #1B4FD8, #3B82F6)', emoji: '💊', title: 'Meds', value: '3 taken today' },
                { bg: 'linear-gradient(160deg, #16A34A, #4ADE80)', emoji: '💧', title: 'Hydration', value: '6/8 glasses' },
              ].map(({ bg, emoji, title, value }, i) => (
                <div key={i} style={{
                  width: 160,
                  background: bg,
                  borderRadius: 28,
                  padding: '28px 20px',
                  color: '#fff',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                  marginTop: i === 1 ? 40 : 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}>
                  <div style={{ fontSize: 32 }}>{emoji}</div>
                  <div>
                    <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>{title}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600 }}>{value}</div>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 4 }}>
                    <div style={{ width: i === 0 ? '80%' : '65%', height: '100%', background: '#fff', borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #3B82F6 100%)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🩸</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#fff', fontWeight: 600, marginBottom: 16 }}>
            Together We Can Make a Difference
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: 36, lineHeight: 1.7 }}>
            Whether you're living with sickle cell, caring for someone, or simply want to spread awareness — you have a role to play.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/prevention" className="btn btn-white">Get Tested Today</Link>
            <Link to="/resources" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '2px solid rgba(255,255,255,0.4)' }}>View Resources</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
