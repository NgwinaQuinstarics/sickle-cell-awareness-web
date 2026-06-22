import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionBody } from "@/components/SectionBody";
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

  const { content } = usePageContent("privacy");
  const updated = content?.effectiveDate || "10 June 2026";
  const sections = content?.sections ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        eyebrow="Legal"
        title={<>Privacy <span className="text-accent">Policy</span></>}
        description={`Effective date: ${updated}. This policy applies to the SickleCare website and the SickleCare mobile application.`}
      />
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
      <Footer />
    </div>
  );
}

export default PrivacyPage;

