import { Link } from 'react-router-dom';
import { FiArrowRight, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { SectionHead, Accordion, FeatureCard, CompatTable } from '../components/ui/index.jsx';

function PageHero({ tag, title, sub, dark = true }) {
  return (
    <div className={`${dark ? 'bg-slate-950' : 'bg-white border-b border-slate-200'} py-20`}>
      <div className={`page-container text-center max-w-2xl mx-auto`}>
        {tag && <div className="tag-red mb-4 mx-auto inline-flex">{tag}</div>}
        <h1 className={`heading-lg mb-4 text-balance ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h1>
        {sub && <p className={`body-lg ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{sub}</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────────────
const SYMPTOMS = [
  { e:'😣', t:'Severe Pain Crises',       d:'Sudden intense pain in bones, chest, abdomen and joints — lasting hours to days.' },
  { e:'😴', t:'Anaemia & Fatigue',        d:'Sickle cells die in 10–20 days vs. 120 for normal cells, causing chronic anaemia.' },
  { e:'🤒', t:'Frequent Infections',      d:'A damaged spleen leaves the body vulnerable to life-threatening infections.' },
  { e:'🫁', t:'Acute Chest Syndrome',     d:'Leading cause of SCD death. Sudden chest pain, fever, and breathing difficulty.' },
  { e:'🧠', t:'Stroke',                   d:'Blocked brain blood vessels — can affect children as young as 2 years old.' },
  { e:'💛', t:'Jaundice',                 d:'Yellowing of skin and eyes from the rapid breakdown of red blood cells.' },
];

const SCD_TYPES = [
  { code:'HbSS', name:'Sickle Cell Anaemia',         sev:'Most severe',   sc:'red',    p:'S+S',  d:'Two S genes. Most common and most severe form.' },
  { code:'HbSC', name:'Haemoglobin SC Disease',       sev:'Moderate',     sc:'amber',  p:'S+C',  d:'One S and one C gene. Usually milder than HbSS.' },
  { code:'HbS β⁰',name:'Sickle Beta-Zero Thalassaemia',sev:'Severe',     sc:'orange', p:'S+β⁰', d:'Similar severity to HbSS. No normal haemoglobin produced.' },
  { code:'HbS β⁺',name:'Sickle Beta-Plus Thalassaemia',sev:'Mild–Moderate',sc:'lime', p:'S+β⁺', d:'Some normal haemoglobin produced. Generally milder.' },
  { code:'HbAS',  name:'Sickle Cell Trait (Carrier)', sev:'No disease',   sc:'blue',  p:'A+S',  d:'Healthy carrier. Does NOT have SCD but CAN pass the gene.' },
];

export function AboutPage() {
  return (
    <div>
      <PageHero tag="🔬 About SCD" title="Understanding Sickle Cell Disease"
        sub="Knowledge is the foundation of prevention. Learn what SCD is, how it works, and why genotype knowledge is your most powerful tool." />
      <section className="section bg-white">
        <div className="page-container max-w-4xl mx-auto">
          <div className="card p-8 mb-10">
            <div className="tag-green mb-4">What is SCD?</div>
            <h2 className="heading-md text-slate-900 mb-4">A Genetic Blood Disorder with Life-Altering Consequences</h2>
            <p className="body-md mb-3">Sickle cell disease is an inherited disorder of haemoglobin — the protein in red blood cells that carries oxygen. A genetic mutation causes red blood cells to form a crescent (sickle) shape instead of a round disc.</p>
            <p className="body-md mb-3">These rigid, sticky cells block blood vessels and break down rapidly, starving organs of oxygen and causing chronic anaemia. An SS child in sub-Saharan Africa has a <strong className="text-red-600">90% chance of dying before age 5</strong> without early detection and care.</p>
          </div>

          <h2 className="heading-md text-slate-900 mb-6">Types of Sickle Cell Disease</h2>
          <div className="space-y-3 mb-12">
            {SCD_TYPES.map(({ code, name, sev, sc, p, d }) => {
              const cols = { red:'bg-red-50 border-red-200', amber:'bg-amber-50 border-amber-200', orange:'bg-orange-50 border-orange-200', lime:'bg-lime-50 border-lime-200', blue:'bg-blue-50 border-blue-200' };
              const text = { red:'text-red-700', amber:'text-amber-700', orange:'text-orange-700', lime:'text-lime-700', blue:'text-blue-700' };
              return (
                <div key={code} className={`rounded-xl p-5 border-2 flex items-start gap-5 ${cols[sc]}`}>
                  <div className="shrink-0 text-center w-20">
                    <div className={`font-bold text-2xl ${text[sc]}`} style={{fontFamily:'Sora,sans-serif'}}>{code}</div>
                    <div className="text-xs text-slate-400">Genes: {p}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900 text-sm">{name}</span>
                      <span className={`tag ${cols[sc].replace('bg-','bg-').replace('-50','-100')} ${text[sc]} !py-0`}>{sev}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{d}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <h2 className="heading-md text-slate-900 mb-6">Common Symptoms</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {SYMPTOMS.map(({ e, t, d }) => (
              <div key={t} className="card p-5">
                <div className="text-3xl mb-2">{e}</div>
                <div className="font-semibold text-slate-900 text-sm mb-1">{t}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-7 text-center">
            <h3 className="font-bold text-red-800 text-lg mb-3">The Most Important Fact</h3>
            <p className="text-slate-600 leading-relaxed mb-5 max-w-lg mx-auto">SCD cannot be cured for most people. It can only be <strong>prevented</strong> — by ensuring AS carriers don't have children together unknowingly. A simple blood test is all it takes.</p>
            <Link to="/centres" className="btn-primary">Get My Genotype Test Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DANGERS
// ─────────────────────────────────────────────────────────────
const SCENARIOS = [
  { couple:'AS + AS', risk:'Critical', bg:'bg-red-50 border-red-200', tc:'text-red-700',
    headline:'The Most Dangerous Combination',
    body:'Both parents appear healthy. Neither has symptoms. Yet every pregnancy has a 25% chance of producing an SS child with sickle cell disease. In Cameroon, ~1 in 4 people are AS — meaning roughly 1 in 16 couples are unknowingly AS+AS.',
    outcomes:['25% SS — child has SCD','50% AS — child is a carrier','25% AA — child is fully clear'] },
  { couple:'AS + SS', risk:'Severe', bg:'bg-orange-50 border-orange-200', tc:'text-orange-700',
    headline:'Half of All Children Will Suffer',
    body:'One AS parent and one SS parent: each pregnancy has a 50% chance of producing an SCD child. In a family of 4 children, statistically 2 will have the disease.',
    outcomes:['50% SS — child has SCD','50% AS — child is a carrier','0% AA'] },
  { couple:'SS + SS', risk:'Extreme', bg:'bg-purple-50 border-purple-200', tc:'text-purple-700',
    headline:'100% of Children Will Have SCD',
    body:'When both parents are SS, every single child born to them will also have sickle cell disease. This situation is entirely avoidable through pre-marital genotype testing.',
    outcomes:['100% SS — all children have SCD','0% chance of AA or AS'] },
];

const ORGANS = [
  ['🧠 Brain',  'Strokes and silent brain injury — common even in children.'],
  ['❤️ Heart',  'Heart failure and pulmonary hypertension — leading cause of adult SCD death.'],
  ['🫁 Lungs',  'Acute Chest Syndrome — most common cause of SCD death in hospital.'],
  ['🫘 Kidneys','Chronic kidney disease progressing to renal failure in adulthood.'],
  ['👁️ Eyes',   'Retinal damage and blindness from blocked ocular blood vessels.'],
  ['🦴 Bones',  'Avascular necrosis — bone death from loss of blood supply.'],
  ['🩺 Spleen', 'Repeated infarctions destroy the spleen, causing immune deficiency.'],
  ['🦶 Skin',   'Chronic leg ulcers that are resistant to healing.'],
];

export function DangersPage() {
  return (
    <div>
      <div className="bg-slate-950 py-20">
        <div className="page-container max-w-3xl">
          <div className="tag-red mb-4 inline-flex"><FiAlertTriangle size={11}/> Critical Awareness</div>
          <h1 className="heading-xl text-white mb-5 text-balance">The Deadly Consequences of Not Knowing Your Genotype</h1>
          <p className="body-lg text-slate-400 mb-8">Ignorance of your genotype is not just a personal risk — it is a risk you pass to your children. This page may be the most important thing you read today.</p>
          <Link to="/centres" className="btn-primary-lg">Get Tested — Free at Many Centres <FiArrowRight /></Link>
        </div>
      </div>

      <section className="section bg-white">
        <div className="page-container">
          <SectionHead tag="Risk Scenarios" title="What happens when untested couples have children"
            body="These are not abstract statistics. These are real possibilities for real families — including yours." />
          <div className="space-y-5 mb-16">
            {SCENARIOS.map(({ couple, risk, bg, tc, headline, body, outcomes }) => (
              <div key={couple} className={`rounded-xl p-7 border-2 ${bg}`}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`font-bold text-2xl ${tc}`} style={{fontFamily:'Sora,sans-serif'}}>{couple}</span>
                      <span className={`tag ${bg.replace('bg-','bg-')} ${tc} border-0`}>{risk}</span>
                    </div>
                    <h3 className={`font-semibold mb-2 ${tc}`}>{headline}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Possible outcomes per pregnancy:</div>
                    {outcomes.map(o => (
                      <div key={o} className="flex items-start gap-2 mb-2">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${tc.replace('text-','bg-')}`} />
                        <span className="text-sm text-slate-600">{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-950">
        <div className="page-container">
          <SectionHead tag="Organ Damage" title="How SCD destroys the body over time"
            body="Sickle cell disease is not just pain. It is a systematic destruction of multiple organs simultaneously." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ORGANS.map(([organ, dmg]) => (
              <div key={organ} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-red-800/50 transition-colors">
                <div className="text-xl mb-2">{organ}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{dmg}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-red-600 py-16 text-center">
        <div className="page-container max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4" style={{fontFamily:'Sora,sans-serif'}}>Prevention Is Simple</h2>
          <p className="text-red-100 text-lg mb-7">A blood test. That's all. Knowing your genotype before marriage can prevent every single thing described on this page.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/centres"    className="btn-secondary">Find a Test Centre</Link>
            <Link to="/prevention" className="btn-lg border border-white/30 text-white hover:bg-white/10 rounded-lg transition-colors">Prevention Guide</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PREVENTION
// ─────────────────────────────────────────────────────────────
export function PreventionPage() {
  return (
    <div>
      <div className="bg-green-800 py-20 text-white text-center">
        <div className="page-container max-w-2xl mx-auto">
          <div className="tag bg-white/15 text-white mb-4 mx-auto inline-flex">🛡️ Prevention</div>
          <h1 className="heading-lg text-white mb-4">Prevention Starts with a Blood Test</h1>
          <p className="text-green-100 body-lg mb-7">The only definitive way to prevent sickle cell disease is to know your genotype before having children. The test is simple. The impact is generational.</p>
          <Link to="/centres" className="btn-secondary">Find a Free Test Centre</Link>
        </div>
      </div>

      <section className="section bg-white">
        <div className="page-container">
          <SectionHead tag="Compatibility Guide" title="Genotype Compatibility at a Glance"
            body="Understanding how your genotype interacts with your partner's is crucial for family planning." />
          <div className="card overflow-hidden mb-10">
            <CompatTable />
          </div>
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-7 text-center">
            <h3 className="font-bold text-red-800 text-lg mb-3">⚠️ If you are AS, you MUST know your partner's genotype</h3>
            <p className="text-slate-600 leading-relaxed mb-5 max-w-2xl mx-auto">AS carriers are the largest at-risk group in Cameroon. The AS+AS combination produces 25% SCD risk — but most AS carriers don't even know they're carriers. Get tested. Get your partner tested. Then decide together.</p>
            <Link to="/centres" className="btn-primary">Find a Free Test Centre</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LIVING WITH SCD
// ─────────────────────────────────────────────────────────────
const TIPS = [
  { icon:'💧', title:'Stay Hydrated',          desc:'Drink 10+ glasses of water daily. Dehydration is a top crisis trigger.',      accent:'blue' },
  { icon:'💊', title:'Take Medications Daily', desc:'Hydroxyurea, folic acid, penicillin (children) — never skip a dose.',         accent:'green' },
  { icon:'🌡️', title:'Manage Temperature',     desc:'Avoid extreme cold. Dress in layers. Cold triggers sickling and crises.',     accent:'amber' },
  { icon:'😴', title:'Rest and Sleep',          desc:'7–9 hours per night. Fatigue increases crisis risk.',                        accent:'purple' },
  { icon:'🏥', title:'Regular Check-ups',       desc:'See your haematologist every 3–6 months. Early detection saves lives.',      accent:'red' },
  { icon:'🧘', title:'Manage Stress',           desc:'Emotional stress triggers crises. Practice mindfulness, seek support.',      accent:'slate' },
];

export function LivingPage() {
  return (
    <div>
      <PageHero tag="💪 Living with SCD" title="You Can Still Thrive"
        sub="With the right knowledge, support, and daily discipline, people with SCD can live full, productive, and meaningful lives." />
      <section className="section bg-white">
        <div className="page-container">
          <SectionHead center tag="Daily management" title="Managing Your Health Every Day" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {TIPS.map((t, i) => <FeatureCard key={i} {...t} />)}
          </div>
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-7">
            <h3 className="font-bold text-red-800 text-lg mb-5">🚨 Emergency Warning Signs — Go to Hospital Immediately</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {['Fever above 38°C (101°F)','Sudden severe chest pain','Stroke symptoms (face drooping, weakness)','Severe headache or vision changes','Severe abdominal pain','Priapism lasting more than 4 hours'].map(s=>(
                <div key={s} className="flex items-start gap-2 text-sm text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" /> {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// RESOURCES
// ─────────────────────────────────────────────────────────────
const ARTICLES = [
  { tag:'Prevention', e:'🧬', t:'The Complete Genotype Testing Guide',       d:'Everything you need to know about genotype tests in Cameroon.' },
  { tag:'Health',     e:'💊', t:'Hydroxyurea: Benefits and Dosage',           d:'A patient-friendly guide to the most important SCD medication.' },
  { tag:'Family',     e:'👨‍👩‍👧', t:'Talking to Your Partner About Genotypes',  d:'How to have this essential conversation before marriage.' },
  { tag:'Crisis',     e:'🚨', t:'Recognising and Responding to a Crisis',     d:'When to go to A&E and how to support someone in a crisis.' },
  { tag:'Nutrition',  e:'🥗', t:'Eating Well with Sickle Cell Disease',       d:'Foods to eat, foods to avoid, and meal planning strategies.' },
  { tag:'Science',    e:'🔬', t:'Gene Therapy: The Future of SCD Treatment',  d:'The latest research and what it means for patients worldwide.' },
];

const FAQS = [
  { q:'Can AS people live normal lives?',                    a:'Yes. Most AS carriers live completely normal lives with no symptoms. The problem arises when two AS carriers have children — each pregnancy has a 25% chance of producing an SS child.' },
  { q:'Is sickle cell disease curable?',                     a:'Bone marrow transplant can cure SCD but is not widely available. Gene therapy is showing great promise. For most people, treatment focuses on managing symptoms and preventing complications.' },
  { q:'At what age should children be tested?',              a:"Newborn screening is ideal — from birth. All children should be tested, especially before age 5. Early knowledge allows preventive care that dramatically improves survival." },
  { q:'Can I marry an AS partner if I am also AS?',          a:"This is a deeply personal decision. The medical risk is 25% per pregnancy. Options include pre-implantation genetic diagnosis (IVF), adoption, or choosing not to have biological children. Seek genetic counselling." },
  { q:'Is the genotype test accurate?',                      a:'Yes. The haemoglobin electrophoresis test is highly accurate. Always use a certified laboratory or hospital for reliable results.' },
  { q:"What does hydroxyurea do?",                           a:"Hydroxyurea increases foetal haemoglobin (HbF), which prevents sickling. It reduces pain crises, hospitalisations, and stroke risk significantly. It must be taken daily as prescribed." },
  { q:'What is the difference between sickle cell trait and sickle cell disease?', a:"Sickle cell trait (AS): carries one abnormal gene, usually no symptoms, but can pass it on. Sickle cell disease (SS): carries two abnormal genes — the person has the disease and experiences symptoms." },
];

export function ResourcesPage() {
  return (
    <div>
      <PageHero dark={false} tag="📚 Resources" title="Educational Resources"
        sub="Articles, guides, and answers to the most common questions about sickle cell disease, prevention, and management." />
      <section className="section bg-slate-50">
        <div className="page-container">
          <SectionHead tag="Articles & Guides" title="For Better Understanding" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {ARTICLES.map(({ tag, e, t, d }) => (
              <div key={t} className="card p-5 cursor-pointer group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{e}</span>
                  <span className="tag-red text-[10px]">{tag}</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1.5 group-hover:text-red-600 transition-colors leading-snug">{t}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <SectionHead tag="FAQ" title="Frequently Asked Questions" />
          <div className="max-w-2xl">
            <Accordion items={FAQS} />
          </div>
        </div>
      </section>
    </div>
  );
}
