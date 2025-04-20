import React, { useState, useEffect } from "react";
import { FaSpinner, FaExclamationCircle, FaLightbulb, FaCommentAlt } from "react-icons/fa";
import VendorDisputeList from "./components/VendorDisputeManagement/VendorDisputeList";
import VendorDisputeDetailsModal from "./components/VendorDisputeManagement/VendorDisputeDetailsModal";

const VendorDisputeManagement = () => {
  const initialDisputes = [
    { id: 1, subject: "Late Service Delivery", description: "Customer complains that the service was delivered later than promised.", reference: "BK-2001", date: "2025-03-01", status: "pending", client: "Alice Johnson", messages: [{ sender: "Customer", message: "I waited for over an hour!" }, { sender: "Vendor", message: "We're investigating this issue." }] },
    { id: 2, subject: "Incorrect Service Charge", description: "Customer disputes the final amount charged for the service.", reference: "BK-2002", date: "2025-02-25", status: "in-progress", client: "Bob Smith", messages: [{ sender: "Customer", message: "The charge is much higher than quoted." }, { sender: "Vendor", message: "Please provide more details." }] },
    { id: 3, subject: "Poor Service Quality", description: "Customer reports that the quality of service was not up to the expected standards.", reference: "BK-2003", date: "2025-02-20", status: "resolved", client: "Cathy Lee", messages: [{ sender: "Customer", message: "The work done was unsatisfactory." }, { sender: "Vendor", message: "We have resolved the issue with a refund." }] },
    { id: 4, subject: "Service Cancellation Dispute", description: "Customer is disputing late cancellation fee.", reference: "BK-2004", date: "2025-03-05", status: "pending", client: "David Wong", messages: [{ sender: "Customer", message: "I canceled well before the deadline." }, { sender: "Vendor", message: "Our records show the cancellation was made after the deadline." }] },
    { id: 5, subject: "Technician Behavior", description: "Customer complaint about technician's unprofessional behavior.", reference: "BK-2005", date: "2025-03-10", status: "in-progress", client: "Emily Chen", messages: [{ sender: "Customer", message: "The technician was rude and dismissive." }, { sender: "Vendor", message: "We take this very seriously and are investigating." }] },
  ];

  // State management
  const [disputes, setDisputes] = useState([]);
  const [filteredDisputes, setFilteredDisputes] = useState([]);
  const [activeTab, setActiveTab] = useState("open");
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Development testing states
  const [showDevControls, setShowDevControls] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);

  // Simulated data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If empty state is toggled, set empty array, otherwise set initial disputes
      setDisputes(showEmptyState ? [] : initialDisputes);
      setIsLoading(false);
    };
    
    loadData();
  }, [showEmptyState]);

  // Filter disputes based on active tab and search term
  useEffect(() => {
    let filtered = disputes.filter((dispute) => {
      const matchesTab = activeTab === "open" 
        ? dispute.status === "pending" || dispute.status === "in-progress" 
        : dispute.status === "resolved" || dispute.status === "declined";
      
      const matchesSearch = searchTerm.trim() === "" || 
        dispute.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dispute.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dispute.client.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesTab && matchesSearch;
    });
    
    setFilteredDisputes(filtered);
  }, [disputes, activeTab, searchTerm]);

  // Handlers
  const handleViewDetails = (dispute) => {
    setSelectedDispute(null);
    setModalLoading(true);
    setIsDetailsModalOpen(true);
    
    // Simulate loading dispute details
    setTimeout(() => {
      setSelectedDispute(dispute);
      setModalLoading(false);
    }, 800);
  };
  
  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    setTimeout(() => setSelectedDispute(null), 300);
  };
  
  const handleUpdateStatus = (id, newStatus) => {
    setModalLoading(true);
    
    // Simulate API call to update status
    setTimeout(() => {
      setDisputes((prev) => prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d)));
      setModalLoading(false);
      setIsDetailsModalOpen(false);
    }, 800);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Toggle development controls
  const toggleDevControls = () => {
    setShowDevControls(!showDevControls);
  };
  
  // Toggle empty state for testing
  const toggleEmptyState = () => {
    setShowEmptyState(!showEmptyState);
  };
  
  // Stats summary
  const stats = {
    total: disputes.length,
    pending: disputes.filter(d => d.status === "pending").length,
    inProgress: disputes.filter(d => d.status === "in-progress").length,
    resolved: disputes.filter(d => d.status === "resolved").length,
    declined: disputes.filter(d => d.status === "declined").length
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 md:py-10 px-4 md:px-6 transition-colors duration-300">
      {/* Development Controls - Visible only during development */}
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={toggleDevControls}
          className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          Toggle Dev Controls
        </button>
        
        {showDevControls && (
          <div className="mt-3 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
            <h3 className="text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">Development Testing Controls</h3>
            <div className="flex items-center">
              <button
                onClick={toggleEmptyState}
                className="text-xs px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-200"
              >
                {showEmptyState ? "Show Sample Data" : "Show Empty State"}
              </button>
              <p className="ml-4 text-xs text-gray-600 dark:text-gray-400">
                Current state: {showEmptyState ? "Empty" : "Sample data"}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold dark:text-white mb-2">Dispute Management</h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Manage and respond to customer disputes</p>
          </div>
          
          {/* Search */}
          <div className="w-full lg:w-auto mt-4 lg:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search disputes..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full lg:w-64 px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                <FaCommentAlt className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Disputes</p>
                <p className="text-xl font-bold dark:text-white">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mr-3">
                <FaExclamationCircle className="text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                <p className="text-xl font-bold dark:text-white">{stats.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                <FaSpinner className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
                <p className="text-xl font-bold dark:text-white">{stats.inProgress}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green/10 dark:bg-green/90 flex items-center justify-center mr-3">
                <FaLightbulb className="text-green/60 dark:text-green/40" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Resolved</p>
                <p className="text-xl font-bold dark:text-white">{stats.resolved}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
          <div className="flex space-x-1">
            {["open", "resolved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {tab === "open" ? "Open Disputes" : "Resolved Disputes"}
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400">
                  {tab === "open" ? stats.pending + stats.inProgress : stats.resolved + stats.declined}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md min-h-[400px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-80">
              <FaSpinner className="animate-spin text-blue-600 text-4xl mb-4" />
              <p className="text-gray-600 dark:text-gray-300">Loading disputes...</p>
            </div>
          ) : (
            <VendorDisputeList 
              disputes={filteredDisputes} 
              onViewDetails={handleViewDetails}
              searchTerm={searchTerm}
            />
          )}
        </div>
      </div>

      {/* Details Modal */}
      <VendorDisputeDetailsModal 
        dispute={selectedDispute} 
        isOpen={isDetailsModalOpen} 
        onClose={handleCloseModal} 
        onUpdateStatus={handleUpdateStatus}
        isLoading={modalLoading}
      />
    </div>
  );
};

export default VendorDisputeManagement;