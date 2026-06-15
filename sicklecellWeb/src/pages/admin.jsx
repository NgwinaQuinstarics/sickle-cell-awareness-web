import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LogIn,
  LogOut,
  ShieldCheck,
  ShieldAlert,
  BookOpen,
  HelpCircle,
  Shield,
  FileText,
  MessageSquare,
  ArrowUpRight,
  ChevronRight,
  Users,
  Bell,
  Activity,
  FileQuestion,
  Mail,
  Search,
  Filter,
  Trash2,
  Plus,
  CheckCircle,
  Eye,
  EyeOff,
  Send,
  Pencil,
  Image,
  FileUp,
  X,
  RefreshCw,
} from "lucide-react";
import { useAuth, login, logout } from "@/lib/auth.jsx";
import logo from "@/assets/sicklecare-logo.png";
import { db, storage } from "@/firebase";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { toast, Toaster } from "sonner";
import { ScrollReveal } from "@/components/AnimationHelpers";
import { motion, AnimatePresence } from "framer-motion";

const FIELD_CLS =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

// Fallback Seeds (to display when Firestore collection holds 0 records)
const MOCK_USERS = [
  { id: "u1", email: "jean.dupont@gmail.com", displayName: "Jean Dupont", role: "user", createdAt: { toMillis: () => 1718000000000 }, genotype: "AA", phone: "+237 677 88 99 00" },
  { id: "u2", email: "marie.foeh@outlook.com", displayName: "Marie Foeh", role: "user", createdAt: { toMillis: () => 1718100000000 }, genotype: "AS", phone: "+237 699 11 22 33" },
  { id: "u3", email: "christian.t@gmail.com", displayName: "Christian T.", role: "admin", createdAt: { toMillis: () => 1718200000000 }, genotype: "AA", phone: "+237 688 44 55 66" },
  { id: "u4", email: "alice.ngu@yahoo.fr", displayName: "Alice Ngu", role: "user", createdAt: { toMillis: () => 1718300000000 }, genotype: "SS", phone: "+237 655 33 44 55" },
  { id: "u5", email: "emmanuel.b@gmail.com", displayName: "Emmanuel Bella", role: "user", createdAt: { toMillis: () => 1718400000000 }, genotype: "SC", phone: "+237 671 22 88 99" }
];

const MOCK_RESOURCES = [
  { id: "r1", title: "Living with sickle cell at every age", tag: "Article", body: "What changes from childhood to adulthood.", time: "8 min read", published: true, views: 520 },
  { id: "r2", title: "Building a daily hydration routine", tag: "Health Tip", body: "Practical strategies to drink enough water.", time: "4 min read", published: true, views: 485 },
  { id: "r3", title: "How a pain crisis happens (explained)", tag: "Video", body: "A short animated explainer of vaso-occlusion.", time: "3:42", published: true, views: 350 },
  { id: "r4", title: "Genotype, trait, and disease differences", tag: "FAQ", body: "The short answer your family needs.", time: "5 min read", published: false, views: 0 }
];

const MOCK_FAQS = [
  { id: "f1", question: "What causes sickle cell disease?", answer: "It is caused by inheriting two copies of an abnormal haemoglobin gene (HbS).", order: 1, published: true },
  { id: "f2", question: "Can sickle cell be cured?", answer: "Bone marrow transplant is the only established cure today.", order: 2, published: true }
];

const MOCK_CONTACTS = [
  { id: "c1", name: "Amadou Bello", email: "amadou@gmail.com", subject: "Sponsorship Inquiry", message: "Hello, we are interested in sponsoring the upcoming campaign in Douala.", resolved: false, createdAt: { toMillis: () => 1718400000000 } },
  { id: "c2", name: "Therese Ngo", email: "therese.ngo@yahoo.com", subject: "Genotype Testing Location", message: "Hi, where is the closest testing center in Yaoundé?", resolved: true, createdAt: { toMillis: () => 1718300000000 } },
  { id: "c3", name: "Dr. Paul Ebanda", email: "p.ebanda@clinic.cm", subject: "Collaboration Opportunity", message: "I would like to distribute your checklists to my patients.", resolved: false, createdAt: { toMillis: () => 1718200000000 } }
];

const MOCK_FEEDBACKS = [
  { id: "fb1", name: "Cynthia Kamdem", email: "cKamdem@gmail.com", category: "praise", message: "The hydration tracker in the mobile app is a life-saver!", rating: 5, createdAt: { toMillis: () => 1718450000000 } },
  { id: "fb2", name: "Anonymous", email: "", category: "bug", message: "The app crashed when trying to edit my daily reminder.", rating: 2, createdAt: { toMillis: () => 1718380000000 } }
];

const MOCK_SUPPORTS = [
  {
    id: "s1",
    name: "Alice Ngu",
    email: "alice.ngu@yahoo.fr",
    subject: "Struggling with side effects",
    message: "Hello team, my doctor recently prescribed hydroxyurea, but I am experiencing nausea.",
    resolved: false,
    createdAt: { toMillis: () => 1718410000000 },
    updatedAt: { toMillis: () => 1718450000000 },
    replies: [
      { sender: "user", text: "Hello team, my doctor recently prescribed hydroxyurea, but I am experiencing nausea.", createdAt: { toMillis: () => 1718410000000 } },
      { sender: "admin", text: "Hi Alice, mild nausea can occur initially. Inform your hematologist.", createdAt: { toMillis: () => 1718450000000 } }
    ]
  }
];

const MOCK_NOTIFICATIONS = [
  { id: "n1", title: "World Sickle Cell Day", body: "Join us this Friday for a free screening campaign.", sentTo: "all", type: "announcement", createdAt: { toMillis: () => 1718300000000 } }
];

