import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiAlertTriangle, FiCheckCircle,
  FiDroplet, FiBarChart2, FiMapPin, FiBook,
  FiUsers, FiSmartphone, FiSearch, FiActivity,
  FiClipboard, FiHeart, FiShield,
} from 'react-icons/fi';
import {
  FaDna, FaBaby, FaHandshake,
} from 'react-icons/fa';
import { GiSyringe } from 'react-icons/gi';
import { SectionHead, StatCard, FeatureCard } from '../components/ui/index.jsx';
import { useStats } from '../hooks/index.js';

const FEATURES = [
  { icon: <FaDna />,        title:'Genotype Testing',    desc:'Find a certified testing centre in your region. Many offer free tests.',                  accent:'red' },
  { icon: <FiBarChart2 />,  title:'Risk Assessment',     desc:'Our 7-question quiz gives you a personalised risk score in under 2 minutes.',             accent:'amber' },
  { icon: <FiMapPin />,     title:'Test Centre Finder',  desc:'Locate certified labs across all 10 Cameroon regions with directions.',                   accent:'blue' },
  { icon: <FiBook />,       title:'Health Education',    desc:'Clear, medically accurate information about SCD, genetics, and prevention.',               accent:'green' },
  { icon: <FiUsers />,      title:'Community Pledge',    desc:'Join thousands of Cameroonians committed to breaking the sickle cell cycle.',              accent:'purple' },
  { icon: <FiSmartphone />, title:'Mobile App',          desc:'Track medications, hydration, and symptoms with the SickleCare mobile app.',              accent:'slate' },
];

const TESTIMONIALS = [
  { name:'Marie-Claire N.', region:'Centre',   role:"Mother of an SCD child",       text:"If I had known my genotype before marriage, my son would never have suffered. Please — get tested before starting a family." },
  { name:'Dr. Emmanuel A.', region:'Littoral', role:'Haematologist, CHUY',           text:'Every week I see families devastated by SCD. 70% of these cases could have been prevented by a simple blood test.' },
  { name:'Thierry B.',      region:'West',     role:'SCD Warrior, 28',               text:'I live with SCD every day. My mission is to make sure fewer children are born into this. Know your genotype.' },
];

const STEPS = [
  { n:'01', icon: <FiSearch />,    t:'Find a Centre',      d:'Use our directory to locate a certified testing centre near you.' },
  { n:'02', icon: <GiSyringe />,   t:'Give a Blood Sample', d:'Quick, painless. Results in 24–48 hours at most centres.' },
  { n:'03', icon: <FiClipboard />, t:'Get Your Result',    d:'Receive your genotype (AA, AS, SS...) with a counsellor explanation.' },
  { n:'04', icon: <FiHeart />,     t:'Protect Your Family', d:'Share with your partner. Make informed decisions for your children.' },
];

