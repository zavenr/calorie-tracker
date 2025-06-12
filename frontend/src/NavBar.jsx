import { NavLink } from "react-router-dom";
import { auth } from "./auth/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Home, LayoutDashboard, Utensils, Bot, LogOut } from "lucide-react";

export default function NavBar() {
  const [user] = useAuthState(auth);

  const handleLogout = () => signOut(auth);

  const navItemBase =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition hover:bg-white/10 hover:backdrop-blur";

  return (
    <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-sm">
      <div className="w-full px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <h1 className="text-lg font-semibold tracking-wide text-white text-center w-20">
          Fitness<span className="text-blue-500">Tracker</span>
        </h1>
        {/* Nav Links */}
        <nav className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navItemBase} ${isActive ? "bg-white/10" : ""}`
            }
          >
            <Home size={20} /> Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${navItemBase} ${isActive ? "bg-white/10" : ""}`
            }
          >
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink
            to="/foodlog"
            className={({ isActive }) =>
              `${navItemBase} ${isActive ? "bg-white/10" : ""}`
            }
          >
            <Utensils size={20} /> Food Log
          </NavLink>
          <NavLink
            to="/chatbot"
            className={({ isActive }) =>
              `${navItemBase} ${isActive ? "bg-white/10" : ""}`
            }
          >
            <Bot size={20} /> ChatBot
          </NavLink>
        </nav>

        {/* User / Logout */}
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-gray-300 text-sm">
              Hi, {user.displayName?.split(" ")[0]}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-red-400 hover:text-red-500"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
