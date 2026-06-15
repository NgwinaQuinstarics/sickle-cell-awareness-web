import { useEffect, useState } from "react";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

/**
 * Editable long-form pages, stored as single documents in the
 * `content` collection (project sicklecare-15d7a):
 *
 *   content/privacy    → { effectiveDate, sections: [{ title, body }], updatedAt }
 *   content/terms      → {                sections: [{ title, body }], updatedAt }
 *   content/resources  → { headline, description, updatedAt }
 *   content/prevention → { headline, description, carePoints: [{ icon, title, body }], updatedAt }
 *   content/symptoms   → { headline, description, symptomsList: [{ icon, name, body }], updatedAt }
 *   content/home       → { heroTitle, heroDescription, pillars: [{ icon, title, body }], stats: [{ value, label }], careTitle, careDescription, updatedAt }
 *
 * The built-in seeds below show until an admin saves real content, mirroring the
 * resources/faqs seed-fallback pattern.
 */

export const SEED_PRIVACY = {
  effectiveDate: "10 June 2026",
  sections: [
    { title: "1. Who we are", body: "SickleCare is a non-profit awareness initiative based in Cameroon dedicated to sickle cell education, prevention and patient support. We operate the SickleCare website and the SickleCare mobile application (collectively, the \"Service\")." },
    { title: "2. Information we collect", body: "- Account information (mobile app only): name, email address and password if you create an account.\n- Health tracker data (mobile app only): self-reported pain levels, hydration logs, symptoms and reminders you choose to record.\n- Contact form submissions: name, email, subject and message when you write to us through the website or the in-app support form.\n- Device and usage data: anonymous information such as device type, OS version, app version and crash reports.\n- Cookies and local storage: used only to remember your theme preference and keep you signed in.\n\nWe do not collect financial information, biometric data, precise location, or contact lists." },
    { title: "3. How we use your information", body: "- To provide and improve the Service (tracker history, reminders, AI assistant responses).\n- To respond to your support and contact messages.\n- To send notifications you have explicitly enabled (medication, hydration, appointments).\n- To produce anonymous, aggregate statistics about sickle cell awareness reach." },
    { title: "4. Legal basis", body: "We process your information on the basis of your consent, our legitimate interest in operating an awareness platform, and to comply with applicable law in Cameroon and any country where the Service is used." },
    { title: "5. How we store and protect your data", body: "All data is stored on Google Firebase (Firestore, Firebase Authentication and Firebase Storage), encrypted in transit and at rest. Access is restricted to authorised SickleCare administrators. We use Firebase Security Rules to ensure each user can only read or modify their own tracker data." },
    { title: "6. Sharing your information", body: "We do not sell, rent or trade your personal data. We may share anonymised, aggregated statistics with research partners or public-health bodies. We may disclose information when legally required to comply with a court order or a lawful request from a Cameroonian authority." },
    { title: "7. AI assistant disclaimer", body: "Questions you send to the in-app AI assistant are processed by a third-party AI provider for the sole purpose of generating a reply. We do not attach your name, email or any account identifier to those requests. The AI assistant provides general information only and is not a substitute for professional medical advice." },
    { title: "8. Children", body: "The mobile app is suitable for all ages but children under 13 must use it under the supervision of a parent or guardian. We do not knowingly collect personal information from children under 13 without verifiable parental consent." },
    { title: "9. Your rights", body: "You have the right to access, correct, export or delete your personal data at any time. To exercise these rights, contact us at privacy@sicklecare.org. In the mobile app, you can delete your account from Settings → Account → Delete account." },
    { title: "10. Data retention", body: "Tracker data is retained for as long as your account is active. If you delete your account, all associated personal data is permanently removed from our systems within 30 days, except where we are legally required to retain it." },
    { title: "11. International transfers", body: "Firebase processes data on servers located outside Cameroon. By using the Service you consent to this transfer, which is protected by Google's standard contractual clauses." },
    { title: "12. Changes to this policy", body: "We may update this policy from time to time. Material changes will be announced on this page and, for the mobile app, via an in-app notice. The \"Effective date\" above always reflects the latest version. Please also review our Terms and Conditions, which govern your use of the Service alongside this policy." },
    { title: "13. Contact", body: "Questions about this Privacy Policy? Email privacy@sicklecare.org or write to SickleCare, Yaoundé, Cameroon." },
  ],
};

