import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Activity, Shield, Droplet, Users, BookOpen } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import heroImg from "@/assets/hero.jpg";
import cellsImg from "@/assets/cells.jpg";
import careImg from "@/assets/care.jpg";



const PILLARS = [
  { icon: BookOpen, title: "Educate", body: "Clear, vetted information on causes, symptoms, and care — written for real people, not textbooks." },
  { icon: Shield, title: "Prevent", body: "Genotype testing, healthy routines, and trigger awareness for fewer crises and longer well days." },
  { icon: Heart, title: "Support", body: "A growing library of resources for patients, caregivers, and advocates everywhere." },
];

const STATS = [
  { value: "100M+", label: "People worldwide carry the sickle cell trait" },
  { value: "300K", label: "Babies born with the disease each year" },
  { value: "75%", label: "Of cases occur in sub-Saharan Africa" },
  { value: "1 in 4", label: "Cameroonians carry the sickle cell trait" },
];

function HomePage() {
  useEffect(() => { document.title = "SickleCare \u2014 Empowering Lives Through Sickle Cell Awareness"; let m = document.querySelector("meta[name=description]"); if(!m){m=document.createElement("meta");m.setAttribute("name","description");document.head.appendChild(m);} m.setAttribute("content", "SickleCare educates, supports, and equips families living with sickle cell disease. Learn symptoms, prevention, and where to find help."); }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-10%] -z-10 h-150 w-275 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--coral-soft), transparent 70%)" }}
        />
        <div className="container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:py-32">
          <div className="reveal">
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              Empowering lives through{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-accent">sickle cell</span>
                <svg
                  className="absolute -bottom-2 left-0 h-3 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M2 8C50 2 150 2 198 8" stroke="var(--coral)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{" "}
              awareness.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Education, prevention, and a community that shows up — so no family
              has to navigate a sickle cell diagnosis alone.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:opacity-90"
              >
                Learn more
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
              >
                Explore resources
              </Link>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { k: "20+", v: "Articles" },
                { k: "8", v: "Care guides" },
                { k: "24/7", v: "Resource hub" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-3xl font-semibold text-foreground">{s.k}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal relative">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-navy shadow-2xl">
              <img
                src={heroImg}
                alt="Community of caregivers and patients supporting each other"
                className="h-full w-full object-cover"
                width={1536}
                height={1152}
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="container-page py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT IS SCD */}
      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl border border-border bg-navy">
            <img src={cellsImg} alt="Healthy and sickle-shaped red blood cells" loading="lazy" width={1280} height={960} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="font-display text-sm uppercase tracking-[0.25em] text-accent">What it is</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              A condition shaped like a sickle. A community shaped by hope.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Sickle cell disease is an inherited blood disorder in which red blood
              cells take on a rigid, crescent shape. Those misshapen cells get stuck
              in small blood vessels, causing pain, fatigue, and serious health
              complications — but with knowledge and the right care, patients live
              full, vibrant lives.
            </p>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              Read the full guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-navy text-cream">
        <div className="container-page py-20">
          <div className="max-w-2xl">
            <p className="font-display text-sm uppercase tracking-[0.25em] text-coral">By the numbers</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Awareness is the first treatment.</h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-navy p-8">
                <p className="font-display text-5xl font-semibold text-coral">{s.value}</p>
                <p className="mt-3 text-sm leading-relaxed text-cream/75">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARE STRIP */}
      <section className="container-page py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.25em] text-accent">Early care matters</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              Early diagnosis can rewrite a child's entire story.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Newborn screening, simple lifestyle adjustments, and consistent
              follow-up dramatically reduce the frequency of pain crises and
              long-term complications. The earlier care begins, the brighter the
              outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/prevention" className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90">
                Prevention guide
              </Link>
              <Link to="/symptoms" className="rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:border-accent hover:text-accent">
                Recognise symptoms
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <Users className="h-5 w-5 text-accent" />
              <p className="text-sm text-muted-foreground">Trusted by families, clinicians and student advocates.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border">
            <img src={careImg} alt="A doctor caring for a young patient" loading="lazy" width={1280} height={960} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-16">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(closest-side, var(--coral-soft), transparent)" }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <Activity className="h-7 w-7 text-accent" />
              <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
                Know your genotype. Share what you know.
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Awareness saves lives. Take five minutes to read a guide, share it
                with someone you love, or get tested today.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/resources" className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90">Resources</Link>
              <Link to="/contact" className="rounded-full border border-border bg-background px-6 py-3 text-sm font-medium hover:border-accent hover:text-accent">Contact us</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;