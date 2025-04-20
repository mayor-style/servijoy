import React, { useState, useEffect, useMemo } from "react";
import { FaEye, FaEdit, FaTrash, FaChevronDown, FaChevronUp, FaSearch, FaFilter, FaSort } from "react-icons/fa";

const DisputesTable = ({ filters, selectedDisputes, setSelectedDisputes, onOpenModal }) => {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [hoveredRow, setHoveredRow] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Simulate fetching dispute data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = Array.from({ length: 20 }, (_, i) => ({
        id: `DSP-${1000 + i}`,
        vendor: i % 3 === 0 ? "Vendor Alpha" : i % 3 === 1 ? "Vendor Beta" : "Vendor Gamma",
        subject: `Issue with order ${1000 + i}`,
        date: `2025-03-${String(10 + (i % 20)).padStart(2, '0')}`,
        status: i % 4 === 0 ? "Pending" : i % 4 === 1 ? "Resolved" : i % 4 === 2 ? "Rejected" : "In Progress",
        priority: i % 3 === 0 ? "High" : i % 3 === 1 ? "Medium" : "Low",
        amount: Math.floor(Math.random() * 1000) + 100,
        description: `Detailed description for dispute ${1000 + i}. This includes information about the issue, communication history, and resolution steps.`,
      }));
      setDisputes(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Status badge styling with improved visual hierarchy
  const getStatusBadge = (status) => {
    const baseClasses = "py-1 px-3 rounded-full text-xs font-medium inline-flex items-center gap-1";
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <span className={`${baseClasses} bg-amber-100 text-amber-800 border border-amber-200`}>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            {status}
          </span>
        );
      case "resolved":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800 border border-green-200`}>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {status}
          </span>
        );
      case "rejected":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800 border border-red-200`}>
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            {status}
          </span>
        );
      case "in progress":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800 border border-blue-200`}>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            {status}
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`}>
            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
            {status}
          </span>
        );
    }
  };

  // Priority badge styling
  const getPriorityBadge = (priority) => {
    const baseClasses = "py-1 px-2 rounded text-xs font-medium";
    switch (priority.toLowerCase()) {
      case "high":
        return <span className={`${baseClasses} bg-red-50 text-red-700 border border-red-100`}>{priority}</span>;
      case "medium":
        return <span className={`${baseClasses} bg-blue-50 text-blue-700 border border-blue-100`}>{priority}</span>;
      case "low":
        return <span className={`${baseClasses} bg-gray-50 text-gray-700 border border-gray-100`}>{priority}</span>;
      default:
        return <span className={`${baseClasses} bg-gray-50 text-gray-700 border border-gray-100`}>{priority}</span>;
    }
  };

  // Sorting functionality
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Applying sorting
  const sortedDisputes = useMemo(() => {
    const sortableDisputes = [...disputes];
    if (sortConfig.key) {
      sortableDisputes.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableDisputes;
  }, [disputes, sortConfig]);

  // Apply filters
  const filteredDisputes = useMemo(() => {
    return sortedDisputes.filter((dispute) => {
      let valid = true;
      if (filters.vendor && filters.vendor.trim() !== "") {
        valid = valid && dispute.vendor.toLowerCase().includes(filters.vendor.toLowerCase());
      }
      if (filters.status && filters.status.trim() !== "") {
        valid = valid && dispute.status.toLowerCase() === filters.status.toLowerCase();
      }
      if (filters.priority && filters.priority.trim() !== "") {
        valid = valid && dispute.priority.toLowerCase() === filters.priority.toLowerCase();
      }
      return valid;
    });
  }, [sortedDisputes, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredDisputes.length / itemsPerPage);
  const paginatedDisputes = filteredDisputes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Toggle select individual dispute
  const toggleSelect = (id) => {
    setSelectedDisputes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle select all disputes on current page
  const toggleSelectAll = () => {
    const currentPageIds = paginatedDisputes.map((d) => d.id);
    if (currentPageIds.every((id) => selectedDisputes.includes(id))) {
      setSelectedDisputes(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
      const newSelectedIds = [...selectedDisputes];
      currentPageIds.forEach(id => {
        if (!newSelectedIds.includes(id)) {
          newSelectedIds.push(id);
        }
      });
      setSelectedDisputes(newSelectedIds);
    }
  };

  // Skeleton loader
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid grid-cols-7 gap-4">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded col-span-1"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded col-span-1"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded col-span-1"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded col-span-1"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded col-span-1"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded col-span-1"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded col-span-1"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error message
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Table layout
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Table header with actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
        <div className="flex items-center mb-4 md:mb-0">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Disputes ({filteredDisputes.length})
          </h2>
          {selectedDisputes.length > 0 && (
            <div className="ml-4 flex items-center text-sm text-gray-600 dark:text-gray-300">
              <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-xs font-medium">
                {selectedDisputes.length} selected
              </span>
              <button 
                className="ml-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                onClick={() => setSelectedDisputes([])}
              >
                Clear
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search disputes..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-64 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <select
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            {[5, 10, 20, 50].map((value) => (
              <option key={value} value={value}>
                {value} per page
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left w-10">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                    onChange={toggleSelectAll}
                    checked={
                      paginatedDisputes.length > 0 &&
                      paginatedDisputes.every((d) => selectedDisputes.includes(d.id))
                    }
                  />
                </div>
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('id')}>
                <div className="flex items-center">
                  <span>Dispute ID</span>
                  <span className="ml-1">
                    {sortConfig.key === 'id' ? (
                      sortConfig.direction === 'asc' ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />
                    ) : (
                      <FaSort size={12} className="text-gray-400" />
                    )}
                  </span>
                </div>
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('vendor')}>
                <div className="flex items-center">
                  <span>Vendor</span>
                  <span className="ml-1">
                    {sortConfig.key === 'vendor' ? (
                      sortConfig.direction === 'asc' ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />
                    ) : (
                      <FaSort size={12} className="text-gray-400" />
                    )}
                  </span>
                </div>
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('subject')}>
                <div className="flex items-center">
                  <span>Subject</span>
                  <span className="ml-1">
                    {sortConfig.key === 'subject' ? (
                      sortConfig.direction === 'asc' ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />
                    ) : (
                      <FaSort size={12} className="text-gray-400" />
                    )}
                  </span>
                </div>
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('date')}>
                <div className="flex items-center">
                  <span>Date</span>
                  <span className="ml-1">
                    {sortConfig.key === 'date' ? (
                      sortConfig.direction === 'asc' ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />
                    ) : (
                      <FaSort size={12} className="text-gray-400" />
                    )}
                  </span>
                </div>
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('status')}>
                <div className="flex items-center">
                  <span>Status</span>
                  <span className="ml-1">
                    {sortConfig.key === 'status' ? (
                      sortConfig.direction === 'asc' ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />
                    ) : (
                      <FaSort size={12} className="text-gray-400" />
                    )}
                  </span>
                </div>
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('priority')}>
                <div className="flex items-center">
                  <span>Priority</span>
                  <span className="ml-1">
                    {sortConfig.key === 'priority' ? (
                      sortConfig.direction === 'asc' ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />
                    ) : (
                      <FaSort size={12} className="text-gray-400" />
                    )}
                  </span>
                </div>
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <span>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {paginatedDisputes.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500 dark:text-gray-400">
                  <div className="flex flex-col items-center py-6">
                    <FaFilter className="h-10 w-10 text-gray-300 dark:text-gray-600 mb-2" />
                    <p className="text-lg font-medium">No disputes found</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedDisputes.map((dispute) => (
                <tr 
                  key={dispute.id} 
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                    hoveredRow === dispute.id ? 'bg-gray-50 dark:bg-gray-700' : ''
                  }`}
                  onMouseEnter={() => setHoveredRow(dispute.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="p-3 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                      checked={selectedDisputes.includes(dispute.id)}
                      onChange={() => toggleSelect(dispute.id)}
                    />
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{dispute.id}</span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{dispute.vendor}</span>
                  </td>
                  <td className="p-3 max-w-xs">
                    <div className="text-sm text-gray-700 dark:text-gray-300 truncate">{dispute.subject}</div>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{dispute.date}</span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {getStatusBadge(dispute.status)}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {getPriorityBadge(dispute.priority)}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onOpenModal("details", dispute)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150"
                        title="View Details"
                      >
                        <FaEye size={16} />
                      </button>
                      <button
                        onClick={() => onOpenModal("edit", dispute)}
                        className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 transition-colors duration-150"
                        title="Edit Dispute"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => onOpenModal("delete", dispute)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-150"
                        title="Delete Dispute"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredDisputes.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-500"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                page === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-500"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(page * itemsPerPage, filteredDisputes.length)}
                </span>{" "}
                of <span className="font-medium">{filteredDisputes.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 text-sm font-medium ${
                    page === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-500"
                      : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="sr-only">First Page</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M15.707 15.707a1 1 0 01-1.414 0L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M15.707 9.707a1 1 0 01-1.414 0L10 5.414 5.707 9.707a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${
                    page === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-500"
                      : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Show limited page numbers around current page
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === pageNum
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-900 dark:border-blue-500 dark:text-blue-200"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return (
                      <span
                        key={pageNum}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium ${
                    page === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-500"
                      : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setPage(totalPages)}
                  disabled={page === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 text-sm font-medium ${
                    page === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-500"
                      : "bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="sr-only">Last Page</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 15.707a1 1 0 001.414 0L10 11.414l4.293 4.293a1 1 0 001.414-1.414l-5-5a1 1 0 00-1.414 0l-5 5a1 1 0 000 1.414z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M4.293 9.707a1 1 0 001.414 0L10 5.414l4.293 4.293a1 1 0 001.414-1.414l-5-5a1 1 0 00-1.414 0l-5 5a1 1 0 000 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Footer with summary info */}
      <div className="px-4 py-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <span>Total disputes: {filteredDisputes.length}</span>
            {selectedDisputes.length > 0 && (
              <span className="ml-4">Selected: {selectedDisputes.length}</span>
            )}
          </div>
          <div className="mt-2 sm:mt-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span>Resolved</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span>Pending</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span>In Progress</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span>Rejected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputesTable;