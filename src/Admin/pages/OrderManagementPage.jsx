import React, { useState } from "react";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import OrderManagementHeader from "../components/OrderManagementSections/OrderManagementHeader";
import OrderOverview from "../components/OrderManagementSections/OrderOverview";
import OrdersFiltersSortingPanel from "../components/OrderManagementSections/OrdersFiltersSortingPanel";
import OrdersTable from "../components/OrderManagementSections/OrdersTable";
import OrdersBulkActions from "../components/OrderManagementSections/OrdersBulkActions";
import OrderModal from "../components/OrderManagementSections/OrderModal";


const OrderManagementPageWrapper = () => {
  // State for filters from the Filters & Sorting Panel
  const [filters, setFilters] = useState({});
  
  // State for selected order IDs from the Orders Table (for bulk actions)
  const [selectedOrders, setSelectedOrders] = useState([]);
  
  // State for modals (detailed view modals for orders)
  const [modalData, setModalData] = useState({ open: false, type: "", order: null });

  // Callback when filters are applied
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log("Applied Filters:", newFilters);
    // In production, trigger a re-fetch of orders here using the filters.
  };

  // Callback for sorting changes (if applicable)
  const handleSortChange = (sortOption) => {
    console.log("Sort option changed to:", sortOption);
    // In production, update the order fetching accordingly.
  };

  // Bulk action handler with simulated API delay using dummy data
  const handleBulkAction = async (action, selectedIds) => {
    console.log(`Performing ${action} on orders:`, selectedIds);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert(`${action} performed on orders: ${selectedIds.join(", ")}`);
    setSelectedOrders([]); // Clear selection after action
  };

  // Modal handling: open the appropriate modal based on action type and selected order
  const handleOpenModal = (type, order) => {
    setModalData({ open: true, type, order });
  };

  const handleCloseModal = () => {
    setModalData({ open: false, type: "", order: null });
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-6">
      {/* 1. Page Header Section */}
      <OrderManagementHeader />

      {/* 2. Orders Overview Section */}
      <OrderOverview />

      {/* 3. Filters & Sorting Panel Section */}
      <OrdersFiltersSortingPanel 
        onFilterChange={handleFilterChange} 
        onSortChange={handleSortChange} 
      />

      {/* 4. Orders Table Section */}
      <OrdersTable 
        filters={filters} 
        selectedOrders={selectedOrders} 
        setSelectedOrders={setSelectedOrders} 
        onOpenModal={handleOpenModal} 
      />

      {/* 5. Bulk Actions Panel Section */}
      <OrdersBulkActions 
        selectedOrders={selectedOrders} 
        onBulkAction={handleBulkAction} 
      />

      {/* 6. Detailed View Modals Section */}
      {modalData.open && (
        <OrderModal 
          type={modalData.type} 
          order={modalData.order} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};



const OrderManagementPage = () => {
  return (
    <div>
      <AdminDashboardLayout content={OrderManagementPageWrapper() } />
    </div>
  )
}

export default OrderManagementPage


