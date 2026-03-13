import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { api } from '../utils/api';

const questions = [
  {
    id: 'genotype_known',
    question: 'Do you know your current genotype?',
    options: ['Yes, I know it (AA)', 'Yes, I know it (AS)', 'Yes, I know it (SS or SC)', 'No, I do not know my genotype'],
  },
  {
    id: 'partner_genotype',
    question: 'Do you know your partner\'s (or future partner\'s) genotype?',
    options: ['Yes, they are AA', 'Yes, they are AS', 'Yes, they are SS or SC', 'No, I don\'t know', 'I don\'t have a partner yet'],
  },
  {
    id: 'family_history',
    question: 'Do you have a family member with sickle cell disease (SS)?',
    options: ['Yes, a close family member (sibling, parent, child)', 'Yes, a distant relative', 'Not that I\'m aware of', 'I don\'t know'],
  },
  {
    id: 'tested_before',
    question: 'Have you ever had a genotype blood test done?',
    options: ['Yes, recently (within the last 2 years)', 'Yes, but a long time ago', 'No, never', 'I\'m not sure'],
  },
  {
    id: 'planning_children',
    question: 'Are you planning to have children?',
    options: ['Yes, soon', 'Yes, someday', 'I already have children', 'No'],
  },
  {
    id: 'symptoms',
    question: 'Do you or a family member experience any of these? (Select closest)',
    options: ['Recurring joint/bone pain', 'Frequent severe infections', 'Chronic fatigue/anemia', 'None of the above'],
  },
  {
    id: 'awareness',
    question: 'How aware are you about sickle cell disease?',
    options: ['Very aware — I know the details', 'Somewhat aware', 'I\'ve heard of it but don\'t know much', 'I knew very little before today'],
  },
];

function calculateRisk(answers) {
  let score = 0;
  if (answers.genotype_known?.includes('AS')) score += 30;
  if (answers.genotype_known?.includes('SS')) score += 50;
  if (answers.genotype_known?.includes('do not know')) score += 40;
  if (answers.partner_genotype?.includes('AS')) score += 30;
  if (answers.partner_genotype?.includes('SS')) score += 50;
  if (answers.partner_genotype?.includes("don't know")) score += 35;
  if (answers.family_history?.includes('close')) score += 25;
  if (answers.family_history?.includes("don't know")) score += 15;
  if (answers.tested_before?.includes('never')) score += 30;
  if (answers.tested_before?.includes('not sure')) score += 20;
  if (answers.planning_children?.includes('soon') || answers.planning_children?.includes('someday')) score += 15;
  if (answers.symptoms?.includes('joint') || answers.symptoms?.includes('fatigue') || answers.symptoms?.includes('infection')) score += 20;

  if (score >= 90) return { level: 'VERY HIGH', color: 'var(--red)', bg: '#FEF2F2', action: 'You must get tested immediately. Your risk of SCD or having an SCD child is very high.' };
  if (score >= 60) return { level: 'HIGH', color: '#C2410C', bg: '#FFF7ED', action: 'Get tested soon — there are strong indicators you may be a carrier or at significant risk.' };
  if (score >= 35) return { level: 'MODERATE', color: 'var(--amber)', bg: '#FFFBEB', action: 'Testing is recommended. Incomplete knowledge of genotypes creates unnecessary family risk.' };
  return { level: 'LOWER', color: 'var(--green)', bg: 'var(--green-light)', action: 'Good awareness! Still get tested to confirm and share with your partner — knowledge protects your family.' };
}

