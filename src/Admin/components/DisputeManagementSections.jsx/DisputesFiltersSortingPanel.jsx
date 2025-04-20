import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown, Calendar, Search, Filter, SortAsc, X, Check } from "lucide-react";

const DisputesFiltersSortingPanel = ({ onFilterChange, onSortChange }) => {
  const [filters, setFilters] = useState({
    status: "",
    vendor: "",
    category: "",
    dateRange: { start: null, end: null },
  });
  const [sortOption, setSortOption] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const statusRef = useRef(null);
  const categoryRef = useRef(null);
  const sortRef = useRef(null);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (statusRef.current && !statusRef.current.contains(event.target)) {
        setIsStatusOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterChange = (name, value) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    onSortChange(value);
    setIsSortOpen(false);
  };

  const clearFilters = () => {
    const clearedFilters = {
      status: "",
      vendor: "",
      category: "",
      dateRange: { start: null, end: null },
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
    setSortOption("");
    onSortChange("");
  };

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "resolved", label: "Resolved" },
    { value: "rejected", label: "Rejected" },
  ];

  const categoryOptions = [
    { value: "payment", label: "Payment Issue" },
    { value: "service", label: "Service Issue" },
    { value: "communication", label: "Communication Issue" },
  ];

  const sortOptions = [
    { value: "date", label: "Dispute Date" },
    { value: "status", label: "Dispute Status" },
    { value: "vendor", label: "Vendor Name" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value && (typeof value === "string" ? value.trim() !== "" : (value.start || value.end))
  ).length;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header with expand/collapse functionality */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-medium text-gray-800 dark:text-white">Filters & Sorting</h3>
          {activeFiltersCount > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-600 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <X className="h-4 w-4" />
              Clear
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${
                isExpanded ? "transform rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Expandable content */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Status Dropdown */}
          <div className="relative" ref={statusRef}>
            <button
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className={`flex items-center justify-between w-full px-4 py-2.5 text-left text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border ${
                filters.status ? "border-indigo-500" : "border-gray-300 dark:border-gray-600"
              } rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all`}
            >
              <div className="flex items-center gap-2">
                {filters.status && (
                  <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(filters.status)}`}>
                    {statusOptions.find(option => option.value === filters.status)?.label || "Status"}
                  </span>
                )}
                {!filters.status && <span>Dispute Status</span>}
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                  isStatusOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>
            
            {isStatusOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                <ul className="py-1 max-h-60 overflow-auto">
                  <li 
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between"
                    onClick={() => handleFilterChange("status", "")}
                  >
                    <span className="text-gray-700 dark:text-gray-200">All Statuses</span>
                    {filters.status === "" && <Check className="h-4 w-4 text-indigo-600" />}
                  </li>
                  {statusOptions.map((option) => (
                    <li
                      key={option.value}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between"
                      onClick={() => {
                        handleFilterChange("status", option.value);
                        setIsStatusOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(option.value)}`}>
                          {option.label}
                        </span>
                      </div>
                      {filters.status === option.value && <Check className="h-4 w-4 text-indigo-600" />}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Vendor Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by vendor"
              className={`pl-10 pr-4 py-2.5 w-full bg-gray-50 dark:bg-gray-800 border ${
                filters.vendor ? "border-indigo-500" : "border-gray-300 dark:border-gray-600"
              } rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all`}
              value={filters.vendor}
              onChange={(e) => handleFilterChange("vendor", e.target.value)}
            />
            {filters.vendor && (
              <button
                onClick={() => handleFilterChange("vendor", "")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`flex items-center justify-between w-full px-4 py-2.5 text-left text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border ${
                filters.category ? "border-indigo-500" : "border-gray-300 dark:border-gray-600"
              } rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all`}
            >
              <span>{filters.category ? categoryOptions.find(option => option.value === filters.category)?.label : "Dispute Category"}</span>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                  isCategoryOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>
            
            {isCategoryOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                <ul className="py-1 max-h-60 overflow-auto">
                  <li 
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between"
                    onClick={() => handleFilterChange("category", "")}
                  >
                    <span className="text-gray-700 dark:text-gray-200">All Categories</span>
                    {filters.category === "" && <Check className="h-4 w-4 text-indigo-600" />}
                  </li>
                  {categoryOptions.map((option) => (
                    <li
                      key={option.value}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between"
                      onClick={() => {
                        handleFilterChange("category", option.value);
                        setIsCategoryOpen(false);
                      }}
                    >
                      <span className="text-gray-700 dark:text-gray-200">{option.label}</span>
                      {filters.category === option.value && <Check className="h-4 w-4 text-indigo-600" />}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Date Range Picker */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
                <DatePicker
                  selected={filters.dateRange.start}
                  onChange={(date) =>
                    handleFilterChange("dateRange", { ...filters.dateRange, start: date })
                  }
                  selectsStart
                  startDate={filters.dateRange.start}
                  endDate={filters.dateRange.end}
                  placeholderText="From date"
                  className={`pl-10 w-full py-2.5 bg-gray-50 dark:bg-gray-800 border ${
                    filters.dateRange.start ? "border-indigo-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all`}
                  dateFormat="yyyy-MM-dd"
                />
                {filters.dateRange.start && (
                  <button
                    onClick={() => handleFilterChange("dateRange", { ...filters.dateRange, start: null })}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
                <DatePicker
                  selected={filters.dateRange.end}
                  onChange={(date) =>
                    handleFilterChange("dateRange", { ...filters.dateRange, end: date })
                  }
                  selectsEnd
                  startDate={filters.dateRange.start}
                  endDate={filters.dateRange.end}
                  minDate={filters.dateRange.start}
                  placeholderText="To date"
                  className={`pl-10 w-full py-2.5 bg-gray-50 dark:bg-gray-800 border ${
                    filters.dateRange.end ? "border-indigo-500" : "border-gray-300 dark:border-gray-600"
                  } rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all`}
                  dateFormat="yyyy-MM-dd"
                />
                {filters.dateRange.end && (
                  <button
                    onClick={() => handleFilterChange("dateRange", { ...filters.dateRange, end: null })}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sort option */}
        <div className="px-4 pb-4">
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className={`flex items-center justify-between w-full md:w-64 px-4 py-2.5 text-left text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border ${
                sortOption ? "border-indigo-500" : "border-gray-300 dark:border-gray-600"
              } rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all`}
            >
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4 text-gray-500" />
                <span>{sortOption ? `Sort by: ${sortOptions.find(option => option.value === sortOption)?.label}` : "Sort By"}</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                  isSortOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>
            
            {isSortOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                <ul className="py-1">
                  <li 
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between"
                    onClick={() => handleSortChange("")}
                  >
                    <span className="text-gray-700 dark:text-gray-200">Default Sorting</span>
                    {sortOption === "" && <Check className="h-4 w-4 text-indigo-600" />}
                  </li>
                  {sortOptions.map((option) => (
                    <li
                      key={option.value}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between"
                      onClick={() => handleSortChange(option.value)}
                    >
                      <span className="text-gray-700 dark:text-gray-200">{option.label}</span>
                      {sortOption === option.value && <Check className="h-4 w-4 text-indigo-600" />}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Applied filters display (visible when collapsed) */}
      {!isExpanded && activeFiltersCount > 0 && (
        <div className="px-4 pb-4 pt-1 flex flex-wrap gap-2">
          {filters.status && (
            <div className={`px-3 py-1 text-sm rounded-full flex items-center gap-1 ${getStatusColor(filters.status)}`}>
              <span>{statusOptions.find(option => option.value === filters.status)?.label}</span>
              <button onClick={() => handleFilterChange("status", "")}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.vendor && (
            <div className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 flex items-center gap-1">
              <span>Vendor: {filters.vendor}</span>
              <button onClick={() => handleFilterChange("vendor", "")}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.category && (
            <div className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 flex items-center gap-1">
              <span>{categoryOptions.find(option => option.value === filters.category)?.label}</span>
              <button onClick={() => handleFilterChange("category", "")}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {(filters.dateRange.start || filters.dateRange.end) && (
            <div className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 flex items-center gap-1">
              <span>
                {filters.dateRange.start ? filters.dateRange.start.toLocaleDateString() : "Any"} - 
                {filters.dateRange.end ? filters.dateRange.end.toLocaleDateString() : "Any"}
              </span>
              <button onClick={() => handleFilterChange("dateRange", { start: null, end: null })}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {sortOption && (
            <div className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 flex items-center gap-1">
              <SortAsc className="h-3 w-3" />
              <span>Sort: {sortOptions.find(option => option.value === sortOption)?.label}</span>
              <button onClick={() => handleSortChange("")}>
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DisputesFiltersSortingPanel;