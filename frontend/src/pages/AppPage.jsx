import React from 'react';
import { FiBell, FiDroplet, FiBarChart2, FiShield, FiBookOpen, FiHeart, FiSmartphone, FiCheckCircle, FiClock, FiUsers } from 'react-icons/fi';
import { MdBloodtype, MdNotifications, MdTrackChanges } from 'react-icons/md';
import PageHero from '../components/PageHero';
import useInView from '../hooks/useInView';
import './AppPage.css';

const APP_FEATURES = [
  { icon:<FiBell size={24}/>,       color:'blue',  title:'Medication Reminders',    desc:'Custom schedules for all your medications. Get notified so you never miss a critical dose again.' },
  { icon:<FiDroplet size={24}/>,    color:'teal',  title:'Hydration Tracker',       desc:'Log daily water intake and set intake goals. Visual progress keeps you motivated to stay hydrated.' },
  { icon:<FiBarChart2 size={24}/>,  color:'amber', title:'Symptom Diary',           desc:'Track pain levels, fatigue and symptoms daily. Build a complete health record to share with your doctor.' },
  { icon:<FiShield size={24}/>,     color:'blue',  title:'Crisis Prevention Guide', desc:'Personalised tips and early-warning signals. Know when a crisis may be coming and act early.' },
  { icon:<FiBookOpen size={24}/>,   color:'teal',  title:'Education Library',       desc:'Curated, doctor-reviewed articles and videos about SCD in French and English, designed for Cameroon.' },
  { icon:<FiHeart size={24}/>,      color:'amber', title:'Community & Support',     desc:'Connect with others living with SCD. Share experiences, advice, and encouragement in a safe space.' },
  { icon:<FiClock size={24}/>,      color:'blue',  title:'Appointment Tracker',     desc:'Log upcoming doctor visits, lab tests, and follow-ups so you never lose track of important appointments.' },
  { icon:<FiUsers size={24}/>,      color:'teal',  title:'Caregiver Mode',          desc:'Parents and caregivers can manage a loved one\'s profile. Perfect for children and family members with SCD.' },
];

const SCREENS = [
  { title:'Dashboard', icon:<MdBloodtype size={18}/>, items:[{l:'Medication', v:'✓ Taken', c:'green'},{l:'Hydration', v:'7/10 glasses', c:'blue'},{l:'Pain Level', v:'Mild', c:'amber'},{l:'Crisis Risk', v:'Low', c:'green'}] },
  { title:'Medication', icon:<MdNotifications size={18}/>, items:[{l:'Hydroxyurea 500mg', v:'8:00 AM ✓', c:'green'},{l:'Folic Acid 5mg', v:'8:00 AM ✓', c:'green'},{l:'Penicillin V', v:'2:00 PM 🔔', c:'amber'},{l:'Evening dose', v:'8:00 PM ⏰', c:'blue'}] },
  { title:'Symptom Log', icon:<MdTrackChanges size={18}/>, items:[{l:'Pain', v:'2/10', c:'green'},{l:'Fatigue', v:'Moderate', c:'amber'},{l:'Chest pain', v:'None', c:'green'},{l:'Headache', v:'Mild', c:'amber'}] },
];

export default function AppPage() {
  const [featRef, featV] = useInView(0.1);
  const [mockRef, mockV] = useInView(0.1);

  return (
    <div>
      <PageHero
        badge="Mobile Application"
        title="SickleCare<br/><em>In Your Pocket</em>"
        subtitle="A powerful, compassionate mobile app built specifically for people living with sickle cell disease in Cameroon."
        color="blue"
      />

      {/* APP OVERVIEW */}
      <section className="section">
        <div className="container">
          <div className="app-overview">
            <div className="ao-text">
              <span className="section-label"><FiSmartphone size={14}/> About the App</span>
              <h2 className="section-title">Designed for Real<br/><em>Life in Cameroon</em></h2>
              <p className="section-sub">
                The SickleCare app was built around the daily realities of living with SCD in Cameroon —
                unreliable internet connections, medication access challenges, and the need for content
                in both French and English.
              </p>
              <div className="ao-stats">
                {[
                  { val:'Available', sub:'in French & English' },
                  { val:'Offline', sub:'Core features work offline' },
                  { val:'Free', sub:'Core features, forever' },
                ].map(s => (
                  <div key={s.val} className="ao-stat">
                    <div className="ao-stat-val">{s.val}</div>
                    <div className="ao-stat-sub">{s.sub}</div>
                  </div>
                ))}
              </div>
              <div className="download-buttons">
                <div className="dl-btn dl-btn-coming">
                  <FiSmartphone size={22}/>
                  <div>
                    <div className="dl-sub">Coming soon to</div>
                    <div className="dl-main">Google Play</div>
                  </div>
                </div>
                <div className="dl-btn dl-btn-coming">
                  <FiSmartphone size={22}/>
                  <div>
                    <div className="dl-sub">Coming soon to</div>
                    <div className="dl-main">App Store</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ao-screens" ref={mockRef}>
              <div className={`screens-wrap${mockV ? ' sv' : ''}`}>
                {SCREENS.map((s, i) => (
                  <div key={s.title} className="app-screen" style={{ zIndex: 3 - i, transform: `translateX(${i * 32}px) scale(${1 - i * 0.05})` }}>
                    <div className="as-header">
                      {s.icon}
                      <span>{s.title}</span>
                      <div className="as-dots"><div/><div/><div/></div>
                    </div>
                    <div className="as-body">
                      {s.items.map((it, j) => (
                        <div key={j} className="as-row">
                          <span className="as-label">{it.l}</span>
                          <span className={`as-val asv-${it.c}`}>{it.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="section app-features-section" ref={featRef}>
        <div className="container">
          <div className="section-center-text">
            <span className="section-label"><FiCheckCircle size={14}/> Features</span>
            <h2 className="section-title">Everything You Need<br/><em>Built Right In</em></h2>
            <p className="section-sub" style={{ margin:'0 auto 56px' }}>
              Every feature was designed with direct input from people living with SCD in Cameroon.
            </p>
          </div>
          <div className="app-features-grid">
            {APP_FEATURES.map((f, i) => (
              <div key={f.title} className={`af-card af-${f.color}${featV ? ' afv' : ''}`} style={{ transitionDelay:`${i * 65}ms` }}>
                <div className="af-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="app-cta-section">
        <div className="container">
          <div className="app-cta-card">
            <div className="acc-icon"><FiSmartphone size={40}/></div>
            <h2>The App is Coming Soon</h2>
            <p>SickleCare mobile is under active development. Sign up to be notified the moment it launches — and be among the first to get it free.</p>
            <div className="acc-notify">
              <input type="email" placeholder="Enter your email address" className="notify-input"/>
              <button className="btn btn-white">Notify Me</button>
            </div>
            <p className="acc-note">We'll only email you when the app launches. No spam, ever.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
