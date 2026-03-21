import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiDroplet, FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { api } from '../../utils/api';
import toast from 'react-hot-toast';
import { useAsync } from '../../hooks/index.js';

const COLS = [
  { title: 'Learn',    links: [['/', 'Home'], ['/about', 'About SCD'], ['/dangers', 'Dangers'], ['/prevention', 'Prevention'], ['/living', 'Living with SCD']] },
  { title: 'Take Action', links: [['/centres', 'Test Centres'], ['/quiz', 'Risk Quiz'], ['/pledge', 'Take the Pledge'], ['/app', 'Mobile App'], ['/contact', 'Contact']] },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const { loading, run }  = useAsync(api.subscribe);

  const handleSub = async e => {
    e.preventDefault();
    if (!email) return;
    try {
      await run({ email });
      toast.success('Subscribed!');
      setEmail('');
    } catch (err) { toast.error(err.message || 'Failed. Try again.'); }
  };

  return (
    <footer className="bg-slate-900 text-slate-400">
      {/* CTA strip */}
      <div className="bg-red-600">
        <div className="page-container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1" style={{fontFamily:'Sora,sans-serif'}}>Don't wait. Know your genotype.</h3>
            <p className="text-red-100 text-sm">Many government hospitals in Cameroon offer free testing.</p>
          </div>
          <Link to="/centres" className="btn-secondary shrink-0 whitespace-nowrap">
            Find a Test Centre <FiArrowRight size={15} />
          </Link>
        </div>
      </div>

      <div className="page-container pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <FiDroplet className="text-white" size={15} />
              </div>
              <span className="font-bold text-white text-base" style={{fontFamily:'Sora,sans-serif'}}>SickleCare Cameroon</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              Cameroon's platform for sickle cell disease awareness, genotype testing, and health management.
            </p>
            <div className="flex gap-2">
              {[[FaFacebook,'#'],[FaTwitter,'#'],[FaInstagram,'#'],[FaWhatsapp,'#']].map(([Icon, href], i) => (
                <a key={i} href={href}
                   className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-red-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav cols */}
          {COLS.map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="text-sm hover:text-white transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">Stay Updated</h4>
            <p className="text-sm leading-relaxed mb-4">Health tips and SCD awareness delivered to your inbox.</p>
            <form onSubmit={handleSub} className="flex gap-2">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-2 placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors" />
              <button type="submit" disabled={loading}
                className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors">
                →
              </button>
            </form>
            <div className="mt-6 space-y-2.5">
              {[[FiPhone,'+237 222 22 22 22'],[FiMail,'contact@sicklecare.cm'],[FiMapPin,'Yaoundé, Cameroon']].map(([Icon, text], i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                  <Icon size={11} className="shrink-0" /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} SickleCare Cameroon. All rights reserved. Educational purposes only — not medical advice.</p>
          <div className="flex gap-4">
            {['Privacy','Terms','Accessibility'].map(t => (
              <Link key={t} to="#" className="hover:text-slate-400 transition-colors">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
