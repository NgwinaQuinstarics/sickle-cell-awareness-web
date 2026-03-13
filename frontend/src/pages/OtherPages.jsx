// About.jsx
import { Link } from 'react-router-dom';
export function About() {
  const symptoms = [
    { e:'😣', t:'Severe Pain Crises', d:'Sudden intense pain in bones, chest, abdomen, and joints — lasting hours to days.' },
    { e:'😴', t:'Anemia & Fatigue', d:'Sickle cells die in 10–20 days vs. 120 for normal cells, causing chronic anemia.' },
    { e:'🤒', t:'Frequent Infections', d:'Damaged spleen means vulnerability to life-threatening pneumococcal infections.' },
    { e:'🫁', t:'Acute Chest Syndrome', d:'Leading cause of SCD death. Sudden chest pain, fever, and difficulty breathing.' },
    { e:'🧠', t:'Stroke', d:'Blocked brain vessels — even in children as young as 2 years old.' },
    { e:'💛', t:'Jaundice', d:'Yellowing from rapid breakdown of red blood cells.' },
  ];
  return (
    <div style={{ background: '#F8FAFC', paddingBottom: 80 }}>
      <section style={{ background: 'linear-gradient(135deg, var(--blue), #1E40AF)', padding: '80px 0 64px', color: '#fff', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: 680, margin: '0 auto' }}>
          <div className="eyebrow" style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.12)', color: '#fff' }}>🔬 About SCD</div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(2.2rem,4.5vw,3.2rem)', fontWeight: 900, margin: '12px 0 16px' }}>Understanding Sickle Cell Disease</h1>
          <p style={{ color: 'rgba(255,255,255,0.84)', fontSize: '1.05rem', lineHeight: 1.8 }}>A comprehensive guide to what SCD is, how it works, and why genotype knowledge is the first line of defense.</p>
        </div>
      </section>
      <div className="wrap" style={{ maxWidth: 900, margin: '0 auto', padding: '64px 28px' }}>
        <div style={{ background: '#fff', borderRadius: 20, padding: '36px 40px', border: '1px solid var(--border)', marginBottom: 40 }}>
          <div className="eyebrow-blue eyebrow">What Is SCD?</div>
          <h2 className="h2" style={{ marginBottom: 16 }}>A Genetic Blood Disorder With Life-Altering Consequences</h2>
          <p className="body mb16">Sickle cell disease is an inherited disorder of hemoglobin — the protein in red blood cells that carries oxygen. A genetic mutation causes red blood cells to form an abnormal crescent (sickle) shape instead of their normal biconcave disc shape.</p>
          <p className="body mb16">Normal red blood cells are round, flexible, and glide through blood vessels easily. Sickle-shaped cells are rigid, sticky, and fragile. They clump together, blocking blood vessels and preventing oxygen from reaching vital organs.</p>
          <p className="body">The result is a cascade of devastating complications: <strong>pain crises, organ damage, strokes, severe anemia, and significantly shortened life expectancy</strong>. An SS child in sub-Saharan Africa has a <strong style={{color:'var(--red)'}}>90% chance of dying before age 5</strong> without early detection and care.</p>
        </div>
        <div style={{ marginBottom: 40 }}>
          <h2 className="h2" style={{ marginBottom: 28 }}>Common Symptoms</h2>
          <div className="g3">
            {symptoms.map(({e,t,d}) => (
              <div key={t} className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{e}</div>
                <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, marginBottom: 6 }}>{t}</div>
                <p style={{ fontSize: 13, color: 'var(--ink-light)', lineHeight: 1.7 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'var(--red-light)', border: '1.5px solid rgba(192,57,43,0.2)', borderRadius: 16, padding: '28px 32px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '1.2rem', marginBottom: 12, color: 'var(--red)' }}>The Most Important Fact You Need to Know</h3>
          <p style={{ fontSize: '1.05rem', color: 'var(--ink-mid)', lineHeight: 1.75, marginBottom: 20 }}>SCD cannot be cured for most people. It can only be <strong>prevented</strong> — by ensuring that AS carriers do not have children together. This requires both partners to know their genotype before starting a family.</p>
          <Link to="/centers" className="btn btn-red">Get My Genotype Test Now</Link>
        </div>
      </div>
    </div>
  );
}

// Prevention.jsx
import { FiCheckCircle } from 'react-icons/fi';

export function Prevention() {
  const compat = [
    { p1: 'AA', p2: 'AA', result: 'All AA — fully safe', risk: 'none', pct: '0%' },
    { p1: 'AA', p2: 'AS', result: '50% AA, 50% AS', risk: 'none', pct: '0%' },
    { p1: 'AS', p2: 'AS', result: '25% SS, 50% AS, 25% AA', risk: 'high', pct: '25%' },
    { p1: 'AA', p2: 'SS', result: 'All AS carriers', risk: 'low', pct: '0%' },
    { p1: 'AS', p2: 'SS', result: '50% SS, 50% AS', risk: 'critical', pct: '50%' },
    { p1: 'SS', p2: 'SS', result: 'All SS — all will have SCD', risk: 'critical', pct: '100%' },
    { p1: 'AS', p2: 'AC', result: '25% SC disease', risk: 'medium', pct: '25%' },
    { p1: 'AC', p2: 'AC', result: '25% CC disease', risk: 'medium', pct: '25%' },
  ];

  const rC = { none: '#16A34A', low: '#65A30D', medium: '#F59E0B', high: '#EF4444', critical: '#7C3AED' };
  const rB = { none: '#D1FAE5', low: '#ECFDF5', medium: '#FEF3C7', high: '#FEE2E2', critical: '#EDE9FE' };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#1F2937', background: '#F9FAFB' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #16A34A, #059669)',
        color: '#fff',
        padding: '100px 20px 80px',
        textAlign: 'center',
        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: 100, fontWeight: 600, marginBottom: 20 }}>
            🛡️ Prevention
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem,5vw,3.5rem)', fontWeight: 900, marginBottom: 16, lineHeight: 1.1 }}>
            Prevention Starts With a <span style={{ color: '#D1FAE5' }}>Blood Test</span>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', marginBottom: 32 }}>
            Know your genotype before having children. The test is simple, safe, and the impact lasts generations.
          </p>
          <Link to="/centers" style={{
            background: '#fff', color: '#16A34A', fontWeight: 700,
            padding: '14px 28px', borderRadius: 12, textDecoration: 'none', transition: '0.3s'
          }}
            onMouseEnter={e => e.target.style.background = '#D1FAE5'}
            onMouseLeave={e => e.target.style.background = '#fff'}
          >
            Find Test Centers Near You
          </Link>
        </div>
      </section>

      {/* Why Test Section */}
      <section style={{ padding: '80px 20px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 60 }}>
          {/* Left Column */}
          <div style={{ flex: '1 1 400px' }}>
            <div style={{ color: '#16A34A', fontWeight: 600, marginBottom: 12 }}>🧬 Why Test?</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 16 }}>Why Genotype Testing Matters</h2>
            <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.7, marginBottom: 24 }}>
              Sickle cell disease is preventable through informed family planning. Knowing your genotype before starting a family helps reduce SCD risk.
            </p>
            {[
              'Identifies if you carry the sickle cell gene',
              'Helps couples make informed decisions together',
              'Enables early intervention if needed',
              'Reduces the rate of SCD births',
              'Can be done at any age — the earlier the better',
            ].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <FiCheckCircle color="#16A34A" size={20} />
                <span style={{ fontSize: 15 }}>{t}</span>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div style={{ flex: '1 1 400px', background: '#ECFDF5', borderRadius: 24, padding: 36, border: '1px solid #BBF7D0' }}>
            <div style={{ fontSize: 48, marginBottom: 16, textAlign: 'center' }}>🧪</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>The Test Is Simple</h3>
            <p style={{ color: '#4B5563', lineHeight: 1.7, marginBottom: 20, textAlign: 'center' }}>
              A small blood sample is enough. Safe, quick, and available at hospitals and clinics in Cameroon.
            </p>
            <div style={{ background: '#fff', borderRadius: 12, padding: 16, border: '1px solid #BBF7D0' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#16A34A', marginBottom: 8 }}>Common test results:</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                {['AA', 'AS', 'SS', 'AC', 'SC'].map(g => (
                  <span key={g} style={{
                    padding: '6px 16px',
                    background: '#DCFCE7',
                    borderRadius: 100,
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#065F46'
                  }}>{g}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Genotype Compatibility Table */}
      <section style={{ padding: '80px 20px', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 12 }}>Genotype Compatibility Guide</h2>
        <p style={{ fontSize: 16, color: '#6B7280', marginBottom: 32 }}>
          Understanding how your genotype interacts with your partner's is crucial for family planning.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, borderRadius: 16, overflow: 'hidden', boxShadow: '0 6px 24px rgba(0,0,0,0.08)' }}>
            <thead>
              <tr style={{ background: '#16A34A', color: '#fff' }}>
                {['Partner 1','Partner 2','Child Outcomes','SCD Risk %','Risk Level'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 13, fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compat.map(({p1,p2,result,risk,pct},i) => (
                <tr key={i} style={{ background: i%2===0?'#fff':'#F3F4F6' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: '#065F46' }}>{p1}</td>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: '#065F46' }}>{p2}</td>
                  <td style={{ padding: '14px 20px', color: '#374151' }}>{result}</td>
                  <td style={{ padding: '14px 20px', fontWeight: 700, color: rC[risk] }}>{pct}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: 100,
                      fontSize: 12,
                      fontWeight: 700,
                      background: rB[risk],
                      color: rC[risk],
                      textTransform: 'capitalize'
                    }}>{risk}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Warning Box */}
        <div style={{
          background: '#FEF2F2',
          border: '2px solid #FCA5A5',
          borderRadius: 20,
          padding: 32,
          marginTop: 40,
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#B91C1C', marginBottom: 12 }}>
            ⚠️ If You Are AS, You Must Know Your Partner's Genotype
          </h3>
          <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 20 }}>
            AS carriers are the largest at-risk group. Combination AS+AS produces 25% SCD risk — most carriers don’t know their status. Get tested and make informed decisions.
          </p>
          <Link to="/centers" style={{
            background: '#B91C1C', color: '#fff', fontWeight: 700, padding: '12px 24px', borderRadius: 12, textDecoration: 'none'
          }}>Find a Free Test Center</Link>
        </div>
      </section>
    </div>
  );
}

