import { motion } from "framer-motion";
import { useMemo } from "react";

// Simple animated donut chart optimized for mobile
const DonutChart = ({ data, size = 160, strokeWidth = 20, className = "" }) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const total = useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0),
    [data]
  );

  let cumulativePercentage = 0;

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const strokeDasharray = `${
      (percentage / 100) * circumference
    } ${circumference}`;
    const strokeDashoffset = -cumulativePercentage * (circumference / 100);

    cumulativePercentage += percentage;

    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
      percentage: Math.round(percentage),
    };
  });

  const colors = [
    "#3b82f6", // blue
    "#10b981", // green
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // purple
    "#06b6d4", // cyan
  ];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgb(55, 65, 81)"
            strokeWidth={strokeWidth}
          />

          {/* Data segments */}
          {segments.map((segment, index) => (
            <motion.circle
              key={segment.name}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={segment.color || colors[index % colors.length]}
              strokeWidth={strokeWidth}
              strokeDasharray={segment.strokeDasharray}
              strokeDashoffset={segment.strokeDashoffset}
              strokeLinecap="round"
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: segment.strokeDasharray }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          ))}
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold">
              {total.toLocaleString()}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">Total</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2 w-full max-w-xs">
        {segments.map((segment, index) => (
          <div key={segment.name} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{
                backgroundColor: segment.color || colors[index % colors.length],
              }}
            />
            <span className="text-gray-300 truncate">
              {segment.name}: {segment.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple bar chart component
const BarChart = ({ data, className = "" }) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className={`space-y-3 ${className}`}>
      {data.map((item, index) => {
        const percentage = (item.value / maxValue) * 100;

        return (
          <div key={item.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">{item.name}</span>
              <span className="text-white font-medium">{item.value}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-primary-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Simple progress ring for single values
const ProgressRing = ({
  progress,
  size = 120,
  strokeWidth = 8,
  label,
  value,
  max,
  className = "",
}) => {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${
    (progress / 100) * circumference
  } ${circumference}`;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgb(55, 65, 81)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray }}
            transition={{ duration: 1 }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg sm:text-xl font-bold">{value}</div>
            {max && <div className="text-xs text-gray-400">/ {max}</div>}
          </div>
        </div>
      </div>

      {label && (
        <div className="mt-2 text-sm text-gray-300 text-center">{label}</div>
      )}
    </div>
  );
};

export { DonutChart, BarChart, ProgressRing };
