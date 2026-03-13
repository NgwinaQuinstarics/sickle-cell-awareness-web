import { Link } from 'react-router-dom';
import { FiArrowRight, FiAlertTriangle } from 'react-icons/fi';

const scenarios = [
  {
    couple: 'AS + AS', risk: 'CRITICAL',
    color: 'var(--red)', bg: '#FEF2F2', border: '#FECACA',
    headline: 'The Most Common Deadly Combination',
    body: 'This is the most dangerous and common situation. Both parents appear healthy. Neither experiences symptoms. Yet every pregnancy carries a 25% chance — 1 in 4 — of producing a child with SS sickle cell disease. In Cameroon, roughly 1 in 4 people are AS carriers. This means roughly 1 in 16 Cameroonian couples are AS+AS without knowing it.',
    outcome: ['25% chance SS (child has SCD)', '50% chance AS (child is carrier)', '25% chance AA (child is fully clear)'],
    warning: 'Couples who do not test before marriage may unknowingly enter this combination. Their children pay the price.'
  },
  {
    couple: 'AS + SS', risk: 'SEVERE',
    color: '#B45309', bg: '#FFF7ED', border: '#FDE68A',
    headline: 'Half of All Children Will Suffer',
    body: 'When one partner is AS and the other has SS sickle cell disease, every pregnancy has a 50% chance of producing a child with SCD. In a family of four children, statistically two will have sickle cell disease.',
    outcome: ['50% chance SS (child has SCD)', '50% chance AS (child is carrier)', '0% chance AA'],
    warning: 'Without testing, people with SS may not know their status until a crisis hits — by then, children may already be born.'
  },
  {
    couple: 'SS + SS', risk: 'EXTREME',
    color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE',
    headline: '100% of Children Will Have SCD',
    body: 'When both parents have SS sickle cell disease, every single child born to them will also have SCD. There is no possibility of an unaffected child. This is the most devastating outcome of two people entering a union without genotype testing.',
    outcome: ['100% chance SS (all children have SCD)', '0% chance AS', '0% chance AA'],
    warning: 'This situation can be completely avoided through pre-marital genotype screening.'
  },
];

const organs = [
  { organ: '🧠 Brain', damage: 'Strokes, silent brain injury, learning disabilities, and seizures — common even in children.' },
  { organ: '❤️ Heart', damage: 'Enlarged heart, heart failure, pulmonary hypertension — major cause of adult SCD death.' },
  { organ: '🫁 Lungs', damage: 'Acute Chest Syndrome — a life-threatening crisis. Leading cause of SCD-related hospital death.' },
  { organ: '🫘 Kidneys', damage: 'Chronic kidney disease, inability to concentrate urine, kidney failure in adulthood.' },
  { organ: '👁️ Eyes', damage: 'Retinal damage and blindness from blocked blood vessels in the eye.' },
  { organ: '🦴 Bones', damage: 'Avascular necrosis — bone death from loss of blood supply. Debilitating joint pain.' },
  { organ: '🩺 Spleen', damage: 'Splenic sequestration — life-threatening pooling of blood. Repeated infarctions destroy the spleen.' },
  { organ: '🦶 Skin', damage: 'Chronic leg ulcers that resist healing and cause lasting disability.' },
];

const timeline = [
  { age: 'Birth – 6 months', events: 'Usually symptom-free. Fetal hemoglobin protects. Risk of infection already elevated.' },
  { age: '6–12 months', events: 'Dactylitis (painful hand/foot swelling). First pain crises. Spleen begins to enlarge.' },
  { age: '1–3 years', events: 'Severe anemia. Risk of stroke. Pneumococcal infections can be fatal without penicillin.' },
  { age: '5–10 years', events: 'Frequent pain crises. School absence. Splenic failure. Possible silent brain injury.' },
  { age: 'Teens', events: 'Delayed puberty. Bone damage. Psychological trauma from chronic pain. Peer isolation.' },
  { age: 'Adult', events: 'Organ failure cascade. Pulmonary hypertension. Leg ulcers. Life expectancy severely reduced.' },
];

export default function Dangers() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1A0505, #2D0808)', padding: '100px 0 80px', borderBottom: '1px solid rgba(192,57,43,0.2)' }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(192,57,43,0.2)', border: '1px solid rgba(192,57,43,0.4)', color: '#F87171', padding: '7px 16px', borderRadius: 100, fontSize: 12, fontWeight: 700, marginBottom: 24, letterSpacing: '0.06em' }}>
            <FiAlertTriangle size={13} /> CRITICAL AWARENESS
          </div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(2.4rem,5.5vw,4.2rem)', fontWeight: 900, color: '#fff', lineHeight: 1.05, marginBottom: 24 }}>
            The Deadly Consequences<br />of <span style={{ color: 'var(--red)' }}>Not Knowing</span> Your Genotype
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#94A3B8', lineHeight: 1.8, maxWidth: 620, marginBottom: 36 }}>
            Ignorance of your genotype status is not just a personal risk — it is a risk you pass to your children. Understanding what is at stake may be the most important thing you read today.
          </p>
          <Link to="/centers" className="btn btn-red btn-lg">Get Tested Now — It's Free at Many Centers <FiArrowRight /></Link>
        </div>
      </section>

      {/* COUPLE SCENARIOS */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="center" style={{ marginBottom: 52 }}>
            <div className="eyebrow">⚠️ Risk Scenarios</div>
            <h2 className="h2">What Happens When Untested Couples Have Children</h2>
            <p className="lead mt16" style={{ margin: '16px auto 0' }}>These are not statistics. These are real possibilities for real families — including yours if you have not been tested.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {scenarios.map(({ couple, risk, color, bg, border, headline, body, outcome, warning }) => (
              <div key={couple} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 20, padding: '32px 36px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div style={{ fontFamily: 'var(--ff-display)', fontSize: '1.8rem', fontWeight: 900, color }}>AS + AS = ?</div>
                    <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '1.8rem', color, letterSpacing: '-0.02em' }}>{couple}</span>
                    <span style={{ padding: '4px 12px', background: color, color: '#fff', borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>{risk}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '1.15rem', color, marginBottom: 12 }}>{headline}</h3>
                  <p style={{ fontSize: 14, color: 'var(--ink-mid)', lineHeight: 1.8 }}>{body}</p>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink-mid)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Possible Outcomes Per Pregnancy:</div>
                  {outcome.map(o => (
                    <div key={o} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, marginTop: 5, flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: 'var(--ink-mid)' }}>{o}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 20, padding: '14px 16px', background: 'rgba(0,0,0,0.04)', borderRadius: 10, borderLeft: `4px solid ${color}` }}>
                    <div style={{ fontSize: 13, color: 'var(--ink-mid)', lineHeight: 1.7, fontStyle: 'italic' }}>⚡ {warning}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORGAN DAMAGE */}
      <section className="section" style={{ background: '#0D1117' }}>
        <div className="wrap">
          <div className="center" style={{ marginBottom: 48 }}>
            <div className="eyebrow" style={{ background: 'rgba(192,57,43,0.15)', color: '#F87171' }}>🩻 Organ Damage</div>
            <h2 className="h2" style={{ color: '#fff' }}>How SCD Destroys the Body Over Time</h2>
            <p className="lead mt16" style={{ margin: '16px auto 0', color: '#64748B' }}>Sickle cell disease is not just pain. It is a systematic, relentless destruction of multiple organs simultaneously.</p>
          </div>
          <div className="g4">
            {organs.map(({ organ, damage }) => (
              <div key={organ} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px 20px', transition: 'var(--transition)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(192,57,43,0.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{organ}</div>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.7 }}>{damage}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISEASE TIMELINE */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="center" style={{ marginBottom: 52 }}>
            <div className="eyebrow">📅 Disease Progression</div>
            <h2 className="h2">A Child's Life With Untreated SCD</h2>
            <p className="lead mt16" style={{ margin: '16px auto 0' }}>This is the timeline of suffering that an SS child faces — suffering that did not have to happen.</p>
          </div>
          <div style={{ position: 'relative', paddingLeft: 40 }}>
            <div style={{ position: 'absolute', left: 12, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, var(--red), transparent)' }} />
            {timeline.map(({ age, events }, i) => (
              <div key={age} style={{ position: 'relative', marginBottom: 32, paddingLeft: 24 }}>
                <div style={{ position: 'absolute', left: -31, top: 6, width: 14, height: 14, borderRadius: '50%', background: i === 0 ? 'var(--green)' : i >= 4 ? 'var(--red)' : 'var(--amber)', border: '2px solid #fff', boxShadow: '0 0 0 3px ' + (i === 0 ? 'rgba(22,163,74,0.2)' : 'rgba(192,57,43,0.2)') }} />
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', marginBottom: 4 }}>{age}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-light)', lineHeight: 1.7 }}>{events}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--red)', padding: '72px 0', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: 640 }}>
          <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>The Prevention Is Simple</h2>
          <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: 36 }}>
            A blood test. That's all it takes. Knowing your genotype before marriage can prevent all the suffering described on this page from happening to your children.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/centers" className="btn btn-white btn-lg">Find a Test Center Near Me</Link>
            <Link to="/prevention" className="btn btn-ghost btn-lg">Genotype Prevention Guide</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
