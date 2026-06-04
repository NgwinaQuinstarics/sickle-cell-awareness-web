import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiActivity, FiUsers, FiGlobe,FiShield, FiBell, FiDroplet, FiBarChart2,FiBookOpen, FiHeart, FiCheckCircle} from 'react-icons/fi';
import { MdBloodtype } from 'react-icons/md';
import FeatureCard from '../components/FeatureCard';
import useInView from '../hooks/useInView';
import './Home.css';
import heroImage from '../assets/hero.png';
import appScreenshot from '../assets/screenshot.jpeg';

// ── Data 
const STATS = [
  { num: '300M+',  label: 'People affected worldwide',        icon: <FiGlobe size={18}/>,     color: 'blue'  },
  { num: '50M+',   label: 'Affected in sub-Saharan Africa',   icon: <FiUsers size={18}/>,     color: 'teal'  },
  { num: '1 in 4', label: 'Cameroonians carry the trait',     icon: <MdBloodtype size={18}/>, color: 'amber' },
  { num: '7,000',  label: 'Children born with SCD yearly',    icon: <FiActivity size={18}/>,  color: 'red'   },
];

const FEATURES = [
  { icon: <FiBell size={18}/>,      title: 'Medication Reminders', desc: 'Never miss a dose. Smart daily reminders keep your treatment schedule on track.',                color: 'blue'  },
  { icon: <FiDroplet size={18}/>,   title: 'Hydration Tracking',   desc: 'Log water intake and receive timely nudges — hydration is your first defence against crises.', color: 'teal'  },
  { icon: <FiBarChart2 size={18}/>, title: 'Symptom Tracking',     desc: 'Record pain levels and symptoms to build a clear health picture for your doctor.',              color: 'amber' },
  { icon: <FiShield size={18}/>,    title: 'Crisis Prevention',    desc: 'Personalised early-warning guidance to help you identify and avoid painful crises.',            color: 'blue'  },
  { icon: <FiBookOpen size={18}/>,  title: 'Education Library',    desc: 'Curated articles and guides about living with SCD — written for a Cameroonian context.',        color: 'teal'  },
  { icon: <FiHeart size={18}/>,     title: 'Emotional Support',    desc: 'Access encouragement, community connection, and mental-health resources built for you.',        color: 'amber' },
];

const GENOTYPES = [
  { type: 'AA', label: 'Normal',              desc: 'Does not carry or transmit sickle cell disease.',                            color: '#15803d', bg: '#f0fdf4' },
  { type: 'AS', label: 'Carrier',             desc: 'Healthy carrier — can pass the sickle gene to children.',                    color: '#b45309', bg: '#fffbeb' },
  { type: 'SS', label: 'Sickle Cell Disease', desc: 'Has sickle cell disease and requires consistent medical management.',        color: '#b91c1c', bg: '#fef2f2' },
  { type: 'SC', label: 'HbSC Disease',        desc: 'A milder variant of sickle cell disease that still requires monitoring.',    color: '#6d28d9', bg: '#faf5ff' },
];

// ── Components

function StatCard({ stat, delay }) {
  const [ref, v] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`stat-card stat-card--${stat.color}${v ? ' sv' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-num">{stat.num}</div>
      <div className="stat-lbl">{stat.label}</div>
    </div>
  );
}

// ── Page

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [quoteRef, quoteV] = useInView(0.1);
  const [gRef, gV]         = useInView(0.1);
  const [appRef, appV]     = useInView(0.1);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="home">

      {/* ── HERO  */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-gradient" />
          
        </div>

        <div className={`container hero-inner${heroVisible ? ' hv' : ''}`}>
          <div className="hero-text">
            <div className="hero-eyebrow">
             
              Sickle Cell Care Platform — Cameroon
            </div>

            <h1 className="hero-title">
              Better Understanding.<br />
              <span className="hero-title-accent">Better Management.</span><br />
              Better Lives.
            </h1>

            <p className="hero-sub">
              SickleCare helps individuals and families understand, track, and
              manage sickle cell disease with clarity and confidence — from
              education to daily health support, everything in one place.
            </p>

            <div className="hero-actions">
              <Link to="/app" className="btn btn-primary btn-lg">
                Open SickleCare App
                <FiArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn btn-outline btn-lg">
                Learn About Sickle Cell
              </Link>
            </div>

            <div className="hero-trust">
              {['Trusted Health Education', 'Daily Care Tools', 'Built for Cameroon'].map(item => (
                <span key={item} className="trust-chip">
                  <FiCheckCircle size={13} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-frame">
              <img
              src={heroImage}
              alt="SickleCare healthcare illustration"
              className="hero-img"
              />
           </div>
          </div>
        </div>
      </section>

      {/* ── STATS */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <StatCard key={i} stat={s} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE  */}
      <div className="quote-band" ref={quoteRef}>
        <div className={`container quote-inner${quoteV ? ' qv' : ''}`}>
         
          <blockquote className="quote-text">
            With awareness, education, and proper health management, people
            living with sickle cell disease can lead{' '}
            <strong>healthier and more empowered lives.</strong>
          </blockquote>
          <div className="quote-attribution">SickleCare Mission</div>
        </div>
      </div>
      {/* ── FEATURES */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Everything You Need,<br />
              <span className="title-accent">In One Place</span>
            </h2>
            <p className="section-sub">
              From education to daily management tools, SickleCare is built
              around the real needs of people living with SCD in Cameroon.
            </p>
          </div>

          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                description={f.desc}
                color={f.color}
                delay={i * 70}
              />
            ))}
          </div>

          <div className="section-cta">
            <Link to="/app" className="btn btn-primary btn-lg">
              Explore All Features
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── GENOTYPE ───────────────────────────────────────────────────────── */}
      <section className="section genotype-section" ref={gRef}>
        <div className="container">
          <div className="genotype-layout">
            <div className={`genotype-text${gV ? ' gv' : ''}`}>
              <div className="section-eyebrow">
             
                Genotype Basics
              </div>
              <h2 className="section-title">
                Know Your<br />
                <span className="title-accent">Genotype</span>
              </h2>
              <p className="section-sub">
                Your blood genotype is one of the most important things to
                know — especially before marriage or having children. A simple
                blood test is all it takes.
              </p>
              <Link to="/prevention" className="btn btn-primary">
                Learn About Prevention
                <FiArrowRight size={15} />
              </Link>
            </div>

            <div className={`genotype-cards${gV ? ' gv' : ''}`}>
              {GENOTYPES.map((g, i) => (
                <div
                  key={g.type}
                  className="geno-card"
                  style={{ '--geno-color': g.color, background: g.bg, transitionDelay: `${i * 80}ms` }}
                >
                  <div className="geno-badge" style={{ background: g.color }}>
                    {g.type}
                  </div>
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

      {/* ── APP PREVIEW  */}
      <section className="section app-section" ref={appRef}>
        <div className="container">
          <div className={`app-layout${appV ? ' av' : ''}`}>

            <div className="app-mockup-wrap">

            <div className="app-phone">

              <div className="phone-notch" />

              <div className="phone-screen screenshot-screen">

                <img
                  src={appScreenshot}
                  alt="SickleCare Mobile App Screenshot"
                  className="app-screenshot"
                  loading="eager"
                />
              </div>
            </div>
          </div>
            <div className="app-text">
              <div className="section-eyebrow">
                Mobile Application
              </div>
              <h2 className="section-title">
                Health Management<br />
                <span className="title-accent">In Your Pocket</span>
              </h2>
              <p className="section-sub">
                The SickleCare app puts daily health tools, reminders, and
                educational content right in your hands — designed for
                everyday life in Cameroon.
              </p>
              <ul className="app-feature-list">
                {[
                  'Medication and hydration reminders',
                  'Symptom diary and crisis tracking',
                  'Resources available in French and English',
                  'Emergency guidance and care contacts',
                ].map(f => (
                  <li key={f}>
                    <FiCheckCircle size={14} className="check-icon" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/app" className="btn btn-primary btn-lg">
                Discover the App
                <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            
            <div className="cta-content">
              <div className="cta-eyebrow">Join SickleCare</div>
              <h2 className="cta-title">
                Start Your Journey to<br />Better Health Today
              </h2>
              <p className="cta-sub">
                Thousands of Cameroonians are already using SickleCare to live
                more informed, empowered lives.
              </p>
              <div className="cta-actions">
                <Link to="/about" className="btn btn-white btn-lg">
                  Learn About SCD
                </Link>
                <Link to="/prevention" className="btn btn-ghost-white btn-lg">
                  Get Tested
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}