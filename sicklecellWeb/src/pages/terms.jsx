import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { SectionBody } from "@/components/SectionBody";
import { usePageContent } from "@/lib/content";

function TermsPage() {
  useEffect(() => {
    document.title = "Terms & Conditions — SickleCare";
    let m = document.querySelector("meta[name=description]");
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute(
      "content",
      "Terms governing use of the SickleCare website and mobile application."
    );
  }, []);

  const { content } = usePageContent("terms");
  const sections = content?.sections ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        eyebrow="Legal"
        title={<>Terms & <span className="text-accent">Conditions</span></>}
        description="By using the SickleCare website or mobile app you agree to the following terms. Please read them carefully."
      />
      <section className="container-page py-16">
        <article className="mx-auto max-w-3xl space-y-8 text-[15px] leading-relaxed text-foreground/90">
          <p className="text-sm text-muted-foreground">
            These Terms and Conditions govern your access to and use of the SickleCare website, mobile application and related services (collectively referred to as the "Service").
            The Terms should be read alongside our{" "}
            <Link to="/privacy" className="text-accent underline font-medium">
              Privacy Policy
            </Link>
            , which explains how we collect and use your data.  
            By accessing or using the Service, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with these Terms, please do not use the Service.
          </p>

          {sections.map((section, index) => (
            <section key={index}>
              <h2 className="font-display text-xl font-semibold">{section.title}</h2>
              <SectionBody text={section.body} />
            </section>
          ))}
        </article>
      </section>
      <Footer />
    </div>
  );
}

export default TermsPage;


