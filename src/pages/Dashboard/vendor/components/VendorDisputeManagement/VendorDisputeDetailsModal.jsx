import React from "react";
import { FaTimes, FaCalendarAlt, FaUserAlt, FaHashtag, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const VendorDisputeDetailsModal = ({ dispute, isOpen, onClose, onUpdateStatus, isLoading }) => {
  if (!isOpen) return null;

  // Loading state
  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-lg w-full relative transition-transform duration-300 flex flex-col items-center justify-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <FaSpinner className="animate-spin text-blue-600 text-4xl mb-4" />
            <p className="text-lg font-medium dark:text-white">Loading dispute details...</p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // No dispute data
  if (!dispute) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-lg w-full relative transition-transform duration-300 flex flex-col items-center justify-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <FaTimes className="text-gray-400 dark:text-gray-500 text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">Dispute Not Found</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">The dispute information could not be loaded.</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-semibold"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Define status colors
  const statusColor = {
    pending: "bg-yellow-500",
    "in-progress": "bg-blue-500",
    resolved: "bg-green/50",
    declined: "bg-red-500",
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 max-h-[90vh] dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-3xl relative transition-transform duration-300"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          {/* Header area with close button */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold dark:text-white mr-4">
                Dispute Details
              </h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${statusColor[dispute.status.toLowerCase()] || "bg-gray-500"}`}>
                {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="p-6">
            {/* Dispute Title */}
            <h3 className="text-xl font-bold dark:text-white mb-6">
              {dispute.subject}
            </h3>

            {/* Dispute Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                  <FaHashtag className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reference</p>
                  <p className="text-md font-medium dark:text-white">{dispute.reference}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                  <FaCalendarAlt className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="text-md font-medium dark:text-white">{dispute.date}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green/10 dark:bg-green/90 flex items-center justify-center mr-3">
                  <FaUserAlt className="text-green/60 dark:text-green/40" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
                  <p className="text-md font-medium dark:text-white">{dispute.client}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold dark:text-white mb-3">Description</h4>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">{dispute.description}</p>
              </div>
            </div>

            {/* Conversation Section */}
            {dispute.messages && dispute.messages.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold dark:text-white mb-4">Conversation</h4>
                <div className="space-y-4">
                  {dispute.messages.map((msg, index) => (
                    <div 
                      key={index}
                      className={`flex ${msg.sender === "Customer" ? "justify-start" : "justify-end"}`}
                    >
                      <div 
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          msg.sender === "Customer" 
                            ? "bg-gray-100 dark:bg-gray-700 rounded-tr-2xl rounded-bl-2xl" 
                            : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-tl-2xl rounded-br-2xl"
                        }`}
                      >
                        <p className="text-xs font-semibold mb-1">{msg.sender}</p>
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              {dispute.status.toLowerCase() !== "resolved" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onUpdateStatus(dispute.id, "resolved")}
                  className="px-6 py-2 bg-green/60 hover:bg-green/70 text-white rounded-lg transition-colors duration-200 text-sm font-semibold flex items-center"
                >
                  Mark as Resolved
                </motion.button>
              )}
              {dispute.status.toLowerCase() !== "declined" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onUpdateStatus(dispute.id, "declined")}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-semibold flex items-center"
                >
                  Decline Dispute
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VendorDisputeDetailsModal;