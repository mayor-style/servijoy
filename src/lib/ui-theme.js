/**
 * UI Theme Configuration
 * 
 * This file contains theme variables and utility functions for the enhanced UI/UX
 * across user and vendor dashboards.
 */

// Color palette with enhanced gradients
export const colors = {
  primary: {
    light: '#60a5fa', // blue-400
    main: '#3b82f6', // blue-500
    dark: '#2563eb', // blue-600
    gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)'
  },
  secondary: {
    light: '#a78bfa', // violet-400
    main: '#8b5cf6', // violet-500
    dark: '#7c3aed', // violet-600
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
  },
  success: {
    light: '#4ade80', // green-400
    main: '#22c55e', // green-500
    dark: '#16a34a', // green-600
    gradient: 'linear-gradient(135deg, #22c55e, #16a34a)'
  },
  warning: {
    light: '#fbbf24', // amber-400
    main: '#f59e0b', // amber-500
    dark: '#d97706', // amber-600
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
  },
  error: {
    light: '#f87171', // red-400
    main: '#ef4444', // red-500
    dark: '#dc2626', // red-600
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)'
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  // Brand colors
  brand: {
    green: '#38A169',
    blue: '#3b82f6',
    gradient: 'linear-gradient(135deg, #38A169, #3b82f6)'
  }
};

// Shadows with improved depth perception
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  // Colored shadows for cards
  blue: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
  green: '0 10px 15px -3px rgba(34, 197, 94, 0.3)',
  purple: '0 10px 15px -3px rgba(139, 92, 246, 0.3)',
  // Glass effect shadows
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
};

// Border radius values
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

// Animation durations
export const animation = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  verySlow: '1000ms',
};

// Z-index values
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
  tooltip: 1700,
};

// Spacing scale (in rem)
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

// Glass morphism effects
export const glassMorphism = {
  light: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)'
  },
  dark: {
    background: 'rgba(17, 25, 40, 0.75)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  blue: {
    background: 'rgba(59, 130, 246, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(59, 130, 246, 0.18)'
  }
};

// Card styles with enhanced visual appeal
export const cardStyles = {
  default: {
    light: 'bg-white border border-gray-200 shadow-md rounded-xl',
    dark: 'bg-gray-800 border border-gray-700 shadow-md rounded-xl'
  },
  elevated: {
    light: 'bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow rounded-xl',
    dark: 'bg-gray-800 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow rounded-xl'
  },
  glass: {
    light: 'bg-white/70 backdrop-blur-md border border-white/20 shadow-lg rounded-xl',
    dark: 'bg-gray-800/70 backdrop-blur-md border border-gray-700/20 shadow-lg rounded-xl'
  },
  gradient: {
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20 rounded-xl',
    green: 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/20 rounded-xl',
    purple: 'bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-lg shadow-violet-500/20 rounded-xl',
    brand: 'bg-gradient-to-br from-green to-blue-500 text-white shadow-lg shadow-blue-500/20 rounded-xl'
  }
};

// Button styles with enhanced visual appeal
export const buttonStyles = {
  primary: {
    base: 'inline-flex items-center justify-center rounded-lg font-medium transition-all',
    solid: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg active:shadow-sm',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30',
    ghost: 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30',
    gradient: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg active:shadow-sm'
  },
  secondary: {
    base: 'inline-flex items-center justify-center rounded-lg font-medium transition-all',
    solid: 'bg-violet-600 hover:bg-violet-700 text-white shadow-md hover:shadow-lg active:shadow-sm',
    outline: 'border-2 border-violet-600 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30',
    ghost: 'text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30',
    gradient: 'bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white shadow-md hover:shadow-lg active:shadow-sm'
  },
  success: {
    base: 'inline-flex items-center justify-center rounded-lg font-medium transition-all',
    solid: 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg active:shadow-sm',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30',
    ghost: 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30',
    gradient: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md hover:shadow-lg active:shadow-sm'
  },
  danger: {
    base: 'inline-flex items-center justify-center rounded-lg font-medium transition-all',
    solid: 'bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg active:shadow-sm',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30',
    ghost: 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30',
    gradient: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg active:shadow-sm'
  },
  neutral: {
    base: 'inline-flex items-center justify-center rounded-lg font-medium transition-all',
    solid: 'bg-gray-600 hover:bg-gray-700 text-white shadow-md hover:shadow-lg active:shadow-sm',
    outline: 'border-2 border-gray-600 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800',
    ghost: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
    gradient: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-md hover:shadow-lg active:shadow-sm'
  }
};

// Size variants for components
export const sizes = {
  button: {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
    xl: 'px-6 py-3 text-lg'
  },
  input: {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
    xl: 'px-6 py-3 text-lg'
  }
};

// Utility function to combine classes conditionally
export const cx = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Utility function to get theme color value
export const getColor = (colorPath) => {
  if (!colorPath) return null;
  
  const parts = colorPath.split('.');
  let result = colors;
  
  for (const part of parts) {
    if (result[part] === undefined) return null;
    result = result[part];
  }
  
  return result;
};

// Utility function to create gradient text
export const gradientText = (from, to) => {
  return `bg-gradient-to-r from-${from} to-${to} bg-clip-text text-transparent`;
};

// Export default theme object
export default {
  colors,
  shadows,
  borderRadius,
  animation,
  zIndex,
  spacing,
  glassMorphism,
  cardStyles,
  buttonStyles,
  sizes,
  cx,
  getColor,
  gradientText
};