function AdminPage() {
  useEffect(() => {
    document.title = "Admin Dashboard — SickleCare";
  }, []);

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
      toast.success("Successfully logged in.");
    } catch (err) {
      setError("Sign-in failed. Check the credentials of your SickleCare admin account.");
      toast.error("Sign-in failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />
      {loading ? (
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-muted-foreground animate-pulse">Checking credentials…</p>
        </div>
      ) : !user ? (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="w-full max-w-md">
            <SignInForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              error={error}
              busy={busy}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      ) : isAdmin ? (
        <Dashboard email={user.email} />
      ) : (
        <div className="flex min-h-screen items-center justify-center p-4">
          <NoAdmin email={user.email} />
        </div>
      )}
    </div>
  );
}

function SignInForm({ email, setEmail, password, setPassword, error, busy, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-8 shadow-2xl">
      <div className="flex flex-col items-center gap-3 mb-6">
        <img src={logo} alt="SickleCare" className="h-16 w-auto object-contain" />
      </div>
      <h2 className="text-center font-display text-2xl font-bold">SickleCare Admin</h2>
      <p className="mt-1 text-center text-sm text-muted-foreground">Sign in with your administrative account.</p>

      <div className="mt-7 space-y-5">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={FIELD_CLS}
            placeholder="admin@sicklecare.org"
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={FIELD_CLS}
            placeholder="••••••••"
          />
        </div>

        {error && (
          <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50"
        >
          <LogIn className="h-4 w-4" />
          {busy ? "Signing in…" : "Sign in to Dashboard"}
        </button>
      </div>
    </form>
  );
}

function NoAdmin({ email }) {
  return (
    <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-xl">
      <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <ShieldAlert className="h-6 w-6" />
      </span>
      <h2 className="mt-5 font-display text-xl font-semibold">No admin rights</h2>
      <p className="mt-2 text-sm text-muted-foreground">{email}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        This account is signed in but doesn't carry the custom claims for administrative access. Please request access from the SickleCare portal.
      </p>
      <button
        onClick={logout}
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </div>
  );
}

// MAIN DASHBOARD COMPONENT
function Dashboard({ email }) {
  const [activeTab, setActiveTab] = useState("overview");

  // State bindings for database collections
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [supportList, setSupportList] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Fetch collections from Firestore
  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, "users"), (s) =>
      setUsers(s.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubRes = onSnapshot(collection(db, "resources"), (s) =>
      setResources(s.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubFaqs = onSnapshot(collection(db, "faqs"), (s) =>
      setFaqs(s.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubContacts = onSnapshot(collection(db, "contacts"), (s) =>
      setContacts(s.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubFeedback = onSnapshot(collection(db, "feedback"), (s) =>
      setFeedbacks(s.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubSupport = onSnapshot(collection(db, "support_messages"), (s) =>
      setSupportList(s.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    const unsubNotif = onSnapshot(collection(db, "notifications"), (s) =>
      setNotifications(s.docs.map((d) => ({ id: d.id, ...d.data() })))
    );

    return () => {
      unsubUsers();
      unsubRes();
      unsubFaqs();
      unsubContacts();
      unsubFeedback();
      unsubSupport();
      unsubNotif();
    };
  }, []);

  // Use database data or fall back to mock data
  const finalUsers = users.length > 0 ? users : MOCK_USERS;
  const finalResources = resources.length > 0 ? resources : MOCK_RESOURCES;
  const finalFaqs = faqs.length > 0 ? faqs : MOCK_FAQS;
  const finalContacts = contacts.length > 0 ? contacts : MOCK_CONTACTS;
  const finalFeedbacks = feedbacks.length > 0 ? feedbacks : MOCK_FEEDBACKS;
  const finalSupport = supportList.length > 0 ? supportList : MOCK_SUPPORTS;
  const finalNotifications = notifications.length > 0 ? notifications : MOCK_NOTIFICATIONS;

  // Render current tab body
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            users={finalUsers}
            resources={finalResources}
            faqs={finalFaqs}
            contacts={finalContacts}
            feedbacks={finalFeedbacks}
            support={finalSupport}
          />
        );
      case "users":
        return <UsersTab users={finalUsers} />;
      case "resources":
        return <ResourcesTab resources={finalResources} isDbEmpty={resources.length === 0} />;
      case "faqs":
        return <FaqsTab faqs={finalFaqs} isDbEmpty={faqs.length === 0} />;
      case "contacts":
        return <ContactsTab contacts={finalContacts} />;
      case "feedback":
        return <FeedbackTab feedbacks={finalFeedbacks} />;
      case "support":
        return <SupportTab support={finalSupport} />;
      case "content":
        return <ContentTab />;
      case "notifications":
        return <NotificationsTab notifications={finalNotifications} />;
      default:
        return null;
    }
  };

  const navItems = [
    { id: "overview", label: "Overview & Charts", icon: Activity },
    { id: "users", label: "User Management", icon: Users },
    { id: "resources", label: "Resource Library", icon: BookOpen },
    { id: "faqs", label: "FAQ Manager", icon: FileQuestion },
    { id: "contacts", label: "Contact Inbox", icon: Mail },
    { id: "feedback", label: "Feedback Inbox", icon: MessageSquare },
    { id: "support", label: "Support Tickets", icon: ShieldCheck },
    { id: "content", label: "Content Editor", icon: FileText },
    { id: "notifications", label: "Announcements", icon: Bell },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card p-6 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <img src={logo} alt="SickleCare" className="h-9 w-auto object-contain" />
            <span className="font-display text-lg font-bold">SickleCare Admin</span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="border-t border-border pt-4 mt-4">
            <p className="text-xs text-muted-foreground truncate" title={email}>
              Signed in as
            </p>
            <p className="text-xs font-semibold text-foreground truncate mb-4">{email}</p>
            <button
              onClick={logout}
              className="flex w-full items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-xs font-medium text-muted-foreground transition hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile menu picker */}
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium md:hidden"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <h1 className="font-display text-lg font-bold md:text-xl capitalize">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h1>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
          >
            Visit public site <ArrowUpRight className="h-3 w-3" />
          </Link>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

// 1. OVERVIEW & ANALYTICS TAB
function OverviewTab({ users, resources, faqs, contacts, feedbacks, support }) {
  // Chart datasets
  const growthData = [
    { month: "Jan", users: 12 },
    { month: "Feb", users: 24 },
    { month: "Mar", users: 48 },
    { month: "Apr", users: 95 },
    { month: "May", users: 160 },
    { month: "Jun", users: users.length > 5 ? users.length : 220 },
  ];

  const categoryData = [
    { name: "Praise", count: feedbacks.filter((f) => f.category === "praise").length || 8 },
    { name: "Suggestion", count: feedbacks.filter((f) => f.category === "suggestion").length || 5 },
    { name: "Bug Report", count: feedbacks.filter((f) => f.category === "bug").length || 3 },
    { name: "Content", count: feedbacks.filter((f) => f.category === "content").length || 4 },
  ];

  const viewData = resources.slice(0, 5).map((r) => ({
    name: r.title.length > 18 ? r.title.slice(0, 15) + "..." : r.title,
    views: r.views || Math.floor(Math.random() * 300) + 100,
  }));

  const timelineData = [
    { day: "09 Jun", contacts: 2, support: 1 },
    { day: "10 Jun", contacts: 4, support: 3 },
    { day: "11 Jun", contacts: 1, support: 2 },
    { day: "12 Jun", contacts: 3, support: 4 },
    { day: "13 Jun", contacts: 6, support: 1 },
    { day: "14 Jun", contacts: contacts.length || 5, support: support.length || 2 },
  ];

  const statCards = [
    { title: "Total Users", count: users.length, icon: Users, color: "text-blue-500 bg-blue-500/10" },
    { title: "Total Resources", count: resources.length, icon: BookOpen, color: "text-emerald-500 bg-emerald-500/10" },
    { title: "Total FAQs", count: faqs.length, icon: FileQuestion, color: "text-indigo-500 bg-indigo-500/10" },
    { title: "Feedback Messages", count: feedbacks.length, icon: MessageSquare, color: "text-purple-500 bg-purple-500/10" },
    { title: "Contact Messages", count: contacts.length, icon: Mail, color: "text-amber-500 bg-amber-500/10" },
    { title: "Support Tickets", count: support.length, icon: ShieldCheck, color: "text-rose-500 bg-rose-500/10" },
  ];

  return (
    <div className="space-y-8">
      {/* Stat grid */}
      <div className="grid gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statCards.map((stat, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {stat.title}
            </p>
            <h3 className="mt-1 text-2xl font-bold font-display">{stat.count}</h3>
          </div>
        ))}
      </div>

      {/* Recharts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-display font-semibold">User Registration Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.66 0.18 25)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="oklch(0.66 0.18 25)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} />
                <YAxis tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="oklch(0.66 0.18 25)" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-display font-semibold">Feedback Sentiment & Categories</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} />
                <YAxis tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="oklch(0.22 0.06 260)" radius={[4, 4, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "oklch(0.22 0.06 260)" : "oklch(0.66 0.18 25)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-display font-semibold">Popular Resources (Views)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickLine={false} />
                <YAxis dataKey="name" type="category" width={100} tickLine={false} style={{ fontSize: "11px" }} />
                <Tooltip />
                <Bar dataKey="views" fill="oklch(0.66 0.18 25)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h3 className="mb-4 font-display font-semibold">Inquiries Activity Timeline</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tickLine={false} />
                <YAxis tickLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="contacts" name="Contact Submissions" stroke="oklch(0.66 0.18 25)" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="support" name="Support Requests" stroke="oklch(0.22 0.06 260)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. USER MANAGEMENT TAB
function UsersTab({ users }) {
  const [search, setSearch] = useState("");
  const [filterGeno, setFilterGeno] = useState("all");
  const [expandedUser, setExpandedUser] = useState(null);

  const filtered = users.filter((u) => {
    const matchesSearch =
      (u.displayName || "").toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesGeno = filterGeno === "all" || u.genotype === filterGeno;
    return matchesSearch && matchesGeno;
  });

  const onDelete = async (userId, displayName) => {
    if (!window.confirm(`Are you sure you want to delete the user "${displayName || userId}"?`)) return;
    try {
      await deleteDoc(doc(db, "users", userId));
      toast.success("User deleted successfully.");
    } catch {
      toast.error("Failed to delete user. Write permitted by Firestore rules?");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name or email…"
            className={`${FIELD_CLS} pl-10`}
          />
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-3.5 py-3 text-sm font-medium">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            Genotype:
          </span>
          <select
            value={filterGeno}
            onChange={(e) => setFilterGeno(e.target.value)}
            className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium outline-none"
          >
            <option value="all">All</option>
            <option value="AA">AA</option>
            <option value="AS">AS</option>
            <option value="SS">SS</option>
            <option value="SC">SC</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <table className="w-full border-collapse text-left text-sm text-muted-foreground">
          <thead className="bg-muted/40 text-xs font-semibold uppercase tracking-wider text-foreground">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Genotype</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((u) => {
              const isExpanded = expandedUser === u.id;
              const date = u.createdAt?.toMillis
                ? new Date(u.createdAt.toMillis()).toLocaleDateString()
                : "Unknown";

              return (
                <tr key={u.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    <button
                      onClick={() => setExpandedUser(isExpanded ? null : u.id)}
                      className="flex items-center gap-2 hover:text-accent font-semibold text-left"
                    >
                      <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      {u.displayName || "Anonymous"}
                    </button>
                    {isExpanded && (
                      <div className="mt-3 pl-6 text-xs text-muted-foreground space-y-1">
                        <p>
                          <strong className="text-foreground">Registration Date:</strong> {date}
                        </p>
                        <p>
                          <strong className="text-foreground">Phone:</strong> {u.phone || "Not provided"}
                        </p>
                        <p>
                          <strong className="text-foreground">User ID:</strong> {u.id}
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                        u.role === "admin" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded bg-background px-2 py-1 text-xs font-bold border border-border">
                      {u.genotype || "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onDelete(u.id, u.displayName)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                  No users match your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 3. RESOURCE MANAGEMENT TAB
function ResourcesTab({ resources, isDbEmpty }) {
  const [editing, setEditing] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [search, setSearch] = useState("");

  // Form Initial State
  const defaultForm = {
    tag: "Article",
    title: "",
    body: "",
    content: "",
    time: "",
    url: "",
    imageUrl: "",
    pdfUrl: "",
    published: true,
  };

  const [form, setForm] = useState(defaultForm);

  const openEdit = (res) => {
    setEditing(res);
    setForm({
      tag: res.tag || "Article",
      title: res.title || "",
      body: res.body || "",
      content: res.content || "",
      time: res.time || "",
      url: res.url || "",
      imageUrl: res.imageUrl || "",
      pdfUrl: res.pdfUrl || "",
      published: res.published !== false,
    });
  };

  const handleClose = () => {
    setEditing(null);
    setForm(defaultForm);
  };

  const onUpload = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (field === "imageUrl") setUploadingImg(true);
    if (field === "pdfUrl") setUploadingPdf(true);

    try {
      const fileRef = storageRef(storage, `resources/${Date.now()}_${file.name}`);
      const snap = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snap.ref);
      setForm((f) => ({ ...f, [field]: url }));
      toast.success(`${file.name} uploaded successfully.`);
    } catch {
      toast.error("File upload failed. Ensure Storage rules allow admin writes.");
    } finally {
      setUploadingImg(false);
      setUploadingPdf(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, updatedAt: serverTimestamp() };
      if (editing && editing.id) {
        await updateDoc(doc(db, "resources", editing.id), payload);
        toast.success("Resource updated successfully.");
      } else {
        await addDoc(collection(db, "resources"), payload);
        toast.success("Resource created successfully.");
      }
      handleClose();
    } catch {
      toast.error("Failed to save resource.");
    }
  };

  const onDelete = async (r) => {
    if (!window.confirm(`Delete resource "${r.title}"?`)) return;
    try {
      await deleteDoc(doc(db, "resources", r.id));
      toast.success("Resource deleted.");
    } catch {
      toast.error("Could not delete.");
    }
  };

  const togglePublish = async (r) => {
    try {
      await updateDoc(doc(db, "resources", r.id), {
        published: !r.published,
      });
      toast.success(r.published ? "Unpublished draft" : "Published resource");
    } catch {
      toast.error("Operation failed.");
    }
  };

  return (
    <div className="space-y-6">
      {isDbEmpty && (
        <div className="rounded-2xl border border-dashed border-border p-5 text-sm bg-card text-muted-foreground flex items-center justify-between">
          <p>
            Currently showing <strong>starter seeds</strong>. Publish your first custom resource to write real data to Firestore.
          </p>
          <button
            onClick={() => setEditing({})}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-medium text-white hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4" /> Initialize database
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources by title or tag…"
            className={`${FIELD_CLS} pl-10`}
          />
        </div>
        <button
          onClick={() => setEditing({})}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold text-background hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> Add Resource
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <table className="w-full border-collapse text-left text-sm text-muted-foreground">
          <thead className="bg-muted/40 text-xs font-semibold uppercase tracking-wider text-foreground">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Tag</th>
              <th className="px-6 py-4">Format/Duration</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {resources
              .filter((r) =>
                !search ||
                r.title?.toLowerCase().includes(search.toLowerCase()) ||
                r.tag?.toLowerCase().includes(search.toLowerCase())
              )
              .map((r) => (
              <tr key={r.id} className="hover:bg-muted/10 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground font-semibold">{r.title}</div>
                  <p className="text-xs text-muted-foreground max-w-md truncate mt-0.5">{r.body}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="rounded bg-accent/15 px-2.5 py-0.5 text-xs font-semibold text-accent uppercase">
                    {r.tag}
                  </span>
                </td>
                <td className="px-6 py-4">{r.time || "—"}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => !isDbEmpty && togglePublish(r)}
                    disabled={isDbEmpty}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      r.published !== false ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {r.published !== false ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="px-6 py-4 text-right space-x-1.5">
                  <button
                    onClick={() => openEdit(r)}
                    className="inline-flex items-center gap-2 rounded-full bg-accent/10 text-accent px-3 py-1 text-sm font-medium hover:opacity-90"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => !isDbEmpty && onDelete(r)}
                    disabled={isDbEmpty}
                    className="inline-flex items-center gap-2 rounded-full bg-destructive/10 text-destructive px-3 py-1 text-sm font-medium hover:opacity-90 disabled:opacity-40"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Resource Editor Modal */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative my-8 w-full max-w-xl rounded-3xl border border-border bg-card p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={handleClose}
              className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-display text-2xl font-bold">
              {editing.id ? "Edit Resource" : "Create Resource"}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Provide the details. Changes sync in real-time.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Tag Type</Label>
                  <select
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    className={FIELD_CLS}
                  >
                    <option value="Article">Article</option>
                    <option value="Video">Video</option>
                    <option value="Health Tip">Health Tip</option>
                    <option value="FAQ">FAQ</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Guide">Guide</option>
                  </select>
                </div>
                <div>
                  <Label>Duration / Time</Label>
                  <input
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className={FIELD_CLS}
                    placeholder="e.g. 5 min read"
                  />
                </div>
              </div>

              <div>
                <Label>Title</Label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className={FIELD_CLS}
                />
              </div>

              <div>
                <Label>Summary Description</Label>
                <textarea
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  required
                  rows={2}
                  className={FIELD_CLS}
                />
              </div>

              <div>
                <Label>Full Content Details</Label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={6}
                  className={FIELD_CLS}
                />
              </div>

              <div>
                <Label>External URL (Optional)</Label>
                <input
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className={FIELD_CLS}
                  type="url"
                  placeholder="https://..."
                />
              </div>

              {/* Upload Section */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Cover Image</Label>
                  <div className="flex items-center gap-2">
                    <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background px-3 py-3 text-xs font-semibold hover:bg-muted/30 transition-colors">
                      <Image className="h-4 w-4" />
                      {uploadingImg ? "Uploading…" : form.imageUrl ? "Change Image" : "Upload Image"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onUpload(e, "imageUrl")}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {form.imageUrl && (
                    <p className="text-[10px] text-accent truncate mt-1 underline">
                      <a href={form.imageUrl} target="_blank" rel="noreferrer">
                        View Image Link
                      </a>
                    </p>
                  )}
                </div>

                <div>
                  <Label>PDF Document</Label>
                  <div className="flex items-center gap-2">
                    <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background px-3 py-3 text-xs font-semibold hover:bg-muted/30 transition-colors">
                      <FileUp className="h-4 w-4" />
                      {uploadingPdf ? "Uploading…" : form.pdfUrl ? "Change PDF" : "Upload PDF"}
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => onUpload(e, "pdfUrl")}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {form.pdfUrl && (
                    <p className="text-[10px] text-accent truncate mt-1 underline">
                      <a href={form.pdfUrl} target="_blank" rel="noreferrer">
                        View PDF Link
                      </a>
                    </p>
                  )}
                </div>
              </div>

              <label className="flex items-center gap-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="h-4 w-4 rounded accent-accent"
                />
                <span className="text-sm font-semibold">Publish Resource</span>
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingImg || uploadingPdf}
                  className="rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold text-background hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// 4. FAQ MANAGEMENT TAB
function FaqsTab({ faqs, isDbEmpty }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ question: "", answer: "", order: 1, published: true });
  const [search, setSearch] = useState("");

  const openEdit = (faq) => {
    setEditing(faq);
    setForm({
      question: faq.question || "",
      answer: faq.answer || "",
      order: faq.order || 1,
      published: faq.published !== false,
    });
  };

  const handleClose = () => {
    setEditing(null);
    setForm({ question: "", answer: "", order: 1, published: true });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, updatedAt: serverTimestamp() };
      if (editing && editing.id) {
        await updateDoc(doc(db, "faqs", editing.id), payload);
        toast.success("FAQ updated successfully.");
      } else {
        await addDoc(collection(db, "faqs"), payload);
        toast.success("FAQ created successfully.");
      }
      handleClose();
    } catch {
      toast.error("Failed to save FAQ.");
    }
  };

  const onDelete = async (f) => {
    if (!window.confirm(`Delete FAQ: "${f.question}"?`)) return;
    try {
      await deleteDoc(doc(db, "faqs", f.id));
      toast.success("FAQ deleted.");
    } catch {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs by question…"
            className={`${FIELD_CLS} pl-10`}
          />
        </div>
        <button
          onClick={() => setEditing({})}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold text-background hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" /> Add FAQ
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <table className="w-full border-collapse text-left text-sm text-muted-foreground">
          <thead className="bg-muted/40 text-xs font-semibold uppercase tracking-wider text-foreground">
            <tr>
              <th className="px-6 py-4">Order</th>
              <th className="px-6 py-4">Question</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {faqs
              .filter((f) =>
                !search ||
                f.question?.toLowerCase().includes(search.toLowerCase()) ||
                f.answer?.toLowerCase().includes(search.toLowerCase())
              )
              .map((f) => (
              <tr key={f.id} className="hover:bg-muted/10 transition-colors">
                <td className="px-6 py-4 font-semibold text-foreground">{f.order || 0}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground font-semibold">{f.question}</div>
                  <p className="text-xs mt-1 max-w-xl line-clamp-2">{f.answer}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                      f.published !== false ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {f.published !== false ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-1">
                  <button
                    onClick={() => openEdit(f)}
                    className="inline-flex items-center gap-2 rounded-full bg-accent/10 text-accent px-3 py-1 text-sm font-medium hover:opacity-90"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => !isDbEmpty && onDelete(f)}
                    disabled={isDbEmpty}
                    className="inline-flex items-center gap-2 rounded-full bg-destructive/10 text-destructive px-3 py-1 text-sm font-medium hover:opacity-90 disabled:opacity-40"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-8 shadow-2xl">
            <button onClick={handleClose} className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
            <h2 className="font-display text-xl font-bold">{editing.id ? "Edit FAQ" : "Add FAQ"}</h2>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <Label>Question</Label>
                <input
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  required
                  className={FIELD_CLS}
                />
              </div>

              <div>
                <Label>Answer</Label>
                <textarea
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  required
                  rows={4}
                  className={FIELD_CLS}
                />
              </div>

              <div>
                <Label>Order Weight (Sorting Index)</Label>
                <input
                  value={form.order}
                  type="number"
                  onChange={(e) => setForm({ ...form, order: parseInt(e.target.value, 10) })}
                  className={FIELD_CLS}
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="h-4 w-4 accent-accent"
                />
                <span className="text-sm font-semibold">Publish FAQ</span>
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button type="button" onClick={handleClose} className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted">
                  Cancel
                </button>
                <button type="submit" className="rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold text-background hover:opacity-90">
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// 5. CONTACT MESSAGES TAB
function ContactsTab({ contacts }) {
  const [search, setSearch] = useState("");

  const filtered = contacts.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase()) ||
      c.message.toLowerCase().includes(search.toLowerCase())
    );
  });

  const onResolve = async (id, status) => {
    try {
      await updateDoc(doc(db, "contacts", id), { resolved: !status });
      toast.success(!status ? "Marked as resolved." : "Marked as unresolved.");
    } catch {
      toast.error("Firestore write failed.");
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this contact message permanently?")) return;
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Message deleted.");
    } catch {
      toast.error("Deletion failed.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search inquiries by sender name, subject, or message content…"
          className={`${FIELD_CLS} pl-10`}
        />
      </div>

      <div className="space-y-4">
        {filtered.map((c) => {
          const date = c.createdAt?.toMillis
            ? new Date(c.createdAt.toMillis()).toLocaleString()
            : "Recently";

          return (
            <div key={c.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    c.resolved ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {c.resolved ? "Resolved" : "Open"}
                  </span>
                  <span className="text-xs text-muted-foreground">{date}</span>
                </div>
                <h4 className="font-display font-semibold text-lg text-foreground">
                  {c.subject || "(No Subject)"}
                </h4>
                <p className="text-sm leading-relaxed whitespace-pre-line text-foreground/90">
                  {c.message}
                </p>
                <div className="text-xs text-muted-foreground">
                  Sent by <span className="font-bold text-foreground">{c.name}</span> (
                  <a href={`mailto:${c.email}`} className="underline text-accent">
                    {c.email}
                  </a>
                  )
                </div>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => onResolve(c.id, c.resolved)}
                  className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold transition-colors ${
                    c.resolved ? "hover:bg-amber-50" : "hover:bg-emerald-50 text-accent hover:text-emerald-700"
                  }`}
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  {c.resolved ? "Reopen Inquiry" : "Mark Resolved"}
                </button>
                <button
                  onClick={() => onDelete(c.id)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            No contact submissions found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}

// 6. FEEDBACK TAB
function FeedbackTab({ feedbacks }) {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("all");

  const filtered = feedbacks.filter((f) => {
    const textMatch =
      (f.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (f.message || "").toLowerCase().includes(search.toLowerCase());

    if (!textMatch) return false;

    if (dateRange === "all" || !f.createdAt?.toMillis) return true;

    const ms = f.createdAt.toMillis();
    const ageMs = Date.now() - ms;
    const oneDay = 24 * 60 * 60 * 1000;

    if (dateRange === "today") return ageMs < oneDay;
    if (dateRange === "week") return ageMs < 7 * oneDay;
    if (dateRange === "month") return ageMs < 30 * oneDay;

    return true;
  });

  const onDelete = async (id) => {
    if (!window.confirm("Permanently delete this feedback rating?")) return;
    try {
      await deleteDoc(doc(db, "feedback", id));
      toast.success("Feedback deleted.");
    } catch {
      toast.error("Failed to delete.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search feedback reviews…"
            className={`${FIELD_CLS} pl-10`}
          />
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-3.5 py-3 text-sm font-medium">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            Date:
          </span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium outline-none"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((f) => {
          const date = f.createdAt?.toMillis
            ? new Date(f.createdAt.toMillis()).toLocaleDateString()
            : "Recently";

          return (
            <div key={f.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm flex justify-between gap-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent uppercase">
                    {f.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{date}</span>
                  {f.rating > 0 && (
                    <span className="text-xs font-bold text-amber-500">
                      ★ {f.rating} / 5 Rating
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
                  {f.message}
                </p>
                <p className="text-xs text-muted-foreground">
                  Feedback from <strong className="text-foreground">{f.name || "Anonymous"}</strong>{" "}
                  {f.email && `(${f.email})`}
                </p>
              </div>

              <div>
                <button
                  onClick={() => onDelete(f.id)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            No feedback found matching the filters.
          </p>
        )}
      </div>
    </div>
  );
}

// 7. SUPPORT CENTER TAB
function SupportTab({ support }) {
  const [search, setSearch] = useState("");
  const [selectedConvo, setSelectedConvo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);

  const filtered = support.filter((s) => {
    return (
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.subject || "").toLowerCase().includes(search.toLowerCase()) ||
      (s.message || "").toLowerCase().includes(search.toLowerCase())
    );
  });

  const onReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedConvo) return;
    setSending(true);

    try {
      const newReply = {
        sender: "admin",
        text: replyText.trim(),
        createdAt: new Date(),
      };

      await updateDoc(doc(db, "support_messages", selectedConvo.id), {
        replies: arrayUnion(newReply),
        updatedAt: serverTimestamp(),
        resolved: false,
      });

      // Update local selection state details
      setSelectedConvo((prev) => ({
        ...prev,
        replies: [...(prev.replies || []), newReply],
      }));

      setReplyText("");
      toast.success("Reply submitted successfully.");
    } catch {
      toast.error("Failed to submit reply. Real collection connected?");
    } finally {
      setSending(false);
    }
  };

  const toggleResolve = async (convo) => {
    try {
      await updateDoc(doc(db, "support_messages", convo.id), {
        resolved: !convo.resolved,
      });
      setSelectedConvo((prev) => (prev ? { ...prev, resolved: !convo.resolved } : null));
      toast.success(convo.resolved ? "Conversation reopened" : "Conversation resolved");
    } catch {
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.5fr] items-start">
      {/* List side */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search help threads…"
            className={`${FIELD_CLS} pl-9`}
          />
        </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
          {filtered.map((convo) => {
            const active = selectedConvo?.id === convo.id;
            return (
              <button
                key={convo.id}
                onClick={() => setSelectedConvo(convo)}
                className={`w-full text-left rounded-2xl border p-4 shadow-sm transition-all flex flex-col gap-2 ${
                  active ? "border-accent bg-accent/5 ring-1 ring-accent" : "border-border bg-card hover:bg-muted/10"
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                    convo.resolved ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {convo.resolved ? "Resolved" : "Open"}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {convo.createdAt?.toMillis
                      ? new Date(convo.createdAt.toMillis()).toLocaleDateString()
                      : "Recently"}
                  </span>
                </div>
                <h4 className="font-display font-semibold text-sm truncate text-foreground">
                  {convo.subject || "Support Request"}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {convo.message}
                </p>
                <p className="text-[10px] font-semibold text-foreground truncate">
                  {convo.name}
                </p>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-6">
              No support threads found.
            </p>
          )}
        </div>
      </div>

      {/* Details / Chat side */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm min-h-[400px] flex flex-col justify-between">
        {selectedConvo ? (
          <div className="space-y-4 flex flex-col justify-between h-full flex-1">
            <div>
              <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
                <div>
                  <h3 className="font-display font-bold text-lg">
                    {selectedConvo.subject || "Support Ticket"}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    From {selectedConvo.name} ({selectedConvo.email})
                  </p>
                </div>
                <button
                  onClick={() => toggleResolve(selectedConvo)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold border border-border bg-background transition-colors ${
                    selectedConvo.resolved ? "hover:bg-amber-50" : "hover:bg-emerald-50 text-accent hover:text-emerald-700"
                  }`}
                >
                  {selectedConvo.resolved ? "Reopen" : "Resolve"}
                </button>
              </div>

              {/* Chat Thread */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto mb-4 p-1">
                {/* Initial message */}
                <div className="rounded-2xl bg-muted/40 p-4 max-w-[85%] text-sm space-y-1">
                  <p className="font-bold text-xs text-foreground">{selectedConvo.name}</p>
                  <p className="leading-relaxed whitespace-pre-line text-muted-foreground">
                    {selectedConvo.message}
                  </p>
                </div>

                {/* Replies */}
                {(selectedConvo.replies || []).map((reply, index) => {
                  const isAdminReply = reply.sender === "admin";
                  return (
                    <div
                      key={index}
                      className={`rounded-2xl p-4 max-w-[85%] text-sm space-y-1 ${
                        isAdminReply ? "bg-accent/10 text-accent-foreground ml-auto" : "bg-muted/40 text-muted-foreground"
                      }`}
                    >
                      <p className="font-bold text-xs text-foreground">
                        {isAdminReply ? "Support Admin" : selectedConvo.name}
                      </p>
                      <p className="leading-relaxed whitespace-pre-line">
                        {reply.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reply Input Form */}
            <form onSubmit={onReplySubmit} className="flex gap-2 pt-4 border-t border-border mt-auto">
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply to patient..."
                required
                disabled={sending}
                className={`${FIELD_CLS} flex-1`}
              />
              <button
                type="submit"
                disabled={sending || !replyText.trim()}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full flex-1 py-12 text-center text-muted-foreground text-sm">
            <ShieldCheck className="h-10 w-10 mb-3 text-muted-foreground/45" />
            <p>Select a support thread to view correspondence details and reply directly.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// 8. CONTENT MANAGEMENT TAB
function ContentTab() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [saving, setSaving] = useState(false);

  // Form states matching standard JSON structures
  const [homeForm, setHomeForm] = useState({
    heroTitle: "",
    heroDescription: "",
    careTitle: "",
    careDescription: "",
  });

  const [resourcesForm, setResourcesForm] = useState({
    headline: "",
    description: "",
  });

  const [preventionForm, setPreventionForm] = useState({
    headline: "",
    description: "",
  });

  const [symptomsForm, setSymptomsForm] = useState({
    headline: "",
    description: "",
  });

  // Fetch content keys from Firestore
  useEffect(() => {
    const unsubHome = onSnapshot(doc(db, "content", "home"), (snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setHomeForm({
          heroTitle: d.heroTitle || "",
          heroDescription: d.heroDescription || "",
          careTitle: d.careTitle || "",
          careDescription: d.careDescription || "",
        });
      }
    });

    const unsubRes = onSnapshot(doc(db, "content", "resources"), (snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setResourcesForm({
          headline: d.headline || "",
          description: d.description || "",
        });
      }
    });

    const unsubPrev = onSnapshot(doc(db, "content", "prevention"), (snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setPreventionForm({
          headline: d.headline || "",
          description: d.description || "",
        });
      }
    });

    const unsubSymp = onSnapshot(doc(db, "content", "symptoms"), (snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setSymptomsForm({
          headline: d.headline || "",
          description: d.description || "",
        });
      }
    });

    return () => {
      unsubHome();
      unsubRes();
      unsubPrev();
      unsubSymp();
    };
  }, []);

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let data = {};
      if (selectedPage === "home") data = homeForm;
      if (selectedPage === "resources") data = resourcesForm;
      if (selectedPage === "prevention") data = preventionForm;
      if (selectedPage === "symptoms") data = symptomsForm;

      await setDoc(doc(db, "content", selectedPage), {
        ...data,
        updatedAt: serverTimestamp(),
      }, { merge: true });

      toast.success("Page copy updated successfully in Firestore.");
    } catch {
      toast.error("Failed to save content edits.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-border pb-4">
        {["home", "resources", "prevention", "symptoms"].map((page) => (
          <button
            key={page}
            onClick={() => setSelectedPage(page)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${
              selectedPage === page
                ? "bg-foreground text-background"
                : "border border-border bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            {page} Page
          </button>
        ))}
      </div>

      <form onSubmit={onSave} className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-5">
        {selectedPage === "home" && (
          <>
            <div>
              <Label>Hero Title Headline</Label>
              <input
                value={homeForm.heroTitle}
                onChange={(e) => setHomeForm({ ...homeForm, heroTitle: e.target.value })}
                required
                className={FIELD_CLS}
              />
            </div>
            <div>
              <Label>Hero Section Subtitle Description</Label>
              <textarea
                value={homeForm.heroDescription}
                onChange={(e) => setHomeForm({ ...homeForm, heroDescription: e.target.value })}
                required
                rows={3}
                className={FIELD_CLS}
              />
            </div>
            <div>
              <Label>Care Strip Title</Label>
              <input
                value={homeForm.careTitle}
                onChange={(e) => setHomeForm({ ...homeForm, careTitle: e.target.value })}
                required
                className={FIELD_CLS}
              />
            </div>
            <div>
              <Label>Care Strip Description</Label>
              <textarea
                value={homeForm.careDescription}
                onChange={(e) => setHomeForm({ ...homeForm, careDescription: e.target.value })}
                required
                rows={3}
                className={FIELD_CLS}
              />
            </div>
          </>
        )}

        {selectedPage === "resources" && (
          <>
            <div>
              <Label>Resource Hero Headline</Label>
              <input
                value={resourcesForm.headline}
                onChange={(e) => setResourcesForm({ ...resourcesForm, headline: e.target.value })}
                required
                className={FIELD_CLS}
              />
            </div>
            <div>
              <Label>Resource Hero Description</Label>
              <textarea
                value={resourcesForm.description}
                onChange={(e) => setResourcesForm({ ...resourcesForm, description: e.target.value })}
                required
                rows={3}
                className={FIELD_CLS}
              />
            </div>
          </>
        )}

        {selectedPage === "prevention" && (
          <>
            <div>
              <Label>Prevention Page Hero Headline</Label>
              <input
                value={preventionForm.headline}
                onChange={(e) => setPreventionForm({ ...preventionForm, headline: e.target.value })}
                required
                className={FIELD_CLS}
              />
            </div>
            <div>
              <Label>Prevention Page Hero Description</Label>
              <textarea
                value={preventionForm.description}
                onChange={(e) => setPreventionForm({ ...preventionForm, description: e.target.value })}
                required
                rows={3}
                className={FIELD_CLS}
              />
            </div>
          </>
        )}

        {selectedPage === "symptoms" && (
          <>
            <div>
              <Label>Symptoms Page Hero Headline</Label>
              <input
                value={symptomsForm.headline}
                onChange={(e) => setSymptomsForm({ ...symptomsForm, headline: e.target.value })}
                required
                className={FIELD_CLS}
              />
            </div>
            <div>
              <Label>Symptoms Page Hero Description</Label>
              <textarea
                value={symptomsForm.description}
                onChange={(e) => setSymptomsForm({ ...symptomsForm, description: e.target.value })}
                required
                rows={3}
                className={FIELD_CLS}
              />
            </div>
          </>
        )}

        <div className="flex justify-end pt-4 border-t border-border">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-foreground px-6 py-2.5 text-xs font-semibold text-background hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Saving Changes…" : "Save Page Content"}
          </button>
        </div>
      </form>
    </div>
  );
}

// 9. NOTIFICATION MANAGEMENT TAB
function NotificationsTab({ notifications }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [segment, setSegment] = useState("all");
  const [sending, setSending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setSending(true);

    try {
      await addDoc(collection(db, "notifications"), {
        title: title.trim(),
        body: body.trim(),
        sentTo: segment,
        type: "announcement",
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setBody("");
      toast.success("Notification announcement successfully sent!");
    } catch {
      toast.error("Failed to record announcement.");
    } finally {
      setSending(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this notification record?")) return;
    try {
      await deleteDoc(doc(db, "notifications", id));
      toast.success("Notification record removed.");
    } catch {
      toast.error("Deletion failed.");
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] items-start">
      {/* Creation form */}
      <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
        <h3 className="font-display font-semibold text-base">Send App Announcement</h3>
        <p className="text-xs text-muted-foreground">
          Broadcast global announcements. Messages are synchronized to user alerts.
        </p>

        <div>
          <Label>Notification Title</Label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={FIELD_CLS}
            placeholder="e.g. Daily Reminder System Maintenance"
          />
        </div>

        <div>
          <Label>Message Body</Label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={4}
            className={FIELD_CLS}
            placeholder="Write a clear statement about genotype testing or daily care updates..."
          />
        </div>

        <div>
          <Label>Recipient Segment</Label>
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
            className={FIELD_CLS}
          >
            <option value="all">All Visitors & App Users</option>
            <option value="users">Registered Members Only</option>
            <option value="admins">Admins Only</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-foreground px-6 py-2.5 text-xs font-semibold text-background hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
        >
          <Bell className="h-4 w-4" />
          {sending ? "Sending Announcement…" : "Broadcast Announcement"}
        </button>
      </form>

      {/* History panel */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold text-base">Announcement Logs</h3>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {notifications.map((notif) => {
            const date = notif.createdAt?.toMillis
              ? new Date(notif.createdAt.toMillis()).toLocaleString()
              : "Recently";
            return (
              <div key={notif.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm flex justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground text-sm">{notif.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{notif.body}</p>
                  <p className="text-[9px] text-muted-foreground/80 mt-1">
                    Sent to: <span className="font-bold text-accent uppercase">{notif.sentTo}</span> · {date}
                  </p>
                </div>
                <button
                  onClick={() => onDelete(notif.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:border-destructive hover:text-destructive transition-colors shrink-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
          {notifications.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-6">
              No historical announcements recorded.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// REUSABLE HELPER LABEL COMPONENT
function Label({ children }) {
  return (
    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
      {children}
    </label>
  );
}

export default AdminPage;
