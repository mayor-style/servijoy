import React, { useState } from "react";
import { FaFilter, FaSort } from "react-icons/fa";

const FiltersSortingPanel = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    dateRange: { from: "", to: "" },
    sortBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      dateRange: { ...prev.dateRange, [name]: value },
    }));
  };

  const applyFilters = () => onFilterChange(filters);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-4 flex flex-wrap gap-4 items-center">
      {/* Status Filter */}
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="select select-bordered w-48 dark:bg-gray-700"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="declined">Declined</option>
      </select>

      {/* Category Filter */}
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="select select-bordered w-48 dark:bg-gray-700"
      >
        <option value="">All Categories</option>
        <option value="cleaning">Cleaning</option>
        <option value="plumbing">Plumbing</option>
        <option value="electrical">Electrical</option>
      </select>

      {/* Date Range Picker */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          name="from"
          value={filters.dateRange.from}
          onChange={handleDateChange}
          className="input input-bordered dark:bg-gray-700"
        />
        <span className="text-gray-500 dark:text-gray-300">to</span>
        <input
          type="date"
          name="to"
          value={filters.dateRange.to}
          onChange={handleDateChange}
          className="input input-bordered dark:bg-gray-700"
        />
      </div>

      {/* Sorting Options */}
      <select
        name="sortBy"
        value={filters.sortBy}
        onChange={handleChange}
        className="select select-bordered w-48 dark:bg-gray-700"
      >
        <option value="">Sort By</option>
        <option value="date">Date Submitted</option>
        <option value="status">Status</option>
        <option value="serviceName">Service Name</option>
      </select>

      {/* Apply button */}
      <button
        onClick={applyFilters}
        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
      >
        <FaFilter /> Apply Filters
      </button>
    </div>
  );
};

export default FiltersSortingPanel;
