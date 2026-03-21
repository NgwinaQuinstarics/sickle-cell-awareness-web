import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, AdminRoute, GuestRoute } from './components/layout/Guards.jsx';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import { LoginPage, RegisterPage } from './pages/Auth';
import { AboutPage, DangersPage, PreventionPage, LivingPage, ResourcesPage } from './pages/InfoPages';
import { CentresPage, ContactPage, QuizPage, PledgePage, DashboardPage, AppDownloadPage } from './pages/FuncPages';
import AdminPage from './pages/Admin';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [pathname]);
  return null;
}

function Layout({ children }) {
  return <><Navbar/><main className="min-h-screen">{children}</main><Footer/></>;
}

function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center p-8">
      <div>
        <div className="text-7xl mb-5">🩸</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3" style={{fontFamily:'Sora,sans-serif'}}>Page Not Found</h1>
        <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-primary">Back to Home</a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollTop/>
        <Toaster position="top-right" toastOptions={{
          duration: 4000,
          style: { fontFamily:'Inter, sans-serif', fontSize:'14px', borderRadius:'10px' },
          success: { iconTheme: { primary:'#16a34a', secondary:'#fff' } },
          error:   { iconTheme: { primary:'#dc2626', secondary:'#fff' } },
        }}/>
        <Routes>
          <Route path="/login"    element={<GuestRoute><LoginPage/></GuestRoute>}/>
          <Route path="/register" element={<GuestRoute><RegisterPage/></GuestRoute>}/>
          <Route path="/admin"    element={<AdminRoute><AdminPage/></AdminRoute>}/>
          <Route path="/"         element={<Layout><Home/></Layout>}/>
          <Route path="/about"      element={<Layout><AboutPage/></Layout>}/>
          <Route path="/dangers"    element={<Layout><DangersPage/></Layout>}/>
          <Route path="/prevention" element={<Layout><PreventionPage/></Layout>}/>
          <Route path="/living"     element={<Layout><LivingPage/></Layout>}/>
          <Route path="/resources"  element={<Layout><ResourcesPage/></Layout>}/>
          <Route path="/centres"    element={<Layout><CentresPage/></Layout>}/>
          <Route path="/quiz"       element={<Layout><QuizPage/></Layout>}/>
          <Route path="/pledge"     element={<Layout><PledgePage/></Layout>}/>
          <Route path="/contact"    element={<Layout><ContactPage/></Layout>}/>
          <Route path="/app"        element={<AppDownloadPage/>}/>
          <Route path="/dashboard"  element={<ProtectedRoute><Layout><DashboardPage/></Layout></ProtectedRoute>}/>
          <Route path="*"           element={<Layout><NotFound/></Layout>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
