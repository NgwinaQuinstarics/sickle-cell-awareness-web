import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";

/**
 * Firestore `faqs` collection (project sicklecare-15d7a).
 *
 * Document shape:
 *   question: string
 *   answer:   string
 *   order:    number   — ascending sort key for display
 *   published: boolean — drafts are visible to admins only
 *   updatedAt: Timestamp
 *
 * Same seed-fallback pattern as resources.js: the built-in SEED_FAQS show
 * until the admin imports / creates documents, so the page never looks empty.
 */

/** Starter content shown until the admin publishes real documents. */
export const SEED_FAQS = [
  { id: "what-causes-scd", order: 1, published: true, question: "What causes sickle cell disease?", answer: "It is caused by inheriting two copies of an abnormal haemoglobin gene (HbS) — one from each parent. The mutation changes how red blood cells are shaped and how long they survive." },
  { id: "can-it-be-cured", order: 2, published: true, question: "Can sickle cell be cured?", answer: "For most patients, no — but it can be very effectively managed. Bone marrow (stem cell) transplant is the only established cure today, and emerging gene therapies are showing strong promise." },
  { id: "prevent-pain-crises", order: 3, published: true, question: "How can pain crises be prevented?", answer: "Stay well hydrated, avoid temperature extremes, manage stress, take prescribed medications (such as hydroxyurea), and keep up with regular checkups. Identify and avoid your personal triggers." },
  { id: "is-it-hereditary", order: 4, published: true, question: "Is sickle cell disease hereditary?", answer: "Yes. Both parents must carry the sickle cell gene for a child to inherit the disease. If both parents are carriers (AS), each pregnancy has a 25% chance of producing a child with SCD." },
  { id: "helpful-foods", order: 5, published: true, question: "What foods help sickle cell patients?", answer: "Leafy greens, beans, lentils, fish, eggs, citrus fruits and whole grains support red blood cell production. Folic acid supplements are often recommended. Stay hydrated and limit alcohol." },
  { id: "can-they-exercise", order: 6, published: true, question: "Can people with sickle cell exercise?", answer: "Yes — but gently. Light to moderate activity is encouraged. Avoid pushing to exhaustion, stay hydrated, and rest when you need to. Always check with your doctor before starting new routines." },
  { id: "is-it-contagious", order: 7, published: true, question: "Is sickle cell contagious?", answer: "No. Sickle cell is genetic — it cannot be passed through contact, blood transfusion (which actually helps), or any other form of transmission." },
];

/**
 * Live FAQ list, ordered by `order` then question. Admins also see drafts.
 * Returns { faqs, live, loading } — `live` is false while the collection is
 * empty/unreachable and the seed content is shown.
 */
export function useFaqs(includeUnpublished = false) {
  const [docs, setDocs] = useState(null);

  useEffect(() => {
    const ref = collection(db, "faqs");
    const q = includeUnpublished ? ref : query(ref, where("published", "==", true));
    const unsub = onSnapshot(
      q,
      (snap) => setDocs(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      () => setDocs([]),
    );
    return unsub;
  }, [includeUnpublished]);

  const live = Array.isArray(docs) && docs.length > 0;
  const faqs = (live ? docs : SEED_FAQS)
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.question.localeCompare(b.question));

  return { faqs, live, loading: docs === null };
}

export function saveFaq(id, data) {
  const payload = { ...data, updatedAt: serverTimestamp() };
  if (id) return updateDoc(doc(db, "faqs", id), payload);
  return addDoc(collection(db, "faqs"), payload);
}

export function deleteFaq(id) {
  return deleteDoc(doc(db, "faqs", id));
}

/** One-click import of the starter FAQs into Firestore (admin only). */
export function importSeedFaqs() {
  return Promise.all(
    SEED_FAQS.map(({ id, ...data }) =>
      setDoc(doc(db, "faqs", id), { ...data, updatedAt: serverTimestamp() }),
    ),
  );
}
