import React from "react";
import { motion } from "framer-motion";

const SuccessAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative flex items-center justify-center"
      >
        {/* Glowing radial effect */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.8 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute w-24 h-24 bg-green opacity-30 rounded-full filter blur-lg"
        />
        {/* Check mark container */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex items-center justify-center w-16 h-16 bg-green rounded-full"
        >
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.285 6.709l-11.28 11.28-5.285-5.285 1.414-1.414 3.871 3.871 9.866-9.866z"/>
          </svg>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="mt-4 text-xl font-bold text-gray-800 font-header dark:text-white"
      >
        Booking Confirmed!
      </motion.div>
    </div>
  );
};

export default SuccessAnimation;
