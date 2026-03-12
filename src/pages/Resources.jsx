import Hero from '../components/Hero'
import { FiChevronDown, FiExternalLink } from 'react-icons/fi'
import { useState } from 'react'

const articles = [
  { category: 'Health Tips', emoji: '🥗', title: 'Nutrition Guide for SCD Warriors', desc: 'Foods to embrace, foods to avoid, and meal planning strategies for managing sickle cell effectively.', readTime: '5 min read' },
  { category: 'Prevention', emoji: '🧬', title: 'Why Every Nigerian Should Know Their Genotype', desc: 'A comprehensive guide to genotype testing, what results mean, and what steps to take next.', readTime: '7 min read' },
  { category: 'Management', emoji: '💊', title: 'Hydroxyurea: What You Need to Know', desc: 'Understanding the most common medication for SCD — its benefits, side effects, and how to take it safely.', readTime: '8 min read' },
  { category: 'Wellness', emoji: '🧘', title: 'Managing Chronic Pain Without Over-relying on Opioids', desc: 'Evidence-based approaches to pain management including mindfulness, heat therapy, and more.', readTime: '6 min read' },
  { category: 'Family', emoji: '👨‍👩‍👧', title: 'Raising a Child With Sickle Cell Disease', desc: 'Practical guidance for parents on school, activities, emergencies, and emotional support.', readTime: '10 min read' },
  { category: 'Science', emoji: '🔬', title: 'Gene Therapy: The Future of SCD Treatment', desc: 'An overview of the latest gene therapy research and what it means for people with sickle cell disease.', readTime: '9 min read' },
]

const faqs = [
  { q: 'Can people with sickle cell disease live a normal life?', a: 'Yes, with proper medical care, medication adherence, healthy lifestyle choices, and access to support, people with SCD can live full and meaningful lives. Life expectancy has significantly improved with modern treatments.' },
  { q: 'Is sickle cell disease contagious?', a: 'No. Sickle cell disease is a genetic (inherited) disorder. You cannot "catch" it from another person. It is passed from parents to children through genes.' },
  { q: 'What triggers a sickle cell crisis?', a: 'Common triggers include dehydration, extreme temperatures (too cold or too hot), physical or emotional stress, illness or infection, high altitudes, and low oxygen environments. Avoiding these triggers significantly reduces crisis frequency.' },
  { q: 'Can AS genotype people have health problems?', a: 'Most AS carriers (sickle cell trait) live without any symptoms and don\'t have SCD. However, under extreme conditions like severe dehydration or very high altitude, rare complications can occur. They should stay hydrated and be mindful of their condition.' },
  { q: 'When should I seek emergency care?', a: 'Seek immediate medical attention for: fever above 38°C (101°F), severe chest pain, sudden difficulty breathing, severe abdominal pain, neurological symptoms like confusion or difficulty speaking, or priapism in males.' },
  { q: 'Is there a cure for sickle cell disease?', a: 'Bone marrow/stem cell transplant can cure SCD but is not widely available or suitable for all patients. Gene therapy is showing tremendous promise and may offer a cure in the near future. Currently, treatments focus on managing symptoms and preventing complications.' },
]

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', padding: '16px 20px', background: open ? 'var(--primary-light)' : '#fff', border: 'none', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, cursor: 'pointer', transition: 'background 0.2s' }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: open ? 'var(--primary)' : 'var(--text-dark)', lineHeight: 1.4 }}>{q}</span>
        <FiChevronDown size={18} style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: 'var(--text-light)' }} />
      </button>
      {open && (
        <div style={{ padding: '0 20px 20px', fontSize: 14, color: 'var(--text-light)', lineHeight: 1.8, background: '#fff' }}>
          {a}
        </div>
      )}
    </div>
  )
}

const catColors = {
  'Health Tips': { color: '#16A34A', bg: '#F0FDF4' },
  Prevention: { color: '#1B4FD8', bg: '#EEF2FF' },
  Management: { color: '#F59E0B', bg: '#FEF3C7' },
  Wellness: { color: '#8B5CF6', bg: '#F5F3FF' },
  Family: { color: '#EF4444', bg: '#FEF2F2' },
  Science: { color: '#0891B2', bg: '#ECFEFF' },
}

export default function Resources() {
  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <Hero
        badge="📚 Resources"
        title="Knowledge That Empowers"
        subtitle="Explore our curated library of articles, guides, health tips, and answers to the most common questions about sickle cell disease."
        cta1="Browse Articles"
        cta1To="#articles"
        cta2="Read FAQs"
        cta2To="#faq"
      />

      {/* Articles */}
      <section className="section" id="articles">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 48 }}>
            <div className="section-label">📰 Articles & Guides</div>
            <h2 className="section-title">Educational Resources</h2>
            <p className="section-subtitle">Evidence-based content to help you understand and manage sickle cell disease.</p>
          </div>
          <div className="grid-3">
            {articles.map(({ category, emoji, title, desc, readTime }) => {
              const { color, bg } = catColors[category] || { color: 'var(--primary)', bg: 'var(--primary-light)' }
              return (
                <div key={title} className="card" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 36, marginBottom: 14 }}>{emoji}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color, background: bg, padding: '3px 10px', borderRadius: 100, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{category}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: 8, lineHeight: 1.3, flex: 1 }}>{title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-light)', lineHeight: 1.7, marginBottom: 16 }}>{desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontSize: 13, fontWeight: 500 }}>
                    Read Article <FiExternalLink size={13} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Health Tips Quick Access */}
      <section className="section-sm" style={{ background: 'var(--secondary-light)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 36 }}>
            <div className="section-label" style={{ background: 'var(--secondary-light)', color: 'var(--secondary)' }}>⚡ Quick Tips</div>
            <h2 className="section-title">Crisis Prevention Essentials</h2>
          </div>
          <div className="grid-4">
            {[
              { emoji: '💧', tip: 'Drink 8+ glasses of water daily' },
              { emoji: '🧥', tip: 'Stay warm — avoid extreme cold' },
              { emoji: '😴', tip: 'Sleep 7–9 hours every night' },
              { emoji: '💊', tip: 'Take all medications as prescribed' },
              { emoji: '🚶', tip: 'Light exercise reduces complications' },
              { emoji: '🍎', tip: 'Eat iron-rich, nutritious foods' },
              { emoji: '📋', tip: 'Keep a health journal & logs' },
              { emoji: '🏥', tip: 'Regular check-ups — don\'t skip' },
            ].map(({ emoji, tip }) => (
              <div key={tip} style={{ background: '#fff', borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #BBF7D0' }}>
                <span style={{ fontSize: 22 }}>{emoji}</span>
                <span style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: 'var(--text-mid)' }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
          <div className="text-center" style={{ marginBottom: 48 }}>
            <div className="section-label">❓ FAQs</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Quick answers to common questions about sickle cell disease.</p>
          </div>
          {faqs.map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
        </div>
      </section>
    </div>
  )
}
