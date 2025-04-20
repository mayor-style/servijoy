import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
      />
      <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">Loading calendar...</p>
    </div>
  );
};

export default LoadingSpinner;