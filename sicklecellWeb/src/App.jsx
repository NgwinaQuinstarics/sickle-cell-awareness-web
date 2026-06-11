import { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/index.jsx";
import About from "./pages/about.jsx";
import AppPage from "./pages/app.jsx";
import Contact from "./pages/contact.jsx";
import Faq from "./pages/faq.jsx";
import Feedback from "./pages/feedback.jsx";
import Prevention from "./pages/prevention.jsx";
import Privacy from "./pages/privacy.jsx";
import Resources from "./pages/resources.jsx";
import ResourceDetail from "./pages/resource-detail.jsx";
import Admin from "./pages/admin.jsx";
import Symptoms from "./pages/symptoms.jsx";
import Terms from "./pages/terms.jsx";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/app" element={<AppPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/prevention" element={<Prevention />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/resources/:id" element={<ResourceDetail />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/symptoms" element={<Symptoms />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
