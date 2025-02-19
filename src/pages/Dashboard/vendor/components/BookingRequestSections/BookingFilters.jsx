import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";

const BookingFilters = ({ onFilterChange }) => {
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  });

  // Update filters whenever any filter state changes
  useEffect(() => {
    onFilterChange({ status, search, dateRange });
  }, [status, search, dateRange, onFilterChange]);

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl mb-8 transition-colors duration-300">
      <h2 className="text-xl sm:text-2xl font-bold font-header text-gray-800 dark:text-white mb-4">
        Filter Bookings
      </h2>
      <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-6">
        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-colors w-full md:w-auto"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* Date Range Filter */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <DatePicker
            selected={dateRange.start}
            onChange={(date) =>
              setDateRange((prev) => ({ ...prev, start: date }))
            }
            placeholderText="From"
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-colors w-full sm:w-auto"
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            selected={dateRange.end}
            onChange={(date) =>
              setDateRange((prev) => ({ ...prev, end: date }))
            }
            placeholderText="To"
            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-colors w-full sm:w-auto"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookings..."
            className="p-3 border rounded-lg w-full pl-12 bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <FaSearch className="absolute left-4 top-5 text-gray-500 dark:text-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;
