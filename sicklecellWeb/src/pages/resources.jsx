import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ResourceEditorDialog } from "@/components/ResourceEditorDialog";
import {
  FileText,
  Video,
  Lightbulb,
  HelpCircle,
  Siren,
  BookOpen,
  ArrowUpRight,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  DownloadCloud,
  EyeOff,
} from "lucide-react";
import { useAuth } from "@/lib/auth.jsx";
import {
  useResources,
  deleteResource,
  importSeedResources,
  formatResourceDate,
} from "@/lib/resources";

/**
 * Resources live in the Firestore `resources` collection shared with the
 * SickleCare mobile app (project sicklecare-15d7a). Admins — accounts whose
 * `users/{uid}` document has role 'admin', exactly like in the mobile app —
 * can add, edit and delete resources right on this page after signing in
 * at /admin. Until the collection has documents, starter content is shown.
 */
const ICONS = { Article: FileText, Video: Video, "Health Tip": Lightbulb, FAQ: HelpCircle, Emergency: Siren, Guide: BookOpen };

function ResourcesPage() {
  useEffect(() => { document.title = "Educational Resources — SickleCare"; let m = document.querySelector("meta[name=description]"); if(!m){m=document.createElement("meta");m.setAttribute("name","description");document.head.appendChild(m);} m.setAttribute("content", "Articles, videos, FAQs, health tips and emergency care guides on sickle cell disease — updated weekly by the SickleCare team."); }, []);

  const { isAdmin } = useAuth();
  const { resources, live } = useResources(isAdmin);
  const [editing, setEditing] = useState(null); // null | {} (new) | resource
  const [importing, setImporting] = useState(false);

  // resources arrive sorted by updatedAt desc, so the first one is the freshest
  const lastUpdateLabel = formatResourceDate(resources[0]?.updatedAt, { day: "numeric", month: "long", year: "numeric" });

  const onDelete = async (r) => {
    if (!window.confirm(`Delete "${r.title}"? This also removes it for the mobile app.`)) return;
    await deleteResource(r.id);
  };

  const onImportSeed = async () => {
    setImporting(true);
    try {
      await importSeedResources();
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        eyebrow="Resources"
        title={<>Knowledge you can <span className="text-accent">act on.</span></>}
        description="A growing library of vetted articles, videos and care guides — curated and updated regularly by our team."
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <RefreshCw className="h-3.5 w-3.5 text-accent" />
            {lastUpdateLabel ? `Last updated ${lastUpdateLabel}` : "Updated regularly"}
          </span>
          {isAdmin && (
            <>
              <button
                onClick={() => setEditing({})}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background transition hover:opacity-90"
              >
                <Plus className="h-3.5 w-3.5" />
                Add resource
              </button>
              {!live && (
                <button
                  onClick={onImportSeed}
                  disabled={importing}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-50"
                >
                  <DownloadCloud className="h-3.5 w-3.5" />
                  {importing ? "Importing…" : "Import starter resources"}
                </button>
              )}
            </>
          )}
        </div>
      </PageHero>

      <section className="container-page py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => {
            const Icon = ICONS[r.tag] ?? FileText;
            return (
              <Link
                key={r.id}
                to={`/resources/${r.id}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent">
                    <Icon className="h-3.5 w-3.5" />
                    {r.tag}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold leading-snug">{r.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-wider text-muted-foreground">
                  <span>{r.time}</span>
                  <span>Updated {formatResourceDate(r.updatedAt) || "recently"}</span>
                </div>
                {isAdmin && (
                  <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                    {r.published === false && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        <EyeOff className="h-3 w-3" />
                        Draft
                      </span>
                    )}
                    <span className="flex-1" />
                    <button
                      onClick={(e) => { e.preventDefault(); setEditing(r); }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-accent/50 hover:text-foreground"
                    >
                      <Pencil className="h-3 w-3" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => { e.preventDefault(); onDelete(r); }}
                      disabled={!live}
                      title={!live ? "Starter content — import it first to manage it" : undefined}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-destructive/50 hover:text-destructive disabled:opacity-40"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-dashed border-border bg-card/50 p-6 text-sm text-muted-foreground">
          <b className="text-foreground">Are you a SickleCare admin?</b>{" "}
          <Link to="/admin" className="underline decoration-accent/50 underline-offset-2 transition hover:text-foreground">
            Sign in here
          </Link>{" "}
          with the same admin account you use in the mobile app to add, edit or delete
          resources directly on this page. Changes publish instantly to both the website and the app.
        </div>
      </section>

      {editing !== null && (
        <ResourceEditorDialog
          resource={editing.id ? editing : null}
          live={live}
          onClose={() => setEditing(null)}
        />
      )}
      <Footer />
    </div>
  );
}

export default ResourcesPage;
