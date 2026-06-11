import { Link } from "react-router-dom";
import { Mail, Globe, MessageCircle, Send, Phone } from "lucide-react";
import { Logo } from "./Logo";

const SECTIONS = [
  {
    title: "Learn",
    links: [
      { to: "/about", label: "About the disease" },
      { to: "/symptoms", label: "Symptoms" },
      { to: "/prevention", label: "Prevention & Care" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/resources", label: "Resources" },
      { to: "/faq", label: "FAQ" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Project",
    links: [
      { to: "/app", label: "Mobile app" },
      { to: "/feedback", label: "Feedback" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms & Conditions" },
    ],
  },
];


export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-navy text-cream">
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Logo className="[&_span]:text-cream" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/70">
              SickleCare exists to make trustworthy information about sickle cell
              disease accessible to families, caregivers, and communities across
              Cameroon — one conversation at a time.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Globe, MessageCircle, Send, Phone, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 text-cream/80 transition hover:border-coral hover:text-coral"
                  aria-label="social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h4 className="font-display text-sm uppercase tracking-[0.2em] text-cream/60">
                {s.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-cream/85 transition hover:text-coral"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/55 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} SickleCare. An awareness initiative.</p>
          <p className="max-w-md md:text-right">
            Know your genotype. Get tested. Spread awareness — early diagnosis saves lives.
          </p>
        </div>
      </div>
    </footer>
  );
}
