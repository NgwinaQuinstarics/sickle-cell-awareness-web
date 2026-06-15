import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  Dna,
  Droplet,
  Apple,
  Calendar,
  Snowflake,
  Heart,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { usePageContent } from "@/lib/content";
import { ScrollReveal, AnimatedCard } from "@/components/AnimationHelpers";

const ICONS = { Dna, Droplet, Apple, Calendar, Snowflake, Heart };

const DEFAULT_CARE = [
  { icon: "Dna", title: "Genotype testing", body: "Know your genotype before pregnancy. Two AS partners have a 25% chance of having a child with SS — a fact that quietly shapes a family's entire future." },
  { icon: "Droplet", title: "Hydration", body: "Sickled cells are triggered by dehydration. Aim for 2–3 litres of water daily; more in hot weather, during exercise, or when unwell." },
  { icon: "Apple", title: "Nutrition", body: "A diet rich in leafy greens, beans, fish, eggs and citrus supports red blood cell production. Folic acid supplementation is commonly recommended." },
  { icon: "Calendar", title: "Regular checkups", body: "Routine visits catch complications early. Vaccinations, eye exams and transcranial Doppler screenings in children are non-negotiable." },
  { icon: "Snowflake", title: "Avoid triggers", body: "Extreme cold, high altitudes, exhausting activity, alcohol and stress can spark a crisis. Plan ahead and pace yourself." },
  { icon: "Heart", title: "Healthy lifestyle", body: "Gentle exercise, restful sleep, and managing stress through mindfulness or community make a measurable difference in crisis frequency." },
];

const GENOTYPES = [
  { code: "AA", name: "Normal", desc: "Two normal hemoglobin A genes. No sickle cell trait or disease." },
  { code: "AS", name: "Sickle cell trait", desc: "Carrier. Generally healthy but can pass S gene to children." },
  { code: "AC", name: "Hemoglobin C trait", desc: "Carrier of hemoglobin C. Usually healthy." },
  { code: "SS", name: "Sickle cell anemia", desc: "Most common form of sickle cell disease." },
  { code: "SC", name: "Hemoglobin SC disease", desc: "A milder but still serious form of sickle cell disease." },
  { code: "SD", name: "Hemoglobin SD (Punjab)", desc: "Rare sickle cell variant; severity similar to SS." },
  { code: "SE", name: "Hemoglobin SE", desc: "Rare; usually mild but can cause crises under stress." },
  { code: "SO-Arab", name: "Hemoglobin SO-Arab", desc: "Rare; severity similar to SS." },
  { code: "Sβ-thal", name: "Sickle β-thalassemia", desc: "Combination of S gene and β-thalassemia. Severity varies." },
];

function risk(a, b) {
  const pair = [a, b].sort().join("+");
  switch (pair) {
    case "AA+AA": return { level: "safe", note: "All children AA. No risk." };
    case "AA+AS": return { level: "safe", note: "50% AA, 50% AS. No disease in children." };
    case "AA+AC": return { level: "safe", note: "50% AA, 50% AC. No disease in children." };
    case "AA+SS": return { level: "caution", note: "All children AS (carriers). Safe medically, but every child will be a carrier." };
    case "AA+SC": return { level: "caution", note: "Children will be AS or AC carriers. No disease." };
    case "AA+SD": return { level: "caution", note: "Children will be AS or AD carriers. No disease." };
    case "AA+SE": return { level: "caution", note: "Children will be AS or AE carriers. No disease." };
    case "AA+SO-Arab": return { level: "caution", note: "Children will be AS or AO carriers. No disease." };
    case "AA+Sβ-thal": return { level: "caution", note: "Children will be AS or β-thal carriers. No disease." };
    case "AS+AS": return { level: "high", note: "25% SS (disease), 50% AS, 25% AA. Strongly discouraged." };
    case "AC+AS": return { level: "high", note: "25% SC disease, 25% AS, 25% AC, 25% AA. Discouraged." };
    case "AC+AC": return { level: "high", note: "25% CC, 50% AC, 25% AA. CC is usually mild but possible — caution." };
    case "AS+SS": return { level: "avoid", note: "50% SS (disease), 50% AS. Not recommended." };
    case "AS+SC": return { level: "avoid", note: "25% SS, 25% SC, 25% AS, 25% AC. Half the children will have disease." };
    case "AS+SD": return { level: "avoid", note: "50% will have SS or SD disease. Not recommended." };
    case "AS+SE": return { level: "avoid", note: "50% will have SS or SE. Not recommended." };
    case "AS+SO-Arab": return { level: "avoid", note: "50% will have SS or SO. Not recommended." };
    case "AS+Sβ-thal": return { level: "avoid", note: "50% will have SS or Sβ-thal disease. Not recommended." };
    case "AC+SS": return { level: "avoid", note: "50% SC, 50% AS. Half the children will have SC disease." };
    case "AC+SC": return { level: "avoid", note: "Very high risk of SC and CC offspring. Not recommended." };
    case "SC+SS":
    case "SD+SS":
    case "SE+SS":
    case "SO-Arab+SS":
    case "SS+Sβ-thal":
    case "SC+SD":
    case "SC+SE":
    case "SC+SO-Arab":
    case "SC+Sβ-thal":
    case "SS+SS":
      return { level: "avoid", note: "Every child will inherit some form of sickle cell disease. Strongly advised against." };
  }
  if (a === "AA" || b === "AA") return { level: "caution", note: "Children will be carriers — no disease, but plan future partnerships carefully." };
  return { level: "avoid", note: "High likelihood of sickle cell disease in offspring. Genetic counseling strongly advised." };
}

