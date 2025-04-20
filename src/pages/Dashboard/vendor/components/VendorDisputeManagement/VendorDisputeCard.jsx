import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaEye, FaExclamationTriangle, FaHourglass, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const VendorDisputeCard = ({ dispute, onViewDetails }) => {
  // Status configurations
  const statusConfig = {
    pending: {
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      icon: <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-400 mr-2" />
    },
    evidence_submitted: {
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      icon: <FaHourglass className="text-blue-600 dark:text-blue-400 mr-2" />
    },
    resolved: {
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      icon: <FaCheckCircle className="text-green-600 dark:text-green-400 mr-2" />
    },
    rejected: {
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      icon: <FaTimesCircle className="text-red-600 dark:text-red-400 mr-2" />
    }
  };

  const statusColor = statusConfig[dispute.status.toLowerCase()]?.color || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  const StatusIcon = statusConfig[dispute.status.toLowerCase()]?.icon || null;

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      {/* Card Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${statusColor}`}>
            {StatusIcon}
            {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{dispute.reference}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">{dispute.subject}</h3>
      </div>
      
      {/* Card Body */}
      <div className="p-4">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <FaUser className="mr-2 text-gray-400 dark:text-gray-500" />
            <span className="font-medium">{dispute.client}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <FaCalendarAlt className="mr-2 text-gray-400 dark:text-gray-500" />
            <span>{dispute.date}</span>
          </div>
        </div>
        
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-2 h-10">
          {dispute.description}
        </p>
        
        {/* Message Counter */}
        {dispute.messages && dispute.messages.length > 0 && (
          <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <FaEye className="mr-1" />
              {dispute.messages.length} {dispute.messages.length === 1 ? 'message' : 'messages'}
            </span>
          </div>
        )}
      </div>
      
      {/* Card Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewDetails(dispute)}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <FaEye className="mr-2" />
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default VendorDisputeCard;