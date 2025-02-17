import React, { useEffect, useState } from "react";

const ServiceRequestsOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mock data fetch
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData({
          totalRequests: 150,
          pendingRequests: 25,
          approvedRequests: 100,
          rejectedRequests: 25,
        });
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-gray-800 rounded-lg animate-pulse">
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-600 text-white rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Service Requests Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-700 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Requests</h3>
          <p className="text-2xl">{data.totalRequests}</p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-2xl">{data.pendingRequests}</p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Approved</h3>
          <p className="text-2xl">{data.approvedRequests}</p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Rejected</h3>
          <p className="text-2xl">{data.rejectedRequests}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestsOverview;
