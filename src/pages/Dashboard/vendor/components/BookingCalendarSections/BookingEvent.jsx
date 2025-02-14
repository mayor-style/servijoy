import React from "react";
import { motion } from "framer-motion";

const BookingEvent = ({ event, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-blue-200 dark:bg-blue-600 text-xs sm:text-sm md:text-base p-2 sm:p-3 md:p-4 rounded-lg cursor-pointer hover:opacity-90 transition-colors duration-300 truncate"
      title={event.title}
      onClick={onSelect}
    >
      {event.title}
    </motion.div>
  );
};

export default BookingEvent;
