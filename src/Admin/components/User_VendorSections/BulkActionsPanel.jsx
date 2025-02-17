import React, { useState } from "react";
import { FaCheck, FaBan, FaTrash, FaUserSlash } from "react-icons/fa";

const BulkActionsPanel = ({ selectedItems, onBulkAction }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async (action) => {
    setIsProcessing(true);
    try {
      await onBulkAction(action, selectedItems);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-soft-white dark:bg-gray-800 p-4 rounded-lg shadow-xl flex flex-wrap gap-4 items-center justify-between mt-4 transition">
      <span className="text-sm text-gray-600 dark:text-gray-300">
        {selectedItems.length} items selected
      </span>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleAction("activate")}
          className="btn-green flex items-center gap-2 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          disabled={isProcessing || selectedItems.length === 0}
        >
          <FaCheck /> Activate
        </button>
        <button
          onClick={() => handleAction("deactivate")}
          className="btn-blue flex items-center gap-2 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          disabled={isProcessing || selectedItems.length === 0}
        >
          <FaBan /> Deactivate
        </button>
        <button
          onClick={() => handleAction("suspend")}
          className="bg-warning hover:bg-warning-dark text-white rounded-lg px-4 py-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          disabled={isProcessing || selectedItems.length === 0}
        >
          <FaUserSlash /> Suspend
        </button>
        <button
          onClick={() => handleAction("delete")}
          className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          disabled={isProcessing || selectedItems.length === 0}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default BulkActionsPanel;
