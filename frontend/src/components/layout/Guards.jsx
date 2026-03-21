import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PageLoader } from '../ui/index.jsx';

export function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();
  if (loading) return <PageLoader />;
  if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

export function AdminRoute({ children }) {
  const { isLoggedIn, isAdmin, loading } = useAuth();
  const location = useLocation();
  if (loading) return <PageLoader />;
  if (!isLoggedIn) return <Navigate to="/login" state={{ from: location }} replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}

export function GuestRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (isLoggedIn) return <Navigate to="/dashboard" replace />;
  return children;
}
