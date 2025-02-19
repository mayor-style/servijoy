import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFilter } from "react-icons/fa";

const FiltersSortingPanel = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    dateRange: { from: null, to: null },
    sortBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateFromChange = (date) => {
    setFilters((prev) => ({ ...prev, dateRange: { ...prev.dateRange, from: date } }));
  };

  const handleDateToChange = (date) => {
    setFilters((prev) => ({ ...prev, dateRange: { ...prev.dateRange, to: date } }));
  };

  const applyFilters = () => onFilterChange(filters);

  return (
    <div className="bg-soft-white dark:bg-gray-800 p-4 rounded-lg shadow-xl mt-4 flex flex-wrap gap-4 items-center transition">
      {/* Status Filter */}
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="select select-bordered w-48 dark:bg-gray-700 transition"
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
        className="select select-bordered w-48 dark:bg-gray-700 transition"
      >
        <option value="">All Categories</option>
        <option value="cleaning">Cleaning</option>
        <option value="plumbing">Plumbing</option>
        <option value="electrical">Electrical</option>
      </select>

      {/* Date Range Picker */}
      <div className="flex items-center gap-2">
        <DatePicker
          selected={filters.dateRange.from}
          onChange={handleDateFromChange}
          placeholderText="From"
          className="input input-bordered w-full dark:bg-gray-700 transition"
          dateFormat="yyyy-MM-dd"
        />
        <span className="text-gray-500 dark:text-gray-300">to</span>
        <DatePicker
          selected={filters.dateRange.to}
          onChange={handleDateToChange}
          placeholderText="To"
          className="input input-bordered w-full dark:bg-gray-700 transition"
          dateFormat="yyyy-MM-dd"
        />
      </div>

      {/* Sorting Options */}
      <select
        name="sortBy"
        value={filters.sortBy}
        onChange={handleChange}
        className="select select-bordered w-48 dark:bg-gray-700 transition"
      >
        <option value="">Sort By</option>
        <option value="date">Date Submitted</option>
        <option value="status">Status</option>
        <option value="serviceName">Service Name</option>
      </select>

      {/* Apply Button */}
      <button
        onClick={applyFilters}
        className="btn btn-primary flex items-center gap-2 transition"
      >
        <FaFilter /> Apply Filters
      </button>
    </div>
  );
};

export default FiltersSortingPanel;
