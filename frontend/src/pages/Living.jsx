import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiDroplet, FiHeart, FiSun, FiAlertTriangle,
  FiSmile, FiCheckCircle, FiPhone
} from 'react-icons/fi';
import { MdLocalPharmacy, MdSports } from 'react-icons/md';
import PageHero from '../components/PageHero';
import FeatureCard from '../components/FeatureCard';
import useInView from '../hooks/useInView';
import './Living.css';

const CRISIS_TRIGGERS = [
  'Dehydration or not drinking enough water',
  'Extreme cold or sudden temperature changes',
  'Physical over-exertion or intense exercise',
  'Stress, anxiety or emotional distress',
  'Infections — flu, malaria, pneumonia',
  'High altitude or low-oxygen environments',
  'Fatigue and lack of sleep',
  'Alcohol consumption and smoking',
];

const CRISIS_STEPS = [
  { n:'1', title:'Stay Calm',         desc:'Panic raises oxygen demand. Breathe slowly and steadily.',                    color:'blue'  },
  { n:'2', title:'Hydrate Now',       desc:'Drink water immediately — dehydration makes crises significantly worse.',     color:'teal'  },
  { n:'3', title:'Apply Warmth',      desc:'A warm (not hot) pack on the painful area can bring real relief.',            color:'amber' },
  { n:'4', title:'Take Pain Relief',  desc:'Use prescribed medications exactly as your doctor has directed.',             color:'blue'  },
  { n:'5', title:'Get to Hospital',   desc:'If pain is severe or lasting more than 2 hours, go to emergency immediately.',color:'red'   },
];

const LIFESTYLE_TIPS = [
  { icon:<FiDroplet size={22}/>,       color:'teal',  title:'Stay Hydrated',     desc:'Drink 8–10 glasses of water daily. Dehydration is the leading trigger for crises. Carry water with you everywhere.' },
  { icon:<MdLocalPharmacy size={22}/>, color:'blue',  title:'Take Your Medications', desc:'Hydroxyurea and folic acid reduce crises significantly. Never skip doses — use the SickleCare app for daily reminders.' },
  { icon:<MdSports size={22}/>,        color:'teal',  title:'Exercise Wisely',   desc:'Gentle, regular movement strengthens your body. Walking, swimming and stretching are ideal. Avoid intense exertion.' },
  { icon:<FiSun size={22}/>,           color:'amber', title:'Manage Temperature',desc:'Cold is a key trigger. Dress warmly, avoid sudden temperature changes, and cover up in air-conditioned spaces.' },
  { icon:<FiHeart size={22}/>,         color:'blue',  title:'Regular Check-ups', desc:'See your doctor or haematologist every 3–6 months, even when feeling fine. Catching issues early prevents bigger ones.' },
  { icon:<FiSmile size={22}/>,         color:'amber', title:'Prioritise Rest',   desc:'Your body works harder than most. Aim for 7–9 hours of sleep. Resting when tired is not weakness — it is wisdom.' },
];

const EMOTIONAL_TIPS = [
  { title:'Your feelings are valid',      desc:'Living with a chronic illness is hard. It is okay to feel frustrated, sad, or exhausted. Acknowledge what you feel.' },
  { title:'Build your support system',   desc:'Talk to family, friends, or a counsellor. You do not have to carry SCD alone — connection is genuinely healing.' },
  { title:'Connect with the community',  desc:'SCD support groups — online or in person — put you with people who understand your experience from the inside.' },
  { title:'Manage stress actively',      desc:'Stress triggers crises. Find what brings you calm — prayer, music, journaling, time with people you love.' },
  { title:'Recognise your strength',     desc:'You face something most people never will, every single day. That takes real courage. Do not underestimate yourself.' },
];

