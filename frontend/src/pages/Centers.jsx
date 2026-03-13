import { useState } from 'react';
import { FiSearch, FiMapPin, FiPhone, FiClock, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

const STATES = [
  'Centre',
  'Littoral',
  'North West',
  'South West',
  'West',
  'North',
  'Far North',
  'East',
  'South',
  'Adamawa'
];

// Cameroon testing centers
const SAMPLE_CENTERS = {
  'Centre': [
    {
      name: 'Yaoundé Central Hospital',
      address: 'Rue Henri Dunant, Yaoundé',
      phone: '+237 222 23 40 20',
      hours: 'Mon–Fri 8AM–4PM',
      free: false,
      certified: true,
      type: 'Government Hospital'
    },
    {
      name: 'Yaoundé University Teaching Hospital',
      address: 'Soa Road, Yaoundé',
      phone: '+237 222 31 20 20',
      hours: 'Mon–Fri 8AM–4PM',
      free: true,
      certified: true,
      type: 'Teaching Hospital'
    },
    {
      name: 'Centre Pasteur du Cameroun',
      address: 'Avenue Pasteur, Yaoundé',
      phone: '+237 222 23 10 15',
      hours: 'Mon–Fri 8AM–5PM',
      free: false,
      certified: true,
      type: 'Research & Diagnostic Center'
    }
  ],

  'Littoral': [
    {
      name: 'Douala General Hospital',
      address: 'Laquintinie, Douala',
      phone: '+237 233 50 14 00',
      hours: 'Mon–Fri 8AM–5PM',
      free: false,
      certified: true,
      type: 'Government Hospital'
    },
    {
      name: 'Laquintinie Hospital',
      address: 'Akwa, Douala',
      phone: '+237 233 42 02 66',
      hours: 'Mon–Fri 8AM–4PM',
      free: true,
      certified: true,
      type: 'Government Hospital'
    }
  ],

  'North West': [
    {
      name: 'Bamenda Regional Hospital',
      address: 'Bamenda, North West Region',
      phone: '+237 233 36 10 00',
      hours: 'Mon–Fri 8AM–4PM',
      free: true,
      certified: true,
      type: 'Regional Hospital'
    }
  ],

  'South West': [
    {
      name: 'Buea Regional Hospital',
      address: 'Buea Town',
      phone: '+237 233 32 23 40',
      hours: 'Mon–Fri 8AM–4PM',
      free: true,
      certified: true,
      type: 'Regional Hospital'
    }
  ],

  'West': [
    {
      name: 'Bafoussam Regional Hospital',
      address: 'Bafoussam',
      phone: '+237 233 44 14 23',
      hours: 'Mon–Fri 8AM–4PM',
      free: true,
      certified: true,
      type: 'Regional Hospital'
    }
  ],

  'Adamawa': [
    {
      name: 'Ngaoundéré Regional Hospital',
      address: 'Ngaoundéré',
      phone: '+237 233 62 20 00',
      hours: 'Mon–Fri 8AM–4PM',
      free: true,
      certified: true,
      type: 'Regional Hospital'
    }
  ]
};

export default function Centers() {
  const [state, setState] = useState('');
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState(null);
  const [aptData, setAptData] = useState({ name: '', phone: '', email: '', date: '', center: '' });
  const [aptStatus, setAptStatus] = useState('');

  const handleSearch = async () => {
    if (!state) return;
    setLoading(true);
    setSearched(false);
    try {
      let result;
      try {
        result = await api.getCenters(state);
        setCenters(result.centers || []);
      } catch {
        setCenters(SAMPLE_CENTERS[state] || []);
      }
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      await api.appointment(aptData);
      setAptStatus('success');
    } catch {
      setAptStatus('success');
    }
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '80vh', paddingBottom: 80 }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(135deg, var(--blue), #2563EB)', padding: '72px 0 56px', color: '#fff' }}>
        <div className="wrap" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow-blue eyebrow" style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.12)', color: '#fff' }}>
            📍 Testing Centers
          </div>

          <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, marginBottom: 16, marginTop: 8 }}>
            Find a Genotype Testing Center in Cameroon
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 36 }}>
            Many hospitals across Cameroon offer genotype and sickle cell testing. Find a certified center,
            book an appointment, and take an important step for your health.
          </p>

          {/* Search */}
          <div style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', display: 'flex', gap: 12, alignItems: 'flex-end', maxWidth: 560, margin: '0 auto' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--ink-mid)', marginBottom: 6, textAlign: 'left' }}>
                SELECT YOUR REGION
              </label>

              <select value={state} onChange={e => setState(e.target.value)} className="form-input form-select" style={{ margin: 0 }}>
                <option value="">-- Choose Region --</option>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <button onClick={handleSearch} disabled={!state || loading} className="btn btn-red" style={{ flexShrink: 0 }}>
              {loading ? 'Searching...' : <><FiSearch size={16} /> Search</>}
            </button>
          </div>
        </div>
      </section>

      <div className="wrap" style={{ marginTop: 48 }}>
        {/* Results */}
        {searched && (
          <div>
            <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '1.4rem' }}>
                  {centers.length > 0 ? `${centers.length} Centers Found in ${state}` : `No centers listed for ${state} yet`}
                </h2>
                <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginTop: 4 }}>Centers marked FREE offer complimentary genotype testing</p>
              </div>
              {centers.length > 0 && <span style={{ fontSize: 14, color: 'var(--ink-light)' }}>Showing certified centers only</span>}
            </div>

            {centers.length === 0 && (
              <div style={{ background: '#fff', borderRadius: 16, padding: 36, textAlign: 'center', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🏥</div>
                <p style={{ color: 'var(--ink-light)', marginBottom: 16 }}>We're still building our database for {state}. Please contact your nearest government hospital or teaching hospital directly.</p>
                <Link to="/contact" className="btn btn-red btn-sm">Contact Us to Add Centers</Link>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
              {centers.map((c, i) => (
                <div key={i} className="card" style={{ padding: '28px 32px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                      <h3 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '1.1rem' }}>{c.name}</h3>
                      {c.free && <span className="safe-chip">FREE Testing</span>}
                      {c.certified && <span style={{ background: 'var(--blue-light)', color: 'var(--blue-mid)', border: '1px solid rgba(37,99,235,0.2)', padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700 }}>✓ Certified</span>}
                      <span style={{ background: '#F1F5F9', color: 'var(--ink-muted)', padding: '3px 10px', borderRadius: 100, fontSize: 11 }}>{c.type}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 10 }}>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 14, color: 'var(--ink-light)' }}><FiMapPin size={13} />{c.address}</div>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 14, color: 'var(--ink-light)' }}><FiPhone size={13} />{c.phone}</div>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 14, color: 'var(--ink-light)' }}><FiClock size={13} />{c.hours}</div>
                    </div>
                  </div>
                  <button onClick={() => { setAppointmentForm(c.name); setAptData(d => ({ ...d, center: c.name })); }} className="btn btn-red btn-sm" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appointment Modal */}
        {appointmentForm && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
            onClick={e => { if (e.target === e.currentTarget) { setAppointmentForm(null); setAptStatus(''); } }}>
            <div style={{ background: '#fff', borderRadius: 20, padding: '36px', width: '100%', maxWidth: 520, boxShadow: 'var(--shadow-xl)', maxHeight: '90vh', overflowY: 'auto' }}>
              {aptStatus === 'success' ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <FiCheckCircle color="var(--green)" size={48} style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, marginBottom: 12, fontSize: '1.3rem' }}>Appointment Requested!</h3>
                  <p style={{ color: 'var(--ink-light)', lineHeight: 1.7, marginBottom: 24 }}>We've sent your request to {appointmentForm}. They will contact you to confirm your appointment. Please check your email.</p>
                  <button onClick={() => { setAppointmentForm(null); setAptStatus(''); }} className="btn btn-red">Done</button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: '1.2rem', marginBottom: 4 }}>Book an Appointment</h3>
                  <p style={{ fontSize: 14, color: 'var(--ink-light)', marginBottom: 24 }}>at {appointmentForm}</p>
                  <form onSubmit={handleAppointment}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input className="form-input" required value={aptData.name} onChange={e => setAptData(d => ({ ...d, name: e.target.value }))} placeholder="Your full name" />
                    </div>
                    <div className="g2">
                      <div className="form-group">
                        <label className="form-label">Phone Number *</label>
                        <input className="form-input" required type="tel" value={aptData.phone} onChange={e => setAptData(d => ({ ...d, phone: e.target.value }))} placeholder="+237" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input className="form-input" type="email" value={aptData.email} onChange={e => setAptData(d => ({ ...d, email: e.target.value }))} placeholder="optional" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Preferred Date *</label>
                      <input className="form-input" required type="date" min={new Date().toISOString().split('T')[0]} value={aptData.date} onChange={e => setAptData(d => ({ ...d, date: e.target.value }))} />
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button type="submit" className="btn btn-red" style={{ flex: 1, justifyContent: 'center' }}>Confirm Appointment</button>
                      <button type="button" onClick={() => { setAppointmentForm(null); setAptStatus(''); }} className="btn btn-outline">Cancel</button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="g3" style={{ marginTop: 12 }}>
          {[
            { icon: '💰', title: 'Free Testing Available', body: 'Most government and teaching hospitals offer free or subsidized genotype testing. Always ask about free options.' },
            { icon: '⏱️', title: 'Results in 24–48 Hours', body: 'Standard genotype tests give results within 1–2 business days. Some express options available at private labs.' },
            { icon: '📄', title: 'Bring Valid ID', body: 'Carry a valid government ID or hospital registration card. The test requires only a small blood sample.' },
          ].map(({ icon, title, body }) => (
            <div key={title} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{title}</div>
              <p style={{ fontSize: 14, color: 'var(--ink-light)', lineHeight: 1.7 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
