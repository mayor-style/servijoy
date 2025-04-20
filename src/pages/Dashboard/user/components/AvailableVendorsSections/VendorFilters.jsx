import React, { useState } from "react";
import { Search } from "lucide-react";

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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700 mb-1">
          Sort by
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={handleSortChange}
          className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="rating">Rating (Highest First)</option>
          <option value="price">Price (Lowest First)</option>
          <option value="experience">Experience (Most First)</option>
        </select>
      </div>
    </div>
  );
};

export default VendorFilters;