import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md">
      <h1 className="text-xl md:text-2xl font-bold tracking-tight">
        🍽️ Zaven's CalorieTracker
      </h1>

      <div className="flex gap-6 text-sm md:text-base">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 font-semibold border-b-2 border-green-400"
              : "hover:text-green-300 transition"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 font-semibold border-b-2 border-green-400"
              : "hover:text-green-300 transition"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/foodlog"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 font-semibold border-b-2 border-green-400"
              : "hover:text-green-300 transition"
          }
        >
          Food Log
        </NavLink>

        <NavLink
          to="/chatbot"
          className={({ isActive }) =>
            isActive
              ? "text-green-400 font-semibold border-b-2 border-green-400"
              : "hover:text-green-300 transition"
          }
        >
          ChatBot
        </NavLink>
      </div>
    </nav>
  );
}
