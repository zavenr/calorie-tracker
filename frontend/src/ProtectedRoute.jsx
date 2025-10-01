import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth/firebase";

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  
  // Development mode bypass
  const isDevelopment = import.meta.env.VITE_FIREBASE_API_KEY === 'demo-api-key-for-development';
  
  if (loading && !isDevelopment) return <div className="text-center p-10">Loading...</div>;

  // In development mode, always allow access
  if (isDevelopment) {
    return children;
  }

  return user ? children : <Navigate to="/login" />;
}
