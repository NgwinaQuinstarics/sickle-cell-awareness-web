import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionBody } from "@/components/SectionBody";
import { SectionsEditor } from "@/components/SectionsEditor";
import { Pencil } from "lucide-react";
import { useAuth } from "@/lib/auth.jsx";
import { usePageContent } from "@/lib/content";

function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacy Policy — SickleCare";
    let m = document.querySelector("meta[name=description]");
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute(
      "content",
      "How the SickleCare website and mobile app collect, use, and protect your personal information."
    );
  }, []);

  const { isAdmin } = useAuth();
  const { content } = usePageContent("privacy");
  const [editing, setEditing] = useState(false);

  const updated = content?.effectiveDate || "10 June 2026";
  const sections = content?.sections ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        eyebrow="Legal"
        title={<>Privacy <span className="text-accent">Policy</span></>}
        description={`Effective date: ${updated}. This policy applies to the SickleCare website and the SickleCare mobile application.`}
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
      <section className="container-page py-16">
        <article className="prose-content mx-auto max-w-3xl space-y-8 text-[15px] leading-relaxed text-foreground/90">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-display text-xl font-semibold">{s.title}</h2>
              <SectionBody text={s.body} />
            </section>
          ))}

          <p className="text-sm text-muted-foreground">
            Please also review our{" "}
            <Link to="/terms" className="text-accent underline">Terms &amp; Conditions</Link>,
            which govern your use of the Service alongside this policy.
          </p>
        </article>
      </section>

      {editing && (
        <SectionsEditor
          pageKey="privacy"
          title="Privacy Policy"
          initial={content}
          hasEffectiveDate
          onClose={() => setEditing(false)}
        />
      )}
      <Footer />
    </div>
  );
}

export default PrivacyPage;

