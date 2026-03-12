import { useState } from 'react'
import Hero from '../components/Hero'
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck } from 'react-icons/fi'
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      <Hero
        badge="📬 Contact Us"
        title="We'd Love to Hear From You"
        subtitle="Have questions, feedback, or partnership inquiries? Our team is here to help. Reach out and we'll get back to you promptly."
      />

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: 60, alignItems: 'start' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600, marginBottom: 8 }}>Get in Touch</h2>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: 36 }}>
                Whether you're looking for information about sickle cell disease, interested in partnering with us, or want to support the platform, we're always open.
              </p>

              {[
                { icon: <FiMail />, title: 'Email Us', value: 'hello@sicklecare.org', sub: 'We respond within 24 hours' },
                { icon: <FiPhone />, title: 'Call Us', value: '+234 800 SCD-CARE', sub: 'Mon–Fri, 9am–6pm WAT' },
                { icon: <FiMapPin />, title: 'Our Office', value: 'Lagos, Nigeria', sub: 'Serving Africa & beyond' },
              ].map(({ icon, title, value, sub }) => (
                <div key={title} style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{title}</div>
                    <div style={{ fontSize: 15, color: 'var(--text-dark)', marginBottom: 2 }}>{value}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-light)' }}>{sub}</div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 36 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Follow Us</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp].map((Icon, i) => (
                    <a key={i} href="#" style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--primary)' }}>
                      <Icon size={17} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Support note */}
              <div style={{ marginTop: 40, background: '#FEF3C7', borderRadius: 14, padding: 20, border: '1px solid #FDE68A' }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#92400E', marginBottom: 6 }}>🆘 In a Medical Emergency?</div>
                <div style={{ fontSize: 13, color: '#92400E', lineHeight: 1.7 }}>
                  Do not use this form for emergencies. Call your local emergency services or go to the nearest hospital immediately. If you're having a sickle cell crisis, seek immediate medical care.
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card" style={{ padding: 36 }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--secondary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--secondary)', fontSize: 28 }}>
                    <FiCheck />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.4rem', marginBottom: 12 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-light)', lineHeight: 1.7, marginBottom: 24 }}>
                    Thank you for reaching out. We'll respond to your message within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-outline">Send Another Message</button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.3rem', marginBottom: 24 }}>Send Us a Message</h3>
                  <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-mid)', display: 'block', marginBottom: 6 }}>Full Name *</label>
                        <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border)', fontSize: 14, outline: 'none', transition: 'border-color 0.2s' }}
                          onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                          onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-mid)', display: 'block', marginBottom: 6 }}>Email Address *</label>
                        <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                          placeholder="your@email.com"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border)', fontSize: 14, outline: 'none', transition: 'border-color 0.2s' }}
                          onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                          onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-mid)', display: 'block', marginBottom: 6 }}>Subject *</label>
                      <select required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border)', fontSize: 14, outline: 'none', background: '#fff', cursor: 'pointer' }}>
                        <option value="">Select a subject...</option>
                        <option>General Inquiry</option>
                        <option>Medical Question</option>
                        <option>Partnership & Collaboration</option>
                        <option>App Feedback</option>
                        <option>Volunteer / Support</option>
                        <option>Media & Press</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-mid)', display: 'block', marginBottom: 6 }}>Message *</label>
                      <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="Write your message here..."
                        rows={5}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border)', fontSize: 14, outline: 'none', resize: 'vertical', fontFamily: 'var(--font-body)', lineHeight: 1.6, transition: 'border-color 0.2s' }}
                        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px' }}>
                      Send Message <FiSend />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Strip */}
      <section className="section-sm" style={{ background: 'var(--primary-light)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: 'var(--text-light)', marginBottom: 24, fontWeight: 500 }}>Trusted by healthcare organizations and NGOs across Africa</div>
          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap', opacity: 0.5 }}>
            {['WHO Africa', 'LUTH', 'UCH Ibadan', 'SCDAA Nigeria', 'Red Cross NG'].map(org => (
              <div key={org} style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-dark)', letterSpacing: '0.04em' }}>{org}</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
