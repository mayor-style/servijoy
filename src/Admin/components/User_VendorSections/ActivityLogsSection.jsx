import React, { useState, useEffect, useCallback } from "react";
import { Search, Filter, Calendar, Clock, User, ChevronDown, ChevronUp, MoreHorizontal, RefreshCw, Download, AlertCircle } from "lucide-react";

const ActivityLogsSection = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    userType: "all", // "all", "user", "vendor", "admin"
    dateRange: "all", // "all", "today", "week", "month"
    actionType: "all", // "all", "created", "updated", "changed", "reset"
  });
  const [sortConfig, setSortConfig] = useState({
    key: "timestamp",
    direction: "desc",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
  });
  const [expandedLogId, setExpandedLogId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Sample log data with more detail
  const sampleLogs = [
    { 
      id: 1, 
      action: "User John Doe created an account", 
      timestamp: "2025-03-18 14:32:00",
      userType: "user",
      actionType: "created",
      ipAddress: "192.168.1.105",
      browser: "Chrome 124.0.0",
      details: "User registered via email authentication"
    },
    { 
      id: 2, 
      action: "Vendor Jane Smith updated profile", 
      timestamp: "2025-03-18 13:15:00",
      userType: "vendor",
      actionType: "updated",
      ipAddress: "172.16.254.1",
      browser: "Safari 17.4",
      details: "Changed business address and updated payment information"
    },
    { 
      id: 3, 
      action: "Admin Mike Johnson changed status of User #452", 
      timestamp: "2025-03-17 10:45:00",
      userType: "admin",
      actionType: "changed",
      ipAddress: "10.0.0.1",
      browser: "Firefox 124.0",
      details: "Changed user status from 'active' to 'suspended' due to policy violation"
    },
    { 
      id: 4, 
      action: "Password reset for Vendor #782", 
      timestamp: "2025-03-16 18:20:00",
      userType: "vendor",
      actionType: "reset",
      ipAddress: "192.168.0.1",
      browser: "Edge 124.0.0",
      details: "Password reset initiated via forgot password flow. Reset link sent to registered email."
    },
    { 
      id: 5, 
      action: "Admin Sarah Lee approved content submission", 
      timestamp: "2025-03-16 11:05:00",
      userType: "admin",
      actionType: "approved",
      ipAddress: "192.168.1.10",
      browser: "Chrome 124.0.0",
      details: "Content submission #4782 approved and published to production"
    },
    { 
      id: 6, 
      action: "User Alex Wong updated notification preferences", 
      timestamp: "2025-03-15 09:45:00",
      userType: "user",
      actionType: "updated",
      ipAddress: "172.16.254.12",
      browser: "Chrome 124.0.0",
      details: "Disabled email notifications, enabled push notifications"
    },
    { 
      id: 7, 
      action: "System performed scheduled backup", 
      timestamp: "2025-03-15 02:00:00",
      userType: "system",
      actionType: "backup",
      ipAddress: "10.0.0.5",
      browser: "System",
      details: "Full database backup completed successfully in 15 minutes"
    },
  ];

  const fetchLogs = useCallback(() => {
    setLoading(true);
    setError(null);
    setIsRefreshing(true);
    
    // Simulate API fetch with random failure chance for error state demo
    setTimeout(() => {
      const shouldFail = Math.random() < 0.1; // 10% chance of failure
      
      if (shouldFail) {
        setError("Unable to fetch activity logs. Please try again.");
      } else {
        setLogs(sampleLogs);
      }
      
      setLoading(false);
      setIsRefreshing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Filter logs based on search term and filters
  const filteredLogs = logs.filter(log => {
    // Search term filter
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    // User type filter
    const matchesUserType = filters.userType === "all" || log.userType === filters.userType;
    
    // Action type filter
    const matchesActionType = filters.actionType === "all" || log.actionType === filters.actionType;
    
    // Date filter
    let matchesDate = true;
    const logDate = new Date(log.timestamp);
    const today = new Date();
    
    if (filters.dateRange === "today") {
      matchesDate = logDate.toDateString() === today.toDateString();
    } else if (filters.dateRange === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      matchesDate = logDate >= weekAgo;
    } else if (filters.dateRange === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(today.getMonth() - 1);
      matchesDate = logDate >= monthAgo;
    }
    
    return matchesSearch && matchesUserType && matchesActionType && matchesDate;
  });

  // Sort logs
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    if (sortConfig.key === "timestamp") {
      const dateA = new Date(a[sortConfig.key]);
      const dateB = new Date(b[sortConfig.key]);
      return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    }
  });

  // Pagination
  const indexOfLastLog = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstLog = indexOfLastLog - pagination.itemsPerPage;
  const currentLogs = sortedLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(sortedLogs.length / pagination.itemsPerPage);

  // Handle sort
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Format timestamp for better readability
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = new Date(now - 86400000).toDateString() === date.toDateString();
    
    let formattedDate;
    if (isToday) {
      formattedDate = "Today";
    } else if (isYesterday) {
      formattedDate = "Yesterday";
    } else {
      formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
    }
    
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
    
    return `${formattedDate} at ${formattedTime}`;
  };

  // Toggle expanded log details
  const toggleLogDetails = (id) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      userType: "all",
      dateRange: "all",
      actionType: "all"
    });
    setPagination({
      ...pagination,
      currentPage: 1
    });
  };

  // Event handlers for form inputs
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
    setPagination({ ...pagination, currentPage: 1 });
  };

  const handlePageChange = (pageNumber) => {
    setPagination({
      ...pagination,
      currentPage: pageNumber
    });
  };

  const handleItemsPerPageChange = (e) => {
    setPagination({
      currentPage: 1,
      itemsPerPage: parseInt(e.target.value)
    });
  };

  // Get user type style
  const getUserTypeStyle = (userType) => {
    switch (userType) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "vendor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "user":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "system":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
            Activity Logs
            <span className="ml-2 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
              {filteredLogs.length} entries
            </span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track user and system activities across the platform
          </p>
        </div>
        
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button 
            onClick={fetchLogs} 
            className={`flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition ${isRefreshing ? 'opacity-75' : ''}`}
            disabled={isRefreshing}
          >
            <RefreshCw size={16} className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="flex items-center px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition">
            <Download size={16} className="mr-1" />
            Export
          </button>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mx-4 mt-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md flex items-start">
          <AlertCircle size={18} className="text-red-500 dark:text-red-400 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            <button 
              onClick={fetchLogs}
              className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 mt-1 underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Search and filters */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search activity logs..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-500 transition"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center md:justify-start px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition md:w-auto w-full"
          >
            <Filter size={16} className="mr-2" />
            <span>Filters</span>
            {showFilters ? <ChevronUp size={16} className="ml-2" /> : <ChevronDown size={16} className="ml-2" />}
          </button>
        </div>

        {/* Filter options */}
        {showFilters && (
          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-750 rounded-md border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User Type</label>
                <select
                  value={filters.userType}
                  onChange={(e) => handleFilterChange("userType", e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="all">All Types</option>
                  <option value="user">User</option>
                  <option value="vendor">Vendor</option>
                  <option value="admin">Admin</option>
                  <option value="system">System</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange("dateRange", e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Past Week</option>
                  <option value="month">Past Month</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Action Type</label>
                <select
                  value={filters.actionType}
                  onChange={(e) => handleFilterChange("actionType", e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="all">All Actions</option>
                  <option value="created">Created</option>
                  <option value="updated">Updated</option>
                  <option value="changed">Changed</option>
                  <option value="reset">Reset</option>
                  <option value="approved">Approved</option>
                  <option value="backup">Backup</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-3">
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table of logs */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent dark:border-blue-500 dark:border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading activity logs...</p>
          </div>
        ) : (
          <>
            {sortedLogs.length > 0 ? (
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50 dark:bg-gray-700 text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-500 dark:text-gray-300 font-medium tracking-wider">
                      <div className="flex items-center cursor-pointer" onClick={() => requestSort("action")}>
                        <span>Action</span>
                        {sortConfig.key === "action" && (
                          sortConfig.direction === "asc" 
                            ? <ChevronUp size={16} className="ml-1" /> 
                            : <ChevronDown size={16} className="ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-gray-500 dark:text-gray-300 font-medium tracking-wider">
                      <div className="flex items-center cursor-pointer" onClick={() => requestSort("userType")}>
                        <span>User Type</span>
                        {sortConfig.key === "userType" && (
                          sortConfig.direction === "asc" 
                            ? <ChevronUp size={16} className="ml-1" /> 
                            : <ChevronDown size={16} className="ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-gray-500 dark:text-gray-300 font-medium tracking-wider">
                      <div className="flex items-center cursor-pointer" onClick={() => requestSort("timestamp")}>
                        <span>Timestamp</span>
                        {sortConfig.key === "timestamp" && (
                          sortConfig.direction === "asc" 
                            ? <ChevronUp size={16} className="ml-1" /> 
                            : <ChevronDown size={16} className="ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-gray-500 dark:text-gray-300 font-medium tracking-wider w-10"></th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {currentLogs.map((log) => (
                    <React.Fragment key={log.id}>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition group">
                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                          {log.action}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getUserTypeStyle(log.userType)}`}>
                            {log.userType.charAt(0).toUpperCase() + log.userType.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1 text-gray-400 dark:text-gray-500" />
                            {formatTimestamp(log.timestamp)}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <button 
                            onClick={() => toggleLogDetails(log.id)}
                            className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded transition"
                            aria-label="View details"
                            title="View details"
                          >
                            {expandedLogId === log.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                        </td>
                      </tr>
                      {expandedLogId === log.id && (
                        <tr className="bg-gray-50 dark:bg-gray-750">
                          <td colSpan="4" className="px-4 py-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Details</p>
                                <p className="text-gray-800 dark:text-gray-200">{log.details}</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">IP Address</p>
                                <p className="text-gray-800 dark:text-gray-200">{log.ipAddress}</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Browser</p>
                                <p className="text-gray-800 dark:text-gray-200">{log.browser}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-3">
                  <Search size={24} className="text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No matching logs found</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md transition text-sm"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Pagination */}
      {!loading && sortedLogs.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
            <span>
              Showing {indexOfFirstLog + 1}-{Math.min(indexOfLastLog, sortedLogs.length)} of {sortedLogs.length} results
            </span>
            <select
              value={pagination.itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="ml-2 border border-gray-300 dark:border-gray-600 rounded p-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className={`px-3 py-1 mx-1 rounded border ${
                pagination.currentPage === 1
                  ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 mx-1 rounded ${
                  pagination.currentPage === page
                    ? 'bg-blue-600 text-white dark:bg-blue-700'
                    : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === totalPages}
              className={`px-3 py-1 mx-1 rounded border ${
                pagination.currentPage === totalPages
                  ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLogsSection;