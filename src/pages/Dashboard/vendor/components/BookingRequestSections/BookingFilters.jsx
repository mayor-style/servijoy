import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
  FaSearch, 
  FaChevronDown, 
  FaChevronUp, 
  FaCalendarAlt, 
  FaTimes, 
  FaFilter 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
// Import our custom components instead of the imported ones
import { Tooltip } from "../../../../../../@/components/ui/tooltip";
import { Badge } from "../../../../../../@/components/ui/badge";

// The rest of your component remains the same
// ...

// Enhanced CSS for date picker with more professional styling
const datePickerStyles = `
  .react-datepicker {
    font-family: 'Inter', sans-serif;
    border-radius: 0.75rem;
    border: none;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .react-datepicker__header {
    background-color: #4C1D95; /* Deep purple header */
    color: white;
    border-bottom: none;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
  }
  .react-datepicker__current-month {
    font-weight: 600;
    color: white;
    margin-bottom: 0.5rem;
  }
  .react-datepicker__day-name {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
    margin: 0.4rem;
  }
  .react-datepicker__day {
    margin: 0.4rem;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
  }
  .dark .react-datepicker {
    background-color: #1F2937;
    border: 1px solid #374151;
  }
  .dark .react-datepicker__header {
    background-color: #5B21B6;
    border-bottom: 1px solid #374151;
  }
  .dark .react-datepicker__current-month,
  .dark .react-datepicker__day-name {
    color: #F3F4F6;
  }
  .dark .react-datepicker__day {
    color: #D1D5DB;
  }
  .react-datepicker__day:hover {
    background-color: #EDE9FE;
    color: #4C1D95;
  }
  .dark .react-datepicker__day:hover {
    background-color: #4B5563;
    color: #F3F4F6;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: #7C3AED;
    color: white;
    font-weight: 600;
  }
  .dark .react-datepicker__day--selected,
  .dark .react-datepicker__day--keyboard-selected {
    background-color: #6D28D9;
  }
  .react-datepicker__day--in-range {
    background-color: #EDE9FE;
    color: #4C1D95;
  }
  .dark .react-datepicker__day--in-range {
    background-color: #374151;
    color: #F3F4F6;
  }
  .react-datepicker__day--in-selecting-range {
    background-color: #DDD6FE;
  }
  .dark .react-datepicker__day--in-selecting-range {
    background-color: #4B5563;
  }
  .react-datepicker__day--outside-month {
    color: #9CA3AF;
  }
  .dark .react-datepicker__day--outside-month {
    color: #6B7280;
  }
  .react-datepicker__triangle {
    display: none;
  }
`;

const BookingFilters = ({ onFilterChange, initialFilters = {} }) => {
  const [status, setStatus] = useState(initialFilters.status || "all");
  const [search, setSearch] = useState(initialFilters.search || "");
  const [dateRange, setDateRange] = useState({
    start: initialFilters.dateRange?.start || null,
    end: initialFilters.dateRange?.end || null,
  });
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const searchInputRef = useRef(null);
  
  // Track active filters
  useEffect(() => {
    let count = 0;
    if (status !== "all") count++;
    if (search.trim() !== "") count++;
    if (dateRange.start || dateRange.end) count++;
    setActiveFiltersCount(count);
  }, [status, search, dateRange]);

  // Update parent component when filters change
  useEffect(() => {
    onFilterChange({ status, search, dateRange });
  }, [status, search, dateRange, onFilterChange]);

  // Clear all filters
  const handleClearFilters = () => {
    setStatus("all");
    setSearch("");
    setDateRange({ start: null, end: null });
  };

  // Focus search input with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="p-5 sm:p-6 bg-white dark:bg-gray-900 border dark:border-gray-800 shadow-xl rounded-2xl mb-8 transition-all duration-300 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-90">
      <style>{datePickerStyles}</style>
      
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg shadow-md">
            <FaFilter className="text-white text-lg" />
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
            Filter Bookings
            {activeFiltersCount > 0 && (
              <Badge className="ml-2 bg-purple-600 text-white text-xs py-1">
                {activeFiltersCount} active
              </Badge>
            )}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <Tooltip content="Clear all filters">
              <button
                onClick={handleClearFilters}
                className="btn btn-sm btn-ghost text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                aria-label="Clear all filters"
              >
                <FaTimes />
                <span className="hidden sm:inline ml-1">Clear</span>
              </button>
            </Tooltip>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn btn-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border-none shadow-sm flex items-center gap-1 transition-all duration-200"
            aria-label={isExpanded ? "Hide filters" : "Show filters"}
          >
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            <span className="hidden sm:inline">
              {isExpanded ? "Hide" : "Show"}
            </span>
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, scale: 0.98 }}
            animate={{ height: "auto", opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Status Filter */}
              <div className="w-full">
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                  Booking Status
                </label>
                <div className="relative">
                  <select
                    id="status-filter"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="select select-bordered w-full pl-4 pr-10 py-2.5 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-600 dark:focus:border-purple-600 shadow-sm transition-all duration-200"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Date Range Filter */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                  Date Range
                </label>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative w-full">
                    <DatePicker
                      id="date-from"
                      selected={dateRange.start}
                      onChange={(date) => setDateRange((prev) => ({ ...prev, start: date }))}
                      selectsStart
                      startDate={dateRange.start}
                      endDate={dateRange.end}
                      placeholderText="Start date"
                      className="input input-bordered w-full pl-10 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-600 dark:focus:border-purple-600 shadow-sm transition-all duration-200"
                      dateFormat="MMM d, yyyy"
                      popperClassName="dark:text-white"
                      popperPlacement="bottom-start"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaCalendarAlt className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    {dateRange.start && (
                      <button
                        onClick={() => setDateRange((prev) => ({ ...prev, start: null }))}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        aria-label="Clear start date"
                      >
                        <FaTimes className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  
                  <span className="text-gray-500 dark:text-gray-400">to</span>
                  
                  <div className="relative w-full">
                    <DatePicker
                      id="date-to"
                      selected={dateRange.end}
                      onChange={(date) => setDateRange((prev) => ({ ...prev, end: date }))}
                      selectsEnd
                      startDate={dateRange.start}
                      endDate={dateRange.end}
                      minDate={dateRange.start}
                      placeholderText="End date"
                      className="input input-bordered w-full pl-10 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-600 dark:focus:border-purple-600 shadow-sm transition-all duration-200"
                      dateFormat="MMM d, yyyy"
                      popperClassName="dark:text-white"
                      popperPlacement="bottom-end"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaCalendarAlt className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    {dateRange.end && (
                      <button
                        onClick={() => setDateRange((prev) => ({ ...prev, end: null }))}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        aria-label="Clear end date"
                      >
                        <FaTimes className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Search Filter */}
              <div className="w-full">
                <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                  Search Bookings
                </label>
                <div className="relative">
                  <input
                    id="search-input"
                    ref={searchInputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, ID, or location..."
                    className="input input-bordered w-full pl-10 pr-10 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-600 dark:focus:border-purple-600 shadow-sm transition-all duration-200"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaSearch className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      aria-label="Clear search"
                    >
                      <FaTimes className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 ml-1">
                  Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 font-sans">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 font-sans">K</kbd> to focus
                </div>
              </div>
            </div>
            
            {/* Active Filters Summary */}
            <AnimatePresence>
              {activeFiltersCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800"
                >
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Active filters:
                    </span>
                    
                    {status !== "all" && (
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 flex items-center gap-1.5 py-1 pl-2 pr-1.5">
                        Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                        <button
                          onClick={() => setStatus("all")}
                          className="ml-1 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                          aria-label="Clear status filter"
                        >
                          <FaTimes className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    
                    {dateRange.start && (
                      <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 flex items-center gap-1.5 py-1 pl-2 pr-1.5">
                        From: {formatDate(dateRange.start)}
                        <button
                          onClick={() => setDateRange((prev) => ({ ...prev, start: null }))}
                          className="ml-1 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                          aria-label="Clear start date filter"
                        >
                          <FaTimes className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    
                    {dateRange.end && (
                      <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 flex items-center gap-1.5 py-1 pl-2 pr-1.5">
                        To: {formatDate(dateRange.end)}
                        <button
                          onClick={() => setDateRange((prev) => ({ ...prev, end: null }))}
                          className="ml-1 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                          aria-label="Clear end date filter"
                        >
                          <FaTimes className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    
                    {search && (
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 flex items-center gap-1.5 py-1 pl-2 pr-1.5">
                        Search: "{search}"
                        <button
                          onClick={() => setSearch("")}
                          className="ml-1 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                          aria-label="Clear search filter"
                        >
                          <FaTimes className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingFilters;