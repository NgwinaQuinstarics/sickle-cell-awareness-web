import { Star, Trash2, Inbox } from "lucide-react";
import { useFeedback, deleteFeedback, formatFeedbackDate } from "@/lib/feedback";

const CATEGORY_LABEL = {
  suggestion: "Suggestion",
  bug: "Bug report",
  content: "Content correction",
  praise: "Praise",
  other: "Other",
};

/** Admin-only list of submitted feedback with details, date and delete. */
export function FeedbackPanel() {
  const { items, loading, error } = useFeedback();

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading feedback…</p>;
  }
  if (error) {
    return (
      <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
        {error} — make sure the <code>feedback</code> read rule allows admins.
      </p>
    );
  }
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center">
        <Inbox className="h-8 w-8 text-muted-foreground" />
        <p className="mt-3 text-sm text-muted-foreground">No feedback submitted yet.</p>
      </div>
    );
  }

  const onDelete = async (f) => {
    if (!window.confirm("Delete this feedback entry? This cannot be undone.")) return;
    await deleteFeedback(f.id);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{items.length} entr{items.length === 1 ? "y" : "ies"}</p>
      {items.map((f) => (
        <div key={f.id} className="rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent">
              {CATEGORY_LABEL[f.category] ?? f.category ?? "Other"}
            </span>
            {f.rating > 0 && (
              <span className="inline-flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} className={`h-3.5 w-3.5 ${n <= f.rating ? "fill-accent text-accent" : "text-muted-foreground/40"}`} />
                ))}
              </span>
            )}
            <span className="flex-1" />
            <span className="text-xs text-muted-foreground">{formatFeedbackDate(f.createdAt)}</span>
            <button
              onClick={() => onDelete(f)}
              aria-label="Delete feedback"
              title="Delete feedback"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:border-destructive/50 hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-foreground/90">{f.message}</p>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span><b className="font-medium text-foreground/80">{f.name || "Anonymous"}</b></span>
            {f.email && (
              <a href={`mailto:${f.email}`} className="underline decoration-accent/40 underline-offset-2 hover:text-foreground">
                {f.email}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
