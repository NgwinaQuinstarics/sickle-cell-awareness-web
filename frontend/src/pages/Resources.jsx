import React, { useState } from 'react';
import { FiBookOpen, FiHeart, FiAlertTriangle, FiInfo, FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi';
import { MdLocalPharmacy } from 'react-icons/md';
import PageHero from '../components/PageHero';
import useInView from '../hooks/useInView';
import './Resources.css';

const ARTICLES = [
  { cat:'Education', color:'blue', icon:<FiBookOpen size={16}/>, title:'What Every Cameroonian Should Know About Sickle Cell Disease', excerpt:'A comprehensive, easy-to-read guide explaining SCD in simple language for patients, families, and community members.', time:'8 min read' },
  { cat:'Prevention', color:'teal', icon:<FiHeart size={16}/>, title:'Why Genotype Testing Matters Before Marriage', excerpt:'Understanding genotype compatibility could prevent tens of thousands of new SCD cases in Cameroon each decade.', time:'5 min read' },
  { cat:'Health Tips', color:'amber', icon:<MdLocalPharmacy size={16}/>, title:'Living Well With Hydroxyurea: A Patient Guide', excerpt:'Hydroxyurea is the most effective medication for SCD. Here is everything you need to know about taking it safely.', time:'6 min read' },
  { cat:'Crisis Care', color:'red', icon:<FiAlertTriangle size={16}/>, title:'Recognising and Responding to a Sickle Cell Crisis', excerpt:'A practical emergency guide for patients and caregivers — know the warning signs and exactly what to do.', time:'4 min read' },
  { cat:'Education', color:'blue', icon:<FiBookOpen size={16}/>, title:'SCD and Malaria: A Double Threat in Cameroon', excerpt:'Why people with SCD are particularly vulnerable to malaria and how to protect yourself effectively.', time:'5 min read' },
  { cat:'Wellness', color:'teal', icon:<FiHeart size={16}/>, title:'Nutrition Guide for People Living With SCD', excerpt:'The right foods can reduce inflammation, support blood production, and help prevent crises. Practical dietary advice for Cameroon.', time:'7 min read' },
];

const FAQS = [
  { q:'Can sickle cell disease be cured?', a:'Currently, the only potential cure for SCD is a bone marrow or stem cell transplant. However, this is complex, costly, and requires a compatible donor. Medications like Hydroxyurea significantly reduce symptoms and complications. Research into gene therapy is advancing rapidly.' },
  { q:'Can someone with AS (sickle cell trait) get symptoms?', a:'People with AS genotype are generally healthy and do not experience the painful crises of SCD. However, in rare cases of extreme dehydration, very high altitude, or intense physical exertion, they may experience mild symptoms. Overall, AS individuals live normal lives.' },
  { q:'Can sickle cell disease be detected before birth?', a:'Yes. Prenatal testing (including chorionic villus sampling and amniocentesis) can detect SCD in a foetus. Genetic counselling for couples who are both AS or SS is strongly recommended before or during pregnancy.' },
  { q:'Is it safe for someone with SCD to exercise?', a:'Yes, gentle and moderate exercise is beneficial. Swimming, walking, yoga and light cycling are excellent. Avoid intense, prolonged physical exertion, especially in hot or cold weather. Always stay hydrated during any physical activity.' },
  { q:'What vaccinations should children with SCD receive?', a:'Children with SCD should receive all standard vaccinations, plus additional protection against pneumococcal disease and meningitis. They should also receive the annual influenza vaccine. Talk to your paediatrician for a complete vaccination schedule.' },
  { q:'Where can I get genotype tested in Cameroon?', a:'Haemoglobin electrophoresis (genotype testing) is available at most regional and district hospitals across Cameroon, including hospitals in Yaoundé, Douala, Bafoussam, Bamenda, and other major cities. You can also ask at private medical laboratories.' },
  { q:'How often should someone with SCD see a doctor?', a:'People with SCD should have a routine health check-up every 3–6 months, even when feeling well. This allows doctors to monitor organ function, adjust medications, and catch complications early. Do not wait until a crisis to see your doctor.' },
  { q:'Can someone with SCD have children?', a:'Yes. Many people with SCD have healthy children. However, it is strongly recommended to know your partner\'s genotype and discuss the risk with a genetic counsellor before having children, especially if both partners are SS or one is SS and the other AS.' },
];

const TIPS = [
  { icon:<FiHeart size={20}/>,       color:'teal',  title:'Drink Water First', tip:'Start every morning with 2 large glasses of water before eating. This habit alone reduces your crisis risk significantly.' },
  { icon:<MdLocalPharmacy size={20}/>, color:'blue', title:'Set Medication Alarms', tip:'Use your phone to set daily medication alarms. Consistency with hydroxyurea and folic acid is critical for long-term health.' },
  { icon:<FiAlertTriangle size={20}/>, color:'amber',title:'Know Your Triggers', tip:'Keep a simple diary of what preceded your last few crises. Identifying your personal triggers helps you avoid them.' },
  { icon:<FiInfo size={20}/>,        color:'blue',  title:'Carry Your Medical Card', tip:'Always carry a card with your genotype, medications, and your doctor\'s contact. This is vital in emergencies.' },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen(o => !o)}>
        <span>{faq.q}</span>
        {open ? <FiChevronUp size={18}/> : <FiChevronDown size={18}/>}
      </button>
      {open && <div className="faq-a">{faq.a}</div>}
    </div>
  );
}

