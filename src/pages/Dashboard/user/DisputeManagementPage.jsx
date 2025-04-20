import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Filter, RefreshCw, ChevronDown, ArrowLeft } from "lucide-react";
import DisputeList from "./components/DisputeManangementSections/DisputeList";
import DisputeDetailsModal from "./components/DisputeManangementSections/DisputeDetailsModal";
import NewDisputeForm from "./components/DisputeManangementSections/NewDisputeForm";

const DisputeManagement = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [disputes, setDisputes] = useState([]);
  const [activeTab, setActiveTab] = useState("open");
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isNewDisputeFormOpen, setIsNewDisputeFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const disputesPerPage = 8;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");

  // Fetch disputes for the logged-in user
  const fetchDisputes = async (showRefreshAnimation = false) => {
    try {
      setLoading(true);
      if (showRefreshAnimation) setRefreshing(true);
      
      const response = await axios.get(`${baseUrl}/api/disputes/my`, { withCredentials: true });
      
      // Assuming response.data is an array of disputes
      if (Array.isArray(response.data)) {
        // Map backend dispute fields to what the frontend expects:
        const mapped = response.data.map((d) => ({
          id: d._id,
          subject: d.reason, // using 'reason' as the dispute subject
          description: d.description,
          // If the order has a booking reference field, use it; otherwise fallback to the order _id
          reference: d.order && d.order.reference ? d.order.reference : d.order ? d.order._id : "",
          date: new Date(d.createdAt).toLocaleDateString(),
          rawDate: new Date(d.createdAt),
          status: d.status,
          messages: d.messages || [],
          priority: getPriorityFromStatus(d.status),
        }));
        setDisputes(mapped);
      }
      
      setLoading(false);
      if (showRefreshAnimation) {
        setTimeout(() => setRefreshing(false), 600);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch disputes");
      setLoading(false);
      if (showRefreshAnimation) setRefreshing(false);
    }
  };

  const getPriorityFromStatus = (status) => {
    switch (status) {
      case "in-progress": return "high";
      case "pending": return "medium";
      case "resolved": return "low";
      case "declined": return "low";
      default: return "medium";
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  // Modal control handlers
  const handleViewDetails = (dispute) => {
    setSelectedDispute(dispute);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedDispute(null);
    setIsDetailsModalOpen(false);
  };

  const handleOpenNewDisputeForm = () => {
    setIsNewDisputeFormOpen(true);
  };

  const handleCloseNewDisputeForm = () => {
    setIsNewDisputeFormOpen(false);
  };

  const handleRefresh = () => {
    fetchDisputes(true);
    setPage(1);
  };

  // Submit a new dispute to the backend
  const handleSubmitNewDispute = async (formData) => {
    try {
      const payload = {
        orderId: formData.bookingRef,
        reason: formData.subject,
        description: formData.description,
      };
      
      const response = await axios.post(`${baseUrl}/api/disputes`, payload, { withCredentials: true });
      
      if (response.data.dispute) {
        const d = response.data.dispute;
        const mappedDispute = {
          id: d._id,
          subject: d.reason,
          description: d.description,
          reference: d.order && d.order.reference ? d.order.reference : d.order ? d.order._id : "",
          date: new Date(d.createdAt).toLocaleDateString(),
          rawDate: new Date(d.createdAt),
          status: d.status,
          messages: d.messages || [],
          priority: getPriorityFromStatus(d.status),
        };
        
        setDisputes((prev) => [mappedDispute, ...prev]);
        setIsNewDisputeFormOpen(false);
        
        // Show success toast or notification here
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to raise dispute");
      // Show error toast or notification here
    }
  };

  // Filter and sort disputes
  const filteredDisputes = disputes
    .filter((d) => {
      if (activeTab === "open") return d.status === "pending" || d.status === "in-progress";
      if (activeTab === "resolved") return d.status === "resolved" || d.status === "declined";
      return true;
    })
    .filter((d) =>
      `${d.subject} ${d.reference}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "newest") return b.rawDate - a.rawDate;
      if (sortOrder === "oldest") return a.rawDate - b.rawDate;
      if (sortOrder === "priority") {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  const paginatedDisputes = filteredDisputes.slice(0, page * disputesPerPage);

  const statusCounts = disputes.reduce((acc, dispute) => {
    if (dispute.status === "pending" || dispute.status === "in-progress") {
      acc.open += 1;
    } else {
      acc.resolved += 1;
    }
    return acc;
  }, { open: 0, resolved: 0 });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-header">
                Dispute Management
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Manage and track your open and resolved disputes
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpenNewDisputeForm}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus size={18} />
              Raise a Dispute
            </motion.button>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6 p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="relative w-full md:w-2/5">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search disputes by subject or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
                disabled={refreshing}
              >
                <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
              </motion.button>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                  className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 flex items-center gap-2"
                >
                  <Filter size={18} />
                  <span className="hidden sm:inline">Sort</span>
                  <ChevronDown size={14} />
                </motion.button>

                <AnimatePresence>
                  {filterMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 py-1"
                    >
                      <button
                        onClick={() => {
                          setSortOrder("newest");
                          setFilterMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          sortOrder === "newest" ? "text-indigo-600 dark:text-indigo-400 font-medium" : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        Newest first
                      </button>
                      <button
                        onClick={() => {
                          setSortOrder("oldest");
                          setFilterMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          sortOrder === "oldest" ? "text-indigo-600 dark:text-indigo-400 font-medium" : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        Oldest first
                      </button>
                      <button
                        onClick={() => {
                          setSortOrder("priority");
                          setFilterMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                          sortOrder === "priority" ? "text-indigo-600 dark:text-indigo-400 font-medium" : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        By priority
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("open")}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 ${
                activeTab === "open"
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-500"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } transition-colors duration-200 flex items-center gap-2`}
            >
              Open Disputes
              {statusCounts.open > 0 && (
                <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 text-xs font-medium px-2 py-0.5 rounded-full">
                  {statusCounts.open}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("resolved")}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 ${
                activeTab === "resolved"
                  ? "border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-500"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } transition-colors duration-200 flex items-center gap-2`}
            >
              Resolved Disputes
              {statusCounts.resolved > 0 && (
                <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-0.5 rounded-full">
                  {statusCounts.resolved}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Content Section */}
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
  {loading && !refreshing ? (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-indigo-600 dark:border-t-indigo-500 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 dark:text-gray-400">Loading disputes...</p>
    </div>
  ) : error ? (
    <div className="text-center py-12">
      <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 p-4 rounded-lg inline-block mb-4">
        <p>{error}</p>
      </div>
      <button 
        onClick={handleRefresh}
        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center gap-2 mx-auto"
      >
        <RefreshCw size={16} />
        Try again
      </button>
    </div>
  ) : filteredDisputes.length === 0 ? (
    <div className="text-center py-12">
      <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 inline-flex mb-4">
        <Filter size={24} className="text-gray-500 dark:text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No disputes found</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        {searchTerm 
          ? "Try adjusting your search or filters" 
          : activeTab === "open" 
            ? "You don't have any open disputes" 
            : "You don't have any resolved disputes"}
      </p>
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center gap-2 mx-auto"
        >
          <ArrowLeft size={16} />
          Clear search
        </button>
      )}
    </div>
  ) : (
    <>
      <DisputeList disputes={paginatedDisputes} onViewDetails={handleViewDetails} />
      {paginatedDisputes.length < filteredDisputes.length && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPage(page + 1)}
          className="mt-6 py-2.5 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 mx-auto block"
        >
          Load More Disputes
        </motion.button>
      )}
    </>
  )}
</div>

{/* Modals */}
<DisputeDetailsModal 
  dispute={selectedDispute} 
  isOpen={isDetailsModalOpen} 
  onClose={handleCloseDetailsModal} 
  onStatusChange={() => fetchDisputes()}
/>

<NewDisputeForm 
  isOpen={isNewDisputeFormOpen} 
  onClose={handleCloseNewDisputeForm} 
  onSubmit={handleSubmitNewDispute} 
/>

{/* Click outside to close filter menu */}
{filterMenuOpen && (
  <div 
    className="fixed inset-0 z-0" 
    onClick={() => setFilterMenuOpen(false)}
  />
)}
</div>
</div>
);
};

export default DisputeManagement;