// LivingWithSickleCell.jsx
export function Living() {
  const tips = [
    {e:'💧',t:'Hydrate Constantly',d:'Drink 10+ glasses of water daily. Dehydration is a top crisis trigger. Carry water everywhere.'},
    {e:'💊',t:'Take Medications Daily',d:'Hydroxyurea, folic acid, and penicillin (for children) must be taken consistently. Never skip.'},
    {e:'🌡️',t:'Manage Temperature',d:'Avoid extreme cold. Dress in layers. Cold temperatures trigger sickling and crises.'},
    {e:'😴',t:'Rest and Sleep Well',d:'Get 7–9 hours of sleep. Fatigue increases crisis risk. Your body needs more rest than average.'},
    {e:'🏥',t:'Regular Check-ups',d:'Visit your hematologist every 3–6 months. Early detection of complications saves lives.'},
    {e:'🧘',t:'Stress Management',d:'Emotional stress triggers crises. Practice mindfulness, relaxation, and seek mental health support.'},
    {e:'🥗',t:'Eat Nutritiously',d:'Iron-rich foods, folate, vitamin D. Avoid raw foods that risk infection. Stay at healthy weight.'},
    {e:'🚫',t:'Know Your Triggers',d:'Cold, dehydration, stress, altitude, infections, overexertion — learn and avoid your personal triggers.'},
  ];
  return (
    <div style={{ background: '#F8FAFC', paddingBottom: 80 }}>
      <section style={{ background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', padding: '80px 0 64px', color: '#fff', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: 680, margin: '0 auto' }}>
          <div className="eyebrow" style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.12)', color: '#fff' }}>💪 Living With SCD</div>
          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(2.2rem,4.5vw,3.2rem)', fontWeight: 900, margin: '12px 0 16px' }}>You Can Still Thrive</h1>
          <p style={{ color: 'rgba(255,255,255,0.84)', fontSize: '1.05rem', lineHeight: 1.8 }}>Sickle cell disease is a serious condition — but with the right knowledge, support, and daily discipline, people with SCD can live full, meaningful, and productive lives.</p>
        </div>
      </section>
      <div className="wrap" style={{ padding: '64px 28px' }}>
        <h2 className="h2 mb32">Daily Management Tips</h2>
        <div className="g4" style={{ marginBottom: 48 }}>
          {tips.map(({e,t,d}) => (
            <div key={t} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid var(--border)', transition: 'var(--transition)' }}
              onMouseEnter={ev => ev.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
              onMouseLeave={ev => ev.currentTarget.style.boxShadow = 'none'}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{e}</div>
              <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, marginBottom: 6, fontSize: '0.95rem' }}>{t}</div>
              <p style={{ fontSize: 13, color: 'var(--ink-light)', lineHeight: 1.7 }}>{d}</p>
            </div>
          ))}
        </div>
        <div style={{ background: '#FEF2F2', border: '2px solid rgba(192,57,43,0.2)', borderRadius: 16, padding: '28px 32px' }}>
          <h3 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, color: 'var(--red)', marginBottom: 16, fontSize: '1.2rem' }}>🚨 Emergency Warning Signs — Go to Hospital Immediately</h3>
          <div className="g3">
            {['Fever above 38°C / 101°F', 'Sudden severe chest pain', 'Stroke symptoms (face drooping, arm weakness)', 'Severe headache or vision changes', 'Severe abdominal pain', 'Priapism lasting more than 4 hours'].map(s => (
              <div key={s} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', marginTop: 6, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: 'var(--ink-mid)' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Resources.jsx
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

function Acc({ q, a }) {
  const [o, setO] = useState(false);
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 10 }}>
      <button onClick={() => setO(!o)} style={{ width: '100%', padding: '16px 20px', background: o ? 'var(--red-light)' : '#fff', border: 'none', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, cursor: 'pointer' }}>
        <span style={{ fontWeight: 600, fontSize: 15, color: o ? 'var(--red)' : 'var(--ink)' }}>{q}</span>
        <FiChevronDown size={18} style={{ transform: o ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: 'var(--ink-muted)', flexShrink: 0 }} />
      </button>
      {o && <div style={{ padding: '0 20px 18px', fontSize: 14, color: 'var(--ink-light)', lineHeight: 1.8, background: '#fff' }}>{a}</div>}
    </div>
  );
}

