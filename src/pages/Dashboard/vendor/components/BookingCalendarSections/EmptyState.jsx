import React from "react";
import { motion } from "framer-motion";
import { FaCalendarPlus } from "react-icons/fa";

const EmptyState = ({ onAddNew }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-8 sm:p-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center h-64"
    >
      <FaCalendarPlus size={60} className="text-gray-300 dark:text-gray-600 mb-4" />
      <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
        No schedules yet
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
        You haven't added any schedules to your calendar. Create your first schedule to get started.
      </p>
      <button
        onClick={onAddNew}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
      >
        Add Your First Schedule
      </button>
    </motion.div>
  );
};

export default EmptyState;