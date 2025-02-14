import React from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const BookingDetailsModal = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center p-4 justify-center bg-black bg-opacity-50 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 sm:p-8 max-w-2xl w-full relative transition-transform duration-300 transform hover:scale-105 max-h-[90vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 overflow-y-auto"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <FaTimes size={24} />
          </button>

          {/* Modal Title */}
          <h2 className="text-2xl sm:text-3xl font-bold dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
            {event.title}
          </h2>

          {/* Booking Details */}
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>Client:</strong> {event.client}
          </p>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>Service:</strong> {event.service}
          </p>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4">
            <strong>Time:</strong>{" "}
            {new Date(event.date).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
            {event.details}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingDetailsModal;