export default function Living() {
  const [crisisRef, crisisV] = useInView(0.1);
  const [lifRef, lifV]       = useInView(0.1);
  const [emoRef, emoV]       = useInView(0.1);

  return (
    <div>
      <PageHero
        badge="Living With SCD"
        title="You Can Live<br/><em>Well With SCD</em>"
        subtitle="With the right knowledge, habits, and support, sickle cell disease does not have to define or limit your life."
        color="teal"
      />

      {/* MANAGING CRISES */}
      <section className="section" ref={crisisRef}>
        <div className="container">
          <div className={`crisis-intro${crisisV ? ' cv' : ''}`}>
            <div className="crisis-text">
              <span className="section-label">
                Crisis Management
              </span>
              <h2 className="section-title">
                Managing Sickle<br/><em>Cell Crises</em>
              </h2>
              <p className="section-sub">
                A sickle cell crisis happens when sickled cells block blood flow,
                causing sudden, severe pain. Knowing what triggers crises — and how
                to respond — can genuinely save your life.
              </p>
            </div>

            <div className="crisis-triggers">
              <div className="ct-header-label">
                <FiAlertTriangle size={15}/> Common Crisis Triggers
              </div>
              {CRISIS_TRIGGERS.map((t, i) => (
                <div
                  key={i}
                  className={`trigger-item${crisisV ? ' tv' : ''}`}
                  style={{ transitionDelay: `${i * 55}ms` }}
                >
                  <span className="trigger-dot"/>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="crisis-steps-label">
             What to Do During a Crisis
          </div>
          <div className="crisis-steps">
            {CRISIS_STEPS.map((s, i) => (
              <div
                key={s.n}
                className={`cs-step cs-${s.color}${crisisV ? ' csv' : ''}`}
                style={{ transitionDelay: `${i * 80 + 200}ms` }}
              >
                <div className="cs-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="crisis-emergency">
            <FiPhone size={19} style={{ color: '#fff', flexShrink: 0 }}/>
            <div>
              <strong>Emergency in Cameroon:</strong> Call <strong>15</strong> (SAMU)
              or go to your nearest hospital emergency room. Do not wait — severe crises
              can become life-threatening within hours.
            </div>
          </div>
        </div>
      </section>

      {/* LIFESTYLE TIPS */}
      <section className="section lifestyle-section" ref={lifRef}>
        <div className="container">
          <div className="section-center-text">
            <span className="section-label"> Daily Wellness</span>
            <h2 className="section-title">
              Healthy Habits for<br/><em>Everyday Life</em>
            </h2>
            <p className="section-sub" style={{ margin: '0 auto 52px' }}>
              Small, consistent habits make a real difference. These are the most
              impactful things you can do every single day.
            </p>
          </div>
          <div className="lifestyle-grid">
            {LIFESTYLE_TIPS.map((t, i) => (
              <FeatureCard
                key={t.title}
                icon={t.icon}
                title={t.title}
                description={t.desc}
                color={t.color}
                delay={i * 65}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HYDRATION FOCUS */}
      <section className="hydration-section">
        <div className="container">
          <div className="hydration-inner">
            <div className="hydration-visual">
              <div className="water-glass">
                <div className="water-fill"/>
                <div className="water-marks">
                  {[8, 7, 6, 5, 4, 3, 2, 1].map(n => (
                    <div key={n} className="wm-line"><span>{n}</span></div>
                  ))}
                </div>
              </div>
              <p className="water-label">8–10 glasses per day</p>
            </div>

            <div className="hydration-text">
              <span className="section-label" style={{ color: 'rgba(255,255,255,.6)' }}>
                <FiDroplet size={14}/> Hydration
              </span>
              <h2 className="section-title" style={{ color: '#fff' }}>
                Water is Your<br/>
                <em style={{ color: '#7dd3fc' }}>Best Medicine</em>
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.76)', lineHeight: 1.78, marginBottom: 22 }}>
                Staying hydrated is the single most effective daily habit for preventing
                sickle cell crises. Water keeps blood flowing freely and stops cells
                from sickling.
              </p>
              <ul className="hydration-tips">
                {[
                  'Start every morning with 2 glasses of water before eating',
                  'Carry a water bottle everywhere — set reminders on your phone',
                  'Drink more when it is hot, when you are ill, or after exercise',
                  'Limit sugary drinks, alcohol, and too much coffee or tea',
                  'Eat water-rich foods: watermelon, cucumber, oranges, papaya',
                ].map((tip, i) => (
                  <li key={i}><FiCheckCircle size={13}/> {tip}</li>
                ))}
              </ul>
              <Link to="/app" className="btn btn-white" style={{ marginTop: 24 }}>
                Track Hydration in the App
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EMOTIONAL SUPPORT */}
      <section className="section emotional-section" ref={emoRef}>
        <div className="container">
          <div className="section-center-text">
            <span className="section-label"> Mental Wellness</span>
            <h2 className="section-title">
              Emotional Support<br/><em>& Encouragement</em>
            </h2>
            <p className="section-sub" style={{ margin: '0 auto 46px' }}>
              Your mental health matters as much as your physical health. Living with
              SCD is emotionally demanding — you deserve real support.
            </p>
          </div>

          <div className="emotional-grid">
            {EMOTIONAL_TIPS.map((e, i) => (
              <div
                key={i}
                className={`emo-card${emoV ? ' emv' : ''}`}
                style={{ transitionDelay: `${i * 75}ms` }}
              >
                <div className="emo-num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>

          <div className="motivational-card">
            <div className="mc-quote">"</div>
            <blockquote className="mc-text">
              You are not defined by your diagnosis. You are defined by your courage,
              your kindness, and the life you choose to live — every single day.
            </blockquote>
            <div className="mc-source"> SickleCare</div>
          </div>
        </div>
      </section>
    </div>
  );
}