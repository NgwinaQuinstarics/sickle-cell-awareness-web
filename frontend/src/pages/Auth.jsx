import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiDroplet, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useForm, useAsync, useDisclosure } from '../hooks/index.js';
import { Field, Spinner } from '../components/ui/index.jsx';
import toast from 'react-hot-toast';

const REGIONS = ['Centre','Littoral','West','North-West','South-West','North','Far North','Adamaoua','East','South'];

function AuthShell({ title, sub, children, footer }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-slate-950 flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage:'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize:'28px 28px' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl" />
        <div className="relative">
          <Link to="/" className="flex items-center gap-2.5 mb-20">
            <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
              <FiDroplet className="text-white" size={17} />
            </div>
            <span className="font-bold text-white text-lg" style={{fontFamily:'Sora,sans-serif'}}>SickleCare Cameroon</span>
          </Link>
          <blockquote className="text-slate-300 text-xl leading-relaxed font-light mb-6 text-balance">
            "A simple blood test can protect your children forever. Knowledge is the first medicine."
          </blockquote>
          <p className="text-sm text-slate-500">— Dr. Marie Nguemo, Haematologist, CHUY Yaoundé</p>
        </div>
        <div className="relative grid grid-cols-3 gap-6">
          {[['47K+','Pledges taken'],['15','Test centres'],['70%','Cases preventable']].map(([v,l])=>(
            <div key={l}>
              <div className="text-2xl font-bold text-red-500" style={{fontFamily:'Sora,sans-serif'}}>{v}</div>
              <div className="text-xs text-slate-500 mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <FiDroplet className="text-white" size={15} />
            </div>
            <span className="font-bold text-slate-900" style={{fontFamily:'Sora,sans-serif'}}>SickleCare</span>
          </Link>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-1.5" style={{fontFamily:'Sora,sans-serif'}}>{title}</h1>
            <p className="text-slate-500 text-sm">{sub}</p>
          </div>
          {children}
          <p className="text-center text-sm text-slate-500 mt-6">{footer}</p>
        </div>
      </div>
    </div>
  );
}

// ── LOGIN ──────────────────────────────────────────────────────
function validateLogin(v) {
  const e = {};
  if (!v.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Valid email required.';
  if (!v.password || v.password.length < 6) e.password = 'Password required.';
  return e;
}

export function LoginPage() {
  const { values, errors, set, touch, validateAll } = useForm({ email:'', password:'' }, validateLogin);
  const { isOpen: showPass, toggle: togglePass } = useDisclosure();
  const { loading, run } = useAsync(useAuth().login);
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || '/dashboard';

  const submit = async e => {
    e.preventDefault();
    if (!validateAll()) return;
    try {
      await run(values.email, values.password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) { toast.error(err.message || 'Incorrect credentials.'); }
  };

  return (
    <AuthShell title="Welcome back." sub="Sign in to your SickleCare account."
      footer={<>No account? <Link to="/register" className="text-red-600 font-semibold hover:underline">Create one</Link></>}>
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email Address" error={errors.email} required>
          <div className="relative">
            <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input type="email" value={values.email}
              onChange={e => set('email', e.target.value)}
              onBlur={() => touch('email')}
              placeholder="you@example.com"
              className={`input pl-10 ${errors.email ? 'input-error' : ''}`} />
          </div>
        </Field>
        <Field label="Password" error={errors.password} required>
          <div className="relative">
            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input type={showPass ? 'text' : 'password'} value={values.password}
              onChange={e => set('password', e.target.value)}
              onBlur={() => touch('password')}
              placeholder="••••••••"
              className={`input pl-10 pr-10 ${errors.password ? 'input-error' : ''}`} />
            <button type="button" onClick={togglePass} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
            </button>
          </div>
        </Field>
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-red-600 hover:underline">Forgot password?</Link>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full mt-2 py-3">
          {loading ? <><Spinner size={15} /> Signing in...</> : <>Sign In <FiArrowRight size={15} /></>}
        </button>
      </form>
    </AuthShell>
  );
}

// ── REGISTER ───────────────────────────────────────────────────
function validateRegister(v) {
  const e = {};
  if (!v.name || v.name.trim().length < 2) e.name = 'Full name required (min 2 chars).';
  if (!v.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Valid email required.';
  if (!v.region) e.region = 'Please select your region.';
  if (!v.password || v.password.length < 8) e.password = 'Password must be at least 8 characters.';
  if (v.password !== v.confirm) e.confirm = 'Passwords do not match.';
  return e;
}

export function RegisterPage() {
  const { values, errors, set, touch, validateAll } = useForm(
    { name:'', email:'', region:'', password:'', confirm:'' }, validateRegister
  );
  const { isOpen: showPass, toggle: togglePass } = useDisclosure();
  const { loading, run } = useAsync(useAuth().register);
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    if (!validateAll()) return;
    try {
      await run({ name: values.name, email: values.email, region: values.region, password: values.password });
      toast.success('Account created!');
      navigate('/dashboard');
    } catch (err) { toast.error(err.message || 'Registration failed.'); }
  };

  return (
    <AuthShell title="Create your account." sub="Join SickleCare Cameroon for free."
      footer={<>Already have an account? <Link to="/login" className="text-red-600 font-semibold hover:underline">Sign in</Link></>}>
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full Name" error={errors.name} required>
          <div className="relative">
            <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input value={values.name} onChange={e => set('name', e.target.value)} onBlur={() => touch('name')}
              placeholder="Jane Doe" className={`input pl-10 ${errors.name ? 'input-error' : ''}`} />
          </div>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Email" error={errors.email} required>
            <input type="email" value={values.email} onChange={e => set('email', e.target.value)} onBlur={() => touch('email')}
              placeholder="you@email.com" className={`input ${errors.email ? 'input-error' : ''}`} />
          </Field>
          <Field label="Region" error={errors.region} required>
            <select value={values.region} onChange={e => set('region', e.target.value)} onBlur={() => touch('region')}
              className={`input ${errors.region ? 'input-error' : ''}`}>
              <option value="">Select...</option>
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Password" error={errors.password} required hint="Minimum 8 characters">
          <div className="relative">
            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input type={showPass ? 'text' : 'password'} value={values.password}
              onChange={e => set('password', e.target.value)} onBlur={() => touch('password')}
              placeholder="••••••••" className={`input pl-10 pr-10 ${errors.password ? 'input-error' : ''}`} />
            <button type="button" onClick={togglePass} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
            </button>
          </div>
        </Field>
        <Field label="Confirm Password" error={errors.confirm} required>
          <input type="password" value={values.confirm} onChange={e => set('confirm', e.target.value)} onBlur={() => touch('confirm')}
            placeholder="••••••••" className={`input ${errors.confirm ? 'input-error' : ''}`} />
        </Field>
        <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-1">
          {loading ? <><Spinner size={15} /> Creating account...</> : <>Create Account <FiArrowRight size={15} /></>}
        </button>
      </form>
    </AuthShell>
  );
}
