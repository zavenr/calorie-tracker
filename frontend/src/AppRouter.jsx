import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import FoodLog from "./FoodLog";
import Home from "./Home";
import NavBar from "./NavBar";
import ChatBot from "./ChatBot";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute"; // ⬅️ new import
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./auth/firebase";

export default function AppRouter() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  // 🔐 If no user, show only login
  if (!user) {
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
      <NavBar />
      <div className="ml-64 p-6">
        {" "}
        {/* 👈 margin-left to match sidebar width */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/foodlog"
            element={
              <ProtectedRoute>
                <FoodLog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <ChatBot />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
