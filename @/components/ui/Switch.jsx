import React from 'react';
import { motion } from 'framer-motion';

export const Switch = ({ 
  checked = false, 
  onChange, 
  disabled = false,
  size = "md",
  ariaLabel
}) => {
  // Size variants
  const sizes = {
    sm: {
      track: "w-8 h-4",
      thumb: "w-3 h-3",
      translateX: 16
    },
    md: {
      track: "w-10 h-5",
      thumb: "w-4 h-4",
      translateX: 20
    },
    lg: {
      track: "w-12 h-6",
      thumb: "w-5 h-5",
      translateX: 24
    }
  };
  
  const currentSize = sizes[size] || sizes.md;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onChange}
      className={`
        relative inline-flex flex-shrink-0 
        ${currentSize.track} 
        rounded-full cursor-pointer transition-colors 
        ease-in-out duration-200 focus:outline-none 
        focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <span className="sr-only">{ariaLabel || "Toggle"}</span>
      <motion.span
        layout
        initial={false}
        animate={{
          x: checked ? currentSize.translateX : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`
          ${currentSize.thumb} 
          rounded-full bg-white shadow
          pointer-events-none transform ring-0 
          transition duration-200 ease-in-out
          flex items-center justify-center
        `}
        style={{
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
        }}
      >
        {checked && size === "lg" && (
          <motion.svg 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2 h-2 text-blue-600" 
            fill="currentColor" 
            viewBox="0 0 12 12"
          >
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </motion.svg>
        )}
      </motion.span>
    </button>
  );
};