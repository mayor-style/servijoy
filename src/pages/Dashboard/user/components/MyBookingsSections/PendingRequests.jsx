import React, { useState } from "react";
import { FaClock, FaUser, FaRedo, FaHourglassHalf } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const PendingRequests = ({ requests }) => {
  const [expandedRequest, setExpandedRequest] = useState(null);

  const toggleExpand = (id) => {
    setExpandedRequest(expandedRequest === id ? null : id);
  };

  return (
    <section className="w-full p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaHourglassHalf className="text-blue-500 dark:text-blue-400 text-xl" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Pending Requests
          </h2>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total: {requests.length}
        </div>
      </div>

      {requests.length === 0 ? (
        <motion.div
          className="text-center py-16 bg-gray-50 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaClock className="text-6xl mx-auto mb-6 text-gray-400 dark:text-gray-500" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            No Pending Requests
          </h3>
          <p className="text-sm mt-3 max-w-md mx-auto text-gray-500 dark:text-gray-400">
            Your pending requests will appear here.
          </p>
          <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center gap-2 mx-auto">
            Request a Service
          </button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <motion.div
              key={request.id}
              className={`border ${
                expandedRequest === request.id
                  ? "border-blue-300 dark:border-blue-600 shadow-lg"
                  : "border-gray-200 dark:border-gray-600 hover:shadow-md"
              } rounded-xl bg-white dark:bg-gray-800 transition-all duration-300 cursor-pointer`}
              onClick={() => toggleExpand(request.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="flex items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {request.serviceName}
                      </h3>
                      <p className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                        <FaUser className="mr-2 text-blue-500" /> {request.vendorName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 sm:mt-0">
                    <div className="flex flex-col text-right">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {request.date}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedRequest === request.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-400 dark:text-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {expandedRequest === request.id && (
                  <motion.div
                    className="border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 p-5 rounded-b-xl"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 gap-4">
                      <p className="flex items-center text-gray-700 dark:text-gray-300">
                        <FaClock className="mr-2 text-blue-500" /> Time: {request.time}
                      </p>
                      <p className="mt-3 text-gray-700 dark:text-gray-300">
                        Status: <span className="font-semibold text-yellow-500">Pending</span>
                      </p>
                      <div className="flex justify-end mt-6">
                        <button
                          className="btn btn-primary flex items-center gap-2 px-5 py-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Implement reschedule logic here
                          }}
                        >
                          <FaRedo /> Reschedule
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PendingRequests;
