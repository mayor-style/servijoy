
// File: components/myBookings/PendingRequests.jsx
import React, { useState } from "react";
import { FaUser, FaCalendarAlt, FaClock, FaTimesCircle } from "react-icons/fa";

const PendingRequests = ({ requests }) => {
  const [expandedRequest, setExpandedRequest] = useState(null);

  const toggleExpand = (id) => {
    setExpandedRequest(expandedRequest === id ? null : id);
  };

  return (
    <section className="w-full p-2 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl transition-all duration-300">
      <h2 className="sm:text-2xl text-xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Pending Booking Requests
      </h2>
      {(!requests || requests.length === 0) ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No pending requests.
        </p>
      ) : (
        <div className="space-y-6">
          {requests.map((request) => (
            <div
              key={request.id}
              className="border border-gray-200 dark:border-gray-700 p-6 rounded-xl bg-gray-50 dark:bg-gray-700 transition-shadow duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
              onClick={() => toggleExpand(request.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="sm:text-xl text-lg font-bold text-gray-800 dark:text-white">
                    {request.serviceName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300 flex items-center mt-1">
                    <FaUser className="mr-2 text-primary" /> {request.vendorName}
                  </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-300 flex items-center">
                  <FaCalendarAlt className="mr-2 text-primary" /> {request.date}
                </div>
              </div>

              {expandedRequest === request.id && (
                <div className="mt-6 bg-gray-100 dark:bg-gray-600 p-6 rounded-xl transition-all duration-300">
                  <p className="flex items-center text-gray-700 dark:text-gray-300">
                    <FaClock className="mr-2 text-primary" /> Time: {request.time}
                  </p>
                  <p className="mt-3 dark:text-gray-300 text-base">
                    Status: <span className={`font-semibold ${request.status === "Pending" ? "text-yellow-500" : request.status === "Accepted" ? "text-green" : "text-red-500 dark:text-red-400"}`}>{request.status}</span>
                  </p>
                  {request.status === "Pending" && (
                    <div className="flex justify-end gap-4 mt-6">
                      <button className="flex items-center gap-2 px-5 py-2 border border-red-500 text-red-500 rounded-lg transition-all hover:bg-red-500 hover:text-white">
                        <FaTimesCircle className="text-lg" /> Cancel Request
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PendingRequests;