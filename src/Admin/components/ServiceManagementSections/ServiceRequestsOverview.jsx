import React, { useState, useEffect } from "react";

const ServiceRequestsOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
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
      <div className="p-6 bg-soft-white dark:bg-gray-800 rounded-lg animate-pulse transition">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-600 text-white rounded-lg transition">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 bg-soft-white text-theme dark:bg-gray-800 rounded-lg text-center transition">
        No service requests found.
      </div>
    );
  }

  return (
    <div className="p-6 bg-soft-white dark:bg-gray-800 rounded-lg shadow-md transition">
      <h2 className="subheading mb-4 text-gray-800 dark:text-white">Service Requests Overview</h2>
      <div className="grid text-theme grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 text-theme bg-gray-200 dark:bg-gray-700 rounded-lg text-center transition">
          <h3 className="text-lg font-semibold">Total Requests</h3>
          <p className="text-2xl">{data.totalRequests}</p>
        </div>
        <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg text-center transition">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-2xl">{data.pendingRequests}</p>
        </div>
        <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg text-center transition">
          <h3 className="text-lg font-semibold">Approved</h3>
          <p className="text-2xl">{data.approvedRequests}</p>
        </div>
        <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg text-center transition">
          <h3 className="text-lg font-semibold">Rejected</h3>
          <p className="text-2xl">{data.rejectedRequests}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestsOverview;
