import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiActivity, FiUsers, FiGlobe, FiShield,
  FiBell, FiDroplet, FiBarChart2, FiBookOpen, FiHeart,
  FiCheckCircle, FiSmartphone
} from 'react-icons/fi';
import { MdBloodtype, MdScience } from 'react-icons/md';
import { GiDna2 } from 'react-icons/gi';
import FeatureCard from '../components/FeatureCard';
import useInView from '../hooks/useInView';
import './Home.css';

/* ── Stats ── */
const STATS = [
  { num: '300M+', label: 'People affected worldwide',    icon: <FiGlobe size={22}/>,    color: 'blue'  },
  { num: '50M+',  label: 'Affected in sub-Saharan Africa', icon: <FiUsers size={22}/>,  color: 'teal'  },
  { num: '1 in 4', label: 'Cameroonians carry the trait', icon: <MdBloodtype size={22}/>, color: 'amber'},
  { num: '80%',   label: 'Of cases occur in Africa',     icon: <FiActivity size={22}/>, color: 'red'   },
];

/* ── Features ── */
const FEATURES = [
  { icon: <FiBell size={24}/>,     title: 'Medication Reminders',   desc: 'Never miss a dose. Smart reminders keep you on your treatment schedule every day.',          color: 'blue'  },
  { icon: <FiDroplet size={24}/>,  title: 'Hydration Tracking',     desc: 'Log water intake and get nudges to stay hydrated — a key defence against painful crises.',    color: 'teal'  },
  { icon: <FiBarChart2 size={24}/>,title: 'Symptom Tracking',       desc: 'Record and monitor symptoms over time to share meaningful data with your care team.',         color: 'amber' },
  { icon: <FiShield size={24}/>,   title: 'Crisis Prevention',      desc: 'Personalised guidance and early-warning tips to help you avoid painful sickle cell crises.',  color: 'blue'  },
  { icon: <FiBookOpen size={24}/>, title: 'Education Library',      desc: 'Access curated articles, videos and guides about living well with sickle cell disease.',     color: 'teal'  },
  { icon: <FiHeart size={24}/>,    title: 'Emotional Support',      desc: 'Connect with a community, find encouragement, and access mental-health resources.',          color: 'amber' },
];

