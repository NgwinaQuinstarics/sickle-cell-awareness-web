import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  { q: "What causes sickle cell disease?", a: "It is caused by inheriting two copies of an abnormal haemoglobin gene (HbS) — one from each parent. The mutation changes how red blood cells are shaped and how long they survive." },
  { q: "Can sickle cell be cured?", a: "For most patients, no — but it can be very effectively managed. Bone marrow (stem cell) transplant is the only established cure today, and emerging gene therapies are showing strong promise." },
  { q: "How can pain crises be prevented?", a: "Stay well hydrated, avoid temperature extremes, manage stress, take prescribed medications (such as hydroxyurea), and keep up with regular checkups. Identify and avoid your personal triggers." },
  { q: "Is sickle cell disease hereditary?", a: "Yes. Both parents must carry the sickle cell gene for a child to inherit the disease. If both parents are carriers (AS), each pregnancy has a 25% chance of producing a child with SCD." },
  { q: "What foods help sickle cell patients?", a: "Leafy greens, beans, lentils, fish, eggs, citrus fruits and whole grains support red blood cell production. Folic acid supplements are often recommended. Stay hydrated and limit alcohol." },
  { q: "Can people with sickle cell exercise?", a: "Yes — but gently. Light to moderate activity is encouraged. Avoid pushing to exhaustion, stay hydrated, and rest when you need to. Always check with your doctor before starting new routines." },
  { q: "Is sickle cell contagious?", a: "No. Sickle cell is genetic — it cannot be passed through contact, blood transfusion (which actually helps), or any other form of transmission." },
];

function FaqPage() {
  useEffect(() => {
    document.title = "Frequently Asked Questions — SickleCare";

    let m = document.querySelector("meta[name=description]");
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }

    m.setAttribute(
      "content",
      "Plain-language answers to the most common questions about sickle cell disease, inheritance, treatment and daily life."
    );
  }, []);

  const [open, setOpen] = useState(0); // ✅ FIXED

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Honest answers to <span className="text-accent">honest questions.</span>
          </>
        }
        description="The questions families ask us most — answered plainly, without jargon or judgment."
      />

      <section className="container-page py-20">
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;

            return (
              <div
                key={f.q}
                className={`rounded-2xl border bg-card transition ${
                  isOpen ? "border-accent/40 shadow-md" : "border-border"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 p-6 text-left"
                >
                  <span className="font-display text-lg font-semibold leading-snug">
                    {f.q}
                  </span>

                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>

                <div
                  className="grid overflow-hidden px-6 transition-all"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    paddingBottom: isOpen ? "1.5rem" : "0",
                  }}
                >
                  <div className="min-h-0">
                    <p className="leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default FaqPage;