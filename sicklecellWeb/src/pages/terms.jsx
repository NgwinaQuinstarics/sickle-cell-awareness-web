import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
<<<<<<< HEAD
=======
import { SectionBody } from "@/components/SectionBody";
import { SectionsEditor } from "@/components/SectionsEditor";
import { Pencil } from "lucide-react";
import { useAuth } from "@/lib/auth.jsx";
import { usePageContent } from "@/lib/content";
>>>>>>> 6c93f20 (feat: add feedback & FAQ management system, new pages, and improve Firebase-driven content structure)

function TermsPage() {
  useEffect(() => { document.title = "Terms & Conditions — SickleCare"; let m = document.querySelector("meta[name=description]"); if(!m){m=document.createElement("meta");m.setAttribute("name","description");document.head.appendChild(m);} m.setAttribute("content", "Terms governing use of the SickleCare website and mobile application."); }, []);

  const { isAdmin } = useAuth();
  const { content } = usePageContent("terms");
  const [editing, setEditing] = useState(false);

  const sections = content?.sections ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        eyebrow="Legal"
        title={<>Terms & <span className="text-accent">Conditions</span></>}
        description="By using the SickleCare website or mobile app you agree to the following terms. Please read them carefully."
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
        <article className="mx-auto max-w-3xl space-y-8 text-[15px] leading-relaxed text-foreground/90">
<<<<<<< HEAD

          {/* ── Privacy Policy link ── */}
          <p className="text-sm text-muted-foreground">
            These Terms should be read alongside our{" "}
            <a href="/privacy-policy" className="text-accent underline font-medium">
              Privacy Policy
            </a>
            , which explains how we collect and use your data.
          </p>

          <Block title="1. Acceptance of terms">
            By accessing or using the SickleCare website or installing the SickleCare mobile application
            ("the Service"), you agree to be bound by these Terms & Conditions and our Privacy Policy.
            If you do not agree, please do not use the Service.
          </Block>
          <Block title="2. Medical disclaimer">
            <p>
              SickleCare provides general awareness and educational content about sickle cell disease.
              The Service is <b>not a medical device</b> and does <b>not provide medical advice, diagnosis or treatment</b>.
            </p>
            <p className="mt-3">
              Always seek the advice of a qualified healthcare provider for any questions you may have about a
              medical condition. <b>Never disregard professional medical advice or delay seeking it because of
              something you read or saw in the Service.</b> If you are experiencing a medical emergency,
              call your local emergency services immediately.
            </p>
          </Block>
          <Block title="3. Eligibility">
            The Service is intended for users aged 13 and older. Children under 13 may only use the Service
            under the supervision of a parent or guardian.
          </Block>
          <Block title="4. User accounts (mobile app)">
            <ul className="list-disc space-y-2 pl-5">
              <li>You are responsible for safeguarding your password.</li>
              <li>You agree to provide accurate information when registering.</li>
              <li>You may delete your account at any time from Settings → Account → Delete account.</li>
            </ul>
          </Block>
          <Block title="5. Acceptable use">
            <p>You agree NOT to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Use the Service for any unlawful purpose.</li>
              <li>Upload viruses, malware or harmful code.</li>
              <li>Attempt to reverse engineer, decompile or hack the Service.</li>
              <li>Impersonate any person or misrepresent your identity.</li>
              <li>Use the AI assistant to generate harmful, defamatory or misleading medical claims.</li>
            </ul>
          </Block>
          <Block title="6. User-generated content">
            Messages you send through the contact or feedback forms, and tracker entries you record in the
            mobile app, remain your property. By submitting them you grant SickleCare a limited licence to
            store, process and (in the case of contact messages) respond to them.
          </Block>
          <Block title="7. Intellectual property">
            All content on the Service — logos, text, illustrations, code — is the property of SickleCare or
            its licensors and is protected by copyright and trademark laws. You may share educational content
            with credit, but you may not reproduce or sell it commercially without written permission.
          </Block>
          <Block title="8. Third-party services">
            The Service uses third-party providers including Google Firebase (backend), OpenAI-compatible
            providers (AI assistant) and Open-Meteo (weather). Their respective terms of service apply to
            those features.
          </Block>
          <Block title="9. Limitation of liability">
            To the maximum extent permitted by law, SickleCare and its team shall not be liable for any
            indirect, incidental, special, consequential or punitive damages arising from your use of, or
            inability to use, the Service.
          </Block>
          <Block title="10. Changes to the Service">
            We may modify, suspend or discontinue any part of the Service at any time, with or without notice.
            We may update these Terms; continued use of the Service after changes constitutes acceptance.
          </Block>
          <Block title="11. Governing law">
            These Terms are governed by the laws of the Republic of Cameroon. Any dispute shall be submitted
            to the competent courts of Yaoundé.
          </Block>
          <Block title="12. Contact">
            Questions about these Terms? Email <a className="text-accent underline" href="mailto:legal@sicklecare.org">legal@sicklecare.org</a>.
          </Block>
=======
          <p className="text-sm text-muted-foreground">
            These Terms should be read alongside our{" "}
            <Link to="/privacy-policy" className="text-accent underline font-medium">
              Privacy Policy
            </Link>
            , which explains how we collect and use your data.
          </p>

          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="font-display text-xl font-semibold">{s.title}</h2>
              <SectionBody text={s.body} />
            </section>
          ))}
>>>>>>> 6c93f20 (feat: add feedback & FAQ management system, new pages, and improve Firebase-driven content structure)
        </article>
      </section>

      {editing && (
        <SectionsEditor
          pageKey="terms"
          title="Terms & Conditions"
          initial={content}
          onClose={() => setEditing(false)}
        />
      )}
      <Footer />
    </div>
  );
}

<<<<<<< HEAD
function Block({ title, children }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <div className="mt-3 text-muted-foreground">{children}</div>
    </section>
  );
}

export default TermsPage;
=======
export default TermsPage;
>>>>>>> 6c93f20 (feat: add feedback & FAQ management system, new pages, and improve Firebase-driven content structure)
