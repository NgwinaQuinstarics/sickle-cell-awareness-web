import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Activity, Shield, Droplet, Users, BookOpen } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import heroImg from "@/assets/hero.jpg";
import cellsImg from "@/assets/cells.jpg";
import careImg from "@/assets/care.jpg";
import { usePageContent } from "@/lib/content";
import { ScrollReveal, AnimatedCounter, AnimatedCard } from "@/components/AnimationHelpers";
import { motion } from "framer-motion";

const PILLARS_ICONS = { BookOpen, Shield, Heart };

const DEFAULT_PILLARS = [
  { icon: "BookOpen", title: "Educate", body: "Clear, vetted information on causes, symptoms, and care — written for real people, not textbooks." },
  { icon: "Shield", title: "Prevent", body: "Genotype testing, healthy routines, and trigger awareness for fewer crises and longer well days." },
  { icon: "Heart", title: "Support", body: "A growing library of resources for patients, caregivers, and advocates everywhere." },
];

const DEFAULT_STATS = [
  { value: "100M+", label: "People worldwide carry the sickle cell trait" },
  { value: "300K", label: "Babies born with the disease each year" },
  { value: "75%", label: "Of cases occur in sub-Saharan Africa" },
  { value: "1 in 4", label: "Cameroonians carry the sickle cell trait" },
];

