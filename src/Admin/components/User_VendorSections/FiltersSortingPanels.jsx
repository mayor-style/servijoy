import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFilter } from "react-icons/fa";

const FiltersSortingPanel = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    sortBy: "",
    dateRange: { from: null, to: null },
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

  const applyFilters = () => {
    console.log("Applied Filters:", filters);
    // You can pass filters to a parent callback or trigger a data fetch
  };

  return (
    <div className="mb-6">
      {/* Toggle Button for Small Screens */}
      <button
        className="md:hidden mb-4 btn-blue flex items-center gap-2 transition"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FaFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
      </button>
      {/* Filter Panel */}
      <div
        className={`bg-soft-white dark:bg-gray-800 p-6 rounded-lg shadow-xl transition-all ${
          showFilters ? "block" : "hidden"
        } md:block`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 dark:text-white mb-2">Role</label>
            <select
              name="role"
              value={filters.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white transition"
            >
              <option value="">User</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white mb-2">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white transition"
            >
              <option value="">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white mb-2">Sort By</label>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white transition"
            >
              <option value="">Name</option>
              <option value="email">Email</option>
              <option value="registrationDate">Registration Date</option>
              <option value="lastLogin">Last Login</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white mb-2">Date Range</label>
            <div className="flex items-center gap-2">
              <DatePicker
                selected={filters.dateRange.from}
                onChange={handleDateFromChange}
                placeholderText="From"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white transition"
                dateFormat="yyyy-MM-dd"
              />
              <span className="text-gray-500 dark:text-gray-300">to</span>
              <DatePicker
                selected={filters.dateRange.to}
                onChange={handleDateToChange}
                placeholderText="To"
                className="input input-bordered w-full dark:bg-gray-700 dark:text-white transition"
                dateFormat="yyyy-MM-dd"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={applyFilters}
            className="btn btn-primary flex items-center gap-2 transition"
          >
            <FaFilter /> Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersSortingPanel;
