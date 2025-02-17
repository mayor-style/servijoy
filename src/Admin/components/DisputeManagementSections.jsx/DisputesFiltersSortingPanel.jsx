import React, { useState } from "react";

const DisputesFiltersSortingPanel = ({ onFilterChange, onSortChange }) => {
  const [filters, setFilters] = useState({
    status: "",
    vendor: "",
    category: "",
    dateRange: { start: "", end: "" },
  });

  const [sortOption, setSortOption] = useState("");

  const handleFilterChange = (name, value) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    onSortChange(value);
  };

  return (
    <div className="p-4 bg-base-200 dark:bg-gray-800 rounded-xl mb-4 transition">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="select select-bordered w-full"
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value="">Dispute Status</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>

        <input
          type="text"
          placeholder="Vendor Name"
          className="input input-bordered w-full"
          value={filters.vendor}
          onChange={(e) => handleFilterChange("vendor", e.target.value)}
        />

        <select
          className="select select-bordered w-full"
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        >
          <option value="">Dispute Category</option>
          <option value="payment">Payment Issue</option>
          <option value="service">Service Issue</option>
          <option value="communication">Communication Issue</option>
        </select>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Date Range</label>
          <div className="flex gap-2">
            <input
              type="date"
              className="input input-bordered w-full"
              value={filters.dateRange.start}
              onChange={(e) => handleFilterChange("dateRange", { ...filters.dateRange, start: e.target.value })}
            />
            <input
              type="date"
              className="input input-bordered w-full"
              value={filters.dateRange.end}
              onChange={(e) => handleFilterChange("dateRange", { ...filters.dateRange, end: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <select
          className="select select-bordered w-full"
          value={sortOption}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="date">Dispute Date</option>
          <option value="status">Dispute Status</option>
          <option value="vendor">Vendor Name</option>
        </select>
      </div>
    </div>
  );
};

export default DisputesFiltersSortingPanel;
