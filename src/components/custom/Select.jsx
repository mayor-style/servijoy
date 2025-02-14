// File: components/custom/Select.jsx
import React from "react";

export const Select = ({ onValueChange, children, ...props }) => {
  return (
    <div className="relative inline-block w-full">
      <select
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm md:text-base lg:text-lg"
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export const SelectTrigger = ({ children }) => <>{children}</>;

export const SelectValue = ({ placeholder }) => <option value="">{placeholder}</option>;

export const SelectContent = ({ children }) => <>{children}</>;

export const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;

export default Select;