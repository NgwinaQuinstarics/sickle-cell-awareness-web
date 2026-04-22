import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiAlertTriangle, FiHeart, FiInfo, FiActivity } from 'react-icons/fi';
import { GiDna2 } from 'react-icons/gi';
import { MdBloodtype } from 'react-icons/md';
import PageHero from '../components/PageHero';
import useInView from '../hooks/useInView';
import './About.css';

const SYMPTOMS = [
  { icon: <FiActivity size={20}/>, title: 'Painful Crises', desc: 'Sudden, severe pain in the chest, joints, back and limbs — the hallmark of SCD.' },
  { icon: <FiHeart size={20}/>, title: 'Anaemia', desc: 'Sickled red blood cells break down faster, leading to fatigue, dizziness and weakness.' },
  { icon: <FiAlertTriangle size={20}/>, title: 'Infections', desc: 'Increased vulnerability to bacterial infections, especially pneumonia and meningitis.' },
  { icon: <FiActivity size={20}/>, title: 'Stroke', desc: 'Sickled cells can block blood flow to the brain, causing strokes even in children.' },
  { icon: <FiInfo size={20}/>, title: 'Organ Damage', desc: 'Over time, repeated crises can damage the spleen, kidneys, heart and lungs.' },
  { icon: <FiHeart size={20}/>, title: 'Delayed Growth', desc: 'Children with SCD may grow more slowly and enter puberty later than their peers.' },
];

const AWARENESS = [
  'Early detection saves lives — newborn screening can identify SCD before symptoms appear.',
  'Knowing your genotype before marriage reduces the risk of having an SS child.',
  'With proper management, people with SCD can lead full, productive lives.',
  'SCD is not contagious — it is purely genetic and inherited from parents.',
  'Support and education reduce stigma and improve quality of life for SCD patients.',
];

