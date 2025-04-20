import React, { useState, useEffect } from "react";
import { Eye, Check, X, Trash2, ChevronLeft, ChevronRight, Filter, Download, RefreshCw } from "lucide-react";

// Custom Badge Component
const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300";
      case "Declined":
        return "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300";
      case "Pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

// Custom Action Button Component
const ActionButton = ({ icon, onClick, label, variant }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "text-blue-700 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50";
      case "success":
        return "text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50";
      case "warning":
        return "text-amber-700 bg-amber-50 hover:bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30 dark:hover:bg-amber-900/50";
      case "danger":
        return "text-rose-700 bg-rose-50 hover:bg-rose-100 dark:text-rose-400 dark:bg-rose-900/30 dark:hover:bg-rose-900/50";
      default:
        return "text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700";
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`p-1.5 rounded-full transition-colors ${getVariantStyles()}`}
    >
      {icon}
    </button>
  );
};

// Custom Checkbox Component
const Checkbox = ({ checked, onChange, label = "" }) => (
  <label className="inline-flex items-center">
    <div className="relative flex items-center">
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={onChange}
        className="sr-only"
      />
      <div className={`w-4 h-4 border rounded mr-2 flex items-center justify-center ${
        checked 
          ? 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500' 
          : 'border-gray-300 dark:border-gray-600'
      }`}>
        {checked && (
          <svg 
            className="w-3 h-3 text-white" 
            viewBox="0 0 12 12" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M10 3L4.5 8.5L2 6" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
    </div>
  </label>
);

// Service Requests Table Component
const ServiceRequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("submissionDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call with mock data
        const mockData = Array.from({ length: 20 }, (_, i) => ({
          id: `REQ-${1000 + i}`,
          serviceName: `Service ${i + 1}`,
          category: `Category ${((i % 5) + 1)}`,
          requestedBy: i % 2 === 0 ? "Vendor A" : "User B",
          status: i % 3 === 0 ? "Pending" : i % 3 === 1 ? "Approved" : "Declined",
          submissionDate: `2025-02-${10 + i}`,
        }));
        setRequests(mockData);
      } catch (err) {
        setError("Failed to fetch service requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleSelect = (id) => {
    setSelectedRequests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAction = async (action, id) => {
    try {
      console.log(`${action} action performed on ${id}`);
      
      if (action === "delete") {
        setRequests((prev) => prev.filter((req) => req.id !== id));
      }
    } catch (err) {
      setError(`Failed to ${action} request ${id}`);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortedRequests = () => {
    return [...requests].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  };

  const getPageCount = () => Math.ceil(requests.length / itemsPerPage);
  const sortedRequests = getSortedRequests();
  const paginatedRequests = sortedRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isAllSelected = 
    paginatedRequests.length > 0 && 
    paginatedRequests.every((req) => selectedRequests.includes(req.id));

  const toggleAllSelected = () => {
    if (isAllSelected) {
      setSelectedRequests(prev => 
        prev.filter(id => !paginatedRequests.some(req => req.id === id))
      );
    } else {
      setSelectedRequests(prev => [
        ...prev,
        ...paginatedRequests.map(req => req.id).filter(id => !prev.includes(id))
      ]);
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return null;
    
    return (
      <span className="ml-1 inline-block">
        {sortDirection === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const renderSkeleton = () => (
    Array.from({ length: itemsPerPage }).map((_, index) => (
      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
        <td className="py-4 px-4">
          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </td>
        {Array.from({ length: 7 }).map((_, i) => (
          <td key={i} className="py-4 px-4">
            <div className={`bg-gray-200 dark:bg-gray-700 h-4 rounded animate-pulse ${
              i === 0 || i === 5 ? "w-16" : "w-32"
            }`}></div>
          </td>
        ))}
      </tr>
    ))
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Service Requests</h2>
          <div className="flex flex-wrap gap-2">
            <button 
              className="px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm 
                rounded-md border border-gray-300 dark:border-gray-600 flex items-center gap-2 hover:bg-gray-50 
                dark:hover:bg-gray-600 transition-colors"
              onClick={refreshData}
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <button 
              className="px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm 
                rounded-md border border-gray-300 dark:border-gray-600 flex items-center gap-2 hover:bg-gray-50 
                dark:hover:bg-gray-600 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <button 
              className="px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm 
                rounded-md border border-gray-300 dark:border-gray-600 flex items-center gap-2 hover:bg-gray-50 
                dark:hover:bg-gray-600 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="m-6 p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 
          text-rose-700 dark:text-rose-400 rounded-md flex items-center gap-2">
          <X className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="py-3 px-4">
                <Checkbox 
                  checked={isAllSelected} 
                  onChange={toggleAllSelected}
                />
              </th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200" 
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center">
                  Request ID
                  {renderSortIcon("id")}
                </div>
              </th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200" 
                onClick={() => handleSort("serviceName")}
              >
                <div className="flex items-center">
                  Service Name
                  {renderSortIcon("serviceName")}
                </div>
              </th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200" 
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">
                  Category
                  {renderSortIcon("category")}
                </div>
              </th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200" 
                onClick={() => handleSort("requestedBy")}
              >
                <div className="flex items-center">
                  Requested By
                  {renderSortIcon("requestedBy")}
                </div>
              </th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200" 
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">
                  Status
                  {renderSortIcon("status")}
                </div>
              </th>
              <th 
                className="py-3 px-4 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200" 
                onClick={() => handleSort("submissionDate")}
              >
                <div className="flex items-center">
                  Submission Date
                  {renderSortIcon("submissionDate")}
                </div>
              </th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              renderSkeleton()
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-8 px-4 text-center text-gray-500 dark:text-gray-400">
                  No service requests found.
                </td>
              </tr>
            ) : (
              paginatedRequests.map((req) => (
                <tr 
                  key={req.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <Checkbox 
                      checked={selectedRequests.includes(req.id)} 
                      onChange={() => toggleSelect(req.id)}
                    />
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                    {req.id}
                  </td>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    {req.serviceName}
                  </td>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    {req.category}
                  </td>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    {req.requestedBy}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                    {req.submissionDate}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <ActionButton
                        icon={<Eye size={16} />}
                        onClick={() => handleAction("view", req.id)}
                        label="View details"
                        variant="primary"
                      />
                      <ActionButton
                        icon={<Check size={16} />}
                        onClick={() => handleAction("approve", req.id)}
                        label="Approve request"
                        variant="success"
                      />
                      <ActionButton
                        icon={<X size={16} />}
                        onClick={() => handleAction("decline", req.id)}
                        label="Decline request"
                        variant="warning"
                      />
                      <ActionButton
                        icon={<Trash2 size={16} />}
                        onClick={() => handleAction("delete", req.id)}
                        label="Delete request"
                        variant="danger"
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, requests.length)} of {requests.length} entries
        </div>
        <div className="flex items-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
              text-gray-700 dark:text-gray-200 mr-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-700"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="flex items-center">
            {[...Array(Math.min(getPageCount(), 5))].map((_, i) => {
              const pageNumber = currentPage <= 3 
                ? i + 1 
                : currentPage >= getPageCount() - 2
                  ? getPageCount() - 4 + i
                  : currentPage - 2 + i;
                
              if (pageNumber <= getPageCount()) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 mx-1 rounded-md text-sm flex items-center justify-center transition-colors ${
                      currentPage === pageNumber
                        ? "bg-blue-600 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              }
              return null;
            })}
          </div>
          
          <button
            disabled={currentPage >= getPageCount()}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, getPageCount()))}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 
              text-gray-700 dark:text-gray-200 ml-2 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-700"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestsTable;