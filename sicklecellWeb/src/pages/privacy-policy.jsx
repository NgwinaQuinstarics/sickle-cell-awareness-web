import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";



function PrivacyPage() {
  useEffect(() => { document.title = "Privacy Policy \u2014 SickleCare"; let m = document.querySelector("meta[name=description]"); if(!m){m=document.createElement("meta");m.setAttribute("name","description");document.head.appendChild(m);} m.setAttribute("content", "How the SickleCare website and mobile app collect, use, and protect your personal information."); }, []);

  const updated = "10 June 2026";
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
          <Block title="1. Who we are">
            SickleCare is a non-profit awareness initiative based in Cameroon dedicated to sickle cell education,
            prevention and patient support. We operate the website at sicklecare and the SickleCare mobile
            application (collectively, the "Service").
          </Block>

          <Block title="2. Information we collect">
            <ul className="list-disc space-y-2 pl-5">
              <li><b>Account information</b> (mobile app only): name, email address and password if you create an account.</li>
              <li><b>Health tracker data</b> (mobile app only): self-reported pain levels, hydration logs, symptoms and reminders you choose to record.</li>
              <li><b>Contact form submissions</b>: name, email, subject and message when you write to us through the website or the in-app support form.</li>
              <li><b>Device and usage data</b>: anonymous information such as device type, OS version, app version and crash reports.</li>
              <li><b>Cookies and local storage</b>: used only to remember your theme preference and keep you signed in.</li>
            </ul>
            We do <b>not</b> collect financial information, biometric data, precise location, or contact lists.
          </Block>

          <Block title="3. How we use your information">
            <ul className="list-disc space-y-2 pl-5">
              <li>To provide and improve the Service (tracker history, reminders, AI assistant responses).</li>
              <li>To respond to your support and contact messages.</li>
              <li>To send notifications you have explicitly enabled (medication, hydration, appointments).</li>
              <li>To produce anonymous, aggregate statistics about sickle cell awareness reach.</li>
            </ul>
          </Block>

          <Block title="4. Legal basis">
            We process your information on the basis of your consent, our legitimate interest in operating an
            awareness platform, and to comply with applicable law in Cameroon and any country where the Service is used.
          </Block>

          <Block title="5. How we store and protect your data">
            All data is stored on Google Firebase (Firestore, Firebase Authentication and Firebase Storage),
            encrypted in transit and at rest. Access is restricted to authorised SickleCare administrators.
            We use Firebase Security Rules to ensure each user can only read or modify their own tracker data.
          </Block>

          <Block title="6. Sharing your information">
            We do <b>not sell, rent or trade your personal data</b>. We may share anonymised, aggregated
            statistics with research partners or public-health bodies. We may disclose information when legally
            required to comply with a court order or a lawful request from a Cameroonian authority.
          </Block>

          <Block title="7. AI assistant disclaimer">
            Questions you send to the in-app AI assistant are processed by a third-party AI provider for the
            sole purpose of generating a reply. We do not attach your name, email or any account identifier
            to those requests. The AI assistant provides general information only and is <b>not a substitute
            for professional medical advice</b>.
          </Block>

          <Block title="8. Children">
            The mobile app is suitable for all ages but children under 13 must use it under the supervision of a
            parent or guardian. We do not knowingly collect personal information from children under 13 without
            verifiable parental consent.
          </Block>

          <Block title="9. Your rights">
            You have the right to access, correct, export or delete your personal data at any time. To exercise
            these rights, contact us at <a className="text-accent underline" href="mailto:privacy@sicklecare.org">privacy@sicklecare.org</a>.
            In the mobile app, you can delete your account from Settings \u2192 Account \u2192 Delete account.
          </Block>

          <Block title="10. Data retention">
            Tracker data is retained for as long as your account is active. If you delete your account, all
            associated personal data is permanently removed from our systems within 30 days, except where we
            are legally required to retain it.
          </Block>

          <Block title="11. International transfers">
            Firebase processes data on servers located outside Cameroon. By using the Service you consent to
            this transfer, which is protected by Google's standard contractual clauses.
          </Block>

          <Block title="12. Changes to this policy">
            We may update this policy from time to time. Material changes will be announced on this page and,
            for the mobile app, via an in-app notice. The "Effective date" above always reflects the latest version.{" "}
            Please also review our{" "}
            <Link to="/terms" className="text-accent underline">Terms and Conditions</Link>,
            which govern your use of the Service alongside this policy.
          </Block>

          <Block title="13. Contact">
            Questions about this Privacy Policy? Email <a className="text-accent underline" href="mailto:privacy@sicklecare.org">privacy@sicklecare.org</a> or write to
            SickleCare, Yaound\u00e9, Cameroon.
          </Block>
        </article>
      </section>
      <Footer />
    </div>
  );
}

function Block({ title, children }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <div className="mt-3 text-muted-foreground">{children}</div>
    </section>
  );
}

export default PrivacyPage;