export default function Home() {
  const { data: stats } = useStats();

  return (
    <div>
      {/* HERO */}
      <section className="bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="relative page-container py-24 lg:py-36">
          <div className="max-w-2xl">
           
            <h1 className="heading-xl text-white mb-6 animate-in-up delay-1 text-balance">
              Not Knowing Your Genotype Is a{' '}
              <span className="text-red-500">Deadly Risk.</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-xl mb-8 animate-in-up delay-2">
              Over <strong className="text-white">1 in 4 Cameroonians</strong> carries the sickle cell gene without knowing it.
              A single blood test can protect your children — and it's free at most government hospitals.
            </p>
            <div className="flex flex-wrap gap-3 mb-12 animate-in-up delay-3">
              <Link to="/centres" className="btn-primary-lg">Get Tested Now <FiArrowRight /></Link>
              <Link to="/dangers" className="btn-lg border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white rounded-lg transition-colors">Why It Matters</Link>
            </div>
           
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-b border-slate-100 py-14">
        <div className="page-container grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value:'1 in 4',  label:'Cameroonians carry the gene', icon: <FaDna /> },
            { value:'150K+',   label:'SCD births per year in Africa', icon: <FaBaby /> },
            { value:'90%',     label:'SS children die before 5 without care', icon: <FiAlertTriangle /> },
            { value:'70%',     label:'Cases preventable by testing', icon: <FiShield /> },
          ].map((s, i) => <StatCard key={i} {...s} />)}
        </div>
      </section>

      {/* WHAT IS SCD */}
      <section className="section bg-slate-50">
        <div className="page-container grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="tag-red mb-4 flex items-center gap-1.5"><FiActivity className="text-red-400" /> Understanding SCD</div>
            <h2 className="heading-lg text-slate-900 mb-5">What Is Sickle Cell Disease?</h2>
            <p className="body-md mb-4">Sickle cell disease (SCD) is a genetic blood disorder where red blood cells become crescent-shaped instead of round and flexible. These abnormal cells block blood vessels, starving organs of oxygen.</p>
            <p className="body-md mb-6">The consequences: <strong className="text-slate-800">severe pain crises, organ damage, strokes, and significantly shortened life</strong>. An SS child in sub-Saharan Africa has a <strong className="text-red-600">90% chance of dying before age 5</strong> without proper care.</p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/about"    className="btn-primary">Learn More</Link>
              <Link to="/dangers"  className="btn-secondary">See the Dangers</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
              <div className="text-5xl mb-3 flex justify-center"><FiCheckCircle className="text-green-400" size={48} /></div>
              <div className="font-semibold text-green-700 mb-2 text-sm">Normal Blood Cell</div>
              <ul className="text-xs text-slate-500 space-y-1.5">
                {['Round & flexible','Flows freely','Lives 90–120 days','Carries oxygen well'].map(t => (
                  <li key={t} className="flex items-center gap-1.5 justify-center"><FiCheckCircle size={10} className="text-green-500 shrink-0"/>{t}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
              <div className="text-5xl mb-3 flex justify-center"><FiAlertTriangle className="text-red-400" size={48} /></div>
              <div className="font-semibold text-red-700 mb-2 text-sm">Sickle Cell</div>
              <ul className="text-xs text-slate-500 space-y-1.5">
                {['Crescent-shaped','Blocks vessels','Lives only 10–20 days','Causes pain crises'].map(t => (
                  <li key={t} className="flex items-center gap-1.5 justify-center"><FiAlertTriangle size={10} className="text-red-500 shrink-0"/>{t}</li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-5">
              <div className="text-sm font-semibold text-slate-700 mb-3">AS + AS Parents — Each Pregnancy</div>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[['AA','25%','green'],['AS','25%','amber'],['AS','25%','amber'],['SS','25%','red']].map(([g,p,c],i)=>(
                  <div key={i} className={`rounded-lg p-2.5 border ${c==='green'?'bg-green-50 border-green-200':c==='amber'?'bg-amber-50 border-amber-200':'bg-red-50 border-red-200'}`}>
                    <div className={`font-bold text-lg ${c==='green'?'text-green-700':c==='amber'?'text-amber-700':'text-red-700'}`} style={{fontFamily:'Sora,sans-serif'}}>{g}</div>
                    <div className="text-xs text-slate-500">{p}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 text-center mt-2">25% chance of SCD child per pregnancy</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section bg-white">
        <div className="page-container">
          <SectionHead center tag="Platform" title="Everything you need in one place" body="SickleCare gives you the tools to understand, prevent, and manage sickle cell disease." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => <FeatureCard key={i} {...f} />)}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-slate-50">
        <div className="page-container">
          <SectionHead center tag="Real stories" title="These stories could have been prevented" />
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, region, role, text }) => (
              <div key={name} className="card p-6">
                <div className="text-3xl text-red-200 mb-3" style={{fontFamily:'Georgia,serif'}}>"</div>
                <p className="text-sm text-slate-600 leading-relaxed italic mb-5">{text}</p>
                <div className="border-t border-slate-100 pt-4">
                  <div className="font-semibold text-slate-800 text-sm">{name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{role} · {region}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO GET TESTED */}
      <section className="section bg-white">
        <div className="page-container">
          <SectionHead center tag="Take action" title="Getting tested is simple. Not getting tested isn't." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {STEPS.map(({ n, icon, t, d }) => (
              <div key={n} className="text-center">
                <div className="text-5xl font-bold text-slate-100 mb-1" style={{fontFamily:'Sora,sans-serif'}}>{n}</div>
                <div className="text-3xl mb-3 flex justify-center text-slate-400">{icon}</div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{t}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/centres" className="btn-primary-lg">Find a Test Centre Near Me <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* PLEDGE CTA */}
      <section className="bg-red-600 py-20">
        <div className="page-container text-center max-w-2xl mx-auto">
          <div className="text-5xl mb-4 flex justify-center"><FaHandshake className="text-white/80" size={52} /></div>
          <h2 className="text-3xl font-bold text-white mb-4" style={{fontFamily:'Sora,sans-serif'}}>Take the SickleCare Pledge</h2>
          <p className="text-red-100 text-lg leading-relaxed mb-8">
            Join thousands of Cameroonians committed to getting tested, sharing awareness, and protecting future generations.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/pledge"  className="btn-secondary">Take the Pledge</Link>
            <Link to="/centres" className="btn-lg border border-white/30 text-white hover:bg-white/10 rounded-lg transition-colors">Find a Test Centre</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
