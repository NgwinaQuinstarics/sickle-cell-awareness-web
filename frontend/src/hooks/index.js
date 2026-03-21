import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../utils/api';

// ── useForm — form state + validation ────────────────────────
export function useForm(initial, validate) {
  const [values,  setValues]  = useState(initial);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});

  const set = useCallback((k, v) => {
    setValues(prev => ({ ...prev, [k]: v }));
    if (touched[k] && validate) {
      const errs = validate({ ...values, [k]: v });
      setErrors(prev => ({ ...prev, [k]: errs[k] || '' }));
    }
  }, [values, touched, validate]);

  const touch = useCallback((k) => {
    setTouched(prev => ({ ...prev, [k]: true }));
    if (validate) {
      const errs = validate(values);
      setErrors(prev => ({ ...prev, [k]: errs[k] || '' }));
    }
  }, [values, validate]);

  const validateAll = useCallback(() => {
    if (!validate) return true;
    const errs = validate(values);
    setErrors(errs);
    setTouched(Object.keys(values).reduce((a, k) => ({ ...a, [k]: true }), {}));
    return Object.values(errs).every(e => !e);
  }, [values, validate]);

  const reset = useCallback(() => {
    setValues(initial);
    setErrors({});
    setTouched({});
  }, [initial]);

  return { values, errors, touched, set, touch, validateAll, reset, setValues };
}

// ── useAsync — async action state manager ────────────────────
export function useAsync(fn) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [data,    setData]    = useState(null);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);

  const run = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn(...args);
      if (mounted.current) { setData(result); }
      return result;
    } catch (err) {
      if (mounted.current) { setError(err.message || 'Something went wrong.'); }
      throw err;
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [fn]);

  return { loading, error, data, run };
}

// ── useFetch — data fetching on mount ────────────────────────
export function useFetch(fn, deps = []) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fn().then(d => { if (active) { setData(d); setLoading(false); } })
        .catch(e => { if (active) { setError(e.message || 'Failed to load.'); setLoading(false); } });
    return () => { active = false; };
  }, deps);

  return { data, loading, error };
}

// ── useStats — load public counters ──────────────────────────
export function useStats() {
  return useFetch(api.getStats, []);
}

// ── useCentres — load centres by region ──────────────────────
export function useCentres(region) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetch = useCallback(async (r) => {
    if (!r) return;
    setLoading(true); setError(null);
    try {
      const res = await api.getCentres(r);
      setData(res);
    } catch (e) {
      setError(e.message || 'Failed to load centres.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetch };
}

// ── useLocalStorage — persistent state ───────────────────────
export function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch { return initial; }
  });

  const set = useCallback(v => {
    setState(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key]);

  return [state, set];
}

// ── useDisclosure — open/close toggle ────────────────────────
export function useDisclosure(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);
  const open  = useCallback(() => setIsOpen(true),  []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle= useCallback(() => setIsOpen(v => !v), []);
  return { isOpen, open, close, toggle };
}

// ── useScrolled — track if page is scrolled ──────────────────
export function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [threshold]);
  return scrolled;
}

// ── useOutsideClick — close on outside click ─────────────────
export function useOutsideClick(ref, handler) {
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) handler(e); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [ref, handler]);
}

// ── useQuiz — full quiz logic ─────────────────────────────────
export function useQuiz(questions) {
  const [step,    setStep]    = useState(0); // 0 = intro
  const [answers, setAnswers] = useState({});

  const answer = useCallback((questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setStep(s => s + 1);
  }, []);

  const back = useCallback(() => setStep(s => Math.max(0, s - 1)), []);
  const restart = useCallback(() => { setStep(0); setAnswers({}); }, []);

  const isIntro  = step === 0;
  const isDone   = step > questions.length;
  const current  = questions[step - 1] || null;
  const progress = Math.round(((step) / questions.length) * 100);

  return { step, answers, current, progress, isIntro, isDone, answer, back, restart };
}
