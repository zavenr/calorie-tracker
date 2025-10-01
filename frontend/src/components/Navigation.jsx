import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, BarChart3, Plus, User, Menu, X } from "lucide-react";
import { useState } from "react";
import useAppStore from "../store/useAppStore";

const MobileNavBar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/dashboard", icon: BarChart3, label: "Stats" },
    { path: "/add", icon: Plus, label: "Add", isAction: true },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-800/95 backdrop-blur-lg border-t border-gray-700/50 safe-area-bottom z-50">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center space-y-1 group"
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary-500 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Icon container with action button styling */}
              <div
                className={`
                relative p-2 rounded-xl transition-all duration-200
                ${
                  item.isAction
                    ? "bg-primary-600 group-hover:bg-primary-700 shadow-lg"
                    : isActive
                    ? "text-primary-400"
                    : "text-gray-400 group-hover:text-gray-200"
                }
              `}
              >
                <IconComponent
                  size={item.isAction ? 24 : 20}
                  className={item.isAction ? "text-white" : ""}
                />
              </div>

              {/* Label */}
              <span
                className={`
                text-xs font-medium transition-colors
                ${isActive ? "text-primary-400" : "text-gray-400"}
                ${item.isAction ? "text-primary-400" : ""}
              `}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

const DesktopNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobileMenuOpen, setMobileMenuOpen } = useAppStore();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/add", label: "Add Food", icon: Plus },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-dark-900/95 backdrop-blur-lg border-b border-gray-700/50 safe-area-top z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold">
              Calorie<span className="text-primary-500">Tracker</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary-600 text-white"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`
                  }
                >
                  <IconComponent size={18} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-dark-800 border-t border-gray-700"
        >
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "bg-primary-600 text-white"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`
                  }
                >
                  <IconComponent size={20} />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </motion.div>
      )}
    </header>
  );
};

// Main navigation component that switches based on screen size
const Navigation = () => {
  return (
    <>
      {/* Show desktop nav on larger screens */}
      <div className="hidden sm:block">
        <DesktopNavBar />
      </div>

      {/* Show mobile nav on smaller screens */}
      <div className="sm:hidden">
        <MobileNavBar />
      </div>
    </>
  );
};

export default Navigation;
