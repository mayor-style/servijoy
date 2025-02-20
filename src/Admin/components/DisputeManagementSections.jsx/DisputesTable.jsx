import React, { useState, useEffect } from "react";

const getStatusBadgeClass = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "badge-warning";
    case "resolved":
      return "badge-success";
    case "rejected":
      return "badge-error";
    default:
      return "badge-info";
  }
};

const DisputesTable = ({ filters, selectedDisputes, setSelectedDisputes, onOpenModal }) => {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Simulate fetching dispute data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = Array.from({ length: 15 }, (_, i) => ({
        id: `DSP-${1000 + i}`,
        vendor: i % 2 === 0 ? "Vendor Alpha" : "Vendor Beta",
        subject: `Issue with order ${1000 + i}`,
        date: `2025-03-${10 + i}`,
        status: i % 3 === 0 ? "Pending" : i % 3 === 1 ? "Resolved" : "Rejected",
        description: `Detailed description for dispute ${1000 + i}.`,
      }));
      setDisputes(mockData);
      setLoading(false);
    }, 1500);
  }, []);

  // Apply filters (simple filtering for vendor and status)
  const filteredDisputes = disputes.filter((dispute) => {
    let valid = true;
    if (filters.vendor && filters.vendor.trim() !== "") {
      valid = valid && dispute.vendor.toLowerCase().includes(filters.vendor.toLowerCase());
    }
    if (filters.status && filters.status.trim() !== "") {
      valid = valid && dispute.status.toLowerCase() === filters.status.toLowerCase();
    }
    return valid;
  });

  const toggleSelect = (id) => {
    setSelectedDisputes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <span className="loading loading-spinner"></span>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="overflow-x-auto p-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
      <table className="table w-full min-w-[800px]">
        <thead className="bg-light-gray dark:bg-gray-700 text-left text-gray-800 dark:text-gray-200">
          <tr>
            <th className="p-3">
              <input
                type="checkbox"
                className="checkbox border dark:border-gray-400"
                onChange={(e) => {
                  if (e.target.checked) {
                    const currentIds = filteredDisputes.map((d) => d.id);
                    setSelectedDisputes(currentIds);
                  } else {
                    setSelectedDisputes([]);
                  }
                }}
                checked={
                  filteredDisputes.length > 0 &&
                  filteredDisputes.every((d) => selectedDisputes.includes(d.id))
                }
              />
            </th>
            <th className="p-3">Dispute ID</th>
            <th className="p-3">Vendor</th>
            <th className="p-3">Subject</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 dark:text-gray-300">
          {filteredDisputes.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center text-gray-600 dark:text-gray-300">
                No disputes found.
              </td>
            </tr>
          ) : (
            filteredDisputes.map((dispute) => (
              <tr key={dispute.id} className="border-b dark:border-gray-700">
                <td className="p-3">
                  <input
                    type="checkbox"
                    className="checkbox border dark:border-gray-700 "
                    checked={selectedDisputes.includes(dispute.id)}
                    onChange={() => toggleSelect(dispute.id)}
                  />
                </td>
                <td className="p-3">{dispute.id}</td>
                <td className="p-3">{dispute.vendor}</td>
                <td className="p-3">{dispute.subject}</td>
                <td className="p-3">{dispute.date}</td>
                <td className="p-3">
                  <span className={`badge ${getStatusBadgeClass(dispute.status)}`}>
                    {dispute.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button className="btn btn-sm btn-info transition" onClick={() => onOpenModal("details", dispute)}>
                    View
                  </button>
                  <button className="btn btn-sm btn-warning transition" onClick={() => onOpenModal("edit", dispute)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-error transition" onClick={() => onOpenModal("delete", dispute)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisputesTable;
