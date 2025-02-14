import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const CalendarHeader = ({ currentDate, onPrev, onNext }) => {
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className="flex items-center justify-between mb-6 px-2 sm:px-4 md:px-6">
      <button
        onClick={onPrev}
        className="flex items-center gap-2 px-3 sm:px-5 md:px-6 py-2 sm:py-3 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <MdChevronLeft size={20} className="" />
        <span className="text-xs sm:text-sm md:text-base">Prev</span>
      </button>
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold dark:text-white truncate text-center">
        {monthName} {year}
      </h2>
      <button
        onClick={onNext}
        className="flex items-center gap-2 px-3 sm:px-5 md:px-6 py-2 sm:py-3 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
      >
        <span className="text-xs sm:text-sm md:text-base">Next</span>
        <MdChevronRight size={20} className="" />
      </button>
    </div>
  );
};

export default CalendarHeader;
