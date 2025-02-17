import React, { useState } from 'react';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

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
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-wrap gap-4 items-center justify-between mt-4">
      <span className="text-sm text-gray-600 dark:text-gray-300">
        {selectedRequests.length} requests selected
      </span>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleBulkAction('approve')}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          disabled={isProcessing || selectedRequests.length === 0}
        >
          <FaCheck /> Approve
        </button>
        <button
          onClick={() => handleBulkAction('decline')}
          className="bg-yellow-600 hover:bg-yellow-700 text-white flex items-center gap-2"
          disabled={isProcessing || selectedRequests.length === 0}
        >
          <FaTimes /> Decline
        </button>
        <button
          onClick={() => handleBulkAction('delete')}
          className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          disabled={isProcessing || selectedRequests.length === 0}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default BulkActionsPanel;
