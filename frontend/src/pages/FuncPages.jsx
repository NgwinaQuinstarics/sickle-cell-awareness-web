import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMapPin, FiPhone, FiClock, FiX, FiCheckCircle, FiSend, FiArrowRight, FiDownload } from 'react-icons/fi';
import { FaGooglePlay, FaApple, FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCentres, useForm, useAsync, useQuiz, useDisclosure } from '../hooks/index.js';
import { api } from '../utils/api';
import { Field, Spinner, Empty, Modal, InlineAlert } from '../components/ui/index.jsx';
import toast from 'react-hot-toast';

const REGIONS = ['Centre','Littoral','West','North-West','South-West','North','Far North','Adamaoua','East','South'];

// FALLBACK data
const FALLBACK = {
  Centre: [
    { name:'Hôpital Central de Yaoundé', address:'Rue Henri Dunant, Yaoundé', phone:'+237 222 23 40 00', hours:'Mon–Fri 7AM–3PM', free:true, certified:true, type:'Government Hospital' },
    { name:'Hôpital Général de Yaoundé', address:'Boulevard du 20 Mai, Yaoundé', phone:'+237 222 23 12 34', hours:'Mon–Fri 7AM–3PM', free:true, certified:true, type:'Government Hospital' },
    { name:'Centre Pasteur du Cameroun', address:'Rue Henri Dunant, Yaoundé', phone:'+237 222 23 15 09', hours:'Mon–Fri 7AM–4PM', free:false, certified:true, type:'Reference Lab' },
  ],
  Littoral: [
    { name:"Hôpital Général de Douala", address:'Akwa, Douala', phone:'+237 233 42 13 77', hours:'Mon–Fri 7AM–3PM', free:true, certified:true, type:'Government Hospital' },
    { name:'Hôpital Laquintinie', address:'Avenue Mouanko, Douala', phone:'+237 233 42 06 88', hours:'Mon–Fri 7AM–3PM', free:true, certified:true, type:'Government Hospital' },
  ],
};

