import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ScrollReveal } from "@/components/AnimationHelpers";
import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Bell, CalendarDays, Users, ChevronDown, ChevronUp } from "lucide-react";

// Seed announcements shown when Firestore has nothing yet
const SEED_ANNOUNCEMENTS = [
  {
    id: "seed-1",
    title: "World Sickle Cell Day — Free Screening Campaign",
    body: "Join us this 19 June for a free sickle cell genotype screening campaign at the Yaoundé General Hospital. Bring a family member — early knowledge saves lives.",
    sentTo: "all",
    type: "announcement",
    createdAt: { toMillis: () => 1718600000000 },
  },
  {
    id: "seed-2",
    title: "New Resource: Hydroxyurea Patient Guide",
    body: "We have published a comprehensive patient-friendly guide to hydroxyurea therapy — covering dosing, side effects, what to monitor and when to call your doctor. Find it in the Resources section.",
    sentTo: "all",
    type: "announcement",
    createdAt: { toMillis: () => 1718400000000 },
  },
  {
    id: "seed-3",
    title: "SickleCare Mobile App — Version 2.1 Released",
    body: "The latest update brings an improved pain-crisis log, smarter hydration reminders, and a new AI assistant chat. Update your app from the Play Store or App Store.",
    sentTo: "all",
    type: "announcement",
    createdAt: { toMillis: () => 1718200000000 },
  },
  {
    id: "seed-4",
    title: "Research Update: Gene Therapy Advances",
    body: "A landmark clinical trial published in the New England Journal of Medicine reports durable sickle cell remission in 89 % of patients treated with the new one-time gene therapy. While not yet available in Cameroon, this is a hopeful milestone for the global community.",
    sentTo: "all",
    type: "announcement",
    createdAt: { toMillis: () => 1718000000000 },
  },
];

function formatDate(createdAt) {
  if (!createdAt?.toMillis) return "Recently";
  return new Date(createdAt.toMillis()).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function AnnouncementCard({ notif, index }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = notif.body.length > 220;
  const preview = isLong && !expanded ? notif.body.slice(0, 220) + "…" : notif.body;
  const date = formatDate(notif.createdAt);

  return (
    <ScrollReveal variant="fade-up" delay={index * 0.07}>
      <div className="rounded-3xl border border-border bg-card p-7 shadow-sm transition hover:shadow-md">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <Bell className="h-3 w-3" />
            Announcement
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            {notif.sentTo === "all" ? "All Visitors" : notif.sentTo === "users" ? "Registered Members" : "Admins"}
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            {date}
          </span>
        </div>

        <h2 className="font-display text-xl font-bold text-foreground leading-snug">{notif.title}</h2>

        <p className="mt-3 text-sm leading-relaxed text-foreground/80 whitespace-pre-line">{preview}</p>

        {isLong && (
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
          >
            {expanded ? (
              <>
                Show less <ChevronUp className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        )}
      </div>
    </ScrollReveal>
  );
}

export default function AnnouncementsPage() {
  useEffect(() => {
    document.title = "Announcements — SickleCare";
    let m = document.querySelector("meta[name=description]");
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute(
      "content",
      "Stay up to date with the latest sickle cell news, SickleCare updates, research breakthroughs and community events."
    );
  }, []);

  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "notifications"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => setNotifications(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      () => setNotifications([])
    );
    return unsub;
  }, []);

  // Use live data if available, otherwise show seeds
  const items =
    notifications === null
      ? [] // loading
      : notifications.length > 0
      ? notifications
      : SEED_ANNOUNCEMENTS;

  const loading = notifications === null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <PageHero
        eyebrow="Updates"
        title={
          <>
            Sickle Cell{" "}
            <span className="text-accent">Announcements</span>
          </>
        }
        description="Stay informed with the latest sickle cell research breakthroughs, SickleCare platform updates, awareness campaigns and community news — posted directly by the SickleCare team."
      />

      <section className="container-page py-16">
        {loading ? (
          <div className="flex flex-col items-center py-24 gap-3">
            <Bell className="h-8 w-8 text-muted-foreground animate-bounce" />
            <p className="text-sm text-muted-foreground animate-pulse">Loading announcements…</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center py-24 gap-4">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-accent/10 text-accent">
              <Bell className="h-8 w-8" />
            </span>
            <h3 className="font-display text-xl font-semibold">No announcements yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm text-center">
              Check back soon — the SickleCare team will post the latest sickle cell news and updates here.
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-6">
            {items.map((n, i) => (
              <AnnouncementCard key={n.id} notif={n} index={i} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
