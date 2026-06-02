import React from 'react';
import {
  FiBell,
  FiDroplet,
  FiBarChart2,
  FiShield,
  FiBookOpen,
  FiHeart,
  FiSmartphone,
  FiCheckCircle,
  FiClock,
  FiUsers
} from 'react-icons/fi';

import { MdBloodtype } from 'react-icons/md';
import PageHero from '../components/PageHero';
import useInView from '../hooks/useInView';
import './AppPage.css';

import appScreenshot from '../assets/hero.png';

const APP_FEATURES = [
  {
    icon: <FiDroplet size={24} />,
    color: 'teal',
    title: 'Hydration Tracking & Reminders',
    desc: 'Track your daily water intake and receive smart reminders from SickleCare to stay consistently hydrated and reduce crisis risk.'
  },
  {
    icon: <FiBell size={24} />,
    color: 'blue',
    title: 'Smart Medication & Care Reminders',
    desc: 'Set personalized reminders for medication, hydration, and daily care routines so you stay on track without missing important steps.'
  },
  {
    icon: <FiBarChart2 size={24} />,
    color: 'amber',
    title: 'Pain & Symptom Tracking',
    desc: 'Log your pain levels and symptoms over time to understand patterns and help you and your doctor make better health decisions.'
  },
  {
    icon: <FiShield size={24} />,
    color: 'blue',
    title: 'Sika AI Support',
    desc: 'Get instant guidance and emotional support from Sika AI, your built-in assistant designed to help you understand symptoms and daily care.'
  },
  {
    icon: <FiBookOpen size={24} />,
    color: 'teal',
    title: 'Health History Tracking',
    desc: 'Automatically build your personal health history and download reports to share with doctors anytime you need them.'
  },
 
  {
    icon: <FiClock size={24} />,
    color: 'blue',
    title: 'Daily Health Timeline',
    desc: 'View a clear timeline of your daily health activities including hydration, pain records, and medication reminders.'
  },
  
];

export default function AppPage() {
  const [featRef, featV] = useInView(0.1);

  return (
    <div>
      <PageHero
        badge="Mobile Application"
        title="SickleCare<br/><em>In Your Pocket</em>"
        subtitle="A powerful mobile health companion built for people living with sickle cell disease in Cameroon."
        color="blue"
      />

      {/* APP OVERVIEW */}
      <section className="section">
        <div className="container">
          <div className="app-overview">

            {/* TEXT SIDE */}
            <div className="ao-text">
              <span className="section-label">
                About the App
              </span>

              <h2 className="section-title">
                Designed for Real<br />
                <em>Life in Cameroon</em>
              </h2>

              <p className="section-sub">
                The SickleCare app was built for real-world conditions in Cameroon —
                low connectivity, multilingual support, and daily health tracking needs.
              </p>

              <div className="ao-stats">
                {[
                  { val: 'Available', sub: 'in French & English' },
                  { val: 'Offline', sub: 'Core features work offline' },
                  { val: 'Free', sub: 'Core features, forever' }
                ].map(s => (
                  <div key={s.val} className="ao-stat">
                    <div className="ao-stat-val">{s.val}</div>
                    <div className="ao-stat-sub">{s.sub}</div>
                  </div>
                ))}
              </div>

              <div className="download-buttons">
                <div className="dl-btn dl-btn-coming">
                  <FiSmartphone size={22} />
                  <div>
                    <div className="dl-sub">Coming soon to</div>
                    <div className="dl-main">Google Play</div>
                  </div>
                </div>

                <div className="dl-btn dl-btn-coming">
                  <FiSmartphone size={22} />
                  <div>
                    <div className="dl-sub">Coming soon to</div>
                    <div className="dl-main">App Store</div>
                  </div>
                </div>
              </div>
            </div>

            {/* IMAGE SIDE  */}
            <div className="ao-screens">
              <div className="screens-wrap sv">

                <div className="app-screen-image-wrapper">
                  <img
                    src={appScreenshot}
                    alt="SickleCare Mobile App Screenshot"
                    className="app-screen-image"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section app-features-section" ref={featRef}>
        <div className="container">

          <div className="section-center-text">

            <h2 className="section-title">
              Everything You Need<br />
              <em>Built Into One App</em>
            </h2>

            <p className="section-sub">
              Designed with healthcare professionals and real patients in Cameroon.
            </p>
          </div>

          <div className="app-features-grid">
            {APP_FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`af-card af-${f.color}${featV ? ' afv' : ''}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
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

            
            <h2>The App is Coming Soon</h2>

            <p>
              Be the first to experience SickleCare mobile when it launches.
              Stay informed and get early access updates.
            </p>

            <div className="acc-notify">
              <input
                type="email"
                placeholder="Enter your email address"
                className="notify-input"
              />
              <button className="btn btn-white">Notify Me</button>
            </div>

            <p className="acc-note">
              No spam. Only important launch updates.
            </p>

          </div>
        </div>
      </section>

    </div>
  );
}