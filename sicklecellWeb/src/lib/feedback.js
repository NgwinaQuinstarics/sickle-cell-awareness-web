import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

/**
 * Firestore `feedback` collection — written by the public feedback form
 * (src/pages/feedback.jsx). Admins read and (optionally) delete entries.
 *
 * Document shape: { name, email, category, message, rating, createdAt }
 */

/** Live feedback list, newest first. Returns { items, loading, error }. */
export function useFeedback() {
  const [state, setState] = useState({ items: [], loading: true, error: "" });

  useEffect(() => {
    const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => setState({ items: snap.docs.map((d) => ({ id: d.id, ...d.data() })), loading: false, error: "" }),
      (err) => setState({ items: [], loading: false, error: err?.message ?? "Could not load feedback." }),
    );
    return unsub;
  }, []);

  return state;
}

export function deleteFeedback(id) {
  return deleteDoc(doc(db, "feedback", id));
}

export function formatFeedbackDate(t) {
  const ms = t?.toMillis ? t.toMillis() : 0;
  if (!ms) return "Just now";
  return new Date(ms).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
