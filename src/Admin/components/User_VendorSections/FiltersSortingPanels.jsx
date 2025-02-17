import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const FiltersSortingPanel = () => {
  const [showFilters, setShowFilters] = useState(false);

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
            <select className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white transition">
              <option>User</option>
              <option>Vendor</option>
              <option>Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white mb-2">Status</label>
            <select className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white transition">
              <option>Active</option>
              <option>Inactive</option>
              <option>Suspended</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white mb-2">Sort By</label>
            <select className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white transition">
              <option>Name</option>
              <option>Email</option>
              <option>Registration Date</option>
              <option>Last Login</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-white mb-2">Date Range</label>
            <input type="date" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white transition" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSortingPanel;