/* ── Animated counter ── */
function StatCard({ stat, delay }) {
  const [ref, v] = useInView(0.1);
  return (
    <div ref={ref} className={`stat-card stat-card--${stat.color}${v ? ' sv' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-num">{stat.num}</div>
      <div className="stat-lbl">{stat.label}</div>
    </div>
  );
}

/* ── Genotype section ── */
const GENOTYPES = [
  { type: 'AA', label: 'Normal', risk: 'No risk', desc: 'Does not have sickle cell and cannot pass SCD to children.', color: '#15803d', bg: '#f0fdf4' },
  { type: 'AS', label: 'Carrier (Trait)', risk: 'Carrier', desc: 'Healthy but carries one sickle gene. Can pass it to children.', color: '#d97706', bg: '#fffbeb' },
  { type: 'SS', label: 'Sickle Cell Disease', risk: 'Affected', desc: 'Has sickle cell disease and experiences symptoms.', color: '#dc2626', bg: '#fef2f2' },
  { type: 'AC', label: 'Carrier (HbC)', risk: 'Carrier', desc: 'Carries haemoglobin C variant. Lower risk but can still pass it on.', color: '#7c3aed', bg: '#faf5ff' },
];

/* ── Testimonials ── */
const TESTIMONIALS = [
  { name: 'Aminata T.', city: 'Yaoundé', text: 'SickleCare helped me understand my condition and manage my daily routine. I feel so much more in control of my health.', initials: 'AT' },
  { name: 'Jean-Paul M.', city: 'Douala', text: 'As a parent of a child with SS genotype, this platform gave me the education I needed. The hydration tracker is a game changer.', initials: 'JP' },
  { name: 'Fatima B.', city: 'Bafoussam', text: 'I discovered I was AS through genotype testing prompted by SickleCare. Now my partner and I can make informed decisions.', initials: 'FB' },
];

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [quoteRef, quoteV] = useInView(0.1);
  const [gRef, gV] = useInView(0.1);
  const [tRef, tV] = useInView(0.1);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-blob hb1"/><div className="hero-blob hb2"/><div className="hero-blob hb3"/>
          <div className="hero-grid-overlay"/>
        </div>
        <div className={`container hero-inner${heroVisible ? ' hv' : ''}`}>
          <div className="hero-text">
            <div className="hero-pill">
              <span className="pill-dot"/>
              Sickle Cell Awareness Platform — Cameroon
            </div>
            <h1 className="hero-title">
              Knowledge is the<br/>
              <em>First Step to</em><br/>
              Better Health
            </h1>
            <p className="hero-sub">
              SickleCare empowers Cameroonians with the education, tools, and support needed to
              prevent, understand, and manage sickle cell disease. Because every life deserves to be fully lived.
            </p>
            <div className="hero-actions">
              <Link to="/about" className="btn btn-white btn-lg">
                <FiBookOpen size={18}/> Learn About SCD
              </Link>
              <Link to="/app" className="btn btn-ghost btn-lg">
                <FiSmartphone size={18}/> Explore the App
              </Link>
            </div>
            <div className="hero-trust">
              {['Free Platform', 'No Sign-up Required', 'Cameroon-focused'].map(t => (
                <span key={t} className="trust-chip"><FiCheckCircle size={13}/>{t}</span>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card-main">
              <div className="hcm-icon"><MdBloodtype size={40}/></div>
              <div className="hcm-content">
                <div className="hcm-title">Your Genotype Matters</div>
                <div className="hcm-sub">Test today. Choose wisely. Live fully.</div>
              </div>
            </div>
            <div className="hero-dna-ring">
              <GiDna2 size={120} className="dna-icon"/>
            </div>
            {[
              { label: 'Carriers in Cameroon', val: '25%', pos: 'top-right' },
              { label: 'Global SCD cases',     val: '300M+', pos: 'bottom-left' },
            ].map(c => (
              <div key={c.label} className={`hero-stat-float hsf-${c.pos}`}>
                <div className="hsf-val">{c.val}</div>
                <div className="hsf-lbl">{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats-section section-sm">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s, i) => <StatCard key={i} stat={s} delay={i * 80} />)}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <div className="quote-band" ref={quoteRef}>
        <div className={`container quote-inner${quoteV ? ' qv' : ''}`}>
          <div className="quote-mark">"</div>
          <blockquote>
            With awareness, education, and proper health management, individuals living with sickle cell disease can lead
            <strong> healthier and more empowered lives.</strong>
          </blockquote>
          <div className="quote-source">— SickleCare Mission</div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="section features-section">
        <div className="container">
          <div className="section-center">
            <span className="section-label"><FiSmartphone size={14}/> SickleCare Platform</span>
            <h2 className="section-title">Everything You Need,<br/><em>In One Place</em></h2>
            <p className="section-sub">
              From education to daily management tools, SickleCare is built around the real needs of people
              living with sickle cell disease in Cameroon.
            </p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.desc} color={f.color} delay={i * 70}/>
            ))}
          </div>
          <div className="features-cta">
            <Link to="/app" className="btn btn-primary btn-lg">
              Explore All Features <FiArrowRight size={18}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── GENOTYPE EXPLAINER ── */}
      <section className="section genotype-section" ref={gRef}>
        <div className="container">
          <div className="genotype-inner">
            <div className={`genotype-text${gV ? ' gv' : ''}`}>
              <span className="section-label"><MdScience size={14}/> Genotype Basics</span>
              <h2 className="section-title">Know Your<br/><em>Genotype</em></h2>
              <p className="section-sub">
                Understanding your blood genotype is one of the most important health decisions you can make —
                especially before marriage and having children. It takes only a simple blood test.
              </p>
              <Link to="/prevention" className="btn btn-primary mt-24">
                Learn About Prevention <FiArrowRight size={16}/>
              </Link>
            </div>
            <div className={`genotype-cards${gV ? ' gv' : ''}`}>
              {GENOTYPES.map((g, i) => (
                <div key={g.type} className="geno-card" style={{ background: g.bg, transitionDelay: `${i * 80}ms` }}>
                  <div className="geno-badge" style={{ background: g.color }}>{g.type}</div>
                  <div className="geno-info">
                    <div className="geno-label" style={{ color: g.color }}>{g.label}</div>
                    <p className="geno-desc">{g.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── APP PREVIEW ── */}
      <section className="section app-preview-section">
        <div className="container">
          <div className="app-preview-inner">
            <div className="app-preview-visual">
              <div className="app-mockup">
                <div className="app-mockup-header">
                  <div className="am-dot"/><div className="am-dot"/><div className="am-dot"/>
                </div>
                <div className="app-mockup-body">
                  <div className="am-screen-title"><MdBloodtype size={18}/> SickleCare</div>
                  <div className="am-row"><FiBell size={16}/><span>Medication: Hydroxyurea</span><span className="am-tag am-green">✓ Taken</span></div>
                  <div className="am-row"><FiDroplet size={16}/><span>Hydration Today</span><span className="am-tag am-blue">6 / 8 glasses</span></div>
                  <div className="am-row"><FiActivity size={16}/><span>Pain Level</span><span className="am-tag am-amber">Low ★★☆☆☆</span></div>
                  <div className="am-row"><FiShield size={16}/><span>Crisis Risk</span><span className="am-tag am-green">Low Risk</span></div>
                  <div className="am-tip">💡 Tip: Stay hydrated — drink water every 2 hours to reduce crisis risk.</div>
                </div>
              </div>
            </div>
            <div className="app-preview-text">
              <span className="section-label"><FiSmartphone size={14}/> Mobile App</span>
              <h2 className="section-title">Health Management<br/><em>In Your Pocket</em></h2>
              <p className="section-sub">
                The SickleCare mobile app brings daily health tools, reminders, and educational content
                right to your smartphone. Designed for the Cameroonian context.
              </p>
              <ul className="app-feature-list">
                {['Medication & hydration reminders', 'Symptom diary and crisis tracking', 'Educational resources in French & English', 'Emergency guidance and contacts'].map(f => (
                  <li key={f}><FiCheckCircle size={16} className="check-icon"/> {f}</li>
                ))}
              </ul>
              <Link to="/app" className="btn btn-primary btn-lg">
                <FiSmartphone size={18}/> Discover the App
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials-section" ref={tRef}>
        <div className="container">
          <div className="section-center">
            <span className="section-label"><FiHeart size={14}/> Community Stories</span>
            <h2 className="section-title">Real People,<br/><em>Real Impact</em></h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`testi-card${tV ? ' tv' : ''}`} style={{ transitionDelay: `${i * 90}ms` }}>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.initials}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-city">{t.city}, Cameroon</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-bg">
              <div className="cta-blob cb1"/><div className="cta-blob cb2"/>
            </div>
            <div className="cta-content">
              <h2 className="cta-title">Start Your Journey<br/>to Better Health Today</h2>
              <p className="cta-sub">Join thousands of Cameroonians using SickleCare to live more informed, empowered lives with sickle cell disease.</p>
              <div className="cta-actions">
                <Link to="/about" className="btn btn-white btn-lg">Learn About SCD</Link>
                <Link to="/prevention" className="btn btn-ghost btn-lg">Get Tested</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