// ─────────────────────────────────────────────────────────────
// TEST CENTRES
// ─────────────────────────────────────────────────────────────
function AppointmentModal({ centre, onClose }) {
  const { values, errors, set, touch, validateAll } = useForm(
    { name:'', phone:'', email:'', date:'' },
    v => ({
      name:  !v.name.trim() ? 'Name required.' : '',
      phone: !v.phone.trim() ? 'Phone required.' : '',
      date:  !v.date ? 'Date required.' : '',
    })
  );
  const { loading, run } = useAsync(api.bookAppointment);
  const [done, setDone] = useState(false);
  const [ref, setRef]   = useState('');

  const submit = async e => {
    e.preventDefault();
    if (!validateAll()) return;
    try {
      const res = await run({ ...values, center: centre.name });
      setRef(res.reference || '');
      setDone(true);
    } catch (err) { toast.error(err.message || 'Failed. Please try again.'); }
  };

  return (
    <Modal open onClose={onClose} title="Book an Appointment">
      {done ? (
        <div className="text-center py-6">
          <FiCheckCircle className="text-green-600 mx-auto mb-3" size={44} />
          <h4 className="font-bold text-slate-900 text-lg mb-1">Request Sent!</h4>
          {ref && <p className="text-sm text-slate-500 mb-1">Reference: <strong className="text-red-600">{ref}</strong></p>}
          <p className="text-sm text-slate-500 mb-5">The centre will contact you to confirm your appointment.</p>
          <button onClick={onClose} className="btn-primary">Done</button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 font-medium">📍 {centre.name}</div>
          <Field label="Full Name" error={errors.name} required>
            <input value={values.name} onChange={e => set('name', e.target.value)} onBlur={() => touch('name')}
              placeholder="Your name" className={`input ${errors.name ? 'input-error':''}`} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone Number" error={errors.phone} required>
              <input type="tel" value={values.phone} onChange={e => set('phone', e.target.value)} onBlur={() => touch('phone')}
                placeholder="+237 6XX XXX XXX" className={`input ${errors.phone ? 'input-error':''}`} />
            </Field>
            <Field label="Preferred Date" error={errors.date} required>
              <input type="date" value={values.date} onChange={e => set('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]} className={`input ${errors.date ? 'input-error':''}`} />
            </Field>
          </div>
          <Field label="Email (optional)">
            <input type="email" value={values.email} onChange={e => set('email', e.target.value)}
              placeholder="for confirmation email" className="input" />
          </Field>
          <div className="flex gap-2 pt-1">
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? <><Spinner size={14}/> Sending...</> : 'Confirm Appointment'}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export function CentresPage() {
  const [region,  setRegion]  = useState('');
  const [booking, setBooking] = useState(null);
  const { data, loading, error, fetch } = useCentres();

  const search = () => { if (region) fetch(region); };
  const centres = data?.centres?.length ? data.centres : (FALLBACK[region] || []);
  const searched = !!data || error;

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-slate-900 text-white py-20">
        <div className="page-container text-center max-w-xl mx-auto">
          <div className="tag-red mb-4 mx-auto inline-flex">📍 Test Centres</div>
          <h1 className="heading-lg text-white mb-4">Find a Testing Centre Near You</h1>
          <p className="text-slate-400 body-md mb-8">Many government hospitals offer free genotype testing. Find a certified centre in your region and book today.</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <select value={region} onChange={e => setRegion(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors">
              <option value="" className="text-slate-800">Select your region...</option>
              {REGIONS.map(r => <option key={r} value={r} className="text-slate-800">{r}</option>)}
            </select>
            <button onClick={search} disabled={!region || loading} className="btn-primary">
              {loading ? <Spinner size={15}/> : <FiSearch size={15}/>}
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="page-container py-12">
        {!searched && (
          <div className="grid sm:grid-cols-3 gap-4">
            {[['💰','Free Testing','Most government hospitals offer testing at no cost.'],
              ['⏱️','Fast Results','Results ready in 24–48 hours at most labs.'],
              ['📄','What to Bring','A valid government-issued ID is all you need.']].map(([i,t,d])=>(
              <div key={t} className="card p-5 text-center">
                <div className="text-3xl mb-2">{i}</div>
                <div className="font-semibold text-slate-800 text-sm mb-1">{t}</div>
                <p className="text-xs text-slate-500">{d}</p>
              </div>
            ))}
          </div>
        )}

        {searched && (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-slate-900">
                {centres.length > 0 ? `${centres.length} centre(s) found in ${region}` : `No centres listed for ${region} yet`}
              </h2>
              {centres.length > 0 && <span className="text-xs text-slate-400">Certified centres only</span>}
            </div>

            {centres.length === 0 ? (
              <Empty icon="🏥" title={`No centres listed for ${region}`}
                body="We're still building our directory. Please contact your nearest regional or teaching hospital."
                action={<button onClick={()=>{setRegion('');}} className="btn-secondary text-sm">Search another region</button>} />
            ) : (
              <div className="space-y-3">
                {centres.map((c, i) => (
                  <div key={i} className="card p-5 flex flex-col sm:flex-row items-start gap-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-semibold text-slate-900">{c.name}</h3>
                        {c.free      && <span className="tag-green">Free</span>}
                        {c.certified && <span className="tag-blue">✓ Certified</span>}
                        <span className="tag-slate">{c.type}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><FiMapPin size={11}/>{c.address}</span>
                        <span className="flex items-center gap-1"><FiPhone size={11}/>{c.phone}</span>
                        <span className="flex items-center gap-1"><FiClock size={11}/>{c.hours}</span>
                      </div>
                    </div>
                    <button onClick={() => setBooking(c)} className="btn-primary btn-sm shrink-0 whitespace-nowrap">
                      Book Appointment
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {booking && <AppointmentModal centre={booking} onClose={() => setBooking(null)} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────────────
const SUBJECTS = ['General Inquiry','Medical Question','Genotype Testing Help','Partnership / Collaboration','Report a Test Centre','Platform Feedback','Media & Press','Volunteering','Other'];

function validateContact(v) {
  return {
    name:    !v.name.trim() || v.name.length < 2 ? 'Name required (min 2 chars).' : '',
    email:   !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email) ? 'Valid email required.' : '',
    subject: !v.subject ? 'Please select a subject.' : '',
    message: v.message.trim().length < 20 ? 'Message must be at least 20 characters.' : '',
  };
}

export function ContactPage() {
  const { values, errors, set, touch, validateAll, reset } = useForm(
    { name:'', email:'', phone:'', subject:'', message:'' }, validateContact
  );
  const { loading, run } = useAsync(api.contact);
  const [done, setDone] = useState(false);
  const [ref, setRef]   = useState('');

  const submit = async e => {
    e.preventDefault();
    if (!validateAll()) return;
    try {
      const res = await run(values);
      setRef(res.reference || '');
      setDone(true);
    } catch (err) { toast.error(err.message || 'Failed. Please try again.'); }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200 py-16">
        <div className="page-container text-center max-w-xl mx-auto">
          <div className="tag-red mb-4 mx-auto inline-flex">📬 Contact</div>
          <h1 className="heading-lg text-slate-900 mb-3">We're Here to Help</h1>
          <p className="body-md">Questions about SCD, testing, or our platform? Our team responds within 24 hours.</p>
        </div>
      </div>
      <div className="page-container py-14">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <div className="card p-8">
              {done ? (
                <div className="text-center py-8">
                  <FiCheckCircle className="text-green-600 mx-auto mb-4" size={48} />
                  <h3 className="font-bold text-slate-900 text-xl mb-2">Message Sent!</h3>
                  {ref && <p className="text-sm text-slate-500 mb-1">Reference: <strong className="text-red-600">{ref}</strong></p>}
                  <p className="text-slate-500 text-sm mb-6">We'll respond within 24 business hours.</p>
                  <button onClick={() => { setDone(false); reset(); }} className="btn-secondary text-sm">Send another message</button>
                </div>
              ) : (
                <>
                  <h2 className="font-bold text-slate-900 text-xl mb-6">Send a Message</h2>
                  <form onSubmit={submit} noValidate className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Full Name" error={errors.name} required>
                        <input value={values.name} onChange={e=>set('name',e.target.value)} onBlur={()=>touch('name')}
                          placeholder="Your name" className={`input ${errors.name?'input-error':''}`} />
                      </Field>
                      <Field label="Email" error={errors.email} required>
                        <input type="email" value={values.email} onChange={e=>set('email',e.target.value)} onBlur={()=>touch('email')}
                          placeholder="you@example.com" className={`input ${errors.email?'input-error':''}`} />
                      </Field>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Phone (optional)">
                        <input type="tel" value={values.phone} onChange={e=>set('phone',e.target.value)}
                          placeholder="+237 6XX XXX XXX" className="input" />
                      </Field>
                      <Field label="Subject" error={errors.subject} required>
                        <select value={values.subject} onChange={e=>set('subject',e.target.value)} onBlur={()=>touch('subject')}
                          className={`input ${errors.subject?'input-error':''}`}>
                          <option value="">Select subject...</option>
                          {SUBJECTS.map(s=><option key={s} value={s}>{s}</option>)}
                        </select>
                      </Field>
                    </div>
                    <Field label="Message" error={errors.message} required>
                      <textarea value={values.message} onChange={e=>set('message',e.target.value)} onBlur={()=>touch('message')}
                        rows={5} placeholder="Describe your inquiry..."
                        className={`input resize-none ${errors.message?'input-error':''}`} />
                      <p className="text-xs text-slate-400 mt-1 text-right">{values.message.length}/5000</p>
                    </Field>
                    <input type="text" name="website_url" className="hidden" tabIndex={-1} readOnly />
                    <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                      {loading ? <><Spinner size={15}/> Sending...</> : <><FiSend size={14}/> Send Message</>}
                    </button>
                    <p className="text-xs text-slate-400 text-center">We respond within 24 hours. For medical emergencies, call <strong>15</strong> (SAMU).</p>
                  </form>
                </>
              )}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            {[{icon:'📞',t:'Phone',v:'+237 222 22 22 22',s:'Mon–Fri, 8AM–6PM'},{icon:'✉️',t:'Email',v:'contact@sicklecare.cm',s:'Response within 24h'},{icon:'📍',t:'Location',v:'Yaoundé, Cameroon',s:'Centre Region'}].map(({icon,t,v,s})=>(
              <div key={t} className="card p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-red-50 text-red-600 flex items-center justify-center text-xl shrink-0">{icon}</div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{t}</div>
                  <div className="font-semibold text-slate-800 text-sm mt-0.5">{v}</div>
                  <div className="text-xs text-slate-400">{s}</div>
                </div>
              </div>
            ))}
            <div className="alert-amber rounded-xl p-4">
              <div className="font-semibold text-sm mb-1">🚨 Medical Emergency?</div>
              <p className="text-xs leading-relaxed">Do NOT use this form for emergencies. Call <strong>15</strong> (SAMU) or go to your nearest hospital immediately.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// QUIZ
// ─────────────────────────────────────────────────────────────
const QUESTIONS = [
  { id:'genotype', q:'Do you know your current genotype?', opts:['Yes — I am AA','Yes — I am AS','Yes — I am SS or SC','No, I do not know my genotype'] },
  { id:'partner',  q:"Do you know your partner's (or future partner's) genotype?", opts:['Yes — they are AA','Yes — they are AS','Yes — they are SS or SC',"I don't know","I don't have a partner yet"] },
  { id:'family',   q:'Do you have a close family member with sickle cell disease (SS)?', opts:['Yes — a close relative (sibling, parent, child)','Yes — a more distant relative','Not that I know of','I don\'t know'] },
  { id:'tested',   q:'Have you ever had a genotype blood test done?', opts:['Yes, recently (within the last 2 years)','Yes, but a long time ago','No, never','I\'m not sure'] },
  { id:'children', q:'Are you planning to have children?', opts:['Yes, soon','Yes, someday','I already have children','No'] },
  { id:'symptoms', q:'Do you or a close family member experience any of these?', opts:['Recurring joint or bone pain','Frequent severe infections','Chronic fatigue or anaemia','None of the above'] },
  { id:'awareness',q:'How would you rate your awareness of sickle cell disease?', opts:['Very well informed','Fairly informed','Heard of it but know little','I\'m learning about it today'] },
];

function calcRisk(answers) {
  let score = 0;
  if (answers.genotype?.includes('AS'))       score += 30;
  if (answers.genotype?.includes('SS'))       score += 50;
  if (answers.genotype?.includes('not know')) score += 40;
  if (answers.partner?.includes('AS'))        score += 30;
  if (answers.partner?.includes('SS'))        score += 50;
  if (answers.partner?.includes("don't know"))score += 35;
  if (answers.family?.includes('close'))      score += 25;
  if (answers.family?.includes("don't know")) score += 15;
  if (answers.tested?.includes('never'))      score += 30;
  if (answers.tested?.includes("not sure"))   score += 20;
  if (answers.children?.includes('soon') || answers.children?.includes('someday')) score += 15;
  if (answers.symptoms && !answers.symptoms.includes('None')) score += 20;

  if (score >= 90) return { level:'VERY HIGH', color:'text-red-700',    bg:'bg-red-50   border-red-300',   icon:'🚨', msg:'You should get tested immediately. Your risk is very high.' };
  if (score >= 60) return { level:'HIGH',      color:'text-orange-700', bg:'bg-orange-50 border-orange-300',icon:'⚠️', msg:'Testing is strongly recommended. Significant risk indicators present.' };
  if (score >= 35) return { level:'MODERATE',  color:'text-amber-700',  bg:'bg-amber-50  border-amber-300', icon:'🔶', msg:'Testing is recommended. Incomplete knowledge creates unnecessary family risk.' };
  return              { level:'LOWER',       color:'text-green-700',  bg:'bg-green-50  border-green-300', icon:'✅', msg:'Good awareness. Still get tested to confirm and protect your family.' };
}

export function QuizPage() {
  const { step, answers, current, progress, isIntro, isDone, answer, back, restart } = useQuiz(QUESTIONS);
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');
  const { loading, run }  = useAsync(api.quiz);
  const [saved, setSaved] = useState(false);
  const risk = isDone ? calcRisk(answers) : null;

  const save = async () => {
    try {
      await run({ name, email, answers, riskLevel: risk?.level });
      setSaved(true);
      toast.success('Results saved!');
    } catch { setSaved(true); }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-xl mx-auto">
        {isIntro && (
          <div className="text-center animate-in-up">
            <div className="text-6xl mb-4">🧬</div>
            <div className="tag-red mb-4 mx-auto inline-flex">Sickle Cell Risk Assessment</div>
            <h1 className="heading-lg text-slate-900 mb-3">Know Your Risk in 2 Minutes</h1>
            <p className="body-md mb-6 max-w-md mx-auto">Answer 7 questions to understand your personal risk level and get a personalised recommendation.</p>
            <div className="card p-5 text-left mb-6 max-w-sm mx-auto">
              <p className="font-semibold text-sm text-slate-800 mb-3">This quiz will help you understand:</p>
              {['Whether you may carry the SCD gene','Your risk of having a child with SCD','Whether testing is urgent for you','What steps to take next'].map(t=>(
                <div key={t} className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                  <FiCheckCircle size={13} className="text-green-600 shrink-0"/> {t}
                </div>
              ))}
            </div>
            <button onClick={() => answer('', '')} className="btn-primary-lg">Start the Quiz <FiArrowRight /></button>
            <p className="text-xs text-slate-400 mt-3">For awareness only — not a medical diagnosis.</p>
          </div>
        )}

        {!isIntro && !isDone && current && (
          <div className="animate-in-up">
            <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
              <span>Question {step} of {QUESTIONS.length}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full mb-6">
              <div className="h-full bg-red-600 rounded-full transition-all duration-500" style={{ width:`${progress}%` }} />
            </div>
            <div className="card p-7">
              <h2 className="font-bold text-slate-900 text-xl mb-6 text-balance leading-snug">{current.q}</h2>
              <div className="space-y-2.5">
                {current.opts.map(opt => (
                  <button key={opt} onClick={() => answer(current.id, opt)}
                    className="w-full text-left px-5 py-3.5 rounded-lg border-2 border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-all duration-150">
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            {step > 1 && (
              <button onClick={back} className="btn-ghost mt-4 text-sm">← Previous</button>
            )}
          </div>
        )}

        {isDone && risk && (
          <div className="animate-in-up">
            <div className={`rounded-xl p-8 border-2 text-center mb-5 ${risk.bg}`}>
              <div className="text-5xl mb-3">{risk.icon}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Your Risk Level</div>
              <div className={`text-4xl font-bold mb-3 ${risk.color}`} style={{fontFamily:'Sora,sans-serif'}}>{risk.level}</div>
              <p className="text-sm text-slate-600 max-w-xs mx-auto">{risk.msg}</p>
            </div>

            {!saved ? (
              <div className="card p-5 mb-5">
                <h3 className="font-semibold text-slate-900 mb-1 text-sm">Save results & get a personalised guide</h3>
                <p className="text-xs text-slate-500 mb-3">Enter your details to receive recommendations by email.</p>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="input text-sm"/>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" className="input text-sm"/>
                </div>
                <button onClick={save} disabled={loading} className="btn-primary w-full text-sm">
                  {loading ? <><Spinner size={13}/> Saving...</> : 'Save & Get My Guide'}
                </button>
              </div>
            ) : (
              <InlineAlert type="green" className="mb-5">Results saved! Check your email for your personalised guide.</InlineAlert>
            )}

            <div className="flex gap-3">
              <Link to="/centres" className="btn-primary flex-1 justify-center text-sm">Find a Test Centre <FiArrowRight size={13}/></Link>
              <Link to="/dangers" className="btn-secondary flex-1 justify-center text-sm">See the Dangers</Link>
            </div>
            <button onClick={restart} className="w-full text-center text-xs text-slate-400 hover:text-slate-600 mt-4 transition-colors">
              Retake quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PLEDGE
// ─────────────────────────────────────────────────────────────
const PLEDGE_POINTS = [
  'I will get my genotype tested as soon as possible',
  'I will know my partner\'s genotype before marriage',
  'I will educate at least 5 people in my community about SCD',
  'I will support individuals and families living with sickle cell disease',
  'I will never stigmatise anyone with sickle cell disease',
];

function validatePledge(v) {
  return {
    name:   !v.name.trim() || v.name.length < 2 ? 'Full name required.' : '',
    email:  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email) ? 'Valid email required.' : '',
    region: !v.region ? 'Please select your region.' : '',
  };
}

export function PledgePage() {
  const { values, errors, set, touch, validateAll } = useForm(
    { name:'', email:'', phone:'', region:'', agree:false }, validatePledge
  );
  const { loading, run } = useAsync(api.pledge);
  const [done, setDone]  = useState(false);
  const [total, setTotal]= useState(47812);
  const [agreeErr, setAgreeErr] = useState('');

  const submit = async e => {
    e.preventDefault();
    if (!values.agree) { setAgreeErr('Please confirm the pledge to continue.'); return; }
    setAgreeErr('');
    if (!validateAll()) return;
    try {
      const res = await run(values);
      setTotal(res.pledgeNumber || total + 1);
      setDone(true);
    } catch { setDone(true); setTotal(t => t + 1); }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-red-600 py-20 text-white text-center">
        <div className="page-container max-w-2xl mx-auto">
          <div className="text-5xl mb-4">🤝</div>
          <h1 className="heading-lg text-white mb-4">Take the SickleCare Pledge</h1>
          <p className="text-red-100 body-lg mb-8">Join the movement to end sickle cell disease in Cameroon through knowledge and prevention.</p>
          <div className="flex justify-center gap-10">
            {[[total.toLocaleString(),'Pledges taken'],['10','Regions represented'],['70%','Cases preventable']].map(([v,l])=>(
              <div key={l}>
                <div className="text-2xl font-bold" style={{fontFamily:'Sora,sans-serif'}}>{v}</div>
                <div className="text-red-200 text-xs mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page-container py-14 max-w-3xl mx-auto">
        {done ? (
          <div className="card p-10 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="heading-md text-slate-900 mb-2">Pledge Recorded!</h2>
            <p className="text-slate-500 text-sm mb-2">Welcome to the movement, <strong>{values.name}</strong>.</p>
            <p className="text-slate-500 text-sm mb-6">You're now one of <strong className="text-red-600">{total.toLocaleString()}</strong> people committed to change.</p>
            <div className="alert-red rounded-xl p-4 mb-6 text-left">
              <strong>Your next step:</strong> Book a genotype test at a certified centre near you. The pledge is the commitment — the test is the action.
            </div>
            <div className="flex gap-3 justify-center">
              <Link to="/centres" className="btn-primary">Book My Test</Link>
              <button onClick={() => navigator.share?.({ title:'SickleCare Pledge', text:'I just took the SickleCare Pledge! Join me.', url: window.location.origin })} className="btn-secondary">Share</button>
            </div>
          </div>
        ) : (
          <div className="card p-8">
            <h2 className="font-bold text-slate-900 text-xl mb-6">I Solemnly Pledge To:</h2>
            <div className="divide-y divide-slate-100 mb-7">
              {PLEDGE_POINTS.map((p, i) => (
                <div key={i} className="flex items-start gap-3 py-3 text-sm text-slate-700">
                  <FiCheckCircle size={15} className="text-red-500 shrink-0 mt-0.5"/> {p}
                </div>
              ))}
            </div>
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name" error={errors.name} required>
                  <input required value={values.name} onChange={e=>set('name',e.target.value)} onBlur={()=>touch('name')}
                    placeholder="Jane Doe" className={`input ${errors.name?'input-error':''}`} />
                </Field>
                <Field label="Region" error={errors.region} required>
                  <select required value={values.region} onChange={e=>set('region',e.target.value)} onBlur={()=>touch('region')}
                    className={`input ${errors.region?'input-error':''}`}>
                    <option value="">Select region...</option>
                    {REGIONS.map(r=><option key={r} value={r}>{r}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email" error={errors.email} required>
                  <input required type="email" value={values.email} onChange={e=>set('email',e.target.value)} onBlur={()=>touch('email')}
                    placeholder="you@email.com" className={`input ${errors.email?'input-error':''}`} />
                </Field>
                <Field label="Phone (optional)">
                  <input type="tel" value={values.phone} onChange={e=>set('phone',e.target.value)}
                    placeholder="+237 6XX XXX XXX" className="input" />
                </Field>
              </div>
              <label className="flex items-start gap-3 cursor-pointer bg-red-50 border border-red-200 rounded-lg p-4">
                <input type="checkbox" checked={values.agree} onChange={e=>set('agree',e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-red-600 shrink-0"/>
                <span className="text-sm text-slate-700 leading-relaxed">I confirm that I understand the importance of genotype testing and take this pledge sincerely and of my own free will.</span>
              </label>
              {agreeErr && <p className="err-msg">{agreeErr}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                {loading ? <><Spinner size={14}/> Recording...</> : '🤝 Take This Pledge'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────
export function DashboardPage() {
  const { user } = useAuth();
  const QUICK = [
    { icon:'🔍', t:'Find a Test Centre',  d:'Locate a certified lab in your region', to:'/centres' },
    { icon:'📊', t:'Risk Quiz',           d:'Assess your risk in 2 minutes',          to:'/quiz' },
    { icon:'🤝', t:'Take the Pledge',     d:'Join the awareness movement',            to:'/pledge' },
    { icon:'📚', t:'Resources',           d:'Articles and health guides',             to:'/resources' },
    { icon:'📱', t:'Mobile App',          d:'Get the SickleCare app',                 to:'/app' },
    { icon:'📬', t:'Contact',             d:'Talk to our team',                       to:'/contact' },
  ];
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="page-container max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="heading-lg text-slate-900">Hi, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="text-slate-500 mt-1.5">Welcome to your SickleCare dashboard.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[{l:'Genotype',v:user?.genotype||'Not set',i:'🧬'},{l:'Region',v:user?.region||'Not set',i:'📍'},{l:'Member since',v:new Date().getFullYear(),i:'📅'}].map(({l,v,i})=>(
            <div key={l} className="card p-5">
              <div className="text-2xl mb-2">{i}</div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-widest">{l}</div>
              <div className="font-bold text-slate-900 text-lg mt-1" style={{fontFamily:'Sora,sans-serif'}}>{v}</div>
            </div>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUICK.map(({ icon, t, d, to }) => (
            <Link key={t} to={to} className="card p-5 group">
              <div className="text-3xl mb-3">{icon}</div>
              <div className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-red-600 transition-colors">{t}</div>
              <p className="text-xs text-slate-500">{d}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// APP DOWNLOAD PAGE
// ─────────────────────────────────────────────────────────────
const STORE_LINKS = {
  android:'https://play.google.com/store/apps/details?id=cm.sicklecare.app',
  ios:    'https://apps.apple.com/cm/app/sicklecare/id000000000',
};

function getOS() {
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/android/i.test(ua)) return 'android';
  return 'other';
}

const APP_FEATURES = [
  { icon:'🔔', t:'Medication Reminders',  d:'Never miss a dose. Custom daily alerts for every medication.' },
  { icon:'💧', t:'Hydration Tracking',    d:'Log your water intake and stay above the daily minimum.' },
  { icon:'📈', t:'Symptom Journal',       d:'Track pain levels, mood and symptoms daily to spot patterns.' },
  { icon:'📍', t:'Test Centre Finder',    d:'Find the nearest certified lab in your region.' },
  { icon:'🚨', t:'Crisis Alerts',         d:'Early detection of crisis signs with direct SAMU emergency access.' },
  { icon:'📄', t:'Health Reports',        d:'Weekly PDF summaries to share with your doctor.' },
  { icon:'👥', t:'Caregiver Mode',        d:'Share your health data with a family member or caregiver.' },
  { icon:'📵', t:'Works Offline',         d:'All essential features available without an internet connection.' },
];

const SCREENS = [
  { bg:'from-red-600 to-red-800',   e:'📊', t:'Dashboard',    items:['Wellness score: 87/100','Meds: 3/3 taken','Hydration: 6/8 glasses','Pain: Low'] },
  { bg:'from-blue-600 to-blue-800', e:'💊', t:'Medications',  items:['Hydroxyurea 8AM ✓','Folic Acid 8AM ✓','Penicillin 8PM ○','Next dose: 3h 20m'] },
  { bg:'from-teal-600 to-teal-800', e:'💧', t:'Hydration',    items:['Today: 6 of 8 glasses','Streak: 12 days 🔥','75% of goal','+ Add a glass'] },
];

export function AppDownloadPage() {
  const os = getOS();
  const handleSmartDownload = () => {
    if (os === 'android') window.open(STORE_LINKS.android, '_blank');
    else if (os === 'ios') window.open(STORE_LINKS.ios, '_blank');
    else document.getElementById('store-badges')?.scrollIntoView({ behavior:'smooth' });
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-slate-950 relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage:'radial-gradient(circle,#fff 1px,transparent 1px)',backgroundSize:'32px 32px' }}/>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 blur-3xl rounded-full"/>
        <div className="page-container relative grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="tag-red mb-5">📱 SickleCare Mobile App</div>
            <h1 className="heading-xl text-white mb-5">Your Health,<br/><span className="text-red-500">Always With You.</span></h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md mb-6">Medications, hydration, symptoms — all tracked in one simple app. Built for SCD warriors and their families in Cameroon.</p>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-0.5">{[...Array(5)].map((_,i)=><span key={i} className="text-amber-400">★</span>)}</div>
              <span className="text-white font-bold text-sm">4.8</span>
              <span className="text-slate-400 text-sm">· 2,000+ downloads</span>
            </div>
            <div id="store-badges" className="flex flex-wrap gap-3 mb-5">
              {[['android',<FaGooglePlay size={24}/>, 'Google Play'],['ios',<FaApple size={26}/>, 'App Store']].map(([s, icon, label])=>(
                <a key={s} href={STORE_LINKS[s]} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-3 px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 hover:border-white/40 transition-all -translate-y-0.5 hover:-translate-y-1 duration-200 group">
                  <span className="text-white">{icon}</span>
                  <div className="text-left">
                    <div className="text-white/60 text-[9px] font-semibold uppercase tracking-widest leading-none mb-0.5">Download on</div>
                    <div className="text-white font-bold text-base leading-tight">{label}</div>
                  </div>
                </a>
              ))}
            </div>
            <button onClick={handleSmartDownload} className="btn-primary sm:hidden">
              <FiDownload size={15}/>
              {os==='ios' ? 'Download on App Store' : os==='android' ? 'Download on Google Play' : 'Download the App'}
            </button>
            <p className="text-slate-500 text-xs mt-3">Free · iOS 14+ · Android 9+ · Works offline</p>
          </div>

          {/* Phone mockups */}
          <div className="relative flex items-end justify-center gap-4 h-[420px]">
            {SCREENS.map(({ bg, e, t, items }, i) => (
              <div key={t} className={`w-44 rounded-2xl bg-gradient-to-br ${bg} p-5 text-white shadow-2xl shrink-0 transition-transform duration-300 hover:-translate-y-2 ${i===1?'-translate-y-6 scale-105':i===2?'translate-y-6':''}`}>
                <div className="flex justify-between text-[9px] opacity-60 mb-3"><span>9:41</span><span>●●●</span></div>
                <div className="text-3xl mb-2">{e}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2">{t}</div>
                {items.map(item=>(
                  <div key={item} className="text-[11px] bg-white/15 rounded-lg px-2.5 py-1.5 mb-1.5 leading-snug">{item}</div>
                ))}
              </div>
            ))}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-16 bg-red-600/15 blur-3xl rounded-full"/>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-red-600 py-10">
        <div className="page-container grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
          {[['2,000+','Downloads'],['4.8★','App Rating'],['98%','Crash-free sessions'],['Free','Always']].map(([v,l])=>(
            <div key={l}>
              <div className="font-bold text-2xl" style={{fontFamily:'Sora,sans-serif'}}>{v}</div>
              <div className="text-red-200 text-sm mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="section bg-slate-50">
        <div className="page-container">
          <div className="text-center mb-12">
            <div className="tag-red mb-4 mx-auto inline-flex">Features</div>
            <h2 className="heading-lg text-slate-900 mb-3">Everything in your pocket</h2>
            <p className="body-md max-w-xl mx-auto">Designed with SCD patients, caregivers, and specialist doctors in Cameroon.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {APP_FEATURES.map(({ icon, t, d }) => (
              <div key={t} className="card p-5">
                <div className="text-3xl mb-3">{icon}</div>
                <div className="font-semibold text-slate-900 text-sm mb-1">{t}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage:'radial-gradient(circle,#fff 1px,transparent 1px)',backgroundSize:'28px 28px' }}/>
        <div className="relative page-container text-center max-w-xl mx-auto">
          <div className="text-5xl mb-5">🩸</div>
          <h2 className="heading-lg text-white mb-4">Start tracking your health today</h2>
          <p className="text-slate-400 body-lg mb-8">Join thousands of Cameroonians managing their sickle cell disease with SickleCare. Free, simple, and built for you.</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[['android',<FaGooglePlay size={22}/>,'Google Play'],['ios',<FaApple size={24}/>,'App Store']].map(([s,icon,label])=>(
              <a key={s} href={STORE_LINKS[s]} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-3 px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all">
                <span className="text-white">{icon}</span>
                <div className="text-left">
                  <div className="text-white/60 text-[9px] font-bold uppercase tracking-widest leading-none mb-0.5">Download on</div>
                  <div className="text-white font-bold text-base">{label}</div>
                </div>
              </a>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-10">
            {['100% Free','Works offline','No ads','Encrypted data','iOS & Android'].map(t=>(
              <div key={t} className="flex items-center gap-1.5 text-slate-400 text-sm">
                <FiCheckCircle size={12} className="text-green-500 shrink-0"/> {t}
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm mb-4">Share with someone who needs this ❤️</p>
          <div className="flex justify-center gap-3">
            {[[FaWhatsapp,'bg-green-600 hover:bg-green-700',`https://wa.me/?text=Check out SickleCare Cameroon: ${window.location.origin}/app`],
              [FaFacebook,'bg-blue-600 hover:bg-blue-700', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin+'/app')}`],
              [FaTwitter, 'bg-sky-500 hover:bg-sky-600',   `https://twitter.com/intent/tweet?text=SickleCare Cameroon app&url=${encodeURIComponent(window.location.origin+'/app')}`]
            ].map(([Icon, col, href], i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                 className={`flex items-center gap-2 px-4 py-2.5 ${col} text-white text-sm font-semibold rounded-lg transition-colors`}>
                <Icon size={15}/>
              </a>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">← Back to main site</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
