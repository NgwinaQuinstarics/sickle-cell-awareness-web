import { useEffect, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { X } from "lucide-react";
import { db } from "@/firebase";
import { saveFaq, importSeedFaqs } from "@/lib/faqs";

const FIELD_CLS =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

/**
 * Admin-only add/edit form for the `faqs` collection. Mirrors
 * ResourceEditorDialog. `faq` null = create. When `live` is false the page is
 * still showing starter content, so editing one starter item first imports the
 * whole starter set, then overwrites that item.
 */
export function FaqEditorDialog({ faq, live, nextOrder = 1, onClose }) {
  const [form, setForm] = useState({
    question: faq?.question ?? "",
    answer: faq?.answer ?? "",
    order: faq?.order ?? nextOrder,
    published: faq?.published ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (key) => (e) => {
    const v =
      e.target.type === "checkbox"
        ? e.target.checked
        : e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value;
    setForm((f) => ({ ...f, [key]: v }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (faq && !live) {
        await importSeedFaqs();
        await setDoc(doc(db, "faqs", faq.id), { ...form, updatedAt: serverTimestamp() });
      } else {
        await saveFaq(faq?.id ?? null, form);
      }
      onClose();
    } catch (err) {
      setError(err?.message ?? "Could not save. Check your connection and admin rights.");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-foreground/40 p-4 backdrop-blur-sm md:items-center">
      <div className="relative my-8 w-full max-w-xl rounded-3xl border border-border bg-card p-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="font-display text-2xl font-semibold">
          {faq ? "Edit question" : "Add question"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Published changes appear instantly on the public FAQ page.
        </p>

        <form onSubmit={onSubmit} className="mt-7 space-y-5">
          <div>
            <Label>Question</Label>
            <textarea value={form.question} onChange={set("question")} required rows={2} maxLength={200} className={FIELD_CLS} />
          </div>

          <div>
            <Label>Answer</Label>
            <textarea value={form.answer} onChange={set("answer")} required rows={6} maxLength={1200} className={FIELD_CLS} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label>Display order</Label>
              <input type="number" min={0} value={form.order} onChange={set("order")} className={FIELD_CLS} />
            </div>
            <label className="flex cursor-pointer items-end gap-3 pb-3 text-sm">
              <input type="checkbox" checked={form.published} onChange={set("published")} className="h-4 w-4 accent-[var(--accent,currentColor)]" />
              <span className="font-medium">Published</span>
            </label>
          </div>

          {error && (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </label>
  );
}
