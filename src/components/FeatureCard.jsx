export default function FeatureCard({ icon, title, description, color = 'var(--primary)', bg = 'var(--primary-light)' }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color }}>
        {icon}
      </div>
      <div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>{title}</h3>
        <p style={{ fontSize: 14, color: 'var(--text-light)', lineHeight: 1.7 }}>{description}</p>
      </div>
    </div>
  )
}
