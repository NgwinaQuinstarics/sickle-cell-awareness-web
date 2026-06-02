import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiCheckCircle, FiAlertTriangle,
  FiHeart, FiSearch, FiUsers
} from 'react-icons/fi';
import { MdScience } from 'react-icons/md';
import { GiDna2 } from 'react-icons/gi';
import PageHero from '../components/PageHero';
import useInView from '../hooks/useInView';
import './Prevention.css';

const GENOTYPE_TABLE = [
  { p1:'AA', p2:'AA', risk:'No Risk',   pct:'0%',   color:'green', outcome:'All children will be AA. No SCD risk.' },
  { p1:'AA', p2:'AS', risk:'Low Risk',  pct:'0%',   color:'green', outcome:'Children will be AA or AS. None will have SCD.' },
  { p1:'AS', p2:'AS', risk:'High Risk', pct:'25%',  color:'red',   outcome:'1 in 4 chance of SS child. Get counselling.' },
  { p1:'AA', p2:'SS', risk:'Carrier',   pct:'0%',   color:'amber', outcome:'All children carry the trait (AS). No SCD but all carriers.' },
  { p1:'AS', p2:'SS', risk:'Very High', pct:'50%',  color:'red',   outcome:'50% chance of SS child per pregnancy.' },
  { p1:'SS', p2:'SS', risk:'Certain',   pct:'100%', color:'red',   outcome:'Every child will be born with SCD.' },
];

const STEPS = [
  { n:'01', icon:<FiSearch size={22}/>,      title:'Go to a Health Centre',        desc:'Visit any approved hospital or clinic. Testing is available at most regional hospitals across Cameroon.' },
  { n:'02', icon:<MdScience size={22}/>,     title:'Give a Blood Sample',          desc:'A small sample is taken — usually a finger prick or venous draw. Quick and almost painless.' },
  { n:'03', icon:<GiDna2 size={22}/>,        title:'Haemoglobin Electrophoresis',  desc:'Your blood is analysed in the lab to identify your exact haemoglobin type: AA, AS, SS, AC, SC, etc.' },
  { n:'04', icon:<FiCheckCircle size={22}/>, title:'Receive Your Results',         desc:'Results are usually ready within a few hours to a few days. Always ask for a written copy.' },
  { n:'05', icon:<FiUsers size={22}/>,       title:'Counselling & Planning',       desc:'If you or your partner carry a risk genotype, speak with a genetic counsellor before making decisions.' },
];

const CHOICES = [
  { title:'Both AA',          desc:'No special action needed. SCD is not a risk for your children.',                                        color:'green' },
  { title:'AA + AS',          desc:'Children will be AA or AS. None will have SCD — but discuss with a counsellor all the same.',            color:'green' },
  { title:'Both AS',          desc:'Each pregnancy carries a 25% chance of an SS child. Seek genetic counselling before having children.',   color:'amber' },
  { title:'AS + SS or SS + SS', desc:'Very high risk. Strongly recommended to consult a genetics specialist before making any decisions.',   color:'red'   },
];

