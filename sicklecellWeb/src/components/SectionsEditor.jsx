import { useEffect, useState } from "react";
import { X, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { savePageContent } from "@/lib/content";

const FIELD_CLS =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

/**
 * Admin-only editor for a legal page's ordered sections (Privacy / Terms).
 * Initialised from the live document OR the seed content, so saving while the
 * page still shows seed content simply persists the whole document for the
 * first time. `hasEffectiveDate` adds the editable effective-date field
 * (Privacy only).
 */
export function SectionsEditor({ pageKey, title, initial, hasEffectiveDate = false, onClose }) {
  const [effectiveDate, setEffectiveDate] = useState(initial?.effectiveDate ?? "");
  const [sections, setSections] = useState(
    (initial?.sections ?? []).map((s) => ({ title: s.title ?? "", body: s.body ?? "" })),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const update = (i, key, value) =>
    setSections((arr) => arr.map((s, j) => (j === i ? { ...s, [key]: value } : s)));

  const remove = (i) => setSections((arr) => arr.filter((_, j) => j !== i));

  const move = (i, dir) =>
    setSections((arr) => {
      const j = i + dir;
      if (j < 0 || j >= arr.length) return arr;
      const next = arr.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const add = () => setSections((arr) => [...arr, { title: "", body: "" }]);

  const onSave = async () => {
    setSaving(true);
    setError("");
    try {
      const cleaned = sections
        .map((s) => ({ title: s.title.trim(), body: s.body.trim() }))
        .filter((s) => s.title || s.body);
      const payload = { sections: cleaned };
      if (hasEffectiveDate) payload.effectiveDate = effectiveDate.trim();
      await savePageContent(pageKey, payload);
      onClose();
    } catch (err) {
      setError(err?.message ?? "Could not save. Check your connection and admin rights.");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-start justify-center overflow-y-auto bg-foreground/40 p-4 backdrop-blur-sm">
      <div className="relative my-8 w-full max-w-2xl rounded-3xl border border-border bg-card p-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="font-display text-2xl font-semibold">Edit {title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Saved changes appear instantly on the public page. In a section body, leave a blank line
          between paragraphs; start lines with “- ” to make a bullet list.
        </p>

        {hasEffectiveDate && (
          <div className="mt-6">
            <Label>Effective date</Label>
            <input
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              placeholder="10 June 2026"
              className={FIELD_CLS}
            />
          </div>
        )}

        <div className="mt-6 space-y-5">
          {sections.map((s, i) => (
            <div key={i} className="rounded-2xl border border-border bg-background/60 p-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Section {i + 1}
                </span>
                <span className="flex-1" />
                <IconBtn onClick={() => move(i, -1)} disabled={i === 0} label="Move up"><ArrowUp className="h-3.5 w-3.5" /></IconBtn>
                <IconBtn onClick={() => move(i, 1)} disabled={i === sections.length - 1} label="Move down"><ArrowDown className="h-3.5 w-3.5" /></IconBtn>
                <IconBtn onClick={() => remove(i)} danger label="Remove section"><Trash2 className="h-3.5 w-3.5" /></IconBtn>
              </div>
              <input
                value={s.title}
                onChange={(e) => update(i, "title", e.target.value)}
                placeholder="Section heading"
                className={`${FIELD_CLS} mb-3 font-medium`}
              />
              <textarea
                value={s.body}
                onChange={(e) => update(i, "body", e.target.value)}
                rows={6}
                placeholder="Section text…"
                className={FIELD_CLS}
              />
            </div>
          ))}
        </div>

        <button
          onClick={add}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-dashed border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-accent/50 hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
          Add section
        </button>

        {error && (
          <p className="mt-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
        )}

        <div className="mt-7 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save page"}
          </button>
        </div>
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

function IconBtn({ children, onClick, disabled, danger, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition disabled:opacity-30 ${
        danger ? "hover:border-destructive/50 hover:text-destructive" : "hover:border-accent/50 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
