import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Star, Send } from "lucide-react";

function FeedbackPage() {
  useEffect(() => { document.title = "Feedback \u2014 SickleCare"; let m = document.querySelector("meta[name=description]"); if(!m){m=document.createElement("meta");m.setAttribute("name","description");document.head.appendChild(m);} m.setAttribute("content", "Share your feedback, suggestions, or report a bug with the SickleCare team."); }, []);

  const [rating, setRating] = useState(0);
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to Firestore `feedback` collection (same Firebase project as the mobile app)
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    e.currentTarget.reset();   // ← removed TypeScript cast
    setRating(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        eyebrow="We're listening"
        title={<>Your feedback <span className="text-accent">shapes SickleCare.</span></>}
        description="Tell us what's working, what's broken, and what you wish SickleCare did. Every message reaches the team."
      />

      <section className="container-page py-16">
        <form onSubmit={onSubmit} className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 md:p-10">
          <div>
            <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Rate your experience
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  className="rounded-full p-1 transition hover:scale-110"
                >
                  <Star
                    className={`h-7 w-7 ${
                      n <= rating ? "fill-accent text-accent" : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label="Your name" name="name" />
            <Field label="Email (optional)" name="email" type="email" />
          </div>
          <div className="mt-5">
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Type of feedback
            </label>
            <select
              name="category"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              defaultValue="suggestion"
            >
              <option value="suggestion">Suggestion</option>
              <option value="bug">Bug report</option>
              <option value="content">Content correction</option>
              <option value="praise">Praise</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mt-5">
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Your message
            </label>
            <textarea
              name="message"
              required
              maxLength={2000}
              rows={6}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="submit"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            <Send className="h-4 w-4" />
            {sent ? "Thank you — feedback received!" : "Send feedback"}
          </button>

          <p className="mt-6 text-xs text-muted-foreground">
            By submitting, you agree to our <a href="/privacy" className="text-accent underline">Privacy Policy</a>. We never share your email.
          </p>
        </form>
      </section>
      <Footer />
    </div>
  );
}

function Field({ label, name, type = "text" }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        maxLength={255}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}

export default FeedbackPage;