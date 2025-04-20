import React, { useState } from "react";
import { AlertCircle, Check, X, Trash, Loader2 } from "lucide-react";

const DisputesBulkActions = ({ selectedDisputes, onBulkAction }) => {
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("");
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleBulkAction = async (type) => {
    // Clear previous feedback
    setFeedback({ type: "", message: "" });
    
    // Validate selection
    if (selectedDisputes.length === 0) {
      setFeedback({
        type: "error",
        message: "Please select at least one dispute to proceed"
      });
      return;
    }
    
    // Set loading state
    setLoading(true);
    setAction(type);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onBulkAction(type, selectedDisputes);
      
      // Success feedback
      setFeedback({
        type: "success",
        message: `Successfully ${type.toLowerCase()}d ${selectedDisputes.length} dispute${selectedDisputes.length > 1 ? 's' : ''}`
      });
    } catch (err) {
      // Error feedback
      setFeedback({
        type: "error",
        message: `Failed to ${type.toLowerCase()} the selected disputes. Please try again.`
      });
    } finally {
      setLoading(false);
      setAction("");
    }
  };

  // Button configurations for consistent styling and behavior
  const actionButtons = [
    {
      type: "Resolve",
      icon: <Check size={16} />,
      colorClass: "bg-green-600 hover:bg-green-700 text-white",
      loadingText: "Resolving..."
    },
    {
      type: "Reject",
      icon: <X size={16} />,
      colorClass: "bg-amber-500 hover:bg-amber-600 text-white",
      loadingText: "Rejecting..."
    },
    {
      type: "Delete",
      icon: <Trash size={16} />,
      colorClass: "bg-red-600 hover:bg-red-700 text-white",
      loadingText: "Deleting..."
    }
  ];

  return (
    <div className="space-y-4 mt-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {actionButtons.map((button) => (
          <button
            key={button.type}
            onClick={() => handleBulkAction(button.type)}
            disabled={loading}
            className={`flex items-center justify-center px-4 py-2 rounded-md font-medium transition-all ${
              button.colorClass
            } ${
              loading ? "opacity-70 cursor-not-allowed" : "shadow hover:shadow-md"
            }`}
            aria-label={`${button.type} selected disputes`}
          >
            {loading && action === button.type ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                <span>{button.loadingText}</span>
              </>
            ) : (
              <>
                <span className="mr-2">{button.icon}</span>
                <span>{button.type} Disputes</span>
              </>
            )}
          </button>
        ))}
      </div>

      {/* Selected disputes count badge */}
      <div className="flex items-center">
        <span className="text-sm text-gray-600">
          {selectedDisputes.length} dispute{selectedDisputes.length !== 1 ? 's' : ''} selected
        </span>
      </div>

      {/* Feedback alert */}
      {feedback.message && (
        <div
          role="alert"
          className={`flex items-center p-3 rounded-md ${
            feedback.type === "error" 
              ? "bg-red-50 text-red-800 border border-red-200" 
              : "bg-green-50 text-green-800 border border-green-200"
          }`}
        >
          {feedback.type === "error" ? (
            <AlertCircle size={16} className="mr-2 text-red-600" />
          ) : (
            <Check size={16} className="mr-2 text-green-600" />
          )}
          {feedback.message}
        </div>
      )}
    </div>
  );
};

export default DisputesBulkActions;