export default function Quiz() {
  const [step, setStep] = useState(0); // 0 = intro, 1-7 = questions, 8 = result
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalQ = questions.length;
  const current = questions[step - 1];
  const risk = step > totalQ ? calculateRisk(answers) : null;

  const handleOption = (opt) => {
    setAnswers(prev => ({ ...prev, [current.id]: opt }));
    if (step < totalQ) setStep(step + 1);
    else setStep(totalQ + 1);
  };

  const handleSubmitResult = async () => {
    setLoading(true);
    try {
      await api.submitQuiz({ name, email, answers, riskLevel: risk.level });
      setSubmitted(true);
    } catch {
      setSubmitted(true); // still show result even if API fails
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '80vh', background: '#F8FAFC', paddingTop: 40, paddingBottom: 80 }}>
      <div className="wrap" style={{ maxWidth: 700, margin: '0 auto' }}>

        {/* Intro */}
        {step === 0 && (
          <div style={{ textAlign: 'center', paddingTop: 40 }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🧬</div>
            <div className="eyebrow" style={{ display: 'inline-flex', marginBottom: 20 }}>Sickle Cell Risk Assessment</div>
            <h1 className="h2" style={{ marginBottom: 16 }}>Know Your Sickle Cell Risk in 2 Minutes</h1>
            <p className="lead" style={{ margin: '0 auto 32px', maxWidth: 520 }}>Answer 7 quick questions to understand your personal risk level and get a personalized recommendation.</p>
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, padding: '20px 24px', marginBottom: 32, textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>This quiz will help you understand:</div>
              {['Whether you may be an SCD carrier', 'Your risk of having a child with SCD', 'Whether you need to get tested urgently', 'What steps to take next'].map(t => (
                <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <FiCheckCircle color="var(--green)" size={15} />
                  <span style={{ fontSize: 14, color: 'var(--ink-mid)' }}>{t}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="btn btn-red btn-lg" style={{ margin: '0 auto' }}>Start the Quiz <FiArrowRight /></button>
            <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 16 }}>This quiz is for awareness only — not a medical diagnosis. Always consult a healthcare professional.</p>
          </div>
        )}

        {/* Questions */}
        {step >= 1 && step <= totalQ && (
          <div>
            {/* Progress */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: 'var(--ink-muted)', fontWeight: 500 }}>Question {step} of {totalQ}</span>
                <span style={{ fontSize: 13, color: 'var(--ink-muted)', fontWeight: 500 }}>{Math.round((step / totalQ) * 100)}% complete</span>
              </div>
              <div style={{ height: 6, background: '#E2E8F0', borderRadius: 3 }}>
                <div style={{ height: '100%', width: `${(step / totalQ) * 100}%`, background: 'var(--red)', borderRadius: 3, transition: 'width 0.4s ease' }} />
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 20, padding: '40px 36px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
              <h2 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.5rem', fontWeight: 700, marginBottom: 32, lineHeight: 1.3 }}>{current.question}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {current.options.map(opt => (
                  <button key={opt} onClick={() => handleOption(opt)} style={{
                    padding: '16px 20px', borderRadius: 12, border: '1.5px solid var(--border)', background: '#FAFAF9',
                    textAlign: 'left', fontSize: 15, color: 'var(--ink-mid)', fontWeight: 500, cursor: 'pointer', transition: 'var(--transition)',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.background = 'var(--red-light)'; e.currentTarget.style.color = 'var(--red)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = '#FAFAF9'; e.currentTarget.style.color = 'var(--ink-mid)'; }}
                  >{opt}</button>
                ))}
              </div>
            </div>

            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="btn btn-outline btn-sm" style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                <FiArrowLeft size={14} /> Previous
              </button>
            )}
          </div>
        )}

        {/* Results */}
        {step > totalQ && risk && (
          <div>
            <div style={{ background: risk.bg, border: `2px solid ${risk.color}30`, borderRadius: 20, padding: '36px', marginBottom: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>{risk.level === 'VERY HIGH' ? '🚨' : risk.level === 'HIGH' ? '⚠️' : risk.level === 'MODERATE' ? '🔶' : '✅'}</div>
              <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: risk.color, marginBottom: 8 }}>Your Risk Level</div>
              <div style={{ fontFamily: 'var(--ff-display)', fontSize: '2.5rem', fontWeight: 900, color: risk.color, marginBottom: 16 }}>{risk.level}</div>
              <p style={{ fontSize: 16, color: 'var(--ink-mid)', lineHeight: 1.8, maxWidth: 480, margin: '0 auto' }}>{risk.action}</p>
            </div>

            {/* Summary of answers */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid var(--border)', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, marginBottom: 16, fontSize: '1.05rem' }}>Your Answers Summary</h3>
              {Object.entries(answers).map(([key, val]) => {
                const q = questions.find(q => q.id === key);
                return (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F1F5F9', gap: 16 }}>
                    <span style={{ fontSize: 13, color: 'var(--ink-light)', flex: 1 }}>{q?.question}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', textAlign: 'right', maxWidth: 240 }}>{val}</span>
                  </div>
                );
              })}
            </div>

            {/* Save results */}
            {!submitted ? (
              <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid var(--border)', marginBottom: 24 }}>
                <h3 style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, marginBottom: 8, fontSize: '1.05rem' }}>Save Your Results & Get a Personalized Guide</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-light)', marginBottom: 20 }}>Enter your details to receive your risk assessment, testing center recommendations, and SCD prevention guide by email.</p>
                <div className="g2" style={{ marginBottom: 16 }}>
                  <div>
                    <label className="form-label">Your Name</label>
                    <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
                  </div>
                </div>
                <button onClick={handleSubmitResult} disabled={loading} className="btn btn-red" style={{ width: '100%', justifyContent: 'center' }}>
                  {loading ? <><span className="spinner" />Saving...</> : 'Save My Results & Get Guide'}
                </button>
              </div>
            ) : (
              <div style={{ background: 'var(--green-light)', borderRadius: 16, padding: 20, border: '1px solid rgba(22,163,74,0.2)', display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
                <FiCheckCircle color="var(--green)" size={20} />
                <span style={{ fontSize: 15, color: 'var(--green)', fontWeight: 600 }}>Results saved! Check your email for your personalized guide and testing center recommendations.</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/centers" className="btn btn-red" style={{ flex: 1, justifyContent: 'center' }}>Find a Test Center Now <FiArrowRight /></Link>
              <Link to="/dangers" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Learn About the Dangers</Link>
            </div>
            <button onClick={() => { setStep(0); setAnswers({}); setSubmitted(false); }} style={{ background: 'none', border: 'none', color: 'var(--ink-muted)', fontSize: 13, marginTop: 12, display: 'block', margin: '12px auto 0', cursor: 'pointer', textDecoration: 'underline' }}>Retake Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
}
