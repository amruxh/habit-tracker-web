import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem("access_token");

  // If we have a user (cached) AND a token exists, let them in immediately
  if (user && token) {
    return children;
  }

  // If we are still loading and don't have enough data to let them in, show the loader
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-bg-base">
        <div className="text-xl font-bold tracking-widest uppercase animate-pulse">
          Authenticating...
        </div>
      </div>
    );
  }

  // Not loading and no valid cached session found
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
