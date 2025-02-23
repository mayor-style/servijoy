import React from "react";
import { FaCheck, FaTimes, FaCalendarAlt, FaUser, FaInfoCircle } from "react-icons/fa";

const dummyRequests = [
  { id: 1, user: "Michael Johnson", service: "Plumbing Repair", date: "Feb 10, 2025", status: "pending" },
  { id: 2, user: "Sarah Doe", service: "Home Cleaning", date: "Feb 12, 2025", status: "pending" },
];

const VendorBookingRequests = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <h2 className="text-xl text-center sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        📩 Booking Requests
      </h2>

      {/* Booking Requests List */}
      <div className="space-y-6">
        {dummyRequests.map((request) => (
          <div
            key={request.id}
            className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {/* Top Section: User & Service Info */}
            <div className="flex flex-col items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <FaUser className="text-blue-600 dark:text-blue-400 text-2xl" />
                <div className="overflow-hidden">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
                    {request.user}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 truncate">
                    <FaCalendarAlt className="text-green-500" />
                    <span>{request.date}</span> | <span>{request.service}</span>
                  </p>
                </div>
              </div>

              {/* View Details Link */}
              <a
                href={`/booking/${request.id}`}
                className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm flex items-center gap-1 hover:underline transition"
              >
                <FaInfoCircle className="text-sm" /> View Details
              </a>
            </div>

            {/* Action Buttons: Accept & Decline (Side by Side) */}
            <div className="flex justify-center gap-3 mt-4">
              <button className="flex items-center gap-1 px-4 py-2 bg-green/60 hover:bg-green text-white rounded-lg transition duration-300 w-full">
                <FaCheck className="text-lg" /> <span className="text-xs sm:text-sm">Accept</span>
              </button>
              <button className="flex items-center w-full gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-300">
                <FaTimes className="text-lg" /> <span className="text-xs sm:text-sm">Decline</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorBookingRequests;