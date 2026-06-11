import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Smartphone, Bell, BookOpen, Activity, Download, ArrowRight } from "lucide-react";
import appMockup from "@/assets/app-mockup.jpg";



const FEATURES = [
  { icon: Activity, title: "Symptom & crisis log", body: "Track pain, mood, hydration and medication in a daily journal you can share with your doctor." },
  { icon: Bell, title: "Care reminders", body: "Gentle nudges for medication, hydration breaks, and upcoming clinic appointments." },
  { icon: BookOpen, title: "Library on the go", body: "Every article and care guide on the website, available offline on your phone." },
  { icon: Smartphone, title: "Built for low-data networks", body: "Lightweight by design, so it works smoothly even with patchy connectivity." },
];

function AppPage() {
  useEffect(() => { document.title = "The SickleCare Mobile App \u2014 SickleCare"; let m = document.querySelector("meta[name=description]"); if(!m){m=document.createElement("meta");m.setAttribute("name","description");document.head.appendChild(m);} m.setAttribute("content", "A companion app for the sickle cell community \u2014 track symptoms, get reminders, and access education on the go."); }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        eyebrow="Mobile app"
        title={<>Care in your <span className="text-accent">pocket.</span></>}
        description="The SickleCare app is a quiet companion for patients and caregivers — for the days when a website isn't enough."
      />

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border bg-navy">
              <img src={appMockup} alt="SickleCare mobile app preview" loading="lazy" width={1280} height={1280} className="h-full w-full object-cover" />
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-semibold md:text-5xl">A tool, not a replacement for care.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              We built the SickleCare app to sit alongside the relationship you
              already have with your clinical team — making it easier to remember,
              to log, and to learn between visits.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {/* Replace href with your actual store link */}
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Download the app
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium transition hover:border-accent hover:text-accent"
              >
                See features
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div id="features" className="mt-20 grid gap-5 md:grid-cols-2">
          {FEATURES.map((f) => (
            <article key={f.title} className="rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AppPage;
