import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay } from 'react-icons/fi'

export default function Hero({ title, subtitle, cta1, cta2, cta1To = '/', cta2To = '/', badge, children }) {
  return (
    <section style={{
      paddingTop: 'calc(var(--nav-h) + 80px)',
      paddingBottom: 80,
      background: 'linear-gradient(135deg, #EEF2FF 0%, #F0FDF4 50%, #FFF7ED 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: -100, right: -100,
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(27,79,216,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, left: -80,
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        {badge && (
          <div className="section-label" style={{ justifyContent: 'center', margin: '0 auto 24px' }}>{badge}</div>
        )}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: 20,
          color: 'var(--text-dark)',
        }}>{title}</h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-light)', maxWidth: 620, margin: '0 auto 36px', lineHeight: 1.75 }}>{subtitle}</p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          {cta1 && <Link to={cta1To} className="btn btn-primary" style={{ fontSize: 15 }}>{cta1} <FiArrowRight /></Link>}
          {cta2 && <Link to={cta2To} className="btn btn-outline" style={{ fontSize: 15 }}>{cta2}</Link>}
        </div>

        {children}
      </div>
    </section>
  )
}
