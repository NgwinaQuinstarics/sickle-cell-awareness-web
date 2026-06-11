import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  FileText,
  Video,
  Lightbulb,
  HelpCircle,
  Siren,
  BookOpen,
  ArrowLeft,
  ArrowUpRight,
  Clock,
  RefreshCw,
} from "lucide-react";
import { useResource, formatResourceDate } from "@/lib/resources";

const ICONS = { Article: FileText, Video: Video, "Health Tip": Lightbulb, FAQ: HelpCircle, Emergency: Siren, Guide: BookOpen };

function ResourceDetailPage() {
  const { id } = useParams();
  const { resource, loading } = useResource(id);

  useEffect(() => {
    document.title = resource ? `${resource.title} — SickleCare` : "Resource — SickleCare";
  }, [resource]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-page flex min-h-[50vh] items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading resource…</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-page flex min-h-[50vh] flex-col items-center justify-center text-center">
          <h1 className="font-display text-3xl font-semibold">Resource not found</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            It may have been unpublished or removed by the team.
          </p>
          <Link
            to="/resources"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            All resources
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = ICONS[resource.tag] ?? FileText;
  const updatedLabel = formatResourceDate(resource.updatedAt, { day: "numeric", month: "long", year: "numeric" });
  const paragraphs = (resource.content || resource.body || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const hasExternalLink = resource.url && resource.url !== "#";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <Icon className="h-4 w-4" />
            {resource.tag}
          </span>
        }
        title={resource.title}
        description={resource.body}
      >
        <div className="flex flex-wrap items-center gap-3">
          {resource.time && (
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-accent" />
              {resource.time}
            </span>
          )}
          {updatedLabel && (
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <RefreshCw className="h-3.5 w-3.5 text-accent" />
              Updated {updatedLabel}
            </span>
          )}
        </div>
      </PageHero>

      <section className="container-page py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All resources
          </Link>

          <article className="mt-8 space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground/90 md:text-lg">
                {p}
              </p>
            ))}
          </article>

          {hasExternalLink && (
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:opacity-90"
            >
              {resource.tag === "Video" ? "Watch the video" : "Open the full resource"}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ResourceDetailPage;
