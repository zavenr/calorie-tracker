import { NavLink } from "react-router-dom";
import { auth } from "./auth/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Home, LayoutDashboard, Utensils, Bot, LogOut } from "lucide-react";

export default function NavBar() {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
  };

  const navItemBase =
    "flex flex-col items-center gap-1 text-sm px-4 py-3 rounded-xl transition-all font-medium text-gray-300";
  const activeStyle = "bg-slate-800 text-white";

  return (
    <div className="bg-[#0e0f11] text-white w-24 fixed h-screen py-10 flex flex-col justify-between items-center border-r border-gray-800">
      {/* Logo - now flat */}
      <img
        src="/logo.png"
        alt="CalorieTracker logo"
        className="w-14 h-14 object-contain mb-8"
      />

      {/* Navigation */}
      <nav className="flex flex-col gap-8 items-center flex-grow mt-4 w-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? activeStyle : "hover:bg-gray-800"}`
          }
        >
          <Home size={22} className="text-blue-400" />
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? activeStyle : "hover:bg-gray-800"}`
          }
        >
          <LayoutDashboard size={22} className="text-blue-400" />
          Dashboard
        </NavLink>

        <NavLink
          to="/foodlog"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? activeStyle : "hover:bg-gray-800"}`
          }
        >
          <Utensils size={22} className="text-blue-400" />
          Food Log
        </NavLink>

        <NavLink
          to="/chatbot"
          className={({ isActive }) =>
            `${navItemBase} ${isActive ? activeStyle : "hover:bg-gray-800"}`
          }
        >
          <Bot size={22} className="text-blue-400" />
          ChatBot
        </NavLink>
      </nav>

      {/* Logout */}
      {user && (
        <div className="mt-auto pt-8 w-full px-2 text-center">
          <p className="text-xs text-gray-400 mb-2">
            Hi, {user.displayName?.split(" ")[0]}
          </p>
          <button
            onClick={handleLogout}
            className="w-full flex flex-col items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs shadow-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
