import { useEffect, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { X } from "lucide-react";
import { db } from "@/firebase";
import { TAGS, saveResource, importSeedResources } from "@/lib/resources";

const FIELD_CLS =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

/**
 * Admin-only add/edit form for the shared `resources` collection.
 * `resource` null = create. `live` false means the page is still showing
 * starter content: saving an edit then imports all starter items first so
 * none of them disappear from the grid.
 */
export function ResourceEditorDialog({ resource, live, onClose }) {
  const [form, setForm] = useState({
    tag: resource?.tag ?? "Article",
    title: resource?.title ?? "",
    body: resource?.body ?? "",
    content: resource?.content ?? "",
    time: resource?.time ?? "",
    url: resource?.url ?? "",
    published: resource?.published ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (resource && !live) {
        // Editing a starter item that isn't in Firestore yet: import the
        // whole starter set, then overwrite this one with the edits.
        await importSeedResources();
        await setDoc(doc(db, "resources", resource.id), { ...form, updatedAt: serverTimestamp() });
      } else {
        await saveResource(resource?.id ?? null, form);
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
          {resource ? "Edit resource" : "Add resource"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Published changes appear instantly on this site and in the mobile app.
        </p>

        <form onSubmit={onSubmit} className="mt-7 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label>Type</Label>
              <select value={form.tag} onChange={set("tag")} className={FIELD_CLS}>
                {TAGS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Read time / duration</Label>
              <input value={form.time} onChange={set("time")} placeholder="8 min read · 3:42 · Printable" className={FIELD_CLS} />
            </div>
          </div>

          <div>
            <Label>Title</Label>
            <input value={form.title} onChange={set("title")} required maxLength={140} className={FIELD_CLS} />
          </div>

          <div>
            <Label>Summary (shown on the card)</Label>
            <textarea value={form.body} onChange={set("body")} required rows={2} maxLength={250} className={FIELD_CLS} />
          </div>

          <div>
            <Label>Full content (blank line = new paragraph)</Label>
            <textarea value={form.content} onChange={set("content")} rows={8} className={FIELD_CLS} />
          </div>

          <div>
            <Label>External link (optional)</Label>
            <input value={form.url} onChange={set("url")} type="url" placeholder="https://…" className={FIELD_CLS} />
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <input type="checkbox" checked={form.published} onChange={set("published")} className="h-4 w-4 accent-[var(--accent,currentColor)]" />
            <span className="font-medium">Published</span>
            <span className="text-muted-foreground">— uncheck to keep it as a draft only admins can see</span>
          </label>

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