export function Resources() {
  const faqs = [
    { q: 'Can AS people live normal lives?', a: 'Yes. Most AS carriers live completely normal lives with no symptoms. The issue is that when two AS carriers have children, each pregnancy has a 25% chance of producing an SS child.' },
    { q: 'Is sickle cell disease curable?', a: 'Currently, bone marrow transplant can cure SCD but is not widely available. Gene therapy is showing great promise. For most people, treatment focuses on managing symptoms and preventing complications.' },
    { q: 'At what age should children be tested?', a: 'Newborn screening is ideal — from birth. All children should be tested, especially before age 5. Knowing a child\'s genotype early allows for preventive care that dramatically improves survival.' },
    { q: 'Can I still marry an AS partner if I am AS?', a: 'This is a deeply personal decision. The medical risk is 25% per pregnancy. Options include: pre-implantation genetic diagnosis (IVF with embryo selection), adoption, or choosing not to have biological children. Seek genetic counseling.' },
    { q: 'What is the difference between sickle cell trait and sickle cell disease?', a: 'Sickle cell trait (AS) means carrying one abnormal hemoglobin gene. The person is healthy but can pass the gene to children. Sickle cell disease (SS) means carrying two abnormal genes — the person has the disease and experiences symptoms.' },
    { q: 'Is the genotype test accurate?', a: 'Yes. The hemoglobin electrophoresis test used for genotype testing is highly accurate. Always use a certified laboratory or hospital for the most reliable results.' },
    { q: 'What does hydroxyurea do?', a: 'Hydroxyurea is the most important medication for SCD. It increases fetal hemoglobin (HbF), which prevents sickling. It reduces pain crises, hospitalizations, and risk of stroke. It is taken daily and dramatically improves quality of life.' },
  ];
  const articles = [
    { tag: 'Prevention', e: '🧬', t: 'The Complete Genotype Testing Guide', d: 'Everything you need to know about genotype tests — how they work, where to get them, what results mean.' },
    { tag: 'Health', e: '💊', t: 'Hydroxyurea: Benefits, Side Effects & Dosing', d: 'A patient-friendly guide to the most important medication in sickle cell disease management.' },
    { tag: 'Family', e: '👨‍👩‍👧', t: 'Talking to Your Partner About Genotypes', d: 'How to have the important conversation about genotype testing with a partner or future spouse.' },
    { tag: 'Crisis', e: '🚨', t: 'Recognizing and Responding to SCD Crisis', d: 'What to watch for, when to go to the ER, and how to support someone having a crisis.' },
    { tag: 'Nutrition', e: '🥗', t: 'Eating Well With Sickle Cell Disease', d: 'Foods that help, foods to avoid, and meal planning strategies for SCD warriors.' },
    { tag: 'Science', e: '🔬', t: 'Gene Therapy: The Future of SCD Treatment', d: 'The latest research breakthroughs and what they mean for patients worldwide.' },
  ];
  return (
    <div style={{ background: '#F8FAFC', paddingBottom: 80 }}>
      <section style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '72px 0 56px', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="eyebrow" style={{ display: 'inline-flex' }}>📚 Resources</div>
          <h1 className="h2" style={{ margin: '12px 0 16px' }}>Educational Resources</h1>
          <p className="lead" style={{ margin: '0 auto' }}>Articles, guides, and answers to the most common questions about sickle cell disease, prevention, and management.</p>
        </div>
      </section>
      <div className="wrap" style={{ padding: '64px 28px' }}>
        <h2 className="h2 mb32">Articles & Guides</h2>
        <div className="g3" style={{ marginBottom: 64 }}>
          {articles.map(({ tag, e, t, d }) => (
            <div key={t} className="card" style={{ padding: 28, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 28 }}>{e}</span>
                <span className="eyebrow-red eyebrow" style={{ margin: 0, fontSize: 10 }}>{tag}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '1rem', marginBottom: 8, lineHeight: 1.3 }}>{t}</h3>
              <p style={{ fontSize: 13, color: 'var(--ink-light)', lineHeight: 1.7 }}>{d}</p>
            </div>
          ))}
        </div>
        <h2 className="h2 mb24">Frequently Asked Questions</h2>
        <div style={{ maxWidth: 760 }}>
          {faqs.map(({ q, a }) => <Acc key={q} q={q} a={a} />)}
        </div>
      </div>
    </div>
  );
}
