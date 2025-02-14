// File: components/vendor/disputes/VendorDisputeDetailsModal.jsx
import React from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const VendorDisputeDetailsModal = ({ dispute, isOpen, onClose, onUpdateStatus }) => {
  if (!isOpen || !dispute) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 max-w-lg sm:max-w-2xl w-full relative transition-transform duration-300"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <FaTimes size={20} />
          </button>

          {/* Modal Title */}
          <h2 className="text-xl sm:text-2xl font-bold dark:text-white mb-4 sm:mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
            {dispute.subject}
          </h2>

          {/* Dispute Details */}
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3">
            <strong>Reference:</strong> {dispute.reference}
          </p>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3">
            <strong>Date:</strong> {dispute.date}
          </p>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-3">
            <strong>Client:</strong> {dispute.client}
          </p>
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-5">
            {dispute.description}
          </p>

          {/* Conversation Section */}
          {dispute.messages && dispute.messages.length > 0 && (
            <div className="mb-5">
              <h3 className="text-lg sm:text-xl font-bold dark:text-white mb-3 border-b pb-2 border-gray-200 dark:border-gray-700">
                Conversation
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                {dispute.messages.map((msg, index) => (
                  <li key={index}>
                    <span className="font-semibold">{msg.sender}:</span> {msg.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 sm:space-x-6">
            {dispute.status.toLowerCase() !== "resolved" && (
              <button
                onClick={() => onUpdateStatus(dispute.id, "resolved")}
                className="px-4 sm:px-6 py-2 sm:py-3 btn-green text-white rounded-lg transition-colors duration-200 text-sm sm:text-lg font-semibold"
              >
                Mark as Resolved
              </button>
            )}
            {dispute.status.toLowerCase() !== "declined" && (
              <button
                onClick={() => onUpdateStatus(dispute.id, "declined")}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 hover:bg-opacity-90 text-white rounded-lg transition-colors duration-200 text-sm sm:text-lg font-semibold"
              >
                Decline Dispute
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VendorDisputeDetailsModal;