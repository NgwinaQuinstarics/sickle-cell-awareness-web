import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { LogIn, LogOut, ShieldCheck, ShieldAlert, BookOpen } from "lucide-react";
import { useAuth, login, logout } from "@/lib/auth.jsx";

const FIELD_CLS =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

/**
 * Admin sign-in. Uses the same Firebase project and the same admin rule as
 * the SickleCare mobile app: users/{uid}.role == 'admin'.
 */
function AdminPage() {
  useEffect(() => { document.title = "Admin — SickleCare"; }, []);

  const { user, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(email.trim(), password);
    } catch {
      setError("Sign-in failed. Check the email and password of your SickleCare account.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageHero
        eyebrow="Admin"
        title={<>Content <span className="text-accent">management.</span></>}
        description="Sign in with the same admin account you use in the SickleCare mobile app to manage the resources published on this website."
      />

      <section className="container-page py-20">
        <div className="mx-auto max-w-md">
          {loading ? (
            <p className="text-center text-sm text-muted-foreground">Checking session…</p>
          ) : user ? (
            <div className="rounded-3xl border border-border bg-card p-8 text-center">
              {isAdmin ? (
                <>
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <ShieldCheck className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-semibold">Signed in as admin</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Open the Resources page — you'll find <b className="text-foreground">Add</b>,{" "}
                    <b className="text-foreground">Edit</b> and <b className="text-foreground">Delete</b>{" "}
                    controls directly on the cards. Everything you publish appears in the mobile app too.
                  </p>
                  <div className="mt-7 flex flex-col gap-3">
                    <Link
                      to="/resources"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
                    >
                      <BookOpen className="h-4 w-4" />
                      Manage resources
                    </Link>
                    <button
                      onClick={logout}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                    <ShieldAlert className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-semibold">No admin rights</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    This account exists but doesn't have the admin role. Ask the SickleCare team to set{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">role: admin</code> on your
                    profile, then sign in again.
                  </p>
                  <button
                    onClick={logout}
                    className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </>
              )}
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-8">
              <h2 className="font-display text-xl font-semibold">Sign in</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Same email and password as in the mobile app.
              </p>

              <div className="mt-7 space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={FIELD_CLS}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={FIELD_CLS}
                  />
                </div>

                {error && (
                  <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50"
                >
                  <LogIn className="h-4 w-4" />
                  {busy ? "Signing in…" : "Sign in"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default AdminPage;
