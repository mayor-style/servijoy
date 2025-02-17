import React, { useState, useEffect } from "react";
import { FaEye, FaCheck, FaTimes, FaTrash } from "react-icons/fa";

const ServiceRequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
      alert(`${action} action performed on ${id}`);
      if (action === "delete") {
        setRequests((prev) => prev.filter((req) => req.id !== id));
      }
    } catch (err) {
      alert(`Failed to ${action} request ${id}`);
    }
  };

  const renderTable = () => {
    if (loading) {
      return Array.from({ length: itemsPerPage }).map((_, index) => (
        <tr key={index}>
          {Array.from({ length: 8 }).map((_, i) => (
            <td key={i} className="p-2">
              <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded animate-pulse"></div>
            </td>
          ))}
        </tr>
      ));
    }

    if (error) {
      return (
        <tr>
          <td colSpan="8" className="p-4 text-center text-red-500 dark:text-red-400">
            {error}
          </td>
        </tr>
      );
    }

    if (requests.length === 0) {
      return (
        <tr>
          <td colSpan="8" className="p-4 text-center text-gray-600 dark:text-gray-300">
            No service requests found.
          </td>
        </tr>
      );
    }

    const paginatedRequests = requests.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    return paginatedRequests.map((req) => (
      <tr key={req.id} className="border-b dark:border-gray-700">
        <td className="p-2">
          <input
            type="checkbox"
            className="checkbox"
            checked={selectedRequests.includes(req.id)}
            onChange={() => toggleSelect(req.id)}
          />
        </td>
        <td className="p-2 text-gray-800 dark:text-gray-200">{req.id}</td>
        <td className="p-2 text-gray-800 dark:text-gray-200">{req.serviceName}</td>
        <td className="p-2 text-gray-800 dark:text-gray-200">{req.category}</td>
        <td className="p-2 text-gray-800 dark:text-gray-200">{req.requestedBy}</td>
        <td className="p-2">
          <span className={`badge ${req.status === "Approved" ? "bg-green" : req.status === "Declined" ? "bg-red-600" : "bg-yellow-600"}`}>
            {req.status}
          </span>
        </td>
        <td className="p-2 text-gray-800 dark:text-gray-200">{req.submissionDate}</td>
        <td className="p-2 flex gap-2">
          <button
            className="btn btn-sm btn-primary transition"
            onClick={() => handleAction("view", req.id)}
          >
            <FaEye />
          </button>
          <button
            className="btn btn-sm btn-success transition"
            onClick={() => handleAction("approve", req.id)}
          >
            <FaCheck />
          </button>
          <button
            className="btn btn-sm btn-warning transition"
            onClick={() => handleAction("decline", req.id)}
          >
            <FaTimes />
          </button>
          <button
            className="btn btn-sm btn-error transition"
            onClick={() => handleAction("delete", req.id)}
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 bg-soft-white dark:bg-gray-800 rounded-lg shadow-md mt-4 transition">
      <table className="table w-full min-w-[800px]">
        <thead>
          <tr className="bg-light-gray dark:bg-gray-700 text-left text-gray-800 dark:text-gray-200">
            <th className="p-3">
              <input
                type="checkbox"
                onChange={(e) =>
                  setSelectedRequests(
                    e.target.checked
                      ? requests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((req) => req.id)
                      : []
                  )
                }
                checked={
                  requests
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .length > 0 &&
                  requests
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .every((req) => selectedRequests.includes(req.id))
                }
              />
            </th>
            <th className="p-3">Request ID</th>
            <th className="p-3">Service Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Requested By</th>
            <th className="p-3">Status</th>
            <th className="p-3">Submission Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="btn btn-sm mr-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-300 mx-2">Page {currentPage}</span>
        <button
          disabled={currentPage * itemsPerPage >= requests.length}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="btn btn-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ServiceRequestsTable;
