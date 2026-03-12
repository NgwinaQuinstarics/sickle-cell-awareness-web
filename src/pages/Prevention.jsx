import Hero from '../components/Hero'
import { FiCheckCircle, FiMapPin, FiAlertTriangle } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const compatibilityTable = [
  { p1: 'AA', p2: 'AA', result: '100% AA — Safe', risk: 'none', note: 'All children will be AA. No risk.' },
  { p1: 'AA', p2: 'AS', result: '50% AA, 50% AS', risk: 'low', note: 'No SS children. Some carriers.' },
  { p1: 'AS', p2: 'AS', result: '25% SS risk', risk: 'high', note: '1 in 4 chance of SCD child.' },
  { p1: 'SS', p2: 'AA', result: '100% AS carriers', risk: 'medium', note: 'All children will carry the gene.' },
  { p1: 'AS', p2: 'SS', result: '50% SS risk', risk: 'critical', note: 'Half of children may have SCD.' },
  { p1: 'SS', p2: 'SS', result: '100% SS', risk: 'critical', note: 'All children will have SCD.' },
]

const riskColors = { none: '#16A34A', low: '#65A30D', medium: '#F59E0B', high: '#EF4444', critical: '#B91C1C' }
const riskBg = { none: '#F0FDF4', low: '#F7FEE7', medium: '#FEF3C7', high: '#FEF2F2', critical: '#FFF1F2' }

const testSteps = [
  { num: '01', title: 'Find a Testing Center', desc: 'Visit a hospital, clinic, or community health center near you. Many offer free or low-cost genotype testing.' },
  { num: '02', title: 'Simple Blood Sample', desc: 'A small blood sample is taken. The test is quick, painless, and results are typically ready within 24-48 hours.' },
  { num: '03', title: 'Understand Your Result', desc: 'You\'ll receive your genotype: AA, AS, SS, AC, or SC. A healthcare provider can help you understand what it means.' },
  { num: '04', title: 'Share & Plan Together', desc: 'Discuss results with your partner before marriage and family planning. Knowledge empowers better decisions.' },
]

export default function Prevention() {
  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <Hero
        badge="🛡️ Prevention"
        title="Prevention Starts With Knowing Your Genotype"
        subtitle="Genotype testing is a simple, life-changing step. Understanding your genetic status helps you make informed decisions for yourself and your future family."
        cta1="Find Testing Centers"
        cta1To="/resources"
        cta2="Learn About SCD"
        cta2To="/about"
      />

      {/* Why Testing */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: 60 }}>
            <div>
              <div className="section-label">🧬 Why Test?</div>
              <h2 className="section-title">Why Genotype Testing Matters</h2>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: 20 }}>
                Sickle cell disease is completely preventable through informed family planning. When couples know their genotypes before starting a family, they can make choices that dramatically reduce the risk of having a child with SCD.
              </p>
              {[
                'Identifies if you carry the sickle cell gene',
                'Helps couples make informed decisions together',
                'Enables early intervention if needed',
                'Reduces the rate of SCD births',
                'Can be done at any age — the earlier the better',
              ].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <FiCheckCircle color="var(--secondary)" size={18} />
                  <span style={{ fontSize: 15, color: 'var(--text-mid)' }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--secondary-light)', borderRadius: 24, padding: 36, border: '1px solid #BBF7D0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🧪</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 600, marginBottom: 12 }}>The Test Is Simple</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: 20 }}>
                A genotype test requires just a small blood sample. It's safe, quick, and available at most hospitals and clinics across Nigeria and many African countries.
              </p>
              <div style={{ background: '#fff', borderRadius: 12, padding: 16, border: '1px solid #BBF7D0' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--secondary)', marginBottom: 8 }}>Common test results:</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['AA', 'AS', 'SS', 'AC', 'SC'].map(g => (
                    <span key={g} style={{ padding: '4px 14px', background: 'var(--secondary-light)', borderRadius: 100, fontSize: 14, fontWeight: 700, color: 'var(--secondary)', border: '1px solid #86EFAC' }}>{g}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatibility Table */}
      <section className="section" style={{ background: '#F8FAFC' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <div className="section-label"><FiAlertTriangle size={14} /> Compatibility Guide</div>
            <h2 className="section-title">Genotype Compatibility at a Glance</h2>
            <p className="section-subtitle">Understanding how parental genotypes affect children helps couples make informed decisions.</p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
              <thead>
                <tr style={{ background: 'var(--primary)', color: '#fff' }}>
                  {['Parent 1', 'Parent 2', 'Possible Outcomes', 'Risk Level', 'Guidance'].map(h => (
                    <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 13, fontWeight: 600, letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compatibilityTable.map(({ p1, p2, result, risk, note }, i) => (
                  <tr key={i} style={{ borderTop: '1px solid var(--border)', background: i % 2 === 0 ? '#fff' : '#F8FAFC' }}>
                    <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--primary)', fontSize: 15 }}>{p1}</td>
                    <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--primary)', fontSize: 15 }}>{p2}</td>
                    <td style={{ padding: '14px 20px', fontSize: 14, color: 'var(--text-mid)' }}>{result}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 600, background: riskBg[risk], color: riskColors[risk], textTransform: 'capitalize' }}>{risk}</span>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--text-light)' }}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to Get Tested */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <div className="section-label"><FiMapPin size={14} /> Getting Tested</div>
            <h2 className="section-title">How to Get Your Genotype Test</h2>
          </div>
          <div className="grid-4">
            {testSteps.map(({ num, title, desc }) => (
              <div key={num} style={{ position: 'relative' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: 'var(--primary-light)', lineHeight: 1, marginBottom: 12 }}>{num}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: 8, fontSize: '1.05rem' }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{ background: 'linear-gradient(135deg, var(--secondary), #15803d)', textAlign: 'center', color: '#fff' }}>
        <div className="container" style={{ maxWidth: 560 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, marginBottom: 16 }}>Take Action Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 28, lineHeight: 1.7 }}>
            Schedule a genotype test. It's one of the most important health decisions you'll ever make — for yourself and for the children you may have.
          </p>
          <Link to="/resources" className="btn btn-white">Find a Testing Center Near You</Link>
        </div>
      </section>
    </div>
  )
}
