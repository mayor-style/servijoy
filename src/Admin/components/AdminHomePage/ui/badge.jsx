import React from "react";

export const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    outline: "border border-gray-200 dark:border-gray-700"
  };

  return (
    <span className={`inline-flex items-center rounded-full text-xs font-medium px-2.5 py-0.5 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
