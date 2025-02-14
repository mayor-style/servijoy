// File: components/dispute/DisputeCard.jsx
import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
};

const DisputeCard = ({ dispute, onViewDetails }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-105">
    <div>
      <h3 className="text-xl md:text-2xl font-bold dark:text-white">{dispute.subject}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Reference: {dispute.reference}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Date: {dispute.date}</p>
    </div>
    <div className="mt-6 flex items-center justify-between">
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[dispute.status] || ''}`}>
        {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
      </span>
      <button
        onClick={() => onViewDetails(dispute)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
      >
        View Details
      </button>
    </div>
  </div>
);

export default DisputeCard;