function HomePage() {
  const { content } = usePageContent("home");

  useEffect(() => {
    document.title = "SickleCare — Empowering Lives Through Sickle Cell Awareness";
    let m = document.querySelector("meta[name=description]");
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute(
      "content",
      "SickleCare educates, supports, and equips families living with sickle cell disease. Learn symptoms, prevention, and where to find help."
    );
  }, []);

  const heroTitle = content?.heroTitle || "Empowering lives through sickle cell awareness.";
  const heroDescription =
    content?.heroDescription ||
    "Education, prevention, and a community that shows up — so no family has to navigate a sickle cell diagnosis alone.";
  const careTitle = content?.careTitle || "Early diagnosis can rewrite a child's entire story.";
  const careDescription =
    content?.careDescription ||
    "Newborn screening, simple lifestyle adjustments, and consistent follow-up dramatically reduce the frequency of pain crises and long-term complications. The earlier care begins, the brighter the outcomes.";

  const pillars = content?.pillars || DEFAULT_PILLARS;
  const stats = content?.stats || DEFAULT_STATS;

  // Split title if it contains "sickle cell" to preserve accent styling
  const renderHeroTitle = () => {
    const term = "sickle cell";
    const lowerTitle = heroTitle.toLowerCase();
    const index = lowerTitle.indexOf(term);

    if (index === -1) return heroTitle;

    const start = heroTitle.slice(0, index);
    const middle = heroTitle.slice(index, index + term.length);
    const end = heroTitle.slice(index + term.length);

    return (
      <>
        {start}
        <span className="relative inline-block">
          <span className="relative z-10 text-accent">{middle}</span>
          <svg
            className="absolute -bottom-2 left-0 h-3 w-full"
            viewBox="0 0 200 12"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M2 8C50 2 150 2 198 8" stroke="var(--coral)" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
        {end}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-10%] -z-10 h-150 w-275 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(closest-side, var(--coral-soft), transparent 70%)" }}
        />
        <div className="container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:py-32">
          <ScrollReveal variant="fade-up">
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              {renderHeroTitle()}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {heroDescription}
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
          </ScrollReveal>

<<<<<<< HEAD
          </div>

          <div className="reveal relative">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-navy shadow-2xl">
=======
          <ScrollReveal variant="zoom-in" delay={0.15}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative overflow-hidden rounded-3xl border border-border bg-navy shadow-2xl"
            >
>>>>>>> 6c93f20 (feat: add feedback & FAQ management system, new pages, and improve Firebase-driven content structure)
              <img
                src={heroImg}
                alt="Community of caregivers and patients supporting each other"
                className="h-full w-full object-cover"
                width={1536}
                height={1152}
              />
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* PILLARS */}
      <section className="container-page py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p, idx) => {
            const IconComponent = PILLARS_ICONS[p.icon] || BookOpen;
            return (
              <AnimatedCard key={p.title} delay={idx * 0.1} className="rounded-2xl p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <IconComponent className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </AnimatedCard>
            );
          })}
        </div>
      </section>

      {/* WHAT IS SCD */}
      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <ScrollReveal variant="slide-right">
            <div className="overflow-hidden rounded-3xl border border-border bg-navy">
              <img
                src={cellsImg}
                alt="Healthy and sickle-shaped red blood cells"
                loading="lazy"
                width={1280}
                height={960}
                className="h-full w-full object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal variant="slide-left" delay={0.1}>
            <p className="font-display text-sm uppercase tracking-[0.25em] text-accent">What it is</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
              A condition shaped like a sickle. A community shaped by hope.
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Sickle cell disease is an inherited blood disorder in which red blood cells take on a rigid, crescent
              shape. Those misshapen cells get stuck in small blood vessels, causing pain, fatigue, and serious health
              complications — but with knowledge and the right care, patients live full, vibrant lives.
            </p>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              Read the full guide <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-navy text-cream">
        <div className="container-page py-20">
          <ScrollReveal variant="fade-up">
            <div className="max-w-2xl">
              <p className="font-display text-sm uppercase tracking-[0.25em] text-coral">By the numbers</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Awareness is the first treatment.</h2>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, idx) => (
              <ScrollReveal key={s.label} variant="fade-up" delay={idx * 0.1}>
                <div className="bg-navy p-8 h-full">
                  <p className="font-display text-5xl font-semibold text-coral">
                    <AnimatedCounter value={s.value} />
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-cream/75">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CARE STRIP */}
      <section className="container-page py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <ScrollReveal variant="slide-right">
            <p className="font-display text-sm uppercase tracking-[0.25em] text-accent">Early care matters</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-5xl">{careTitle}</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">{careDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/prevention"
                className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90 transition-opacity"
              >
                Prevention guide
              </Link>
              <Link
                to="/symptoms"
                className="rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
              >
                Recognise symptoms
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <Users className="h-5 w-5 text-accent" />
              <p className="text-sm text-muted-foreground">Trusted by families, clinicians and student advocates.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="slide-left" delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-border">
              <img
                src={careImg}
                alt="A doctor caring for a young patient"
                loading="lazy"
                width={1280}
                height={960}
                className="h-full w-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
<<<<<<< HEAD
            <section className="container-page pb-24">
=======
      <section className="container-page pb-24">
        <ScrollReveal variant="zoom-in">
>>>>>>> 6c93f20 (feat: add feedback & FAQ management system, new pages, and improve Firebase-driven content structure)
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-16">
            <div
              aria-hidden
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-60 blur-3xl"
              style={{ background: "radial-gradient(closest-side, var(--coral-soft), transparent)" }}
            />
            <div className="relative flex flex-col items-center text-center gap-8">
              <div>
                <p className="font-display text-sm uppercase tracking-[0.25em] text-accent">Get involved</p>
<<<<<<< HEAD
                <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
                  Know your genotype. Share what you know.
                </h2>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  Awareness saves lives. Take five minutes to read a guide, share it
                  with someone you love, or get tested today.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/resources" className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90">Resources</Link>
                <Link to="/contact" className="rounded-full border border-border bg-background px-6 py-3 text-sm font-medium hover:border-accent hover:text-accent">Contact us</Link>
              </div>
            </div>
          </div>
        </section>
=======
                <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Know your genotype. Share what you know.</h2>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  Awareness saves lives. Take five minutes to read a guide, share it with someone you love, or get
                  tested today.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/resources"
                  className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90 transition-opacity"
                >
                  Resources
                </Link>
                <Link
                  to="/contact"
                  className="rounded-full border border-border bg-background px-6 py-3 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
>>>>>>> 6c93f20 (feat: add feedback & FAQ management system, new pages, and improve Firebase-driven content structure)

      <Footer />
    </div>
  );
}

export default HomePage;