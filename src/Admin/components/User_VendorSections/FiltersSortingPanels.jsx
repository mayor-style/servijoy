import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaFilter, FaSearch, FaCalendarAlt, FaTimes, FaChevronDown, FaSave, FaUndo } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useDebounce } from "use-debounce";

// Custom hook for saving filter presets
const useFilterPresets = (initialPresets = []) => {
  const [presets, setPresets] = useState(() => {
    const savedPresets = localStorage.getItem("filter-presets");
    return savedPresets ? JSON.parse(savedPresets) : initialPresets;
  });

  useEffect(() => {
    localStorage.setItem("filter-presets", JSON.stringify(presets));
  }, [presets]);

  const addPreset = (name, filterValues) => {
    setPresets([...presets, { id: Date.now(), name, filters: filterValues }]);
  };

  const removePreset = (id) => {
    setPresets(presets.filter(preset => preset.id !== id));
  };

  return { presets, addPreset, removePreset };
};

const FiltersSortingPanel = ({ onFiltersChange, initialFilters = {}, className = "" }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [presetName, setPresetName] = useState("");
  const filterPanelRef = useRef(null);
  
  // Default filter values
  const defaultFilters = {
    role: "",
    status: "",
    sortBy: "",
    sortDirection: "asc",
    dateRange: { from: null, to: null },
    searchTerm: "",
    ...initialFilters
  };
  
  const [filters, setFilters] = useState(defaultFilters);
  const { presets, addPreset, removePreset } = useFilterPresets();
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Count active filters for the badge
  useEffect(() => {
    let count = 0;
    if (filters.role) count++;
    if (filters.status) count++;
    if (filters.sortBy) count++;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    if (debouncedSearchTerm) count++;
    setActiveFiltersCount(count);
  }, [filters, debouncedSearchTerm]);

  // Apply debounced search term to filters
  useEffect(() => {
    setFilters(prev => ({ ...prev, searchTerm: debouncedSearchTerm }));
  }, [debouncedSearchTerm]);

  // Notify parent component of filter changes
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  // Close filter panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterPanelRef.current && !filterPanelRef.current.contains(event.target) && showFilters) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDateFromChange = (date) => {
    setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, from: date } }));
  };

  const handleDateToChange = (date) => {
    setFilters(prev => ({ ...prev, dateRange: { ...prev.dateRange, to: date } }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setSearchTerm("");
  };

  const applyFilters = () => {
    console.log("Applied Filters:", filters);
    // On mobile, close the filter panel after applying
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };

  const savePreset = () => {
    if (presetName.trim()) {
      addPreset(presetName, filters);
      setPresetName("");
      setShowPresetModal(false);
    }
  };

  const loadPreset = (preset) => {
    setFilters(preset.filters);
    if (preset.filters.searchTerm) {
      setSearchTerm(preset.filters.searchTerm);
    }
  };

  const toggleSortDirection = () => {
    setFilters(prev => ({
      ...prev,
      sortDirection: prev.sortDirection === "asc" ? "desc" : "asc"
    }));
  };

  return (
    <div className={`relative ${className}`} ref={filterPanelRef}>
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Filter Toggle Button */}
        <button
          className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-md relative"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter />
          <span className="hidden sm:inline">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel with Animation */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-xl border dark:border-gray-700 absolute z-10 w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">Filter Options</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Role Filter */}
              <div className="space-y-2">
                <label className="block text-gray-700 dark:text-white text-sm font-medium">
                  User Role
                </label>
                <div className="relative">
                  <select
                    name="role"
                    value={filters.role}
                    onChange={handleChange}
                    className="w-full p-2 pl-3 pr-10 border rounded-lg appearance-none dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">All Roles</option>
                    <option value="user">User</option>
                    <option value="vendor">Vendor</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaChevronDown className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <label className="block text-gray-700 dark:text-white text-sm font-medium">
                  Account Status
                </label>
                <div className="relative">
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    className="w-full p-2 pl-3 pr-10 border rounded-lg appearance-none dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending Verification</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaChevronDown className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Sort Options */}
              <div className="space-y-2">
                <label className="block text-gray-700 dark:text-white text-sm font-medium">
                  Sort By
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <select
                      name="sortBy"
                      value={filters.sortBy}
                      onChange={handleChange}
                      className="w-full p-2 pl-3 pr-10 border rounded-lg appearance-none dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="">Default</option>
                      <option value="name">Name</option>
                      <option value="email">Email</option>
                      <option value="registrationDate">Registration Date</option>
                      <option value="lastLogin">Last Login</option>
                      <option value="activity">Activity Level</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaChevronDown className="text-gray-400" />
                    </div>
                  </div>
                  {filters.sortBy && (
                    <button
                      onClick={toggleSortDirection}
                      className="p-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                      title={filters.sortDirection === "asc" ? "Ascending" : "Descending"}
                    >
                      {filters.sortDirection === "asc" ? "↑" : "↓"}
                    </button>
                  )}
                </div>
              </div>

              {/* Date Range Picker */}
              <div className="space-y-2">
                <label className="block text-gray-700 dark:text-white text-sm font-medium">
                  Date Range
                </label>
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <DatePicker
                      selected={filters.dateRange.from}
                      onChange={handleDateFromChange}
                      placeholderText="From"
                      className="pl-10 w-full p-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                      dateFormat="yyyy-MM-dd"
                      maxDate={filters.dateRange.to || new Date()}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <DatePicker
                      selected={filters.dateRange.to}
                      onChange={handleDateToChange}
                      placeholderText="To"
                      className="pl-10 w-full p-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                      dateFormat="yyyy-MM-dd"
                      minDate={filters.dateRange.from}
                      maxDate={new Date()}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Filters (can be expanded) */}
            <details className="mt-4">
              <summary className="cursor-pointer text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition">
                Advanced Filters
              </summary>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                {/* Additional filters can be added here */}
                <div className="space-y-2">
                  <label className="block text-gray-700 dark:text-white text-sm font-medium">
                    Activity Level
                  </label>
                  <div className="relative">
                    <select
                      name="activityLevel"
                      value={filters.activityLevel || ""}
                      onChange={handleChange}
                      className="w-full p-2 pl-3 pr-10 border rounded-lg appearance-none dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="">Any Activity</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaChevronDown className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 dark:text-white text-sm font-medium">
                    Region
                  </label>
                  <div className="relative">
                    <select
                      name="region"
                      value={filters.region || ""}
                      onChange={handleChange}
                      className="w-full p-2 pl-3 pr-10 border rounded-lg appearance-none dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="">All Regions</option>
                      <option value="northAmerica">North America</option>
                      <option value="europe">Europe</option>
                      <option value="asia">Asia</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaChevronDown className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-700 dark:text-white text-sm font-medium">
                    Account Type
                  </label>
                  <div className="relative">
                    <select
                      name="accountType"
                      value={filters.accountType || ""}
                      onChange={handleChange}
                      className="w-full p-2 pl-3 pr-10 border rounded-lg appearance-none dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="">All Types</option>
                      <option value="free">Free</option>
                      <option value="premium">Premium</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaChevronDown className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </details>

            {/* Filter Presets */}
            {presets.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Saved Presets</h4>
                <div className="flex flex-wrap gap-2">
                  {presets.map(preset => (
                    <div 
                      key={preset.id}
                      className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      <button
                        onClick={() => loadPreset(preset)}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {preset.name}
                      </button>
                      <button
                        onClick={() => removePreset(preset.id)}
                        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        title="Remove preset"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={applyFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-sm"
                >
                  <FaFilter /> Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-sm"
                >
                  <FaUndo /> Reset
                </button>
              </div>
              <button
                onClick={() => setShowPresetModal(true)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
              >
                <FaSave size={14} /> Save as preset
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Preset Modal */}
      {showPresetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Save Filter Preset</h3>
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Preset name"
              className="w-full p-2 border rounded-lg mb-4 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPresetModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={savePreset}
                disabled={!presetName.trim()}
                className={`px-4 py-2 rounded-lg text-white ${
                  presetName.trim() 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "bg-blue-400 cursor-not-allowed"
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {filters.role && (
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <span>Role: {filters.role}</span>
              <button
                onClick={() => setFilters(prev => ({ ...prev, role: "" }))}
                className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
              >
                <FaTimes size={12} />
              </button>
            </div>
          )}
          {filters.status && (
            <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <span>Status: {filters.status}</span>
              <button
                onClick={() => setFilters(prev => ({ ...prev, status: "" }))}
                className="text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100"
              >
                <FaTimes size={12} />
              </button>
            </div>
          )}
          {filters.sortBy && (
            <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <span>Sort: {filters.sortBy} ({filters.sortDirection === "asc" ? "↑" : "↓"})</span>
              <button
                onClick={() => setFilters(prev => ({ ...prev, sortBy: "" }))}
                className="text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100"
              >
                <FaTimes size={12} />
              </button>
            </div>
          )}
          {(filters.dateRange.from || filters.dateRange.to) && (
            <div className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <span>
                Date: {filters.dateRange.from ? filters.dateRange.from.toLocaleDateString() : "Any"} - 
                {filters.dateRange.to ? filters.dateRange.to.toLocaleDateString() : "Any"}
              </span>
              <button
                onClick={() => setFilters(prev => ({ ...prev, dateRange: { from: null, to: null } }))}
                className="text-amber-600 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-100"
              >
                <FaTimes size={12} />
              </button>
            </div>
          )}
          {filters.searchTerm && (
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <span>Search: {filters.searchTerm}</span>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilters(prev => ({ ...prev, searchTerm: "" }));
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                <FaTimes size={12} />
              </button>
            </div>
          )}
          <button
            onClick={clearFilters}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 px-3 py-1 text-sm underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default FiltersSortingPanel;