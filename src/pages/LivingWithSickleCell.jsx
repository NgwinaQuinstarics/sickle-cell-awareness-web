import Hero from '../components/Hero'
import { FiHeart, FiDroplet, FiSun, FiUsers } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const tips = [
  {
    icon: <FiDroplet size={22} />,
    color: '#1B4FD8', bg: '#EEF2FF',
    title: 'Stay Hydrated',
    tips: [
      'Drink at least 8–10 glasses of water daily',
      'Carry a water bottle everywhere you go',
      'Increase intake during hot weather or exercise',
      'Avoid alcohol and excessive caffeine',
      'Hydration prevents cell sickling and pain crises',
    ]
  },
  {
    icon: '💊',
    color: '#16A34A', bg: '#F0FDF4',
    title: 'Medication Adherence',
    tips: [
      'Take Hydroxyurea and other medications as prescribed',
      'Set daily reminders using the SickleCare app',
      'Never skip doses — consistency is critical',
      'Keep folic acid supplements as directed',
      'Always carry your medical summary when traveling',
    ]
  },
  {
    icon: <FiSun size={22} />,
    color: '#F59E0B', bg: '#FEF3C7',
    title: 'Healthy Lifestyle',
    tips: [
      'Maintain a balanced, nutritious diet',
      'Avoid extreme temperatures (very cold or hot)',
      'Get adequate sleep — 7-9 hours per night',
      'Gentle exercise like walking is beneficial',
      'Avoid high altitudes and low-oxygen environments',
    ]
  },
  {
    icon: <FiHeart size={22} />,
    color: '#EF4444', bg: '#FEF2F2',
    title: 'Emotional Wellbeing',
    tips: [
      'Connect with sickle cell support groups',
      'Practice mindfulness and stress management',
      'Talk to a counselor or therapist when needed',
      'Educate friends and family about your condition',
      'Celebrate your strength and resilience daily',
    ]
  },
]

const crisisWarnings = [
  { emoji: '🌡️', sign: 'Fever above 38°C (101°F)' },
  { emoji: '😮‍💨', sign: 'Sudden severe chest pain' },
  { emoji: '🤕', sign: 'Extreme pain that won\'t ease' },
  { emoji: '😵', sign: 'Severe headache or confusion' },
  { emoji: '😶', sign: 'Difficulty speaking or moving limbs' },
  { emoji: '💛', sign: 'Rapid worsening of jaundice' },
]

const motivations = [
  { author: 'Amara O.', quote: 'I refuse to let SCD define me. I\'ve run two marathons, built a business, and I\'m still going.', role: 'SCD Warrior, Lagos' },
  { author: 'Chidinma E.', quote: 'With proper management and an amazing support system, I live fully. SCD is part of me, not all of me.', role: 'Teacher & Advocate, Abuja' },
  { author: 'Dr. Kwame A.', quote: 'My patients inspire me daily. With awareness and early intervention, outcomes have never been better.', role: 'Hematologist, Accra' },
]

export default function LivingWithSickleCell() {
  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <Hero
        badge="💪 Living With SCD"
        title="You Can Thrive With Sickle Cell Disease"
        subtitle="With the right knowledge, support, and daily habits, people with sickle cell disease can live full, empowered, and meaningful lives."
        cta1="Download the App"
        cta1To="/app"
        cta2="Join Community"
        cta2To="/resources"
      />

      {/* Tips Grid */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 52 }}>
            <div className="section-label">Daily Management</div>
            <h2 className="section-title">Managing Your Health Every Day</h2>
            <p className="section-subtitle">Small, consistent actions create big improvements in quality of life.</p>
          </div>
          <div className="grid-2">
            {tips.map(({ icon, color, bg, title, tips: tipList }) => (
              <div key={title} className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontSize: 22 }}>{icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.15rem' }}>{title}</h3>
                </div>
                {tipList.map(t => (
                  <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, marginTop: 7, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.6 }}>{t}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crisis Warning Signs */}
      <section className="section" style={{ background: '#FEF2F2' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 60 }}>
            <div>
              <div className="section-label" style={{ background: '#FEE2E2', color: '#EF4444' }}>⚠️ Crisis Alert</div>
              <h2 className="section-title">Know the Warning Signs</h2>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: 28 }}>
                A sickle cell crisis requires immediate medical attention. Don't ignore these signs — getting help quickly can prevent serious complications.
              </p>
              <div style={{ background: '#fff', borderRadius: 14, padding: 20, border: '1px solid #FECACA', marginBottom: 20 }}>
                <div style={{ fontWeight: 600, color: '#EF4444', fontSize: 14, marginBottom: 12 }}>🚨 If you experience these — seek emergency care immediately:</div>
                {crisisWarnings.map(({ emoji, sign }) => (
                  <div key={sign} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #FEE2E2' }}>
                    <span style={{ fontSize: 18 }}>{emoji}</span>
                    <span style={{ fontSize: 14, color: 'var(--text-mid)' }}>{sign}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.3rem', marginBottom: 16 }}>Crisis Prevention Tips</h3>
              {[
                ['Stay warm', 'Cold can trigger sickling. Dress warmly in cool weather.'],
                ['Avoid stress', 'Both physical and emotional stress can trigger a crisis.'],
                ['Rest adequately', 'Your body needs recovery time. Don\'t overexert.'],
                ['Monitor your body', 'Know your baseline and notice any changes early.'],
                ['Prepare an emergency kit', 'Keep medications, medical ID, and emergency contacts ready.'],
              ].map(([title, desc]) => (
                <div key={title} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', marginTop: 6, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-light)' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <div className="section-label"><FiUsers size={14} /> Community Voices</div>
            <h2 className="section-title">Warriors Among Us</h2>
          </div>
          <div className="grid-3">
            {motivations.map(({ author, quote, role }) => (
              <div key={author} className="card" style={{ background: 'linear-gradient(135deg, var(--primary-light), #F0FDF4)' }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>"</div>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-mid)', marginBottom: 20, fontStyle: 'italic' }}>{quote}</p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{author}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-light)' }}>{role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App CTA */}
      <section className="section-sm" style={{ background: 'linear-gradient(135deg, var(--primary), #3B82F6)', textAlign: 'center', color: '#fff' }}>
        <div className="container" style={{ maxWidth: 540 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, marginBottom: 16 }}>Track Your Health Daily</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 28, lineHeight: 1.7 }}>
            Use the SickleCare app to monitor medications, hydration, symptoms, and much more — all in one place.
          </p>
          <Link to="/app" className="btn btn-white">Explore the App</Link>
        </div>
      </section>
    </div>
  )
}
