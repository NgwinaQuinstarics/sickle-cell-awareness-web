import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { api } from '../utils/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.subject) e.subject = 'Please select a subject';
    if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setLoading(true);
    try {
      await api.contact(form);
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    } finally { setLoading(false); }
  };

  const set = (k) => (e) => { setForm(f => ({ ...f, [k]: e.target.value })); if (errors[k]) setErrors(err => { const n = { ...err }; delete n[k]; return n; }); };

  return (
    <div style={{ background: '#F8FAFC', paddingBottom: 80 }}>
      {/* Header */}
      <section style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '72px 0 56px' }}>
        <div className="wrap" style={{ maxWidth: 680, textAlign: 'center' }}>
          <div className="eyebrow" style={{ display: 'inline-flex' }}>📬 Contact Us</div>
          <h1 className="h2" style={{ marginTop: 8, marginBottom: 16 }}>We're Here to Help</h1>
          <p className="lead" style={{ margin: '0 auto' }}>Have questions about sickle cell disease, genotype testing, or the SickleCare platform? Our team is ready to assist you.</p>
        </div>
      </section>

      <div className="wrap" style={{ maxWidth: 1000, margin: '48px auto 0' }}>
        <div className="g2" style={{ gap: 40, alignItems: 'start' }}>
          {/* Form */}
          <div>
            <div className="card" style={{ padding: 36 }}>
              <h2 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '1.3rem', marginBottom: 24 }}>Send Us a Message</h2>

              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <FiCheckCircle color="var(--green)" size={52} style={{ margin: '0 auto 16px', display: 'block' }} />
                  <h3 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '1.3rem', marginBottom: 12 }}>Message Sent Successfully!</h3>
                  <p style={{ color: 'var(--ink-light)', lineHeight: 1.7, marginBottom: 24 }}>Thank you for reaching out. Our team will respond within 24 hours. For urgent medical emergencies, please call your local emergency services.</p>
                  <button onClick={() => setStatus('')} className="btn btn-outline btn-sm">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="g2">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input className="form-input" value={form.name} onChange={set('name')} placeholder="Your full name" />
                      {errors.name && <div className="form-error">{errors.name}</div>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input className="form-input" type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" />
                      {errors.email && <div className="form-error">{errors.email}</div>}
                    </div>
                  </div>
                  <div className="g2">
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input className="form-input" type="tel" value={form.phone} onChange={set('phone')} placeholder="+234 800 000 0000" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject *</label>
                      <select className="form-input form-select" value={form.subject} onChange={set('subject')}>
                        <option value="">Select subject...</option>
                        <option>General Inquiry</option>
                        <option>Medical Question</option>
                        <option>Genotype Testing Help</option>
                        <option>Partnership / Collaboration</option>
                        <option>Report a Testing Center</option>
                        <option>Platform Feedback</option>
                        <option>Media & Press</option>
                        <option>Volunteer / Support</option>
                      </select>
                      {errors.subject && <div className="form-error">{errors.subject}</div>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea className="form-input" value={form.message} onChange={set('message')} placeholder="Tell us how we can help you..." rows={6} style={{ resize: 'vertical' }} />
                    {errors.message && <div className="form-error">{errors.message}</div>}
                    <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 4 }}>{form.message.length} characters (minimum 20)</div>
                  </div>

                  {status === 'error' && (
                    <div style={{ background: 'var(--red-light)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 14, color: 'var(--red)' }}>
                      Something went wrong. Please try again or email us directly at hello@sicklecare.org
                    </div>
                  )}

                  <button type="submit" disabled={loading} className="btn btn-red" style={{ width: '100%', justifyContent: 'center', padding: '15px' }}>
                    {loading ? <><span className="spinner" />Sending...</> : <><FiSend size={16} />Send Message</>}
                  </button>
                  <p style={{ fontSize: 12, color: 'var(--ink-muted)', textAlign: 'center', marginTop: 12 }}>We respond within 24 business hours. For medical emergencies, call 112 or visit your nearest hospital.</p>
                </form>
              )}
            </div>
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
    { 
      icon: <FiMail />, 
      title: 'Email', 
      value: 'hello@sicklecare.cm', 
      sub: 'Responses within 24 hours' 
    },
    { 
      icon: <FiPhone />, 
      title: 'Hotline', 
      value: '+237 6XX XXX XXX', 
      sub: 'Mon–Fri, 9AM–6PM WAT' 
    },
    { 
      icon: <FiMapPin />, 
      title: 'Office', 
      value: 'Bamenda, Cameroon', 
      sub: 'Serving communities across Cameroon & Central Africa' 
    },
  ].map(({ icon, title, value, sub }) => (
              <div key={title} style={{ background: '#fff', borderRadius: 16, padding: '22px 24px', border: '1px solid var(--border)', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--red-light)', color: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink-mid)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{title}</div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink)', marginTop: 2 }}>{value}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>{sub}</div>
                </div>
              </div>
            ))}

            <div style={{ background: '#FFF7ED', border: '1px solid #FDE68A', borderRadius: 16, padding: '22px 24px' }}>
              <div style={{ fontWeight: 700, color: '#92400E', marginBottom: 8, fontSize: 14 }}>🚨 Medical Emergency?</div>
              <p style={{ fontSize: 14, color: '#92400E', lineHeight: 1.7 }}>Do NOT use this form for medical emergencies. Call <strong>112</strong> or go to your nearest hospital immediately. For sickle cell crises, seek emergency care right away.</p>
            </div>

            <div style={{ background: 'linear-gradient(135deg, var(--blue), #2563EB)', borderRadius: 16, padding: '24px', color: '#fff' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>🤝 Partner With Us</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: 14 }}>Are you a hospital, NGO, school, or organization? Partner with SickleCare to bring genotype testing awareness to your community.</p>
              <a href="mailto:partnerships@sicklecare.org" className="btn btn-ghost btn-sm">partnerships@sicklecare.org</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