export default function Resources() {
  const [artRef, artV] = useInView(0.1);
  const [tipRef, tipV] = useInView(0.1);
  const [faqRef, faqV] = useInView(0.05);
  const [filter, setFilter] = useState('All');
  const cats = ['All', 'Education', 'Prevention', 'Health Tips', 'Crisis Care', 'Wellness'];
  const filtered = filter === 'All' ? ARTICLES : ARTICLES.filter(a => a.cat === filter);

  return (
    <div>
      <PageHero
        badge="Educational Resources"
        title="Resources &<br/><em>Health Library</em>"
        subtitle="Accurate, accessible, compassionate information about sickle cell disease — in plain language for everyone."
        color="blue"
      />

      {/* ARTICLES */}
      <section className="section" ref={artRef}>
        <div className="container">
          <div className="res-header">
            <div>
              <span className="section-label"><FiBookOpen size={14}/> Articles</span>
              <h2 className="section-title">Health Articles<br/><em>& Guides</em></h2>
            </div>
            <div className="res-filters">
              {cats.map(c => (
                <button key={c} className={`res-filter${filter === c ? ' active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div className="articles-grid">
            {filtered.map((a, i) => (
              <div key={i} className={`article-card${artV ? ' av' : ''}`} style={{ transitionDelay:`${i * 70}ms` }}>
                <div className={`art-cat badge badge-${a.color}`}>{a.icon} {a.cat}</div>
                <h3 className="art-title">{a.title}</h3>
                <p className="art-excerpt">{a.excerpt}</p>
                <div className="art-footer">
                  <span className="art-time">{a.time}</span>
                  <button className="art-read">Read Article <FiExternalLink size={13}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK TIPS */}
      <section className="section tips-section" ref={tipRef}>
        <div className="container">
          <div className="section-center-text">
            <span className="section-label"><FiHeart size={14}/> Quick Tips</span>
            <h2 className="section-title">Crisis Prevention<br/><em>Quick Tips</em></h2>
          </div>
          <div className="tips-grid">
            {TIPS.map((t, i) => (
              <div key={i} className={`tip-card tip-${t.color}${tipV ? ' tv' : ''}`} style={{ transitionDelay:`${i * 80}ms` }}>
                <div className="tip-icon">{t.icon}</div>
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section" ref={faqRef}>
        <div className="container">
          <div className={`faq-inner${faqV ? ' fv' : ''}`}>
            <div className="faq-header">
              <span className="section-label"><FiInfo size={14}/> FAQ</span>
              <h2 className="section-title">Frequently Asked<br/><em>Questions</em></h2>
              <p className="section-sub">Honest answers to the questions we hear most often about sickle cell disease.</p>
            </div>
            <div className="faq-list">
              {FAQS.map((f, i) => <FAQItem key={i} faq={f}/>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
