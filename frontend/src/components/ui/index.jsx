import { useRef } from 'react';
import { FiX, FiChevronDown, FiAlertCircle, FiCheckCircle, FiInfo, FiLoader } from 'react-icons/fi';
import { useOutsideClick } from '../../hooks/index.js';

// ── Spinner ───────────────────────────────────────────────────
export function Spinner({ size = 16, className = '' }) {
  return <FiLoader size={size} className={`animate-spin ${className}`} />;
}

// ── Page loader ───────────────────────────────────────────────
export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spinner size={28} className="text-red-500" />
    </div>
  );
}

// ── Input field with label + error ───────────────────────────
export function Field({ label, error, required, hint, children }) {
  return (
    <div>
      {label && (
        <label className="label">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {hint  && !error && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
      {error && <p className="err-msg flex items-center gap-1"><FiAlertCircle size={11} />{error}</p>}
    </div>
  );
}

// ── Section header ────────────────────────────────────────────
export function SectionHead({ tag, title, body, center = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {tag && <div className={`tag-red mb-4 ${center ? 'mx-auto' : ''}`}>{tag}</div>}
      <h2 className="heading-lg text-slate-900 mb-3 text-balance">{title}</h2>
      {body && <p className={`body-lg ${center ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>{body}</p>}
    </div>
  );
}

// ── Stat number card ──────────────────────────────────────────
export function StatCard({ value, label, icon }) {
  return (
    <div className="text-center p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-3xl font-bold text-slate-900 font-display mb-1">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}

// ── Feature card ──────────────────────────────────────────────
export function FeatureCard({ icon, title, desc, accent = 'red' }) {
  const colors = {
    red:    'bg-red-50 text-red-600',
    green:  'bg-green-50 text-green-700',
    amber:  'bg-amber-50 text-amber-600',
    blue:   'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    slate:  'bg-slate-100 text-slate-600',
  };
  return (
    <div className="card p-6">
      <div className={`w-11 h-11 rounded-lg ${colors[accent]} flex items-center justify-center text-xl mb-4`}>
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Risk badge ────────────────────────────────────────────────
export function RiskBadge({ risk }) {
  const map = { none:'risk-none', low:'risk-low', medium:'risk-medium', high:'risk-high', critical:'risk-critical' };
  const labels = { none:'None', low:'Low', medium:'Medium', high:'High', critical:'Critical' };
  return <span className={map[risk] || 'tag-slate'}>{labels[risk] || risk}</span>;
}

// ── Accordion ─────────────────────────────────────────────────
import { useState } from 'react';
export function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 overflow-hidden">
      {items.map(({ q, a }, i) => (
        <div key={i} className="bg-white">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <span className="pr-4 text-balance">{q}</span>
            <FiChevronDown size={15} className={`shrink-0 text-slate-400 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed bg-slate-50 border-t border-slate-100">
              {a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, size = 'md' }) {
  const ref = useRef(null);
  useOutsideClick(ref, onClose);
  if (!open) return null;
  const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div ref={ref} className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} animate-in max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="btn-ghost btn-sm !px-2"><FiX size={18} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────
export function Empty({ icon, title, body, action }) {
  return (
    <div className="text-center py-16">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      {body && <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">{body}</p>}
      {action}
    </div>
  );
}

// ── Inline alert ──────────────────────────────────────────────
export function InlineAlert({ type = 'blue', icon, children }) {
  const classes = { green:'alert-green', red:'alert-red', amber:'alert-amber', blue:'alert-blue' };
  const icons = { green:<FiCheckCircle size={15}/>, red:<FiAlertCircle size={15}/>, amber:<FiAlertCircle size={15}/>, blue:<FiInfo size={15}/> };
  return (
    <div className={`${classes[type]} flex items-start gap-2.5`}>
      <span className="shrink-0 mt-px">{icon || icons[type]}</span>
      <span>{children}</span>
    </div>
  );
}

// ── Compatibility Table (genotype) ────────────────────────────
const COMPAT = [
  { p1:'AA', p2:'AA', result:'All AA — no risk',        risk:'none',     pct:'0%' },
  { p1:'AA', p2:'AS', result:'50% AA, 50% AS',          risk:'none',     pct:'0%' },
  { p1:'AS', p2:'AS', result:'25% SS, 50% AS, 25% AA',  risk:'high',     pct:'25%' },
  { p1:'AA', p2:'SS', result:'All AS carriers',          risk:'low',      pct:'0%' },
  { p1:'AS', p2:'SS', result:'50% SS, 50% AS',           risk:'critical', pct:'50%' },
  { p1:'SS', p2:'SS', result:'All SS — all will have SCD',risk:'critical',pct:'100%' },
];
export function CompatTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider">
            {['Parent 1','Parent 2','Possible Outcomes','SCD Risk','Level'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {COMPAT.map(({ p1, p2, result, risk, pct }, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
              <td className="px-4 py-3 font-bold text-red-700">{p1}</td>
              <td className="px-4 py-3 font-bold text-red-700">{p2}</td>
              <td className="px-4 py-3 text-slate-600">{result}</td>
              <td className="px-4 py-3 font-bold text-lg text-slate-800">{pct}</td>
              <td className="px-4 py-3"><RiskBadge risk={risk} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
