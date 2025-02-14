// File: components/vendor/disputes/VendorDisputeCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

const VendorDisputeCard = ({ dispute, onViewDetails }) => {
  // Updated status configurations with consistent Tailwind classes
  const statusConfig = {
    pending: "bg-yellow-200 text-yellow",
    "in-progress": "bg-blue-200 text-blue-600",
    resolved: "bg-green bg-opacity-30 text-green",
    declined: "bg-red-200 text-red-600",
  };

  const statusColor = statusConfig[dispute.status.toLowerCase()] || "bg-gray-100 text-gray-700";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col transition-transform duration-300"
    >
      <div>
        <h3 className="text-xl font-bold dark:text-white">{dispute.subject}</h3>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Reference: {dispute.reference}</p>
        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Date: {dispute.date}</p>
        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">Client: {dispute.client}</p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className={`px-4 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
          {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
        </span>
        <button
          onClick={() => onViewDetails(dispute)}
          className="px-4 py-2 btn-blue hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default VendorDisputeCard;


