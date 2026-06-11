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
 * Shared Firestore `resources` collection (project sicklecare-15d7a,
 * the same one the mobile app uses).
 *
 * Document shape:
 *   tag: "Article" | "Video" | "Health Tip" | "FAQ" | "Emergency" | "Guide"
 *   title, body (short summary), content (full text, blank-line paragraphs)
 *   time   — "8 min read", "3:42", "Printable", …
 *   url    — optional external link
 *   published: boolean
 *   updatedAt: Timestamp
 */

export const TAGS = ["Article", "Video", "Health Tip", "FAQ", "Emergency", "Guide"];

/** Starter content shown until the admin publishes real documents. */
export const SEED_RESOURCES = [
  {
    id: "living-with-scd",
    tag: "Article",
    title: "Living with sickle cell at every age",
    body: "What changes — and what stays the same — from childhood through adulthood with SCD.",
    content:
      "Sickle cell disease evolves with you. In childhood, the focus is on early diagnosis, penicillin prophylaxis, vaccination and teaching families to recognise danger signs like fever and a swollen spleen.\n\nDuring adolescence, the challenge shifts to ownership: learning your own triggers, managing school during crises, and preparing the transition from paediatric to adult care.\n\nIn adulthood, attention turns to protecting organs over the long term — regular check-ups for kidneys, eyes, heart and hips — while balancing work, family and treatment. What never changes: hydration, warmth, rest, and a care team that knows your baseline.",
    time: "8 min read",
    url: "",
    published: true,
    updatedAt: "2026-06-08",
  },
  {
    id: "daily-hydration-routine",
    tag: "Health Tip",
    title: "Building a daily hydration routine",
    body: "Practical strategies to drink enough water, especially during hot weather or travel.",
    content:
      "Dehydration is one of the most common, and most preventable, triggers of a pain crisis. Aim to sip steadily through the day rather than drinking large amounts at once.\n\nPractical anchors help: a glass on waking, a bottle that travels with you, water before and after every meal, and extra during hot weather, exercise, fever or travel.\n\nUrine colour is your simplest gauge — pale yellow is the goal. If you are vomiting or have diarrhoea, replace fluids quickly and contact your care team if you cannot keep fluids down.",
    time: "4 min read",
    url: "",
    published: true,
    updatedAt: "2026-06-05",
  },
  {
    id: "pain-crisis-explained",
    tag: "Video",
    title: "How a pain crisis happens (explained)",
    body: "A short animated explainer of vaso-occlusion, in plain language.",
    content:
      "This short animation walks through what happens inside a blood vessel during a vaso-occlusive crisis: red cells sickle, stick to the vessel wall and to each other, and block the flow of oxygen to tissue — which is what causes the pain.\n\nIt also covers the common triggers (dehydration, cold, infection, stress, over-exertion) and what early self-care can do: fluids, warmth, rest and pain relief, and when to head to hospital instead.",
    time: "3:42",
    url: "",
    published: true,
    updatedAt: "2026-06-01",
  },
  {
    id: "genotype-trait-disease",
    tag: "FAQ",
    title: "Genotype, trait, and disease — what's the difference?",
    body: "The short answer your family has been waiting for.",
    content:
      "Your genotype is the pair of haemoglobin genes you inherited — one from each parent. AA means no sickle gene. AS means you carry the trait: you are healthy, but you can pass the gene on. SS (and combinations like SC) mean sickle cell disease.\n\nTwo AS parents have, at every pregnancy, a 25% chance of an SS child, 50% of an AS child and 25% of an AA child.\n\nThat is why knowing your genotype — and your partner's — before starting a family is one of the most powerful prevention tools available. A simple blood test (haemoglobin electrophoresis) gives the answer.",
    time: "5 min read",
    url: "",
    published: true,
    updatedAt: "2026-05-28",
  },
  {
    id: "emergency-caregiver-checklist",
    tag: "Emergency",
    title: "Sickle cell emergency: a caregiver's checklist",
    body: "A printable card with red flags, what to pack for the hospital, and what to tell the ER doctor.",
    content:
      "Go to hospital immediately for: fever above 38.5°C, chest pain or difficulty breathing, sudden weakness or slurred speech, an erection lasting over 4 hours, sudden pallor with fatigue, a swollen abdomen, or pain that medication does not touch.\n\nKeep a hospital bag ready: health booklet and genotype card, current medication list, water bottle, warm clothing, and phone charger.\n\nTell the ER team: the patient has sickle cell disease, their usual baseline haemoglobin if known, what triggered the crisis, what has already been given at home, and any history of transfusion reactions.",
    time: "Printable",
    url: "",
    published: true,
    updatedAt: "2026-05-22",
  },
  {
    id: "nutrition-guide-cameroon",
    tag: "Guide",
    title: "Nutrition guide for sickle cell patients in Cameroon",
    body: "Local foods that support red blood cell production and what to limit.",
    content:
      "Red blood cell production needs folate, iron-conscious balance, protein and energy. Local staples can deliver all of it.\n\nFavour dark leafy greens (ndolé leaves, folong/amaranth), legumes (beans, groundnuts), eggs, fish, and fruit rich in vitamin C like guava, mango, oranges and papaya — vitamin C also helps the body use folate well.\n\nStay generously hydrated: water, but also hibiscus (foléré) without excess sugar. Limit alcohol, energy drinks and very salty processed food. If you take hydroxyurea or have frequent transfusions, ask your doctor before any iron supplement — many patients need folate, not iron.",
    time: "10 min read",
    url: "",
    published: true,
    updatedAt: "2026-05-18",
  },
];

