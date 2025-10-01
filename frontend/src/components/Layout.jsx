import { motion } from "framer-motion";
import Navigation from "./Navigation";
import useAppStore from "../store/useAppStore";
import { ErrorMessage } from "./ErrorHandling";

const Layout = ({ children, title, className = "" }) => {
  const { error, clearError } = useAppStore();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3,
  };

  return (
    <div className="min-h-screen-safe bg-gradient-bg">
      <Navigation />

      {/* Main content area with proper spacing for navigation */}
      <main
        className={`
        pt-16 pb-20 sm:pt-20 sm:pb-8 
        px-4 sm:px-6 lg:px-8 
        max-w-7xl mx-auto
        ${className}
      `}
      >
        {/* Page title for mobile */}
        {title && (
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
          </div>
        )}

        {/* Global error message */}
        {error && (
          <ErrorMessage error={error} onDismiss={clearError} className="mb-4" />
        )}

        {/* Page content with animation */}
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

// Specialized layout for forms
const FormLayout = ({ children, title, onBack, className = "" }) => {
  return (
    <Layout title={title} className={`max-w-2xl ${className}`}>
      <div className="space-y-6">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        )}
        {children}
      </div>
    </Layout>
  );
};

// Specialized layout for dashboard/stats views
const DashboardLayout = ({ children, title, actions, className = "" }) => {
  return (
    <Layout title={title} className={className}>
      {actions && <div className="mb-6 flex justify-end">{actions}</div>}

      <div className="space-y-6 sm:space-y-8">{children}</div>
    </Layout>
  );
};

// Card container for consistent spacing and styling
const Card = ({ children, className = "", padding = "default", ...props }) => {
  const paddingClasses = {
    none: "",
    sm: "p-3 sm:p-4",
    default: "p-4 sm:p-6",
    lg: "p-6 sm:p-8",
  };

  return (
    <motion.div
      className={`card ${paddingClasses[padding]} ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Grid system for responsive layouts
const Grid = ({ children, cols = 1, gap = 4, className = "" }) => {
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  const gapClasses = {
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
  };

  return (
    <div className={`grid ${colClasses[cols]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

export { Layout, FormLayout, DashboardLayout, Card, Grid };
