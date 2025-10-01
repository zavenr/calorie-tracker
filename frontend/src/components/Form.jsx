import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";

// Base input component with mobile optimizations
const Input = forwardRef(
  (
    {
      type = "text",
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      className = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            className={`
            input
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon || isPassword ? "pr-10" : ""}
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : ""
            }
          `}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}

          {rightIcon && !isPassword && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 text-sm"
          >
            <AlertCircle size={14} />
            {error}
          </motion.div>
        )}

        {hint && !error && <p className="text-gray-400 text-sm">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

// Number input with mobile-friendly controls
const NumberInput = forwardRef(
  (
    { label, error, min = 0, max, step = 1, unit, className = "", ...props },
    ref
  ) => {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            min={min}
            max={max}
            step={step}
            className={`
            input
            ${unit ? "pr-12" : ""}
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : ""
            }
          `}
            {...props}
          />

          {unit && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-medium">
              {unit}
            </div>
          )}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 text-sm"
          >
            <AlertCircle size={14} />
            {error}
          </motion.div>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

// Textarea component
const Textarea = forwardRef(
  ({ label, error, hint, rows = 4, className = "", ...props }, ref) => {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          rows={rows}
          className={`
          input resize-none
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : ""
          }
        `}
          {...props}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 text-sm"
          >
            <AlertCircle size={14} />
            {error}
          </motion.div>
        )}

        {hint && !error && <p className="text-gray-400 text-sm">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

// Select component
const Select = forwardRef(
  (
    {
      label,
      error,
      options = [],
      placeholder = "Select an option",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        <select
          ref={ref}
          className={`
          input cursor-pointer
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : ""
          }
        `}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-400 text-sm"
          >
            <AlertCircle size={14} />
            {error}
          </motion.div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

// Form wrapper with mobile optimizations
const Form = ({ children, onSubmit, className = "", ...props }) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`} {...props}>
      {children}
    </form>
  );
};

// Form section for grouping related fields
const FormSection = ({ title, children, className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <h3 className="text-lg font-medium text-gray-200 border-b border-gray-700 pb-2">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

// Form buttons container
const FormActions = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-3 pt-4 ${className}`}>
      {children}
    </div>
  );
};

export { Input, NumberInput, Textarea, Select, Form, FormSection, FormActions };
