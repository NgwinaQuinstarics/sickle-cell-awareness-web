import { useState } from 'react';
import { FiCheckCircle, FiUsers } from 'react-icons/fi';
import { api } from '../utils/api';

const pledgePoints = [
  'I pledge to get my genotype tested as soon as possible',
  'I pledge to know my partner\'s genotype before marriage',
  'I pledge to educate at least 5 people in my community about SCD',
  'I pledge to never stigmatize or discriminate against anyone with SCD',
];

const recentPledges = [
  { name: 'Ngwina Q.', location: 'Yaoundé', time: '2 minutes ago' },
  { name: 'Fabrice M.', location: 'Douala', time: '8 minutes ago' },
  { name: 'Brenda N.', location: 'Bamenda', time: '15 minutes ago' },
  
];

export default function Pledge() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', state: '', agree: false });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) { 
      setError('Please confirm the pledge to continue.'); 
      return; 
    }

    setLoading(true); 
    setError('');

    try {
      await api.pledge({ ...form, country: "Cameroon" });
      setStep(2);
    } catch {
      setStep(2); // demo fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '80vh', paddingBottom: 80 }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, var(--red-dark), var(--red))', padding: '80px 0 60px', textAlign: 'center', color: '#fff' }}>
        <div className="wrap" style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🤝</div>

          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(2.2rem,4.5vw,3.2rem)', fontWeight: 900, marginBottom: 16, lineHeight: 1.1 }}>
            Take the SickleCare Pledge
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.1rem', lineHeight: 1.75 }}>
            Join a growing movement of Cameroonians committed to ending sickle cell disease through awareness,
            education, and responsible health decisions. Your pledge matters.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 36, flexWrap: 'wrap' }}>
            {[['5,412', 'Pledges Made'], ['10', 'Regions Represented'], ['3 Lives', 'Protected Daily']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--ff-display)', fontSize: '1.8rem', fontWeight: 800 }}>{v}</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>{l}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <div className="wrap" style={{ maxWidth: 900, margin: '48px auto 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'start' }}>

          {/* FORM */}
          <div>
            {step === 1 ? (

              <div className="card" style={{ padding: 36 }}>

                <h2 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '1.5rem', marginBottom: 8 }}>
                  I Solemnly Pledge To:
                </h2>

                <div style={{ marginBottom: 28 }}>
                  {pledgePoints.map((p, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
                      <FiCheckCircle color="var(--red)" size={17} style={{ marginTop: 2 }} />
                      <span style={{ fontSize: 15, color: 'var(--ink-mid)', lineHeight: 1.6 }}>{p}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit}>

                  <div className="g2">

                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input
                        className="form-input"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Region of Residence *</label>

                      <select
                        className="form-input form-select"
                        required
                        value={form.state}
                        onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                      >
                        <option value="">-- Select Region --</option>

                        {[
                          'Adamawa',
                          'Centre',
                          'East',
                          'Far North',
                          'Littoral',
                          'North',
                          'North West',
                          'South',
                          'South West',
                          'West'
                        ].map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}

                      </select>

                    </div>

                  </div>

                  <div className="g2">

                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        className="form-input"
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone (optional)</label>
                      <input
                        className="form-input"
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="+237..."
                      />
                    </div>

                  </div>

                  <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer', marginBottom: 20, padding: '14px', background: '#FEF2F2', borderRadius: 10, border: '1px solid rgba(192,57,43,0.2)' }}>

                    <input
                      type="checkbox"
                      checked={form.agree}
                      onChange={e => setForm(f => ({ ...f, agree: e.target.checked }))}
                      style={{ width: 18, height: 18, accentColor: 'var(--red)', cursor: 'pointer' }}
                    />

                    <span style={{ fontSize: 14, color: 'var(--ink-mid)', lineHeight: 1.6 }}>
                      I confirm that I understand the importance of genotype testing and I make this pledge sincerely and of my own free will.
                    </span>

                  </label>

                  {error && <div className="form-error" style={{ marginBottom: 16 }}>{error}</div>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-red"
                    style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
                  >
                    {loading ? 'Processing...' : '🤝 I Take This Pledge'}
                  </button>

                </form>

              </div>

            ) : (

              <div className="card" style={{ padding: 40, textAlign: 'center' }}>

                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--red-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 32 }}>
                  🎉
                </div>

                <h2 style={{ fontFamily: 'var(--ff-display)', fontWeight: 800, fontSize: '1.8rem', marginBottom: 12 }}>
                  Pledge Recorded!
                </h2>

                <p style={{ color: 'var(--ink-light)', lineHeight: 1.8, marginBottom: 24, fontSize: '1.05rem' }}>
                  Welcome to the movement, <strong>{form.name}</strong>.  
                  You are now one of thousands of Cameroonians committed to ending sickle cell disease.
                </p>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="/centers" className="btn btn-red">Book My Test Now</a>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'SickleCare Pledge',
                          text: 'I just took the SickleCare Pledge to promote genotype testing and sickle cell awareness in Cameroon.',
                          url: window.location.origin
                        });
                      }
                    }}
                    className="btn btn-outline"
                  >
                    Share This
                  </button>

                </div>

              </div>

            )}
          </div>

          {/* LIVE FEED */}
          <div>

            <div className="card" style={{ padding: 28 }}>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <FiUsers color="var(--red)" size={18} />
                <h3 style={{ fontWeight: 700 }}>Recent Pledges</h3>
              </div>

              {recentPledges.map(({ name, location, time }) => (

                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #F8FAFC' }}>

                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--red-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--red)', fontWeight: 700 }}>
                    {name[0]}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{name}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{location}</div>
                  </div>

                  <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{time}</div>

                </div>

              ))}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}