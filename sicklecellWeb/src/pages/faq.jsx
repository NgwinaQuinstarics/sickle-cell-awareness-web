import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
<<<<<<< HEAD
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
=======
import { FaqEditorDialog } from "@/components/FaqEditorDialog";
import { Plus, Minus, Pencil, Trash2, DownloadCloud, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth.jsx";
import { useFaqs, deleteFaq, importSeedFaqs } from "@/lib/faqs";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/AnimationHelpers";
>>>>>>> 6c93f20 (feat: add feedback & FAQ management system, new pages, and improve Firebase-driven content structure)

function FaqPage() {
  useEffect(() => {
    document.title = "Frequently Asked Questions — SickleCare";
<<<<<<< HEAD

=======
>>>>>>> 6c93f20 (feat: add feedback & FAQ management system, new pages, and improve Firebase-driven content structure)
    let m = document.querySelector("meta[name=description]");
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
<<<<<<< HEAD

=======
>>>>>>> 6c93f20 (feat: add feedback & FAQ management system, new pages, and improve Firebase-driven content structure)
    m.setAttribute(
      "content",
      "Plain-language answers to the most common questions about sickle cell disease, inheritance, treatment and daily life."
    );
  }, []);

<<<<<<< HEAD
  const [open, setOpen] = useState(0); // ✅ FIXED
=======
  const { isAdmin } = useAuth();
  const { faqs, live } = useFaqs(isAdmin);
  const [open, setOpen] = useState(0);
  const [editing, setEditing] = useState(null); // null | {} (new) | faq
  const [importing, setImporting] = useState(false);

  const onDelete = async (f) => {
    if (!window.confirm(`Delete this question?\n\n"${f.question}"`)) return;
    await deleteFaq(f.id);
  };

  const onImportSeed = async () => {
    setImporting(true);
    try {
      await importSeedFaqs();
    } finally {
      setImporting(false);
    }
  };

  const nextOrder = faqs.reduce((max, f) => Math.max(max, f.order ?? 0), 0) + 1;
>>>>>>> 6c93f20 (feat: add feedback & FAQ management system, new pages, and improve Firebase-driven content structure)

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Honest answers to <span className="text-accent">honest questions.</span>
          </>
        }
        description="The questions families ask us most — answered plainly, without jargon or judgment."
      >
        {isAdmin && (
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setEditing({})}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background transition hover:opacity-90 shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" />
              Add question
            </button>
            {!live && (
              <button
                onClick={onImportSeed}
                disabled={importing}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground disabled:opacity-50 shadow-sm"
              >
                <DownloadCloud className="h-3.5 w-3.5" />
                {importing ? "Importing…" : "Import starter questions"}
              </button>
            )}
          </div>
        )}
      </PageHero>

      <section className="container-page py-20">
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;

            return (
              <ScrollReveal
                key={f.id}
                variant="fade-up"
                delay={i * 0.05}
                className={`rounded-2xl border bg-card transition-colors ${
                  isOpen ? "border-accent/40 shadow-md" : "border-border"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 p-6 text-left"
                >
<<<<<<< HEAD
                  <span className="font-display text-lg font-semibold leading-snug">
                    {f.q}
=======
                  <span className="font-display text-lg font-bold leading-snug text-foreground">
                    {f.published === false && (
                      <span className="mr-2 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        <EyeOff className="h-3 w-3" />
                        Draft
                      </span>
                    )}
                    {f.question}
>>>>>>> 6c93f20 (feat: add feedback & FAQ management system, new pages, and improve Firebase-driven content structure)
                  </span>

                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </span>
                </button>

<<<<<<< HEAD
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
=======
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                          {f.a ?? f.answer}
                        </p>

                        {isAdmin && (
                          <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                            <span className="flex-1" />
                            <button
                              onClick={() => setEditing(f)}
                              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-accent/50 hover:text-foreground"
                            >
                              <Pencil className="h-3 w-3" />
                              Edit
                            </button>
                            <button
                              onClick={() => onDelete(f)}
                              disabled={!live}
                              title={!live ? "Starter content — import it first to manage it" : undefined}
                              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-destructive/50 hover:text-destructive disabled:opacity-40"
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ScrollReveal>
>>>>>>> 6c93f20 (feat: add feedback & FAQ management system, new pages, and improve Firebase-driven content structure)
            );
          })}
        </div>
      </section>

<<<<<<< HEAD
=======
      {editing !== null && (
        <FaqEditorDialog
          faq={editing.id ? editing : null}
          live={live}
          nextOrder={nextOrder}
          onClose={() => setEditing(null)}
        />
      )}

>>>>>>> 6c93f20 (feat: add feedback & FAQ management system, new pages, and improve Firebase-driven content structure)
      <Footer />
    </div>
  );
}

export default FaqPage;