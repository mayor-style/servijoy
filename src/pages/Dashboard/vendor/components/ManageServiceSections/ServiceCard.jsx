import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaStar, FaCalendarAlt } from "react-icons/fa";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { toast } from "react-hot-toast";

const ServiceCard = ({ service }) => {
  const { name, category, status, totalBookings, earnings, rating, lastBooking } = service;
  const [isDeleting, setIsDeleting] = useState(false);

  const statusConfig = {
    approved: {
      text: "Approved",
      icon: <FaCheckCircle className="text-white" />,
      bg: "bg-green-500/90 dark:bg-green-600",
      textColor: "text-white",
      borderColor: "border-green-400 dark:border-green-500",
      shadowColor: "shadow-green-200 dark:shadow-green-900/20"
    },
    pending: {
      text: "Pending",
      icon: <FaHourglassHalf className="text-white" />,
      bg: "bg-yellow-400/90 dark:bg-yellow-500",
      textColor: "text-gray-900 dark:text-gray-900",
      borderColor: "border-yellow-300 dark:border-yellow-400",
      shadowColor: "shadow-yellow-200 dark:shadow-yellow-900/20"
    },
    rejected: {
      text: "Rejected",
      icon: <FaTimesCircle className="text-white" />,
      bg: "bg-red-500/90 dark:bg-red-600",
      textColor: "text-white",
      borderColor: "border-red-400 dark:border-red-500",
      shadowColor: "shadow-red-200 dark:shadow-red-900/20"
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.pending;

  const handleEdit = () => {
    toast.success("Edit mode activated!");
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      toast.success("Service deleted successfully!");
      setIsDeleting(false);
    }, 1500);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 border ${currentStatus.borderColor} transition-all duration-300 w-full hover:shadow-xl ${currentStatus.shadowColor}`}
    >
      {/* Service Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">{name}</h3>
          {status === "approved" && (
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="text-green-500"
              title="Verified Service"
            >
              <BiSolidBadgeCheck size={20} />
            </motion.div>
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
          {category}
        </p>
        
        {/* Mobile Status - Only visible on small screens */}
        <div className="sm:hidden mt-2">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${currentStatus.bg} ${currentStatus.textColor}`}
          >
            {currentStatus.icon}
            <span>{currentStatus.text}</span>
          </div>
        </div>
      </div>
      
      {/* Status Indicator - Hidden on small screens */}
      <div
        className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${currentStatus.bg} ${currentStatus.textColor}`}
      >
        {currentStatus.icon}
        <span>{currentStatus.text}</span>
      </div>
      
      {/* Stats */}
      <div className="flex flex-wrap justify-between sm:justify-start gap-4 sm:gap-6 border-t border-b border-gray-100 dark:border-gray-700 py-3 sm:border-0 sm:py-0">
        <div className="text-center min-w-[80px]">
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-semibold flex items-center justify-center gap-1">
            <span className="text-gray-400 dark:text-gray-500">
              <FaCalendarAlt size={14} />
            </span>
            {totalBookings}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Bookings</p>
        </div>
        
        <div className="text-center min-w-[80px]">
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-semibold">${earnings}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Earnings</p>
        </div>
        
        {rating > 0 && (
          <div className="text-center min-w-[80px]">
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-semibold flex items-center justify-center gap-1">
              {rating}
              <span className="text-yellow-400">
                <FaStar size={14} />
              </span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
          </div>
        )}
        
        {lastBooking && (
          <div className="text-center min-w-[100px]">
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-semibold">{formatDate(lastBooking)}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Last Booking</p>
          </div>
        )}
      </div>
      
      {/* Actions (Only if approved) */}
      {status === "approved" && (
        <div className="flex gap-3 justify-end">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEdit}
            className="p-2 text-blue-500 hover:text-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-full transition-colors duration-200"
          >
            <FaEdit size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
            disabled={isDeleting}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isDeleting 
                ? "text-gray-400 bg-gray-100 dark:bg-gray-700 dark:text-gray-500" 
                : "text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20"
            }`}
          >
            {isDeleting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <FaHourglassHalf size={18} />
              </motion.div>
            ) : (
              <FaTrash size={18} />
            )}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default ServiceCard;