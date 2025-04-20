import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaBriefcase, FaClock } from "react-icons/fa";

const BookingEvent = ({ event, onSelect }) => {
  const eventTime = new Date(event.date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white p-2 rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
      onClick={onSelect}
    >
      <div className="font-semibold text-xs truncate">{event.title}</div>
      <div className="flex items-center gap-1 text-xs text-blue-100">
        <FaClock size={10} />
        <span>{eventTime}</span>
      </div>
    </motion.div>
  );
};

export default BookingEvent;