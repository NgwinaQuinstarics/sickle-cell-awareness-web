import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Pencil } from "lucide-react";
import { useAuth } from "@/lib/auth.jsx";
import { usePageContent } from "@/lib/content";
import { SectionsEditor } from "@/components/SectionsEditor";
import careImg from "@/assets/care.jpg";



const DEFAULT_POINTS = [
  { title: "What it is", body: "Sickle cell disease (SCD) is an inherited disorder of haemoglobin — the protein in red blood cells that carries oxygen. People with SCD produce abnormal haemoglobin (HbS) that distorts the cells into rigid, crescent shapes." },
  { title: "What causes it", body: "SCD is caused by a mutation in the HBB gene. A child must inherit one affected gene from each parent to develop the disease. Inheriting one affected gene results in sickle cell trait, which usually causes no symptoms." },
  { title: "Why awareness matters", body: "Most cases — and most preventable deaths — happen in regions with limited screening. Awareness drives testing, normalises the conversation, and removes the stigma families carry in silence." },
  { title: "Why early diagnosis matters", body: "Children diagnosed at birth and started on simple preventive care (penicillin, vaccinations, hydration, follow-up) live significantly longer with fewer crises. Late diagnosis costs lives." },
  { title: "What patients face", body: "Unpredictable pain crises, frequent hospital visits, fatigue, social stigma, and the emotional weight of a chronic illness. Education and community shrink that weight." },
];

function AboutPage() {
  useEffect(() => {
    document.title = "About Sickle Cell Disease — SickleCare";
    let m = document.querySelector("meta[name=description]");
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute(
      "content",
      "Understand what sickle cell disease is, its causes, why awareness matters, and the challenges patients face every day."
    );
  }, []);

  const { isAdmin } = useAuth();
  const { content } = usePageContent("about");
  const [editing, setEditing] = useState(false);

  const sections = content?.sections ?? [];
  const points = sections.length > 0 ? sections : DEFAULT_POINTS;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        eyebrow="About"
        title={<>Understanding sickle cell <span className="text-accent">starts here.</span></>}
        description="A clear, compassionate explainer of what the disease is, who it affects, and why early awareness changes everything."
      >
        {isAdmin && (
          <button
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background transition hover:opacity-90"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit page
          </button>
        )}
      </PageHero>

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div className="space-y-10">
            {points.map((p, i) => (
              <article key={i} className="rounded-2xl border border-border bg-card p-7">
                <h2 className="font-display text-2xl font-semibold">{p.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            ))}
          </div>

          <aside className="sticky top-28 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-border">
              <img src={careImg} alt="Caregiver and patient" loading="lazy" width={1280} height={960} className="h-full w-full object-cover" />
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">Did you know?</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>• SCD is the most common genetic disorder worldwide.</li>
                <li>• Two carrier parents have a 1-in-4 chance of having a child with SCD.</li>
                <li>• Bone marrow transplant is the only known cure, but most patients manage the disease for life.</li>
                <li>• Pain crises can be triggered by dehydration, cold, stress, or infection.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {editing && (
        <SectionsEditor
          pageKey="about"
          title="About Sickle Cell Disease"
          initial={content}
          onClose={() => setEditing(false)}
        />
      )}
      <Footer />
    </div>
  );
}

export default AboutPage;
