import React from "react";
import { motion } from "framer-motion";
import BookingEvent from "./BookingEvent";

const CalendarGrid = ({ calendarDays, events, onSelectEvent, viewMode }) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  const getTodayClass = (date) => {
    const today = new Date();
    return today.getDate() === date.getDate() && 
           today.getMonth() === date.getMonth() && 
           today.getFullYear() === date.getFullYear() 
           ? "ring-2 ring-blue-500 dark:ring-blue-400" 
           : "";
  };

  const getEventCountForDay = (day) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === day.date.getFullYear() &&
        eventDate.getMonth() === day.date.getMonth() &&
        eventDate.getDate() === day.date.getDate()
      );
    }).length;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="overflow-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800 rounded-lg"
    >
      <div className="grid grid-cols-7 gap-2 sm:gap-3 md:gap-4 min-w-[600px]">
        {/* Weekday Headers */}
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2 pt-1"
          >
            {day}
          </div>
        ))}

        {/* Calendar Day Cells */}
        {calendarDays.map((day, index) => {
          const eventCount = getEventCountForDay(day);
          const hasEvents = eventCount > 0;
          
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              className={`border dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300 ${
                getTodayClass(day.date)
              } ${
                day.isCurrentMonth
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-100 dark:bg-gray-900 opacity-70"
              } ${
                hasEvents
                  ? "hover:shadow-md dark:hover:shadow-gray-900"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <div className="flex flex-col h-full">
                {/* Day number and indicator */}
                <div className="flex justify-between items-center p-2 border-b border-gray-100 dark:border-gray-700">
                  <span className={`text-sm font-medium ${
                    day.isCurrentMonth
                      ? "text-gray-800 dark:text-gray-200"
                      : "text-gray-500 dark:text-gray-500"
                  }`}>
                    {day.dayNumber}
                  </span>
                  
                  {hasEvents && (
                    <span className="flex items-center justify-center w-5 h-5 bg-blue-500 text-white text-xs rounded-full">
                      {eventCount}
                    </span>
                  )}
                </div>
                
                {/* Events for this day */}
                <div className="p-1 space-y-1 overflow-y-auto max-h-24 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                  {events
                    .filter((event) => {
                      const eventDate = new Date(event.date);
                      return (
                        eventDate.getFullYear() === day.date.getFullYear() &&
                        eventDate.getMonth() === day.date.getMonth() &&
                        eventDate.getDate() === day.date.getDate()
                      );
                    })
                    .map((event) => (
                      <BookingEvent
                        key={event.id}
                        event={event}
                        onSelect={() => onSelectEvent(event)}
                      />
                    ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CalendarGrid;