export default function About() {
  const [whatRef, whatV] = useInView(0.1);
  const [sympRef, sympV] = useInView(0.1);
  const [awRef,   awV]   = useInView(0.1);

  return (
    <div>
      <PageHero
        badge="Educational Resource"
        title="Understanding<br/><em>Sickle Cell Disease</em>"
        subtitle="Clear, accurate, compassionate information about SCD — written for everyone in Cameroon."
        color="blue"
      />

      {/* WHAT IS SCD */}
      <section className="section" ref={whatRef}>
        <div className="container">
          <div className={`about-what${whatV ? ' av' : ''}`}>
            <div className="about-what-text">
              <span className="section-label"><FiInfo size={14}/> The Basics</span>
              <h2 className="section-title">What is Sickle<br/><em>Cell Disease?</em></h2>
              <p className="section-sub">
                Sickle cell disease (SCD) is a group of inherited red blood cell disorders. In healthy individuals,
                red blood cells are round and flexible, moving easily through blood vessels. In SCD, the red blood
                cells become crescent (sickle) shaped, rigid, and sticky.
              </p>
              <p className="about-p">
                These abnormal cells can get stuck in small blood vessels, blocking blood flow and oxygen to
                parts of the body. This leads to <strong>painful episodes called crises</strong>, and over time,
                can cause serious organ damage.
              </p>
              <p className="about-p">
                SCD is the <strong>most common genetic blood disorder</strong> in Cameroon and across sub-Saharan Africa.
                It is not a disease you can "catch" — it is inherited through genes passed from parents to children.
              </p>
            </div>
            <div className="about-what-visual">
              <div className="cell-diagram">
                <div className="cell-compare">
                  <div className="cell-item">
                    <div className="cell-shape cell-normal"/>
                    <span>Normal</span>
                  </div>
                  <div className="cell-item">
                    <div className="cell-shape cell-sickle"/>
                    <span>Sickled</span>
                  </div>
                </div>
                <p className="cell-caption">Normal vs. Sickle-shaped red blood cells</p>
              </div>
              <div className="about-fact-cards">
                {[
                  { label:'Most Common Genetic Disorder', sub:'in sub-Saharan Africa', color:'var(--blue-50)', tc:'var(--blue-700)' },
                  { label:'Inherited Disease', sub:'Not contagious', color:'var(--teal-50)', tc:'var(--teal-700)' },
                ].map(f => (
                  <div key={f.label} className="about-fact" style={{ background: f.color }}>
                    <MdBloodtype size={20} style={{ color: f.tc }}/>
                    <div>
                      <div style={{ fontWeight: 700, color: f.tc, fontSize: '.88rem' }}>{f.label}</div>
                      <div style={{ fontSize: '.8rem', color: 'var(--gray-600)' }}>{f.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GENETICS */}
      <section className="section genetics-section">
        <div className="container">
          <div className="section-center-text">
            <span className="section-label"><GiDna2 size={14}/> Causes & Genetics</span>
            <h2 className="section-title">How is SCD<br/><em>Inherited?</em></h2>
            <p className="section-sub" style={{ margin: '0 auto 56px' }}>
              SCD follows a clear pattern of genetic inheritance. Understanding this is key to prevention.
            </p>
          </div>
          <div className="genetics-grid">
            <div className="genetics-scenario gs-green">
              <div className="gs-badge">AA × AA</div>
              <div className="gs-label">Both parents normal</div>
              <div className="gs-children">
                <div className="gs-child gs-aa">AA</div>
                <div className="gs-child gs-aa">AA</div>
                <div className="gs-child gs-aa">AA</div>
                <div className="gs-child gs-aa">AA</div>
              </div>
              <p className="gs-result">100% normal children. No risk.</p>
            </div>
            <div className="genetics-scenario gs-amber">
              <div className="gs-badge">AS × AS</div>
              <div className="gs-label">Both parents carriers</div>
              <div className="gs-children">
                <div className="gs-child gs-aa">AA</div>
                <div className="gs-child gs-as">AS</div>
                <div className="gs-child gs-as">AS</div>
                <div className="gs-child gs-ss">SS</div>
              </div>
              <p className="gs-result">25% chance of SS child with each pregnancy.</p>
            </div>
            <div className="genetics-scenario gs-red">
              <div className="gs-badge">SS × SS</div>
              <div className="gs-label">Both parents affected</div>
              <div className="gs-children">
                <div className="gs-child gs-ss">SS</div>
                <div className="gs-child gs-ss">SS</div>
                <div className="gs-child gs-ss">SS</div>
                <div className="gs-child gs-ss">SS</div>
              </div>
              <p className="gs-result">100% of children will have SCD.</p>
            </div>
          </div>
          <div className="genetics-note">
            <FiAlertTriangle size={18} style={{ color: 'var(--amber-600)', flexShrink: 0, marginTop: 2 }}/>
            <p>
              <strong>The most common high-risk pairing in Cameroon is AS × AS</strong> — because both parents appear
              completely healthy but have a 1-in-4 chance of having an SS child with each pregnancy.
              This is why genotype testing before marriage is so important.
            </p>
          </div>
        </div>
      </section>

      {/* SYMPTOMS */}
      <section className="section" ref={sympRef}>
        <div className="container">
          <div className="section-center-text">
            <span className="section-label"><FiActivity size={14}/> Symptoms</span>
            <h2 className="section-title">Signs & Symptoms<br/><em>of SCD</em></h2>
          </div>
          <div className="symptoms-grid">
            {SYMPTOMS.map((s, i) => (
              <div key={i} className={`symp-card${sympV ? ' sv' : ''}`} style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="symp-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY AWARENESS MATTERS */}
      <section className="section awareness-section" ref={awRef}>
        <div className="container">
          <div className={`awareness-inner${awV ? ' awv' : ''}`}>
            <div className="awareness-text">
              <span className="section-label"><FiHeart size={14}/> Why It Matters</span>
              <h2 className="section-title">Why Awareness<br/><em>Saves Lives</em></h2>
              <ul className="awareness-list">
                {AWARENESS.map((item, i) => (
                  <li key={i} style={{ transitionDelay: `${i * 80}ms` }}>
                    <span className="aw-num">{String(i + 1).padStart(2, '0')}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="awareness-cta-box">
              <div className="acb-header">
                <MdBloodtype size={32}/>
                <h3>Take Action Today</h3>
              </div>
              <p>You can make a difference — for yourself, your family, and your community.</p>
              <div className="acb-actions">
                <Link to="/prevention" className="btn btn-white btn-lg">
                  Get Genotype Tested <FiArrowRight size={16}/>
                </Link>
                <Link to="/resources" className="btn btn-ghost">
                  Read Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
