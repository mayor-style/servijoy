import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const VendorFilters = ({ onFilterChange, onSortChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onFilterChange(query);
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);
    onSortChange(sortValue);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl transition-all duration-300 mb-6">
      {/* Search Input */}
      <div className="flex items-center w-full sm:w-2/3 md:w-1/2 mb-4 sm:mb-0">
        <FaSearch className="text-gray-500 dark:text-gray-300 mr-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search vendors..."
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Sort Dropdown */}
      <div className="w-full sm:w-auto">
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="w-full sm:w-auto p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="rating">Sort by Rating</option>
          <option value="price">Sort by Price</option>
          <option value="experience">Sort by Experience</option>
        </select>
      </div>
    </div>
  );
};

export default VendorFilters;
