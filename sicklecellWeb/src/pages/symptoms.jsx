import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  Battery,
  Flame,
  Hand,
  Bug,
  TrendingUp,
  Eye,
  Thermometer,
  Bone,
  Heart,
} from "lucide-react";
import { usePageContent } from "@/lib/content";
import { ScrollReveal, AnimatedCard } from "@/components/AnimationHelpers";

const ICONS = {
  Battery,
  Flame,
  Hand,
  Bug,
  TrendingUp,
  Eye,
  Thermometer,
  Bone,
};

const DEFAULT_SYMPTOMS = [
  { icon: "Battery", name: "Fatigue & anaemia", body: "Sickle cells die early, leaving the body short on oxygen-carrying red cells. Persistent tiredness is one of the earliest signs." },
  { icon: "Flame", name: "Pain crises", body: "Sudden, severe episodes of pain when sickled cells block blood flow. They can last hours or days and affect any part of the body." },
  { icon: "Hand", name: "Swollen hands & feet", body: "Often the first symptom in infants, caused by sickled cells blocking circulation to the small bones of the hands and feet." },
  { icon: "Bug", name: "Frequent infections", body: "Damage to the spleen weakens the immune system. Patients are especially vulnerable to bacterial infections like pneumonia." },
  { icon: "TrendingUp", name: "Delayed growth", body: "Reduced oxygen and nutrient supply can slow growth in children and delay puberty in teenagers." },
  { icon: "Eye", name: "Vision problems", body: "Tiny blood vessels in the eye can be blocked by sickled cells, sometimes leading to lasting damage if untreated." },
  { icon: "Thermometer", name: "Recurring fevers", body: "Fever in a person with SCD is treated as a medical emergency — it may signal a serious infection." },
  { icon: "Bone", name: "Joint & bone pain", body: "Chronic pain in the hips, shoulders and back often follows years of reduced blood flow to the bones." },
];

function SymptomsPage() {
  const { content } = usePageContent("symptoms");

  useEffect(() => {
    document.title = "Symptoms of Sickle Cell Disease — SickleCare";
    let m = document.querySelector("meta[name=description]");
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute(
      "content",
      "Recognise the most common signs of sickle cell disease — from fatigue and pain crises to swelling, infections, and vision changes."
    );
  }, []);

  const headline = content?.headline || "Know the signs. Act early.";
  const description =
    content?.description ||
    "Symptoms vary widely from person to person and can change over a lifetime. If you or someone you love shows several of these signs, ask a doctor about sickle cell testing.";
  const symptoms = content?.symptomsList || DEFAULT_SYMPTOMS;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <PageHero eyebrow="Symptoms" title={headline} description={description} />

      <section className="container-page py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {symptoms.map((s, i) => {
            const Icon = ICONS[s.icon] || Heart;
            return (
              <AnimatedCard key={s.name} delay={i * 0.05} className="rounded-2xl p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </AnimatedCard>
            );
          })}
        </div>

        <ScrollReveal variant="fade-up" delay={0.2} className="mt-16">
          <div className="rounded-3xl border border-accent/30 bg-accent/5 p-8 md:p-10 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-foreground">When to seek emergency care</h3>
            <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
              Go to the hospital immediately for: a fever above 38.5°C, chest pain or difficulty breathing, severe
              headache, sudden weakness on one side of the body, painful erection lasting over 4 hours, or pain that
              doesn't respond to usual home care.
            </p>
          </div>
        </ScrollReveal>
      </section>
      <Footer />
    </div>
  );
}

export default SymptomsPage;
