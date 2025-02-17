import React, { useState } from "react";

const DisputesBulkActions = ({ selectedDisputes, onBulkAction }) => {
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("");
  const [error, setError] = useState("");

  const handleBulkAction = async (type) => {
    if (selectedDisputes.length === 0) {
      alert("No disputes selected");
      return;
    }
    setLoading(true);
    setAction(type);
    setError("");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onBulkAction(type, selectedDisputes);
      alert(`Successfully performed ${type} on disputes: ${selectedDisputes.join(", ")}`);
    } catch (err) {
      setError(`Failed to perform ${type}`);
    } finally {
      setLoading(false);
      setAction("");
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mt-4">
      <button
        className="btn btn-primary"
        onClick={() => handleBulkAction("Resolve")}
        disabled={loading}
      >
        {loading && action === "Resolve" ? "Resolving..." : "Resolve Disputes"}
      </button>
      <button
        className="btn btn-warning"
        onClick={() => handleBulkAction("Reject")}
        disabled={loading}
      >
        {loading && action === "Reject" ? "Rejecting..." : "Reject Disputes"}
      </button>
      <button
        className="btn btn-error"
        onClick={() => handleBulkAction("Delete")}
        disabled={loading}
      >
        {loading && action === "Delete" ? "Deleting..." : "Delete Disputes"}
      </button>
      {error && <div className="alert alert-error mt-2">{error}</div>}
    </div>
  );
};

export default DisputesBulkActions;
