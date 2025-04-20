import React, { useState } from "react";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import DisputeOverview from "../components/DisputeManagementSections.jsx/DisputeOverview";
import DisputesFiltersSortingPanel from "../components/DisputeManagementSections.jsx/DisputesFiltersSortingPanel";
import DisputesTable from "../components/DisputeManagementSections.jsx/DisputesTable";
import DisputesBulkActions from "../components/DisputeManagementSections.jsx/DisputesBulkActions";
import DisputeManagementHeader from "../components/DisputeManagementSections.jsx/DisputeManagementHeader";
import DisputeModal from "../components/DisputeManagementSections.jsx/DisputeModal";


const DisputeManagementPageWrapper = () => {
  const [filters, setFilters] = useState({});
  const [selectedDisputes, setSelectedDisputes] = useState([]);
  const [modalData, setModalData] = useState({ open: false, type: "", dispute: null });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log("Applied Filters:", newFilters);
    // Trigger re-fetch if needed
  };

  const handleSortChange = (sortOption) => {
    console.log("Sort option changed to:", sortOption);
    // Update dispute fetching accordingly.
  };

  const handleBulkAction = async (action, selectedIds) => {
    console.log(`Performing ${action} on disputes:`, selectedIds);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert(`${action} performed on disputes: ${selectedIds.join(", ")}`);
    setSelectedDisputes([]);
  };

  const handleOpenModal = (type, dispute) => {
    setModalData({ open: true, type, dispute });
  };

  const handleCloseModal = () => {
    setModalData({ open: false, type: "", dispute: null });
  };

  return (
    <div className="pt-24 pb-5 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-6 transition">
      <DisputeManagementHeader />
    
      <DisputesFiltersSortingPanel onFilterChange={handleFilterChange} onSortChange={handleSortChange} />
      <DisputesTable filters={filters} selectedDisputes={selectedDisputes} setSelectedDisputes={setSelectedDisputes} onOpenModal={handleOpenModal} />
      <DisputesBulkActions selectedDisputes={selectedDisputes} onBulkAction={handleBulkAction} />
      {modalData.open && (
        <DisputeModal
          type={modalData.type}
          dispute={modalData.dispute}
          onClose={handleCloseModal}
          onSave={(updatedData) => console.log("Updated Dispute:", updatedData)}
          onConfirm={(id) => console.log("Delete confirmed for dispute:", id)}
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
