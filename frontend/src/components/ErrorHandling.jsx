import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, X } from "lucide-react";

const ErrorMessage = ({ error, onRetry, onDismiss, className = "" }) => {
  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`card border-red-500/50 bg-red-900/20 ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
        <div className="flex-1 min-w-0">
          <p className="text-red-100 text-sm sm:text-base break-words">
            {error.message || error}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {onRetry && (
            <button
              onClick={onRetry}
              className="p-1 hover:bg-red-800/50 rounded-lg transition-colors"
              aria-label="Retry"
            >
              <RefreshCw size={16} className="text-red-300" />
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="p-1 hover:bg-red-800/50 rounded-lg transition-colors"
              aria-label="Dismiss"
            >
              <X size={16} className="text-red-300" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ErrorBoundary = ({ children, fallback }) => {
  // Simple error boundary fallback
  return (
    <div className="min-h-screen-safe flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <AlertCircle className="mx-auto mb-4 text-red-400" size={48} />
        <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-gray-400 mb-4">
          {fallback || "Please refresh the page and try again."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export { ErrorMessage, ErrorBoundary };