const RISK_STYLES = {
  safe:    { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", label: "Safe",      Icon: CheckCircle2 },
  caution: { bg: "bg-amber-500/10",   text: "text-amber-600 dark:text-amber-400",     label: "Caution",   Icon: AlertTriangle },
  high:    { bg: "bg-orange-500/15",  text: "text-orange-600 dark:text-orange-400",   label: "High Risk", Icon: AlertTriangle },
  avoid:   { bg: "bg-red-500/15",     text: "text-red-600 dark:text-red-400",         label: "Avoid",     Icon: XCircle },
};

function PreventionPage() {
  const { content } = usePageContent("prevention");

  useEffect(() => {
    document.title = "Prevention, Care & Genotype Compatibility — SickleCare";
    let m = document.querySelector("meta[name=description]");
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute(
      "content",
      "Daily care, lifestyle habits, and a full genotype compatibility chart for couples — including rare variants like AC, SC, SD and Sβ-thalassemia."
    );
  }, []);

  const headline = content?.headline || "Small daily habits, big lifelong impact.";
  const description =
    content?.description ||
    "Sickle cell disease can't always be prevented, but its complications can be. These daily practices help patients spend more time well — and less time in crisis.";
  const care = content?.carePoints || DEFAULT_CARE;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <PageHero eyebrow="Prevention & Care" title={headline} description={description} />

      <section className="container-page py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {care.map((c, idx) => {
            const Icon = ICONS[c.icon] || Heart;
            return (
              <AnimatedCard key={c.title} delay={idx * 0.08} className="rounded-2xl p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              </AnimatedCard>
            );
          })}
        </div>

        {/* Genotype glossary */}
        <div className="mt-24">
          <ScrollReveal variant="fade-up">
            <p className="font-display text-sm uppercase tracking-[0.25em] text-accent">Know the genotypes</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Every hemoglobin genotype — common and rare.</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              A simple blood test reveals which of these you carry. Knowing yours — and your partner's — protects the next generation.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GENOTYPES.map((g, idx) => (
              <ScrollReveal key={g.code} variant="zoom-in" delay={idx * 0.05}>
                <div className="rounded-2xl border border-border bg-card p-6 h-full hover:border-accent/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-xl bg-accent/10 px-3 font-display text-sm font-semibold text-accent">
                      {g.code}
                    </span>
                    <h3 className="font-display text-base font-semibold">{g.name}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{g.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Compatibility chart */}
        <div className="mt-24">
          <ScrollReveal variant="fade-up">
            <p className="font-display text-sm uppercase tracking-[0.25em] text-accent">Marriage compatibility</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Who can marry whom — safely.</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Find your genotype in the first column and your partner's across the top. The colour tells you the risk for your future children.
            </p>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap gap-3">
              {Object.keys(RISK_STYLES).map((r) => {
                const s = RISK_STYLES[r];
                return (
                  <span
                    key={r}
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold ${s.bg} ${s.text}`}
                  >
                    <s.Icon className="h-3.5 w-3.5" />
                    {s.label}
                  </span>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="zoom-in" delay={0.1}>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead>
                  <tr className="bg-muted/40">
                    <th className="sticky left-0 z-10 bg-muted/40 px-4 py-3 text-left font-display text-xs uppercase tracking-wider text-muted-foreground">
                      Partner →
                    </th>
                    {GENOTYPES.map((g) => (
                      <th key={g.code} className="px-3 py-3 text-center font-display text-xs font-semibold">
                        {g.code}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {GENOTYPES.map((row) => (
                    <tr key={row.code} className="border-t border-border">
                      <th className="sticky left-0 z-10 bg-card px-4 py-3 text-left font-display text-xs font-semibold">
                        {row.code}
                      </th>
                      {GENOTYPES.map((col) => {
                        const r = risk(row.code, col.code);
                        const s = RISK_STYLES[r.level];
                        return (
                          <td key={col.code} className={`px-2 py-2 text-center ${s.bg}`}>
                            <span
                              title={r.note}
                              className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ${s.text}`}
                            >
                              <s.Icon className="h-3 w-3" />
                              {s.label}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          <p className="mt-4 text-xs text-muted-foreground">
            Hover or tap any cell on a desktop to see the inheritance breakdown. This chart is for awareness only — always consult a qualified genetic counsellor before making family decisions.
          </p>
        </div>

        <ScrollReveal variant="fade-up" className="mt-20">
          <div className="grid gap-6 rounded-3xl border border-border bg-navy p-8 text-cream md:p-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="font-display text-sm uppercase tracking-[0.25em] text-coral">Get tested</p>
              <h3 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
                A simple blood test can save a generation.
              </h3>
            </div>
            <p className="leading-relaxed text-cream/80">
              Encourage every young adult and every couple considering marriage to know their genotype. The test is quick,
              affordable, and widely available at public health centres and most laboratories across Cameroon.
            </p>
          </div>
        </ScrollReveal>
      </section>
      <Footer />
    </div>
  );
}

export default PreventionPage;
