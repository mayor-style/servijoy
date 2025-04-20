import React, { useState } from "react";
import { Loader2, CheckCircle, AlertTriangle, X } from "lucide-react";

const OrdersBulkActions = ({ selectedOrders, onActionComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [action, setAction] = useState("");

  const handleBulkAction = async (type) => {
    if (selectedOrders.length === 0) {
      setError("Please select at least one order to proceed");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setLoading(true);
    setAction(type);
    setError("");
    setSuccess("");

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onActionComplete(type, selectedOrders);
      setSuccess(`Successfully ${type.toLowerCase()}ed ${selectedOrders.length} order${selectedOrders.length > 1 ? 's' : ''}`);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(`Failed to ${type.toLowerCase()} orders. Please try again.`);
      setTimeout(() => setError(""), 4000);
    } finally {
      setLoading(false);
      setAction("");
    }
  };

  const actions = [
    {
      label: "Update Status",
      type: "Update Status",
      className: "bg-blue-600 hover:bg-blue-700 text-white",
      loadingText: "Updating...",
    },
    {
      label: "Cancel Orders",
      type: "Cancel",
      className: "bg-amber-500 hover:bg-amber-600 text-white",
      loadingText: "Canceling...",
    },
    {
      label: "Delete Orders",
      type: "Delete",
      className: "bg-red-600 hover:bg-red-700 text-white",
      loadingText: "Deleting...",
    },
  ];

  return (
    <div className="space-y-4 mt-4">
      <div className="flex flex-wrap items-center gap-3">
        {selectedOrders.length > 0 && (
          <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
            {selectedOrders.length} order{selectedOrders.length !== 1 && 's'} selected
          </span>
        )}
        
        {actions.map((actionItem) => (
          <button
            key={actionItem.type}
            className={`flex items-center justify-center px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            } ${actionItem.className}`}
            onClick={() => handleBulkAction(actionItem.type)}
            disabled={loading}
          >
            {loading && action === actionItem.type ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {actionItem.loadingText}
              </>
            ) : (
              actionItem.label
            )}
          </button>
        ))}
      </div>

      {/* Notifications */}
      {error && (
        <div className="flex items-center p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
          <span className="flex-grow">{error}</span>
          <button onClick={() => setError("")} className="text-red-400 hover:text-red-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-center p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          <span className="flex-grow">{success}</span>
          <button onClick={() => setSuccess("")} className="text-green-400 hover:text-green-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersBulkActions;