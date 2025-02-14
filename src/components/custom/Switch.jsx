

// File: components/custom/Switch.jsx
import React from "react";

const Switch = ({ checked, onCheckedChange }) => {
  return (
    <label className="flex items-center cursor-pointer gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="toggle toggle-primary w-10 h-5 sm:w-12 sm:h-6"
      />
      <span className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-300">
        {checked ? "On" : "Off"}
      </span>
    </label>
  );
};

export default Switch;
