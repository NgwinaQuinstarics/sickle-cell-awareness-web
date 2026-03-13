import { Link } from 'react-router-dom';
import { FiArrowRight, FiAlertTriangle, FiCheckCircle, FiUsers, FiHeart } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const COUNTER_TARGET = { people: 300000000, africa: 75, Cameroon: 25, deaths: 500000 };

function CountUp({ target, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 60;
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(start));
    }, 20);
    return () => clearInterval(t);
  }, [target]);
  const display = val >= 1000000 ? `${(val / 1000000).toFixed(0)}M` : val >= 1000 ? `${(val / 1000).toFixed(0)}K` : val;
  return <>{prefix}{display}{suffix}</>;
}

const danger_facts = [
  { icon: '💀', stat: '80%', text: 'of SS children in Africa die before age 5 without proper care' },
  { icon: '🧬', stat: '1 in 4', text: 'Cameroonians unknowingly carries the sickle cell gene (AS genotype)' },
  { icon: '👶', stat: '150,00+', text: 'babies are born with SCD in Cameroon every single year' },
  { icon: '💔', stat: '70%', text: 'of SCD cases could be prevented through pre-marital genotype testing' },
];


const steps = [
  { num: '01', icon: '🔍', title: 'Find a Center', desc: 'Use our directory to locate a certified genotype testing center near you.' },
  { num: '02', icon: '🩸', title: 'Give a Blood Sample', desc: 'A simple, painless blood draw. Results in 24–48 hours at most centers.' },
  { num: '03', icon: '📋', title: 'Get Your Result', desc: 'Receive your genotype: AA, AS, SS, or AC. A counselor explains what it means.' },
  { num: '04', icon: '❤️', title: 'Make Informed Choices', desc: 'Share with your partner. Plan your family with full knowledge and love.' },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: '92vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #080F1A 0%, #0D1B2E 50%, #1A0A0A 100%)',
        position: 'relative', overflow: 'hidden', padding: '80px 0 60px',
      }}>
        {/* BG Elements */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(192,57,43,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(26,60,110,0.15) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '15%', right: '8%', width: 400, height: 400, border: '1px solid rgba(192,57,43,0.1)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '10%', right: '6%', width: 500, height: 500, border: '1px solid rgba(192,57,43,0.06)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 820 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.3)', color: '#F87171', padding: '7px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700, marginBottom: 28, letterSpacing: '0.04em' }}>
              <FiAlertTriangle size={13} /> SICKLE CELL AWARENESS & PREVENTION
            </div>

            <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(2.8rem,6vw,5rem)', fontWeight: 900, lineHeight: 1.04, color: '#fff', marginBottom: 24, letterSpacing: '-0.02em' }}>
              Not Knowing Your <br />
              <span style={{ color: 'var(--red)', display: 'inline-block', position: 'relative' }}>Genotype</span> Is a<br />
              <span style={{ color: '#94A3B8', fontStyle: 'italic' }}>Deadly Risk.</span>
            </h1>

            <p style={{ fontSize: '1.15rem', color: '#94A3B8', maxWidth: 580, lineHeight: 1.8, marginBottom: 20 }}>
              Over <strong style={{ color: '#fff' }}>300 million people</strong> worldwide carry the sickle cell gene. In Cameroon, <strong style={{ color: '#F87171' }}>1 in 4 people</strong> is a carrier — and most don't know it. That ignorance is costing children their lives.
            </p>
            <p style={{ fontSize: '1.05rem', color: '#64748B', maxWidth: 540, lineHeight: 1.8, marginBottom: 40 }}>
              A simple blood test can tell you your genotype. This knowledge can prevent sickle cell disease from being passed to your children.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}>
              <Link to="/centers" className="btn btn-red btn-lg">Get Tested Now <FiArrowRight /></Link>
              <Link to="/dangers" className="btn btn-ghost btn-lg">Why It Matters</Link>
              <Link to="/quiz" className="btn btn-outline btn-lg" style={{ color: '#94A3B8', borderColor: 'rgba(148,163,184,0.3)' }}>Take Risk Quiz</Link>
            </div>

            {/* Mini Stats */}
            <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {[['300M+', 'Carriers Worldwide'], ['120K+', 'Born with SCD in Cameroon/yr'], ['70%', 'Cases Preventable']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: 'var(--ff-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--red)', lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 4, fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DANGER STATS STRIP */}
      <section style={{ background: '#0D1117', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '48px 0' }}>
        <div className="wrap">
          <div className="g4">
            {danger_facts.map(({ icon, stat, text }) => (
              <div key={stat} style={{ textAlign: 'center', padding: '12px 8px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
                <div style={{ fontFamily: 'var(--ff-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--red)', marginBottom: 8 }}>{stat}</div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS SCD  */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            <div>
              <div className="eyebrow">🔬 Understanding SCD</div>
              <h2 className="h2" style={{ marginBottom: 20 }}>What Exactly is Sickle Cell Disease?</h2>
              <p className="body" style={{ marginBottom: 16 }}>Sickle cell disease (SCD) is an inherited blood disorder where red blood cells — normally round and flexible — become crescent-shaped, rigid, and sticky.</p>
              <p className="body" style={{ marginBottom: 16 }}>These abnormal cells block blood flow through vessels, starving organs and tissues of oxygen. The result is <strong>excruciating pain crises</strong>, organ damage, strokes, severe anemia, and a dramatically shortened life.</p>
              <p className="body" style={{ marginBottom: 28 }}>SCD is not a curse. It is not contagious. It is a <strong>genetic disease</strong> that can only be passed from parents to children — which means it is <strong style={{ color: 'var(--red)' }}>largely preventable</strong> through knowledge.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link to="/about" className="btn btn-blue">Learn the Full Science</Link>
                <Link to="/dangers" className="btn btn-outline">See the Dangers</Link>
              </div>
            </div>

            {/* Visual Comparison */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: 'var(--green-light)', border: '2px solid rgba(22,163,74,0.2)', borderRadius: 20, padding: 28, textAlign: 'center' }}>
                  <div style={{ fontSize: 56, marginBottom: 14 }}>⭕</div>
                  <div style={{ fontWeight: 700, color: 'var(--green)', marginBottom: 8 }}>Healthy RBC</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-light)', lineHeight: 1.6 }}>Round & flexible. Carries oxygen freely. Lives 120 days.</div>
                </div>
                <div style={{ background: 'var(--red-light)', border: '2px solid rgba(192,57,43,0.2)', borderRadius: 20, padding: 28, textAlign: 'center' }}>
                  <div style={{ fontSize: 56, marginBottom: 14 }}>🌙</div>
                  <div style={{ fontWeight: 700, color: 'var(--red)', marginBottom: 8 }}>Sickle Cell</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-light)', lineHeight: 1.6 }}>Rigid & sticky. Blocks blood vessels. Lives only 10–20 days.</div>
                </div>
                <div style={{ background: '#F8FAFC', border: '1px solid var(--border)', borderRadius: 20, padding: 24, gridColumn: '1/-1' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: 'var(--ink-mid)' }}>The Genetic Inheritance</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, textAlign: 'center' }}>
                    {[['AA', 'Safe', 'var(--green)', '#F0FDF4'], ['AS', 'Carrier', 'var(--amber)', '#FFFBEB'], ['AS', 'Carrier', 'var(--amber)', '#FFFBEB'], ['SS', 'SICK', 'var(--red)', '#FEF2F2']].map(([g, l, c, bg], i) => (
                      <div key={i} style={{ background: bg, borderRadius: 10, padding: '10px 6px', border: `1px solid ${c}30` }}>
                        <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 800, fontSize: '1.3rem', color: c }}>{g}</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: c }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 10, textAlign: 'center' }}>When both parents are AS: 25% chance of SS child every pregnancy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* HOW TO GET TESTED */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="center" style={{ marginBottom: 52 }}>
            <div className="eyebrow-green eyebrow" style={{ display: 'inline-flex' }}>✅ Take Action</div>
            <h2 className="h2">Getting Tested is Simple. <em style={{ fontStyle: 'italic', color: 'var(--red)' }}>Not Getting Tested Is Not.</em></h2>
          </div>
          <div className="g4">
            {steps.map(({ num, icon, title, desc }) => (
              <div key={num} style={{ position: 'relative' }}>
                <div style={{ fontFamily: 'var(--ff-display)', fontSize: '4rem', fontWeight: 900, color: '#F1F5F9', lineHeight: 1, marginBottom: 12 }}>{num}</div>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
                <h3 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '1.05rem', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-light)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/centers" className="btn btn-red btn-lg">Find a Testing Center Near Me <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* CTA PLEDGE */}
      <section style={{ background: 'linear-gradient(135deg, var(--red-dark), var(--red))', padding: '80px 0', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🤝</div>
          <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>Take the SickleCare Pledge</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: 36, lineHeight: 1.7 }}>
            Join thousands of Cameroonians who have pledged to know their genotype, share this awareness, and break the cycle of sickle cell disease. One pledge, one life saved.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/pledge" className="btn btn-white btn-lg">I Pledge to Get Tested</Link>
            <Link to="/centers" className="btn btn-ghost btn-lg">Find Test Centers</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
