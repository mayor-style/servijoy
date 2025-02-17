import React, { useState } from "react";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import OrderManagementHeader from "../components/OrderManagementSections/OrderManagementHeader";
import OrderOverview from "../components/OrderManagementSections/OrderOverview";
import OrdersFiltersSortingPanel from "../components/OrderManagementSections/OrdersFiltersSortingPanel";
import OrdersTable from "../components/OrderManagementSections/OrdersTable";
import OrdersBulkActions from "../components/OrderManagementSections/OrdersBulkActions";
import OrderModal from "../components/OrderManagementSections/OrderModal";

const OrderManagementPageWrapper = () => {
  // State for filters
  const [filters, setFilters] = useState({});
  
  // State for selected order IDs (bulk actions)
  const [selectedOrders, setSelectedOrders] = useState([]);
  
  // State for modals (order detail modals)
  const [modalData, setModalData] = useState({ open: false, type: "", order: null });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log("Applied Filters:", newFilters);
    // Trigger re-fetch if needed.
  };

  const handleSortChange = (sortOption) => {
    console.log("Sort option changed to:", sortOption);
    // Update order fetching as needed.
  };

  // Bulk action handler with simulated API delay
  const handleBulkAction = async (action, selectedIds) => {
    console.log(`Performing ${action} on orders:`, selectedIds);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert(`${action} performed on orders: ${selectedIds.join(", ")}`);
    setSelectedOrders([]);
  };

  // Modal handling
  const handleOpenModal = (type, order) => {
    setModalData({ open: true, type, order });
  };

  const handleCloseModal = () => {
    setModalData({ open: false, type: "", order: null });
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-6 transition">
      {/* 1. Page Header */}
      <OrderManagementHeader />

      {/* 2. Orders Overview */}
      <OrderOverview />

      {/* 3. Filters & Sorting */}
      <OrdersFiltersSortingPanel onFilterChange={handleFilterChange} onSortChange={handleSortChange} />

      {/* 4. Orders Table */}
      <OrdersTable 
        filters={filters} 
        selectedOrders={selectedOrders} 
        setSelectedOrders={setSelectedOrders} 
        onOpenModal={handleOpenModal} 
      />

      {/* 5. Bulk Actions */}
      <OrdersBulkActions selectedOrders={selectedOrders} onBulkAction={handleBulkAction} />

      {/* 6. Order Detail Modals */}
      {modalData.open && (
        <OrderModal 
          type={modalData.type} 
          order={modalData.order} 
          onClose={handleCloseModal} 
          onSave={(updatedData) => console.log("Updated Order:", updatedData)}
          onConfirm={(orderId) => console.log("Delete confirmed for order:", orderId)}
        />
      )}
    </div>
  );
};

const OrderManagementPage = () => {
  return (
    <AdminDashboardLayout content={<OrderManagementPageWrapper />} />
  );
};

export default OrderManagementPage;
