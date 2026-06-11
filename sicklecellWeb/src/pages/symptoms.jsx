import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Battery, Flame, Hand, Bug, TrendingUp, Eye, Thermometer, Bone } from "lucide-react";



const SYMPTOMS = [
  { icon: Battery, name: "Fatigue & anaemia", body: "Sickle cells die early, leaving the body short on oxygen-carrying red cells. Persistent tiredness is one of the earliest signs." },
  { icon: Flame, name: "Pain crises", body: "Sudden, severe episodes of pain when sickled cells block blood flow. They can last hours or days and affect any part of the body." },
  { icon: Hand, name: "Swollen hands & feet", body: "Often the first symptom in infants, caused by sickled cells blocking circulation to the small bones of the hands and feet." },
  { icon: Bug, name: "Frequent infections", body: "Damage to the spleen weakens the immune system. Patients are especially vulnerable to bacterial infections like pneumonia." },
  { icon: TrendingUp, name: "Delayed growth", body: "Reduced oxygen and nutrient supply can slow growth in children and delay puberty in teenagers." },
  { icon: Eye, name: "Vision problems", body: "Tiny blood vessels in the eye can be blocked by sickled cells, sometimes leading to lasting damage if untreated." },
  { icon: Thermometer, name: "Recurring fevers", body: "Fever in a person with SCD is treated as a medical emergency — it may signal a serious infection." },
  { icon: Bone, name: "Joint & bone pain", body: "Chronic pain in the hips, shoulders and back often follows years of reduced blood flow to the bones." },
];

function SymptomsPage() {
  useEffect(() => { document.title = "Symptoms of Sickle Cell Disease \u2014 SickleCare"; let m = document.querySelector("meta[name=description]"); if(!m){m=document.createElement("meta");m.setAttribute("name","description");document.head.appendChild(m);} m.setAttribute("content", "Recognise the most common signs of sickle cell disease \u2014 from fatigue and pain crises to swelling, infections, and vision changes."); }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        eyebrow="Symptoms"
        title={<>Know the signs. <span className="text-accent">Act early.</span></>}
        description="Symptoms vary widely from person to person and can change over a lifetime. If you or someone you love shows several of these signs, ask a doctor about sickle cell testing."
      />

      <section className="container-page py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SYMPTOMS.map((s, i) => (
            <article
              key={s.name}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-accent/30 bg-accent/5 p-8 md:p-10">
          <h3 className="font-display text-2xl font-semibold">When to seek emergency care</h3>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Go to the hospital immediately for: a fever above 38.5°C, chest pain or
            difficulty breathing, severe headache, sudden weakness on one side of
            the body, painful erection lasting over 4 hours, or pain that doesn't
            respond to usual home care.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default SymptomsPage;