function toMillis(t) {
  if (!t) return 0;
  if (typeof t.toMillis === "function") return t.toMillis();
  if (typeof t === "string") return Date.parse(t) || 0;
  return 0;
}

export function formatResourceDate(t, options = { day: "numeric", month: "short" }) {
  const ms = toMillis(t);
  if (!ms) return "";
  return new Date(ms).toLocaleDateString("en-GB", options);
}

/**
 * Live resources list. Admins see unpublished documents too.
 * Returns { resources, live, loading } — `live` is false while the
 * Firestore collection is empty/unreachable and the seed content is shown.
 */
export function useResources(includeUnpublished = false) {
  const [docs, setDocs] = useState(null);

  useEffect(() => {
    const ref = collection(db, "resources");
    const q = includeUnpublished ? ref : query(ref, where("published", "==", true));
    const unsub = onSnapshot(
      q,
      (snap) => setDocs(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      () => setDocs([]),
    );
    return unsub;
  }, [includeUnpublished]);

  const live = Array.isArray(docs) && docs.length > 0;
  const resources = (live ? docs : SEED_RESOURCES)
    .slice()
    .sort((a, b) => toMillis(b.updatedAt) - toMillis(a.updatedAt));

  return { resources, live, loading: docs === null };
}

/** Single resource for the detail page (falls back to seed content). */
export function useResource(id) {
  const [state, setState] = useState({ resource: null, loading: true });

  useEffect(() => {
    setState({ resource: null, loading: true });
    const unsub = onSnapshot(
      doc(db, "resources", id),
      (snap) => {
        if (snap.exists()) {
          setState({ resource: { id: snap.id, ...snap.data() }, loading: false });
        } else {
          const seed = SEED_RESOURCES.find((s) => s.id === id) ?? null;
          setState({ resource: seed, loading: false });
        }
      },
      () => {
        const seed = SEED_RESOURCES.find((s) => s.id === id) ?? null;
        setState({ resource: seed, loading: false });
      },
    );
    return unsub;
  }, [id]);

  return state;
}

export function saveResource(id, data) {
  const payload = { ...data, updatedAt: serverTimestamp() };
  if (id) return updateDoc(doc(db, "resources", id), payload);
  return addDoc(collection(db, "resources"), payload);
}

export function deleteResource(id) {
  return deleteDoc(doc(db, "resources", id));
}

/** One-click import of the starter items into Firestore (admin only). */
export function importSeedResources() {
  return Promise.all(
    SEED_RESOURCES.map(({ id, updatedAt: _ignored, ...data }) =>
      setDoc(doc(db, "resources", id), { ...data, updatedAt: serverTimestamp() }),
    ),
  );
}