export default function Prevention() {
  const [stepsRef, stepsV]   = useInView(0.1);
  const [tableRef, tableV]   = useInView(0.1);
  const [choiceRef, choiceV] = useInView(0.1);

  return (
    <div>
      <PageHero
        badge="Prevention & Testing"
        title="Prevention &<br/><em>Genotype Testing</em>"
        subtitle="The single most powerful thing you can do to prevent sickle cell disease in your family is to know your genotype."
        color="teal"
      />

      {/* WHY TEST */}
      <section className="section">
        <div className="container">
          <div className="why-test-grid">
            <div className="why-test-text">
              <span className="section-label">Why Test?</span>
              <h2 className="section-title">
                The Importance of<br/><em>Genotype Testing</em>
              </h2>
              <p className="section-sub">
                Millions of people in Cameroon carry the sickle cell trait (AS genotype)
                without knowing it. They are perfectly healthy — but if two carriers have
                children together, there is a 25% chance each pregnancy results in a child
                with SS sickle cell disease.
              </p>
              <p style={{ marginTop: 16, fontSize: '.96rem', color: 'var(--gray-600)', lineHeight: 1.8 }}>
                A blood test called <strong>haemoglobin electrophoresis</strong> tells you
                your exact genotype. It is affordable, available across Cameroon, and gives
                you what you need to make responsible decisions for your family.
              </p>
              <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {[
                  'Recommended before marriage or having children',
                  'Available at most hospitals and health centres in Cameroon',
                  'Only a small blood sample is needed',
                  'Results are usually ready within 24–72 hours',
                ].map(p => (
                  <div
                    key={p}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '.92rem', color: 'var(--gray-700)' }}
                  >
                    <FiCheckCircle size={16} style={{ color: 'var(--teal-600)', flexShrink: 0 }}/> {p}
                  </div>
                ))}
              </div>
            </div>

            <div className="why-test-visual">
              <div className="test-info-card">
              
                <h3>Haemoglobin Electrophoresis</h3>
                <p>The gold-standard test for identifying your blood genotype with certainty.</p>
                <div className="tic-tags">
                  {['Accurate', 'Affordable', 'Widely Available'].map(t => (
                    <span key={t} className="tic-tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="test-alert">
                <FiAlertTriangle size={17} style={{ color: 'var(--amber-600)', flexShrink: 0, marginTop: 2 }}/>
                <p>
                  <strong>An estimated 1 in 4 Cameroonians carries the AS trait.</strong> You
                  or your partner could be a carrier right now and not know it. Testing is the
                  only way to be certain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO GET TESTED */}
      <section className="section prev-steps-section" ref={stepsRef}>
        <div className="container">
          <div className="section-center-text">
            <span className="section-label"> Step by Step</span>
            <h2 className="section-title">How to Get<br/><em>Tested</em></h2>
          </div>
          <div className="prev-steps">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`prev-step${stepsV ? ' psv' : ''}`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="ps-num">{s.n}</div>
                <div className="ps-icon">{s.icon}</div>
                <div className="ps-content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="ps-arrow"><FiArrowRight size={17}/></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPATIBILITY TABLE */}
      <section className="section compat-section" ref={tableRef}>
        <div className="container">
          <div className="section-center-text">
            <span className="section-label">Compatibility Guide</span>
            <h2 className="section-title">
              Genotype Compatibility<br/><em>Before Marriage</em>
            </h2>
            <p className="section-sub" style={{ margin: '0 auto 40px' }}>
              What different genotype pairings mean for your future children.
            </p>
          </div>
          <div className={`compat-table${tableV ? ' ctv' : ''}`}>
            <div className="ct-header">
              <span>Parent 1</span>
              <span>Parent 2</span>
              <span>Risk Level</span>
              <span>SS Risk</span>
              <span>Outcome</span>
            </div>
            {GENOTYPE_TABLE.map((row, i) => (
              <div key={i} className={`ct-row ct-${row.color}`}>
                <span className="ct-geno ct-g1">{row.p1}</span>
                <span className="ct-geno ct-g2">{row.p2}</span>
                <span className={`ct-risk risk-${row.color}`}>{row.risk}</span>
                <span className={`ct-pct pct-${row.color}`}>{row.pct}</span>
                <span className="ct-outcome">{row.outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESPONSIBLE CHOICES */}
      <section className="section choices-section" ref={choiceRef}>
        <div className="container">
          <div className="section-center-text">
            <span className="section-label">Responsible Choices</span>
            <h2 className="section-title">
              Making Informed<br/><em>Decisions</em>
            </h2>
            <p className="section-sub" style={{ margin: '0 auto 40px' }}>
              Knowing your genotype is the starting point. Here is what to consider
              based on your situation.
            </p>
          </div>

          <div className="choices-grid">
            {CHOICES.map((c, i) => (
              <div
                key={i}
                className={`choice-card cc-${c.color}${choiceV ? ' ccv' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`cc-badge ccb-${c.color}`}>{c.title}</div>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="choice-note">
            <p>
              SickleCare does not tell you who to love or marry. We give you accurate
              information so that you and your family can make{' '}
              <strong>informed, empowered choices</strong> together. Always speak with
              a qualified genetic counsellor.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Find Testing Centres <FiArrowRight size={15}/>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}