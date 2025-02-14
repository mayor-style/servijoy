import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const BookingDetailsModal = ({ isOpen, onClose, booking, onAction }) => {
  const [rejectionReason, setRejectionReason] = useState("");

  if (!isOpen || !booking) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed p-4 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative overflow-auto scrollbar-thin max-h-[90vh] scrollbar-thumb-gray-500 scrollbar-track-gray-300 transition-transform duration-300 transform "
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl sm:text-3xl font-bold dark:text-white truncate">
              Booking Request
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Booking Details */}
          <div className="mb-6 space-y-3">
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
              <strong>Customer:</strong> {booking.customer.name}
            </p>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
              <strong>Service:</strong> {booking.service}
            </p>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
              <strong>Date & Time:</strong> {booking.date}
            </p>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
              <strong>Price:</strong> ${booking.price}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <button
              className="w-full btn-green text-white py-2 rounded-lg transition-colors duration-200 text-lg font-semibold"
              onClick={() => onAction("accepted")}
            >
              ✅ Accept Booking
            </button>

            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors duration-200 text-lg font-semibold"
              onClick={() => onAction("rejected", rejectionReason)}
            >
              ❌ Reject Booking
            </button>

            {/* Rejection Reason Input */}
            <input
              type="text"
              placeholder="Reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingDetailsModal;
