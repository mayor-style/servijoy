import React, { useState } from "react";
import BookingDetailsModal from "./BookingDetailsModal";
import { motion } from "framer-motion";
import { FaClock, FaCheck, FaTimes, FaEye } from "react-icons/fa";

const BookingRequestsList = ({ bookings, onUpdateBookingStatus }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBooking(null);
  };

  const handleAction = (action, reason = "") => {
    if (!selectedBooking) return;
    onUpdateBookingStatus(selectedBooking.id, action, reason);
    handleCloseModal();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl transition-colors duration-300 overflow-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-green">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Booking Requests
      </h2>
      <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 overflow-y-aut">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
              <th className="px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Service
              </th>
              <th className="px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium uppercase tracking-wider text-right">
                Price ($)
              </th>
              <th className="px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium uppercase tracking-wider text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <motion.tr
                key={booking.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {booking.customer.name}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                  {booking.service}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                  {booking.date}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-right">
                  ${booking.price}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                  {booking.status === "pending" ? (
                    <span className="flex items-center gap-2 text-yellow-500 text-xs sm:text-sm">
                      <FaClock size={18} /> Pending
                    </span>
                  ) : booking.status === "accepted" ? (
                    <span className="flex items-center gap-2 text-green text-xs sm:text-sm">
                      <FaCheck size={18} /> Accepted
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-red-500 text-xs sm:text-sm">
                      <FaTimes size={18} /> Rejected
                    </span>
                  )}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-center">
                  <button
                    onClick={() => handleOpenModal(booking)}
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                  >
                    <FaEye />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <BookingDetailsModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        booking={selectedBooking}
        onAction={handleAction}
      />
    </div>
  );
};

export default BookingRequestsList;
