import React from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  const { name, category, status, totalBookings, earnings } = service;

  const statusConfig = {
    approved: {
      text: "Approved",
      icon: <FaCheckCircle className="text-green-600" />,
      bg: "bg-green-100 dark:bg-green-900",
    },
    pending: {
      text: "Pending",
      icon: <FaHourglassHalf className="text-yellow-600" />,
      bg: "bg-yellow-100 dark:bg-yellow-900",
    },
    rejected: {
      text: "Rejected",
      icon: <FaTimesCircle className="text-red-600" />,
      bg: "bg-red-100 dark:bg-red-900",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.pending;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 transition-transform duration-300 w-full"
    >
      {/* Service Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white truncate">{name}</h3>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 truncate">{category}</p>
      </div>

      {/* Status Indicator */}
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${currentStatus.bg}`}
      >
        {currentStatus.icon}
        <span className="dark:text-white truncate">{currentStatus.text}</span>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-4">
        <div className="text-center min-w-[80px]">
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold">{totalBookings}</p>
          <p className="text-xs text-gray-500">Bookings</p>
        </div>
        <div className="text-center min-w-[80px]">
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold">${earnings}</p>
          <p className="text-xs text-gray-500">Earnings</p>
        </div>
      </div>

      {/* Actions (Only if approved) */}
      {status === "approved" && (
        <div className="flex gap-2">
          <button className="p-2 text-blue-500 hover:text-blue-700 transition-colors duration-200">
            <FaEdit size={16} />
          </button>
          <button className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200">
            <FaTrash size={16} />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ServiceCard;
