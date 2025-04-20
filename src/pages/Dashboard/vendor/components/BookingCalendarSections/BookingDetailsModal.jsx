import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUser, FaCalendarAlt, FaClock, FaClipboardList } from "react-icons/fa";

const BookingDetailsModal = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  // Format date and time for display
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedTime = eventDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-0 max-w-lg w-full relative overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header with gradient background */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 relative">
            <h2 className="text-2xl font-bold">{event.title}</h2>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-6">
              {/* Client Information */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <FaUser size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{event.client || "N/A"}</p>
                </div>
              </div>
              
              {/* Service Information */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400">
                  <FaClipboardList size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Service</p>
                  <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{event.service}</p>
                </div>
              </div>
              
              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <FaCalendarAlt size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{formattedDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <FaClock size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{formattedTime}</p>
                  </div>
                </div>
              </div>
              
              {/* Details */}
              {event.details && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Additional Details</h3>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300">{event.details}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Modal Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingDetailsModal;