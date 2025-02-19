import React, { useState } from "react";
import { MdOutlinePendingActions, MdCheckCircle, MdCancel } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";

const ServiceRequestStatus = () => {
  const [serviceRequests, setServiceRequests] = useState([
    { id: 1, serviceName: "Plumbing", submissionDate: "2025-02-08", status: "Pending", rejectionReason: "" },
    { id: 2, serviceName: "Electrical Work", submissionDate: "2025-02-06", status: "Approved", rejectionReason: "" },
    { id: 3, serviceName: "Carpentry", submissionDate: "2025-02-04", status: "Rejected", rejectionReason: "Insufficient proof of expertise." },
  ]);

  const handleResubmit = (id) => {
    toast.success("Redirecting to edit form...");
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-2xl">
      <h2 className="sm:text-2xl text-xl md:text-3xl  font-semibold text-gray-900 font-header dark:text-white mb-6 text-center sm:text-left">
        Service Request Status
      </h2>

      {serviceRequests.length > 0 ? (
        <div className="space-y-6">
          {serviceRequests.map((request) => (
            <div
              key={request.id}
              className="p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0"
            >
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                  {request.serviceName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                  Submitted on: {request.submissionDate}
                </p>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-4">
                {request.status === "Pending" && (
                  <span className="flex items-center gap-1 text-yellow-500 font-medium text-xs sm:text-sm">
                    <MdOutlinePendingActions size={18} /> Pending
                  </span>
                )}
                {request.status === "Approved" && (
                  <span className="flex items-center gap-1 text-green-500 font-medium text-xs sm:text-sm">
                    <MdCheckCircle size={18} /> Approved
                  </span>
                )}
                {request.status === "Rejected" && (
                  <span className="flex items-center gap-1 text-red-500 font-medium text-xs sm:text-sm">
                    <MdCancel size={18} /> Rejected
                  </span>
                )}
              </div>

              {request.status === "Rejected" && (
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 text-center sm:text-left">
                  <p className="text-xs sm:text-sm text-red-500 italic max-w-xs">
                    {request.rejectionReason}
                  </p>
                  <button
                    onClick={() => handleResubmit(request.id)}
                    className="flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200 text-xs sm:text-sm"
                  >
                    <FaEdit size={16} /> <span>Edit & Resubmit</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">
          No service requests found.
        </p>
      )}
    </div>
  );
};

export default ServiceRequestStatus;
