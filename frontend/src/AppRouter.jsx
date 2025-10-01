import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddFood from "./pages/AddFood";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { LoadingScreen } from "./components/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth/firebase";

export default function AppRouter() {
  const [user, loading, error] = useAuthState(auth);

  // Development mode bypass
  const isDevelopment =
    import.meta.env.VITE_FIREBASE_API_KEY === "demo-api-key-for-development";

  if (loading && !isDevelopment)
    return <LoadingScreen message="Loading your account..." />;

  // In development mode, bypass authentication
  if (isDevelopment) {
    console.log("� Development mode: Bypassing authentication");
  }

  // �🔐 If no user and not in development, show login
  if (!user && !isDevelopment) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    );
  }

  // ✅ If signed in, show the app
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddFood />
            </ProtectedRoute>
          }
        />
        {/* Redirect old routes for backward compatibility */}
        <Route
          path="/foodlog"
          element={
            <ProtectedRoute>
              <AddFood />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
