import React, { useState, useEffect } from 'react';
import { FaEye, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

const ServiceRequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        const mockData = Array.from({ length: 20 }, (_, i) => ({
          id: `REQ-${1000 + i}`,
          serviceName: `Service ${i + 1}`,
          category: `Category ${i % 5 + 1}`,
          requestedBy: i % 2 === 0 ? 'Vendor A' : 'User B',
          status: i % 3 === 0 ? 'Pending' : i % 3 === 1 ? 'Approved' : 'Declined',
          submissionDate: `2025-02-${10 + i}`,
        }));
        setRequests(mockData);
      } catch (err) {
        setError('Failed to fetch service requests.');
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
      // Mock action processing
      console.log(`${action} action performed on ${id}`);
      alert(`${action} action performed on ${id}`);
    } catch (err) {
      alert(`Failed to ${action} request ${id}`);
    }
  };

  const renderTable = () => {
    if (loading) {
      return Array.from({ length: itemsPerPage }).map((_, index) => (
        <tr key={index}>
          {Array.from({ length: 8 }).map((_, i) => (
            <td key={i}><h1>Loading....</h1></td>
          ))}
        </tr>
      ));
    }

    if (error) {
      return <tr><td colSpan="8" className="text-center text-red-500">{error}</td></tr>;
    }

    const paginatedRequests = requests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return paginatedRequests.map((req) => (
      <tr key={req.id}>
        <td><input type="checkbox" checked={selectedRequests.includes(req.id)} onChange={() => toggleSelect(req.id)} /></td>
        <td>{req.id}</td>
        <td>{req.serviceName}</td>
        <td>{req.category}</td>
        <td>{req.requestedBy}</td>
        <td><span className={`badge ${req.status === 'Approved' ? 'bg-green-600' : req.status === 'Declined' ? 'bg-red-600' : 'bg-yellow-600'}`}>{req.status}</span></td>
        <td>{req.submissionDate}</td>
        <td className="flex gap-2">
          <button className="btn btn-sm btn-primary" onClick={() => handleAction('view', req.id)}><FaEye /></button>
          <button className="btn btn-sm btn-success" onClick={() => handleAction('approve', req.id)}><FaCheck /></button>
          <button className="btn btn-sm btn-warning" onClick={() => handleAction('decline', req.id)}><FaTimes /></button>
          <button className="btn btn-sm btn-error" onClick={() => handleAction('delete', req.id)}><FaTrash /></button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-4">
      <table className="table w-full">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Request ID</th>
            <th>Service Name</th>
            <th>Category</th>
            <th>Requested By</th>
            <th>Status</th>
            <th>Submission Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderTable()}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="btn btn-sm mr-2">Previous</button>
        <span className="text-sm text-gray-500 dark:text-gray-300 mx-2">Page {currentPage}</span>
        <button disabled={currentPage * itemsPerPage >= requests.length} onClick={() => setCurrentPage((p) => p + 1)} className="btn btn-sm">Next</button>
      </div>
    </div>
  );
};

export default ServiceRequestsTable;
