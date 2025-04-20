import React, { useState } from "react";
import { MdOutlinePendingActions, MdCheckCircle, MdCancel, MdSearch } from "react-icons/md";
import { FaEdit, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const ServiceRequestStatus = ({ isEmpty = false, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const serviceRequests = [
    { 
      id: 1, 
      serviceName: "Plumbing", 
      submissionDate: "2025-02-08", 
      status: "Pending", 
      rejectionReason: "",
      additionalInfo: "Specializing in bathroom and kitchen plumbing repairs."
    },
    { 
      id: 2, 
      serviceName: "Electrical Work", 
      submissionDate: "2025-02-06", 
      status: "Approved", 
      rejectionReason: "",
      additionalInfo: "Certified electrician with 5 years of experience."
    },
    { 
      id: 3, 
      serviceName: "Carpentry", 
      submissionDate: "2025-02-04", 
      status: "Rejected", 
      rejectionReason: "Insufficient proof of expertise. Please provide certification or portfolio of previous work.",
      additionalInfo: "Custom furniture and home renovation services."
    },
  ];

  const handleResubmit = (id) => {
    toast.success("Redirecting to edit form...");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  // Filter and search logic
  const filteredRequests = serviceRequests.filter(request => {
    const matchesSearch = request.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || request.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Loading skeleton animation
  const loadingAnimation = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 1.5
      }
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="w-full bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="flex justify-center items-center py-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-green-500"
          >
            <MdOutlinePendingActions size={36} />
          </motion.div>
          <span className="ml-3 text-lg text-gray-600 dark:text-gray-300">Loading requests...</span>
        </div>
        <div className="space-y-4 mt-4">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="h-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl"
              variants={loadingAnimation}
              animate="animate"
              style={{ backgroundSize: "200% 200%" }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      {/* Search and Filter Bar */}
      {!isEmpty && serviceRequests.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search service requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            />
          </div>
          <div className="flex-shrink-0">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      )}
     
      {isEmpty || serviceRequests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="bg-gray-50 dark:bg-gray-800 p-6 rounded-full inline-block mb-6"
          >
            <MdOutlinePendingActions size={48} className="text-gray-400 mx-auto" />
          </motion.div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No Service Requests</h3>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">
            You haven't submitted any service requests yet.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Start by requesting a new service to see your requests here.
          </p>
        </motion.div>
      ) : (
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <AnimatePresence>
            {filteredRequests.map((request) => (
              <motion.div
                key={request.id}
                variants={itemVariants}
                className="p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {request.serviceName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-gray-400" />
                        {formatDate(request.submissionDate)}
                      </span>
                      {request.additionalInfo && (
                        <span className="flex items-center gap-1 max-w-md">
                          <FaInfoCircle className="text-gray-400" />
                          {request.additionalInfo}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {request.status === "Pending" && (
                      <motion.span 
                        className="flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full font-medium text-xs sm:text-sm"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: [0.9, 1.05, 1] }}
                        transition={{ duration: 0.5 }}
                      >
                        <MdOutlinePendingActions size={18} /> Pending
                      </motion.span>
                    )}
                    {request.status === "Approved" && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-medium text-xs sm:text-sm">
                        <MdCheckCircle size={18} /> Approved
                      </span>
                    )}
                    {request.status === "Rejected" && (
                      <span className="flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full font-medium text-xs sm:text-sm">
                        <MdCancel size={18} /> Rejected
                      </span>
                    )}
                  </div>
                </div>

                {request.status === "Rejected" && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <p className="text-sm text-red-500 dark:text-red-400 italic">
                        <strong>Reason:</strong> {request.rejectionReason}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleResubmit(request.id)}
                        className="flex items-center justify-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200 text-sm font-medium"
                      >
                        <FaEdit size={16} /> <span>Edit & Resubmit</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredRequests.length === 0 && searchTerm !== "" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12"
            >
              <MdSearch size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No Results Found</h3>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                No service requests match your search for "{searchTerm}".
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-200 text-sm"
              >
                Clear Search
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ServiceRequestStatus;