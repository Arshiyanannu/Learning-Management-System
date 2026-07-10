import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

// allowedRoles: optional array e.g. ['admin'] or ['student'].
// If not provided, any logged-in user (regardless of role) can access the route.
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // While we're still checking localStorage for a saved user, show our new loader
  if (loading) {
    return <Loader />;
  }

  // Not logged in at all -> send to login page.
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in, but role is not allowed for this route -> send back to home.
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and authorized -> render the protected page.
  return children;
};

export default ProtectedRoute;