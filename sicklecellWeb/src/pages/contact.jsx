import { useState, useEffect} from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";



function ContactPage() {
  useEffect(() => { document.title = "Contact \u2014 SickleCare"; let m = document.querySelector("meta[name=description]"); if(!m){m=document.createElement("meta");m.setAttribute("name","description");document.head.appendChild(m);} m.setAttribute("content", "Reach the SickleCare team. Send a message, find us on the map, or connect on social media."); }, []);

  const [sent, setSent] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Saved to the same `contact_messages` collection the mobile app's
    // admin screen reads.
    await addDoc(collection(db, "contact_messages"), {
      name: data.get("name") ?? "",
      email: data.get("email") ?? "",
      subject: data.get("subject") ?? "",
      message: data.get("message") ?? "",
      createdAt: serverTimestamp(),
    });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        eyebrow="Contact"
        title={<>Let's talk. We <span className="text-accent">read every message.</span></>}
        description="Have a story, a question, a partnership idea, or need a resource we haven't published yet? Reach out — we'd love to hear from you."
      />

      <section className="container-page py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-8 md:p-10">
            <h2 className="font-display text-2xl font-semibold">Send a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">We typically respond within 1–2 business days.</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <div className="mt-5">
              <Field label="Subject" name="subject" />
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Message
              </label>
              <textarea
                name="message"
                required
                maxLength={1000}
                rows={5}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                placeholder="Tell us how we can help…"
              />
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:opacity-90"
            >
              <Send className="h-4 w-4" />
              {sent ? "Message sent — thank you!" : "Send message"}
            </button>
          </form>

          <aside className="space-y-5">
            <InfoCard icon={Mail} label="Email" value="hello@sicklecare.org" />
            <InfoCard icon={Phone} label="Phone" value="+237 6 00 00 00 00" />
            <InfoCard icon={MapPin} label="Office" value="Awareness Hub, Yaoundé, Cameroon" />

            <div className="overflow-hidden rounded-3xl border border-border">
              <iframe
                title="SickleCare location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=11.45%2C3.80%2C11.60%2C3.92&layer=mapnik&marker=3.866667%2C11.516667"
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Field({ label, name, type = "text", required }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={255}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-0.5 font-medium">{value}</p>
      </div>
    </div>
  );
}

export default ContactPage;
