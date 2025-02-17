import React, { useState } from "react";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";

const BulkActionsPanel = ({ selectedRequests, onBulkAction }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBulkAction = async (action) => {
    setIsProcessing(true);
    try {
      await onBulkAction(action, selectedRequests);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-soft-white dark:bg-gray-800 p-4 rounded-lg shadow-xl flex flex-wrap gap-4 items-center justify-between mt-4 transition">
      <span className="text-sm text-gray-600 dark:text-gray-300">
        {selectedRequests.length} requests selected
      </span>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleBulkAction("approve")}
          className="btn-green flex items-center gap-2 px-4 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isProcessing || selectedRequests.length === 0}
        >
          <FaCheck /> Approve
        </button>
        <button
          onClick={() => handleBulkAction("decline")}
          className="btn-warning flex items-center gap-2 px-4 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isProcessing || selectedRequests.length === 0}
        >
          <FaTimes /> Decline
        </button>
        <button
          onClick={() => handleBulkAction("delete")}
          className="btn-error flex items-center gap-2 px-4 py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isProcessing || selectedRequests.length === 0}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default BulkActionsPanel;
