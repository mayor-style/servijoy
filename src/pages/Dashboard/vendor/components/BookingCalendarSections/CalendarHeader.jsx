import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { motion } from "framer-motion";

const CalendarHeader = ({ currentDate, onPrev, onNext, viewMode, setViewMode }) => {
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const viewOptions = [
    { id: "month", label: "Month" },
    { id: "week", label: "Week" },
    { id: "day", label: "Day" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-full shadow-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-300"
          aria-label="Previous month"
        >
          <MdChevronLeft size={24} />
        </button>
        
        <motion.h2 
          key={`${monthName}-${year}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold dark:text-white px-2"
        >
          {monthName} {year}
        </motion.h2>
        
        <button
          onClick={onNext}
          className="flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-full shadow-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-300"
          aria-label="Next month"
        >
          <MdChevronRight size={24} />
        </button>
      </div>

      {/* View Mode Selector */}
      <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {viewOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setViewMode(option.id)}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              viewMode === option.id
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;