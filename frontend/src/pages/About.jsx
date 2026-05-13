import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiAlertTriangle, FiHeart, FiInfo, FiActivity } from 'react-icons/fi';
import { GiDna2 } from 'react-icons/gi';
import { MdBloodtype } from 'react-icons/md';
import PageHero from '../components/PageHero';
import useInView from '../hooks/useInView';
import './About.css';

const SYMPTOMS = [
  { icon: <FiActivity size={20}/>,      title: 'Painful Crises',  desc: 'Sudden, severe pain in the chest, joints, back and limbs — the hallmark of SCD.' },
  { icon: <FiHeart size={20}/>,         title: 'Anaemia',         desc: 'Sickled cells break down faster, causing fatigue, dizziness and persistent weakness.' },
  { icon: <FiAlertTriangle size={20}/>, title: 'Infections',      desc: 'People with SCD are far more vulnerable to bacterial infections like pneumonia.' },
  { icon: <FiActivity size={20}/>,      title: 'Stroke',          desc: 'Blocked blood flow to the brain can cause strokes — even in young children.' },
  { icon: <FiInfo size={20}/>,          title: 'Organ Damage',    desc: 'Repeated crises over time gradually damage the spleen, kidneys, heart and lungs.' },
  { icon: <FiHeart size={20}/>,         title: 'Delayed Growth',  desc: 'Children with SCD often grow more slowly and reach puberty later than peers.' },
];

const AWARENESS = [
  'Newborn screening can catch SCD early — before serious symptoms ever appear.',
  'Knowing your genotype before marriage is the most effective way to prevent SS children.',
  'With consistent care and treatment, people with SCD live full and meaningful lives.',
  'SCD cannot be caught from another person — it is inherited through genes alone.',
  'Education and community support directly reduce stigma and improve patient outcomes.',
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
              <span className="section-label">  The Basics</span>
              <h2 className="section-title">
                What is Sickle<br/><em>Cell Disease?</em>
              </h2>
              <p className="section-sub">
                Sickle cell disease (SCD) is a group of inherited red blood cell disorders.
                In healthy people, red blood cells are round and flexible, moving freely
                through blood vessels. In SCD, they become crescent-shaped, rigid, and sticky.
              </p>
              <p className="about-p">
                These abnormal cells get stuck in small blood vessels, cutting off blood flow
                and oxygen. This causes <strong>painful episodes called crises</strong> and,
                over time, can lead to serious organ damage.
              </p>
              <p className="about-p">
                SCD is the <strong>most common genetic blood disorder</strong> in Cameroon and
                across sub-Saharan Africa. It is not something you can catch — it is passed
                from parents to children through genes.
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
                <p className="cell-caption">Normal vs. sickle-shaped red blood cells</p>
              </div>

              <div className="about-fact-cards">
                {[
                  { label: 'Most Common Genetic Disorder', sub: 'in sub-Saharan Africa', color: 'var(--blue-50)',  tc: 'var(--blue-700)'  },
                  { label: 'Inherited — Not Contagious',   sub: 'passed through genes',  color: 'var(--teal-50)', tc: 'var(--teal-700)' },
                ].map(f => (
                  <div key={f.label} className="about-fact" style={{ background: f.color }}>
                   
                    <div>
                      <div style={{ fontWeight: 700, color: f.tc, fontSize: '.88rem' }}>{f.label}</div>
                      <div style={{ fontSize: '.8rem', color: 'var(--gray-500)', marginTop: 2 }}>{f.sub}</div>
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
            <span className="section-label"> Causes & Genetics</span>
            <h2 className="section-title">
              How is SCD<br/><em>Inherited?</em>
            </h2>
            <p className="section-sub" style={{ margin: '0 auto 52px' }}>
              SCD follows a straightforward pattern of genetic inheritance.
              Understanding it is the foundation of prevention.
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
              <p className="gs-result">All children will be normal. No SCD risk.</p>
            </div>

            <div className="genetics-scenario gs-amber">
              <div className="gs-badge">AS × AS</div>
              <div className="gs-label">Both parents are carriers</div>
              <div className="gs-children">
                <div className="gs-child gs-aa">AA</div>
                <div className="gs-child gs-as">AS</div>
                <div className="gs-child gs-as">AS</div>
                <div className="gs-child gs-ss">SS</div>
              </div>
              <p className="gs-result">1 in 4 chance of an SS child per pregnancy.</p>
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
              <p className="gs-result">Every child will be born with SCD.</p>
            </div>
          </div>

          <div className="genetics-note">
            <FiAlertTriangle size={18} style={{ color: 'var(--amber-600)', flexShrink: 0, marginTop: 2 }}/>
            <p>
              <strong>The most common high-risk pairing in Cameroon is AS × AS.</strong> Both
              parents look and feel completely healthy, yet each pregnancy carries a 1-in-4 chance
              of producing an SS child. Genotype testing before marriage is the single most
              important step you can take.
            </p>
          </div>
        </div>
      </section>

      {/* SYMPTOMS */}
      <section className="section" ref={sympRef}>
        <div className="container">
          <div className="section-center-text">
            <h2 className="section-title">
              Signs & Symptoms<br/><em>of SCD</em>
            </h2>
          </div>
          <div className="symptoms-grid">
            {SYMPTOMS.map((s, i) => (
              <div
                key={i}
                className={`symp-card${sympV ? ' sv' : ''}`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
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
              <span className="section-label"> Why It Matters</span>
              <h2 className="section-title">
                Why Awareness<br/><em>Saves Lives</em>
              </h2>
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
                <h3>Take Action Today</h3>
              </div>
              <p>
                You can make a real difference — for yourself, your partner,
                and the children who come after you.
              </p>
              <div className="acb-actions">
                <Link to="/prevention" className="btn btn-white btn-lg">
                  Get Genotype Tested <FiArrowRight size={15}/>
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