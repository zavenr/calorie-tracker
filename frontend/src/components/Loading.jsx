import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className="w-full h-full border-3 border-primary-200 border-t-primary-600 rounded-full"></div>
    </motion.div>
  );
};

const LoadingScreen = ({ message = "Loading..." }) => (
  <div className="fixed inset-0 bg-dark-900 flex items-center justify-center z-50">
    <div className="text-center">
      <LoadingSpinner size="lg" className="mx-auto mb-4" />
      <p className="text-gray-400">{message}</p>
    </div>
  </div>
);

const LoadingCard = ({ className = "" }) => (
  <div className={`card animate-pulse ${className}`}>
    <div className="space-y-3">
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      <div className="h-8 bg-gray-700 rounded"></div>
    </div>
  </div>
);

export { LoadingSpinner, LoadingScreen, LoadingCard };
