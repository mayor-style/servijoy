import React, { useState, useCallback } from "react";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";

// Component imports using your existing file structure
import DisputeOverview from "../components/DisputeManagementSections.jsx/DisputeOverview";
import DisputesFiltersSortingPanel from "../components/DisputeManagementSections.jsx/DisputesFiltersSortingPanel";
import DisputesTable from "../components/DisputeManagementSections.jsx/DisputesTable";
import DisputesBulkActions from "../components/DisputeManagementSections.jsx/DisputesBulkActions";
import DisputeManagementHeader from "../components/DisputeManagementSections.jsx/DisputeManagementHeader";
import DisputeModal from "../components/DisputeManagementSections.jsx/DisputeModal";

const DisputeManagementPageWrapper = () => {
  // Enhanced state management
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    status: "",
    dateRange: { from: null, to: null },
    customerType: "",
    priority: "",
  });
  const [sortConfig, setSortConfig] = useState({ field: "createdAt", direction: "desc" });
  const [selectedDisputes, setSelectedDisputes] = useState([]);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({ 
    open: false, 
    type: "", 
    dispute: null 
  });
  const [notification, setNotification] = useState({ 
    show: false, 
    message: "", 
    type: "" 
  });

  // Show notification helper
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  };

  // Handlers with useCallback for better performance
  const handleFilterChange = useCallback((newFilters) => {
    setIsLoading(true);
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      console.log("Applied Filters:", newFilters);
    }, 600);
  }, []);

  const handleSortChange = useCallback((field) => {
    setSortConfig(prevSort => ({
      field,
      direction: prevSort.field === field && prevSort.direction === "asc" ? "desc" : "asc"
    }));
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      console.log("Sort changed:", { field, direction: sortConfig.direction });
    }, 600);
  }, [sortConfig.direction]);

  const handleBulkAction = useCallback(async (action) => {
    if (selectedDisputes.length === 0) {
      showNotification("Please select at least one dispute to perform this action.", "error");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    showNotification(`${action} performed on ${selectedDisputes.length} disputes successfully.`);
    setSelectedDisputes([]);
    setIsLoading(false);
  }, [selectedDisputes]);

  const handleOpenModal = useCallback((type, dispute = null) => {
    setModalData({ open: true, type, dispute });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalData({ open: false, type: "", dispute: null });
  }, []);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setIsLoading(true);
    
    // Apply predefined filters based on tab
    const tabFilters = {
      all: { status: "" },
      open: { status: "open" },
      pending: { status: "pending" },
      resolved: { status: "resolved" },
      escalated: { status: "escalated" }
    };
    
    setFilters(prev => ({ ...prev, ...tabFilters[tab] }));
    setTimeout(() => setIsLoading(false), 600);
  }, []);

  const handleSaveDispute = useCallback((updatedData) => {
    // Simulate API call
    console.log("Updated Dispute:", updatedData);
    showNotification("The dispute has been successfully updated.");
    handleCloseModal();
  }, [handleCloseModal]);

  const handleDeleteDispute = useCallback((id) => {
    // Simulate API call
    console.log("Delete confirmed for dispute:", id);
    showNotification("The dispute has been successfully deleted.");
    handleCloseModal();
  }, [handleCloseModal]);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showNotification("Data refreshed successfully");
    }, 600);
  }, []);

  return (
    <div className="pt-8 pb-5 bg-gray-50 dark:bg-gray-900 min-h-screen transition">
      {/* Header section */}
      <div className="mb-6 px-6">
        <DisputeManagementHeader 
          onNewDispute={() => handleOpenModal("create")}
          onRefresh={handleRefresh}
          onToggleFilters={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          isFilterPanelOpen={isFilterPanelOpen}
          isLoading={isLoading}
        />
      </div>

      {/* Overview section */}
      <div className="mb-6 px-6">
        <DisputeOverview isLoading={isLoading} />
      </div>

      {/* Main content section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mx-6 mb-6">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex space-x-4 overflow-x-auto pb-2 sm:pb-0">
              {["all", "open", "pending", "resolved", "escalated"].map(tab => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                    activeTab === tab
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedDisputes.length} selected
              </span>
              {selectedDisputes.length > 0 && (
                <DisputesBulkActions 
                  selectedDisputes={selectedDisputes} 
                  onBulkAction={handleBulkAction} 
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </div>
        
        {/* Filters Panel */}
        {isFilterPanelOpen && (
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <DisputesFiltersSortingPanel 
              filters={filters}
              onFilterChange={handleFilterChange} 
              onSortChange={sortConfig => handleSortChange(sortConfig.field)}
              onReset={() => handleFilterChange({
                status: activeTab === "all" ? "" : activeTab,
                dateRange: { from: null, to: null },
                customerType: "",
                priority: "",
              })}
              isLoading={isLoading}
            />
          </div>
        )}
        
        {/* Table Content */}
        <div className="px-6 py-4">
          <DisputesTable 
            filters={filters}
            sortConfig={sortConfig}
            onSortChange={handleSortChange}
            selectedDisputes={selectedDisputes}
            setSelectedDisputes={setSelectedDisputes}
            onOpenModal={handleOpenModal}
            isLoading={isLoading}
          />
        </div>
      </div>
      
      {/* Notification toast */}
      {notification.show && (
        <div 
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-md shadow-lg z-50 ${
            notification.type === "error" 
              ? "bg-red-100 border-l-4 border-red-500 text-red-700" 
              : "bg-green-100 border-l-4 border-green-500 text-green-700"
          }`}
        >
          {notification.message}
        </div>
      )}
      
      {/* Modal */}
      {modalData.open && (
        <DisputeModal
          type={modalData.type}
          dispute={modalData.dispute}
          onClose={handleCloseModal}
          onSave={handleSaveDispute}
          onConfirm={handleDeleteDispute}
        />
      )}
    </div>
  );
};

const DisputeManagementPage = () => {
  return (
    <AdminDashboardLayout content={<DisputeManagementPageWrapper />} />
  );
};

export default DisputeManagementPage;