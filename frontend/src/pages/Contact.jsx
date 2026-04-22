import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiSend, FiCheckCircle } from 'react-icons/fi';
import { MdBloodtype } from 'react-icons/md';
import PageHero from '../components/PageHero';
import useInView from '../hooks/useInView';
import './Contact.css';

const TOPICS = ['General Enquiry', 'About Sickle Cell Disease', 'Genotype Testing', 'Mobile App', 'Partnership / Media', 'Crisis Support', 'Other'];

export default function Contact() {
  const [formRef, formV] = useInView(0.1);
  const [form, setForm] = useState({ name:'', email:'', topic:'General Enquiry', message:'' });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSent(true);
    setErrors({});
  };

  return (
    <div>
      <PageHero
        badge="Get In Touch"
        title="Contact<br/><em>SickleCare</em>"
        subtitle="Have a question, feedback, or need support? We'd love to hear from you."
        color="blue"
      />

      <section className="section">
        <div className="container">
          <div className={`contact-grid${formV ? ' cgv' : ''}`} ref={formRef}>

            {/* FORM */}
            <div className="contact-form-wrap">
              <h2 className="cf-title">Send Us a Message</h2>
              <p className="cf-sub">We respond within 24–48 hours on weekdays.</p>

              {sent ? (
                <div className="sent-msg">
                  <FiCheckCircle size={40} style={{ color:'var(--teal-600)' }}/>
                  <h3>Message Received!</h3>
                  <p>Thank you for reaching out. We will get back to you within 24–48 hours.</p>
                  <button className="btn btn-primary" onClick={() => { setSent(false); setForm({ name:'', email:'', topic:'General Enquiry', message:'' }); }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className={`form-group${errors.name ? ' has-error' : ''}`}>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name" type="text" placeholder="Your full name"
                      value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  <div className={`form-group${errors.email ? ' has-error' : ''}`}>
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email" type="email" placeholder="your@email.com"
                      value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="topic">Topic</label>
                    <select id="topic" value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}>
                      {TOPICS.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  <div className={`form-group${errors.message ? ' has-error' : ''}`}>
                    <label htmlFor="message">Your Message *</label>
                    <textarea
                      id="message" rows={6} placeholder="Write your message here..."
                      value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    />
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ width:'100%', justifyContent:'center' }}>
                    <FiSend size={18}/> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* CONTACT INFO */}
            <div className="contact-info">
              <div className="ci-card">
                <div className="ci-icon ci-blue"><MdBloodtype size={26}/></div>
                <h3>SickleCare Platform</h3>
                <p>Empowering Cameroonians with sickle cell knowledge, tools, and community.</p>
              </div>

              <div className="ci-details">
                {[
                  { icon:<FiMail size={18}/>,  label:'Email', val:'info@sicklecare.cm', href:'mailto:info@sicklecare.cm' },
                  { icon:<FiPhone size={18}/>, label:'Phone', val:'+237 000 000 000',  href:'tel:+237000000000' },
                  { icon:<FiMapPin size={18}/>,label:'Location', val:'Yaoundé, Cameroon', href:null },
                ].map(d => (
                  <div key={d.label} className="ci-row">
                    <div className="ci-row-icon">{d.icon}</div>
                    <div>
                      <div className="ci-row-label">{d.label}</div>
                      {d.href
                        ? <a href={d.href} className="ci-row-val ci-link">{d.val}</a>
                        : <div className="ci-row-val">{d.val}</div>
                      }
                    </div>
                  </div>
                ))}
              </div>

              <div className="ci-emergency">
                <div className="cie-dot"/><strong>Medical Emergency:</strong> Call <strong>15</strong> (SAMU Cameroon)
              </div>

              <div className="ci-social">
                <div className="ci-social-label">Follow Us</div>
                <div className="ci-social-icons">
                  {[
                    { icon:<FiFacebook size={18}/>, href:'#', label:'Facebook'  },
                    { icon:<FiTwitter  size={18}/>, href:'#', label:'Twitter'   },
                    { icon:<FiInstagram size={18}/>,href:'#', label:'Instagram' },
                    { icon:<FiYoutube  size={18}/>, href:'#', label:'YouTube'   },
                  ].map(s => (
                    <a key={s.label} href={s.href} className="ci-soc-btn" aria-label={s.label}>{s.icon}</a>
                  ))}
                </div>
              </div>

              <div className="ci-disclaimer">
                <FiCheckCircle size={14} style={{ flexShrink:0, marginTop:2 }}/>
                <p>This platform provides educational information only — not medical advice. Always consult a qualified healthcare professional for personal medical decisions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