export const SEED_TERMS = {
  sections: [
    { title: "1. Acceptance of terms", body: "By accessing or using the SickleCare website or installing the SickleCare mobile application (\"the Service\"), you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree, please do not use the Service." },
    { title: "2. Medical disclaimer", body: "SickleCare provides general awareness and educational content about sickle cell disease. The Service is not a medical device and does not provide medical advice, diagnosis or treatment.\n\nAlways seek the advice of a qualified healthcare provider for any questions you may have about a medical condition. Never disregard professional medical advice or delay seeking it because of something you read or saw in the Service. If you are experiencing a medical emergency, call your local emergency services immediately." },
    { title: "3. Eligibility", body: "The Service is intended for users aged 13 and older. Children under 13 may only use the Service under the supervision of a parent or guardian." },
    { title: "4. User accounts (mobile app)", body: "- You are responsible for safeguarding your password.\n- You agree to provide accurate information when registering.\n- You may delete your account at any time from Settings → Account → Delete account." },
    { title: "5. Acceptable use", body: "You agree NOT to:\n\n- Use the Service for any unlawful purpose.\n- Upload viruses, malware or harmful code.\n- Attempt to reverse engineer, decompile or hack the Service.\n- Impersonate any person or misrepresent your identity.\n- Use the AI assistant to generate harmful, defamatory or misleading medical claims." },
    { title: "6. User-generated content", body: "Messages you send through the contact or feedback forms, and tracker entries you record in the mobile app, remain your property. By submitting them you grant SickleCare a limited licence to store, process and (in the case of contact messages) respond to them." },
    { title: "7. Intellectual property", body: "All content on the Service — logos, text, illustrations, code — is the property of SickleCare or its licensors and is protected by copyright and trademark laws. You may share educational content with credit, but you may not reproduce or sell it commercially without written permission." },
    { title: "8. Third-party services", body: "The Service uses third-party providers including Google Firebase (backend), OpenAI-compatible providers (AI assistant) and Open-Meteo (weather). Their respective terms of service apply to those features." },
    { title: "9. Limitation of liability", body: "To the maximum extent permitted by law, SickleCare and its team shall not be liable for any indirect, incidental, special, consequential or punitive damages arising from your use of, or inability to use, the Service." },
    { title: "10. Changes to the Service", body: "We may modify, suspend or discontinue any part of the Service at any time, with or without notice. We may update these Terms; continued use of the Service after changes constitutes acceptance." },
    { title: "11. Governing law", body: "These Terms are governed by the laws of the Republic of Cameroon. Any dispute shall be submitted to the competent courts of Yaoundé." },
    { title: "12. Contact", body: "Questions about these Terms? Email legal@sicklecare.org." },
  ],
};

export const SEED_RESOURCES = {
  headline: "Knowledge you can act on.",
  description: "A growing library of vetted articles, videos and care guides — curated and updated regularly by our team."
};

export const SEED_PREVENTION = {
  headline: "Small daily habits, big lifelong impact.",
  description: "Sickle cell disease can't always be prevented, but its complications can be. These daily practices help patients spend more time well — and less time in crisis.",
  carePoints: [
    { icon: "Dna", title: "Genotype testing", body: "Know your genotype before pregnancy. Two AS partners have a 25% chance of having a child with SS — a fact that quietly shapes a family's entire future." },
    { icon: "Droplet", title: "Hydration", body: "Sickled cells are triggered by dehydration. Aim for 2–3 litres of water daily; more in hot weather, during exercise, or when unwell." },
    { icon: "Apple", title: "Nutrition", body: "A diet rich in leafy greens, beans, fish, eggs and citrus supports red blood cell production. Folic acid supplementation is commonly recommended." },
    { icon: "Calendar", title: "Regular checkups", body: "Routine visits catch complications early. Vaccinations, eye exams and transcranial Doppler screenings in children are non-negotiable." },
    { icon: "Snowflake", title: "Avoid triggers", body: "Extreme cold, high altitudes, exhausting activity, alcohol and stress can spark a crisis. Plan ahead and pace yourself." },
    { icon: "Heart", title: "Healthy lifestyle", body: "Gentle exercise, restful sleep, and managing stress through mindfulness or community make a measurable difference in crisis frequency." },
  ],
};

