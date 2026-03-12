import Hero from '../components/Hero'
import { FiAlertCircle, FiActivity, FiInfo } from 'react-icons/fi'
import { FaDna } from 'react-icons/fa'

const symptoms = [
  { emoji: '😣', title: 'Severe Pain Crises', desc: 'Sudden episodes of intense pain in the chest, joints, abdomen, and back.' },
  { emoji: '😴', title: 'Fatigue & Anemia', desc: 'Chronic shortage of red blood cells causes tiredness and weakness.' },
  { emoji: '🤒', title: 'Frequent Infections', desc: 'Damaged spleen reduces the body\'s ability to fight infections.' },
  { emoji: '🦴', title: 'Swelling & Bone Pain', desc: 'Swelling of hands and feet, along with aching bones.' },
  { emoji: '👀', title: 'Vision Problems', desc: 'Blocked blood vessels in the eyes can cause retinal damage.' },
  { emoji: '💛', title: 'Jaundice', desc: 'Yellowing of the skin and eyes due to rapid red blood cell breakdown.' },
]

const genotypes = [
  { type: 'AA', label: 'Normal', color: '#16A34A', bg: '#F0FDF4', desc: 'No sickle cell gene. Healthy red blood cells.' },
  { type: 'AS', label: 'Carrier (Trait)', color: '#F59E0B', bg: '#FEF3C7', desc: 'Carries one sickle cell gene. Usually healthy but can pass gene to children.' },
  { type: 'SS', label: 'Sickle Cell Disease', color: '#EF4444', bg: '#FEF2F2', desc: 'Has two sickle cell genes. Will have sickle cell disease.' },
  { type: 'AC', label: 'Carrier (HbC)', color: '#8B5CF6', bg: '#F5F3FF', desc: 'Carries HbC gene variant. Usually mild symptoms.' },
]

export default function About() {
  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <Hero
        badge="📖 Education"
        title="Understanding Sickle Cell Disease"
        subtitle="Knowledge is the first step toward better health outcomes. Learn what sickle cell disease is, how it works, and why awareness matters."
        cta1="Check Prevention Tips"
        cta1To="/prevention"
        cta2="View Resources"
        cta2To="/resources"
      />

      {/* What is SCD */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 60 }}>
            <div>
              <div className="section-label"><FiInfo size={14} /> What Is SCD?</div>
              <h2 className="section-title">What Is Sickle Cell Disease?</h2>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: 16 }}>
                Sickle cell disease (SCD) is an inherited blood disorder where red blood cells become abnormally shaped — curved like a sickle or crescent moon instead of round and flexible.
              </p>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: 16 }}>
                Normal red blood cells move easily through blood vessels, carrying oxygen throughout the body. Sickle-shaped cells are rigid and sticky — they can get stuck in small blood vessels, blocking blood flow and oxygen delivery.
              </p>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8 }}>
                This causes pain crises, organ damage, and a host of complications. Sickle cells also break down faster than normal cells, leading to chronic anemia.
              </p>
            </div>

            {/* Visual */}
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', padding: 28, background: '#fff', borderRadius: 20, border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ fontSize: 64, marginBottom: 12 }}>⭕</div>
                <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--secondary)', marginBottom: 4 }}>Normal RBC</div>
                <div style={{ fontSize: 13, color: 'var(--text-light)' }}>Round & flexible<br />Carries oxygen well</div>
              </div>
              <div style={{ textAlign: 'center', padding: 28, background: '#FEF2F2', borderRadius: 20, border: '1px solid #FECACA', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ fontSize: 64, marginBottom: 12 }}>🌙</div>
                <div style={{ fontWeight: 600, fontSize: 15, color: '#EF4444', marginBottom: 4 }}>Sickle Cell</div>
                <div style={{ fontSize: 13, color: 'var(--text-light)' }}>Crescent-shaped<br />Blocks blood flow</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Genetics */}
      <section className="section" style={{ background: 'var(--primary-light)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <div className="section-label"><FaDna size={14} /> Genetics</div>
            <h2 className="section-title">How Is It Inherited?</h2>
            <p className="section-subtitle">SCD is passed from parents to children through genes. Understanding genotypes helps prevent transmission.</p>
          </div>

          <div className="grid-4">
            {genotypes.map(({ type, label, color, bg, desc }) => (
              <div key={type} style={{ background: bg, border: `2px solid ${color}30`, borderRadius: 16, padding: 24, textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color, marginBottom: 8 }}>{type}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color, background: `${color}20`, padding: '4px 12px', borderRadius: 100, display: 'inline-block', marginBottom: 12 }}>{label}</div>
                <p style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginTop: 32, border: '1px solid var(--border)', maxWidth: 600, margin: '32px auto 0' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: 12, fontSize: '1.1rem' }}>🧬 Parent Combination Risk</h3>
            <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7 }}>
              When both parents are <strong>AS carriers</strong>, each pregnancy has a 25% chance of producing an SS child, 50% chance of AS carrier, and 25% chance of AA. This is why genotype testing before marriage is critical.
            </p>
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <div className="section-label"><FiAlertCircle size={14} /> Symptoms</div>
            <h2 className="section-title">Common Signs & Symptoms</h2>
            <p className="section-subtitle">Symptoms vary by person and can range from mild to severe. Early recognition is key.</p>
          </div>
          <div className="grid-3">
            {symptoms.map(({ emoji, title, desc }) => (
              <div key={title} className="card">
                <div style={{ fontSize: 36, marginBottom: 12 }}>{emoji}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Awareness Matters */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #0F172A, #1E3A5F)', color: '#fff' }}>
        <div className="container" style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label" style={{ background: 'rgba(255,255,255,0.1)', color: '#93C5FD', justifyContent: 'center' }}><FiActivity size={14} /> Why It Matters</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 600, marginBottom: 20, lineHeight: 1.15 }}>
            Awareness Saves Lives
          </h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: 20 }}>
            Millions of people living with sickle cell disease go undiagnosed or lack access to proper care. Education and awareness are powerful tools — they enable earlier diagnosis, better management, and informed family planning decisions.
          </p>
          <p style={{ color: '#94A3B8', lineHeight: 1.8, fontSize: '1.05rem' }}>
            In many parts of Africa, children with SCD die before age 5 from preventable complications. With awareness, screening, and proper care, life expectancy and quality of life can improve dramatically.
          </p>
        </div>
      </section>
    </div>
  )
}