export const SEED_SYMPTOMS = {
  headline: "Know the signs. Act early.",
  description: "Symptoms vary widely from person to person and can change over a lifetime. If you or someone you love shows several of these signs, ask a doctor about sickle cell testing.",
  symptomsList: [
    { icon: "Battery", name: "Fatigue & anaemia", body: "Sickle cells die early, leaving the body short on oxygen-carrying red cells. Persistent tiredness is one of the earliest signs." },
    { icon: "Flame", name: "Pain crises", body: "Sudden, severe episodes of pain when sickled cells block blood flow. They can last hours or days and affect any part of the body." },
    { icon: "Hand", name: "Swollen hands & feet", body: "Often the first symptom in infants, caused by sickled cells blocking circulation to the small bones of the hands and feet." },
    { icon: "Bug", name: "Frequent infections", body: "Damage to the spleen weakens the immune system. Patients are especially vulnerable to bacterial infections like pneumonia." },
    { icon: "TrendingUp", name: "Delayed growth", body: "Reduced oxygen and nutrient supply can slow growth in children and delay puberty in teenagers." },
    { icon: "Eye", name: "Vision problems", body: "Tiny blood vessels in the eye can be blocked by sickled cells, sometimes leading to lasting damage if untreated." },
    { icon: "Thermometer", name: "Recurring fevers", body: "Fever in a person with SCD is treated as a medical emergency — it may signal a serious infection." },
    { icon: "Bone", name: "Joint & bone pain", body: "Chronic pain in the hips, shoulders and back often follows years of reduced blood flow to the bones." },
  ],
};

export const SEED_HOME = {
  heroTitle: "Empowering lives through sickle cell awareness.",
  heroDescription: "Education, prevention, and a community that shows up — so no family has to navigate a sickle cell diagnosis alone.",
  pillars: [
    { icon: "BookOpen", title: "Educate", body: "Clear, vetted information on causes, symptoms, and care — written for real people, not textbooks." },
    { icon: "Shield", title: "Prevent", body: "Genotype testing, healthy routines, and trigger awareness for fewer crises and longer well days." },
    { icon: "Heart", title: "Support", body: "A growing library of resources for patients, caregivers, and advocates everywhere." },
  ],
  stats: [
    { value: "100M+", label: "People worldwide carry the sickle cell trait" },
    { value: "300K", label: "Babies born with the disease each year" },
    { value: "75%", label: "Of cases occur in sub-Saharan Africa" },
    { value: "1 in 4", label: "Cameroonians carry the sickle cell trait" },
  ],
  careTitle: "Early diagnosis can rewrite a child's entire story.",
  careDescription: "Newborn screening, simple lifestyle adjustments, and consistent follow-up dramatically reduce the frequency of pain crises and long-term complications. The earlier care begins, the brighter the outcomes.",
};

const SEEDS = {
  privacy: SEED_PRIVACY,
  terms: SEED_TERMS,
  resources: SEED_RESOURCES,
  prevention: SEED_PREVENTION,
  symptoms: SEED_SYMPTOMS,
  home: SEED_HOME,
};

/**
 * Live page content for `content/{key}`. Falls back to the matching seed while
 * the document is missing or unreachable.
 * Returns { content, live, loading }.
 */
export function usePageContent(key) {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    const unsub = onSnapshot(
      doc(db, "content", key),
      (snap) => setData(snap.exists() ? snap.data() : false),
      () => setData(false),
    );
    return unsub;
  }, [key]);

  const live = !!data && (Array.isArray(data.sections) || typeof data === "object");
  const content = live ? data : SEEDS[key];

  return { content, live, loading: data === null };
}

export function savePageContent(key, data) {
  return setDoc(
    doc(db, "content", key),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true },
  );
}
